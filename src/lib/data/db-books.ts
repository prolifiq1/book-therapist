// Database-backed book data layer
// Falls back to in-memory seed data when database is unavailable

import { prisma } from "@/lib/db/prisma";
import * as seedData from "./books";

function isDbAvailable(): boolean {
  return prisma !== null;
}

export async function getAllBooksFromDb(page = 1, limit = 40) {
  if (!isDbAvailable()) {
    const all = seedData.getAllBooks();
    const start = (page - 1) * limit;
    return {
      books: all.slice(start, start + limit),
      total: all.length,
      page,
      totalPages: Math.ceil(all.length / limit),
    };
  }

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { avgRating: "desc" },
      include: {
        authors: { include: { author: true } },
        genres: { include: { genre: true } },
        themes: { include: { theme: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.book.count(),
  ]);

  return {
    books: books.map(formatDbBook),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function searchBooksFromDb(query: string, page = 1, limit = 40) {
  if (!isDbAvailable()) {
    const results = seedData.searchBooks(query);
    const start = (page - 1) * limit;
    return {
      books: results.slice(start, start + limit),
      total: results.length,
      page,
      totalPages: Math.ceil(results.length / limit),
    };
  }

  const where = {
    OR: [
      { title: { contains: query, mode: "insensitive" as const } },
      { description: { contains: query, mode: "insensitive" as const } },
      { authors: { some: { author: { name: { contains: query, mode: "insensitive" as const } } } } },
      { genres: { some: { genre: { name: { contains: query, mode: "insensitive" as const } } } } },
      { themes: { some: { theme: { name: { contains: query, mode: "insensitive" as const } } } } },
    ],
  };

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { avgRating: "desc" },
      include: {
        authors: { include: { author: true } },
        genres: { include: { genre: true } },
        themes: { include: { theme: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.book.count({ where }),
  ]);

  return {
    books: books.map(formatDbBook),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function filterBooksFromDb(
  filters: {
    genre?: string;
    theme?: string;
    mood?: string;
    pacing?: string;
    fiction?: string;
    difficulty?: string;
    minRating?: number;
    hasAwards?: boolean;
    hasAdaptations?: boolean;
    tag?: string;
    personality?: string;
  },
  page = 1,
  limit = 40
) {
  if (!isDbAvailable()) {
    const results = seedData.filterBooks({
      ...filters,
      fiction: filters.fiction as "fiction" | "nonfiction" | "both" | undefined,
    });
    const start = (page - 1) * limit;
    return {
      books: results.slice(start, start + limit),
      total: results.length,
      page,
      totalPages: Math.ceil(results.length / limit),
    };
  }

  const where: any = {};

  if (filters.genre) {
    where.genres = { some: { genre: { slug: filters.genre } } };
  }
  if (filters.theme) {
    where.themes = { some: { theme: { slug: filters.theme } } };
  }
  if (filters.tag) {
    where.tags = { some: { tag: { slug: filters.tag } } };
  }
  if (filters.mood) {
    where.emotionalTone = { has: filters.mood };
  }
  if (filters.pacing) {
    where.pacing = filters.pacing;
  }
  if (filters.fiction === "fiction") {
    where.isFiction = true;
  } else if (filters.fiction === "nonfiction") {
    where.isFiction = false;
  }
  if (filters.difficulty) {
    where.readingDifficulty = filters.difficulty;
  }
  if (filters.minRating) {
    where.avgRating = { gte: filters.minRating };
  }
  if (filters.hasAwards) {
    where.awards = { some: {} };
  }
  if (filters.hasAdaptations) {
    where.adaptations = { some: {} };
  }

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { avgRating: "desc" },
      include: {
        authors: { include: { author: true } },
        genres: { include: { genre: true } },
        themes: { include: { theme: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.book.count({ where }),
  ]);

  return {
    books: books.map(formatDbBook),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getBookBySlugFromDb(slug: string) {
  if (!isDbAvailable()) {
    const book = seedData.getBookBySlug(slug);
    if (!book) return null;
    const similar = seedData.getSimilarBooks(slug);
    return { book, similarBooks: similar };
  }

  const book = await prisma.book.findUnique({
    where: { slug },
    include: {
      authors: { include: { author: true } },
      genres: { include: { genre: true } },
      themes: { include: { theme: true } },
      tags: { include: { tag: true } },
      awards: true,
      adaptations: true,
      reviews: true,
      quotes: true,
      similarTo: {
        include: {
          similarTo: {
            include: {
              authors: { include: { author: true } },
            },
          },
        },
        take: 6,
      },
    },
  });

  if (!book) return null;

  // Find similar books by matching genres/themes if no explicit similar books
  let similarBooks: any[] = [];
  if (book.similarTo.length > 0) {
    similarBooks = book.similarTo.map((s: any) => ({
      slug: s.similarTo.slug,
      title: s.similarTo.title,
      coverImage: s.similarTo.coverImage,
      authors: s.similarTo.authors.map((a: any) => a.author.name),
      avgRating: s.similarTo.avgRating,
    }));
  } else {
    // Find books with similar genres
    const genreIds = book.genres.map((g: any) => g.genreId);
    if (genreIds.length > 0) {
      const similar = await prisma.book.findMany({
        where: {
          id: { not: book.id },
          genres: { some: { genreId: { in: genreIds } } },
        },
        take: 6,
        orderBy: { avgRating: "desc" },
        include: {
          authors: { include: { author: true } },
        },
      });
      similarBooks = similar.map((s: any) => ({
        slug: s.slug,
        title: s.title,
        coverImage: s.coverImage,
        authors: s.authors.map((a: any) => a.author.name),
        avgRating: s.avgRating,
      }));
    }
  }

  return { book: formatDbBookFull(book), similarBooks };
}

export async function getBookVectorsFromDb() {
  if (!isDbAvailable()) {
    return seedData.getBookVectors();
  }

  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      personalityFit: true,
      themeVector: true,
      toneVector: true,
      pacing: true,
      isFiction: true,
      avgRating: true,
      ratingsCount: true,
      readingDifficulty: true,
      emotionalTone: true,
      genres: { include: { genre: true } },
      themes: { include: { theme: true } },
      tags: { include: { tag: true } },
    },
  });

  return books.map((b: any) => ({
    id: b.slug,
    title: b.title,
    slug: b.slug,
    personalityFit: (b.personalityFit as Record<string, number>) || {},
    themeVector: (b.themeVector as Record<string, number>) || {},
    toneVector: (b.toneVector as Record<string, number>) || {},
    pacing: b.pacing,
    isFiction: b.isFiction,
    avgRating: b.avgRating,
    ratingsCount: b.ratingsCount,
    readingDifficulty: b.readingDifficulty,
    emotionalTone: b.emotionalTone,
    genres: b.genres.map((g: any) => g.genre.slug),
    themes: b.themes.map((t: any) => t.theme.slug),
    tags: b.tags.map((t: any) => t.tag.slug),
  }));
}

export async function getGenresFromDb() {
  if (!isDbAvailable()) {
    return seedData.getGenres();
  }

  const genres = await prisma.genre.findMany({
    include: { _count: { select: { books: true } } },
    orderBy: { books: { _count: "desc" } },
  });

  return genres.map((g: any) => ({
    name: g.name,
    slug: g.slug,
    count: g._count.books,
  }));
}

// Format helpers
function formatDbBook(book: any) {
  return {
    title: book.title,
    slug: book.slug,
    subtitle: book.subtitle,
    description: book.description,
    coverImage: book.coverImage,
    pageCount: book.pageCount,
    avgRating: book.avgRating,
    ratingsCount: book.ratingsCount,
    pacing: book.pacing,
    readingDifficulty: book.readingDifficulty,
    isFiction: book.isFiction,
    emotionalTone: book.emotionalTone,
    authors: book.authors?.map((a: any) => a.author.name) || [],
    genres: book.genres?.map((g: any) => g.genre.name) || [],
    themes: book.themes?.map((t: any) => t.theme.name) || [],
    tags: book.tags?.map((t: any) => t.tag.name) || [],
  };
}

function formatDbBookFull(book: any) {
  return {
    ...formatDbBook(book),
    longDescription: book.longDescription,
    language: book.language,
    isbn13: book.isbn13,
    publishedDate: book.publishedDate,
    publisher: book.publisher,
    personalityFit: book.personalityFit,
    themeVector: book.themeVector,
    toneVector: book.toneVector,
    awards: book.awards || [],
    adaptations: book.adaptations || [],
    reviews: book.reviews || [],
    quotes: book.quotes || [],
    similarBooks: [],
  };
}
