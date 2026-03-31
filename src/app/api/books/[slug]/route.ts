import { getBookBySlugFromDb } from "@/lib/data/db-books";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const result = await getBookBySlugFromDb(slug);

  if (!result) {
    return Response.json({ error: "Book not found" }, { status: 404 });
  }

  return Response.json(result);
}
