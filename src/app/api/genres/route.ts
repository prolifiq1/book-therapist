import { getGenres } from "@/lib/data/books";

export async function GET() {
  return Response.json({ genres: getGenres() });
}
