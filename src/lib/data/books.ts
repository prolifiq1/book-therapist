import { seedBooks, type SeedBook } from "@/data/seed-books";
import type { BookVector } from "@/lib/engine/recommender";

// Normalize personality fit keys to match our PersonalityType system
const PERSONALITY_KEY_MAP: Record<string, string> = {
  "creative-explorer": "curious-explorer",
  "mindful-philosopher": "reflective-thinker",
  "social-connector": "emotional-healer",
  "resilient-survivor": "resilient-rebuilder",
};

function normalizePersonalityFit(fit: Record<string, number>): Record<string, number> {
  const normalized: Record<string, number> = {};
  for (const [key, value] of Object.entries(fit)) {
    const mappedKey = PERSONALITY_KEY_MAP[key] || key;
    normalized[mappedKey] = Math.max(normalized[mappedKey] || 0, value);
  }
  return normalized;
}

function normalizeGenreSlug(genre: string): string {
  return genre.toLowerCase().replace(/\s+/g, "-");
}

// Build book vectors for recommendation engine
export function getBookVectors(): BookVector[] {
  return seedBooks.map((book) => ({
    id: book.slug,
    title: book.title,
    slug: book.slug,
    personalityFit: normalizePersonalityFit(book.personalityFit),
    themeVector: book.themeVector,
    toneVector: book.toneVector,
    pacing: book.pacing,
    isFiction: book.isFiction,
    avgRating: book.avgRating,
    ratingsCount: book.ratingsCount,
    readingDifficulty: book.readingDifficulty,
    emotionalTone: book.emotionalTone,
    genres: book.genres.map(normalizeGenreSlug),
    themes: book.themes,
    tags: book.tags,
  }));
}

// Get all books with full details
export function getAllBooks(): SeedBook[] {
  return seedBooks;
}

// Get a single book by slug
export function getBookBySlug(slug: string): SeedBook | undefined {
  return seedBooks.find((b) => b.slug === slug);
}

// Search books by query
export function searchBooks(query: string): SeedBook[] {
  const q = query.toLowerCase();
  return seedBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.authors.some((a) => a.toLowerCase().includes(q)) ||
      b.themes.some((t) => t.toLowerCase().includes(q)) ||
      b.genres.some((g) => g.toLowerCase().includes(q)) ||
      b.tags.some((t) => t.toLowerCase().includes(q))
  );
}

// Filter books
export interface BookFilters {
  genre?: string;
  theme?: string;
  mood?: string;
  pacing?: string;
  fiction?: "fiction" | "nonfiction" | "both";
  difficulty?: string;
  minRating?: number;
  hasAwards?: boolean;
  hasAdaptations?: boolean;
  tag?: string;
  personality?: string;
}

export function filterBooks(filters: BookFilters): SeedBook[] {
  return seedBooks.filter((book) => {
    if (filters.genre && !book.genres.some((g) => normalizeGenreSlug(g) === filters.genre)) return false;
    if (filters.theme && !book.themes.includes(filters.theme)) return false;
    if (filters.mood && !book.emotionalTone.includes(filters.mood) && !book.tags.includes(filters.mood)) return false;
    if (filters.pacing && book.pacing !== filters.pacing) return false;
    if (filters.fiction === "fiction" && !book.isFiction) return false;
    if (filters.fiction === "nonfiction" && book.isFiction) return false;
    if (filters.difficulty && book.readingDifficulty !== filters.difficulty) return false;
    if (filters.minRating && book.avgRating < filters.minRating) return false;
    if (filters.hasAwards && book.awards.length === 0) return false;
    if (filters.hasAdaptations && book.adaptations.length === 0) return false;
    if (filters.tag && !book.tags.includes(filters.tag)) return false;
    if (filters.personality) {
      const fit = normalizePersonalityFit(book.personalityFit);
      if ((fit[filters.personality] || 0) < 0.6) return false;
    }
    return true;
  });
}

// Get books by genre
export function getBooksByGenre(genreSlug: string): SeedBook[] {
  return seedBooks.filter((b) => b.genres.some((g) => normalizeGenreSlug(g) === genreSlug));
}

// Get unique genres from seed data
export function getGenres(): { name: string; slug: string; count: number }[] {
  const genreMap = new Map<string, number>();
  for (const book of seedBooks) {
    for (const genre of book.genres) {
      const slug = normalizeGenreSlug(genre);
      genreMap.set(slug, (genreMap.get(slug) || 0) + 1);
    }
  }
  return Array.from(genreMap.entries())
    .map(([slug, count]) => ({
      name: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      slug,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

// Get unique themes
export function getThemes(): string[] {
  const themes = new Set<string>();
  for (const book of seedBooks) {
    for (const theme of book.themes) {
      themes.add(theme);
    }
  }
  return Array.from(themes).sort();
}

// Get unique tags
export function getTags(): string[] {
  const tags = new Set<string>();
  for (const book of seedBooks) {
    for (const tag of book.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

// Get award-winning books
export function getAwardWinningBooks(): SeedBook[] {
  return seedBooks.filter((b) => b.awards.some((a) => a.won));
}

// Get adapted books
export function getAdaptedBooks(): SeedBook[] {
  return seedBooks.filter((b) => b.adaptations.length > 0);
}

// Get similar books for a given book
export function getSimilarBooks(slug: string): SeedBook[] {
  const book = getBookBySlug(slug);
  if (!book) return [];
  return book.similarBooks
    .map((s) => getBookBySlug(s))
    .filter((b): b is SeedBook => b !== undefined);
}

// Get highly rated books
export function getHighlyRatedBooks(minRating = 4.2): SeedBook[] {
  return seedBooks.filter((b) => b.avgRating >= minRating).sort((a, b) => b.avgRating - a.avgRating);
}
