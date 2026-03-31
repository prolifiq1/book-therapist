import { getBookBySlug, getSimilarBooks } from "@/lib/data/books";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return Response.json({ error: "Book not found" }, { status: 404 });
  }

  const similarBooks = getSimilarBooks(slug).map((b) => ({
    slug: b.slug,
    title: b.title,
    coverImage: b.coverImage,
    authors: b.authors,
    avgRating: b.avgRating,
  }));

  return Response.json({ book, similarBooks });
}
