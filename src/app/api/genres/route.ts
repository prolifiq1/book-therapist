import { getGenresFromDb } from "@/lib/data/db-books";

export async function GET() {
  const genres = await getGenresFromDb();
  return Response.json({ genres });
}
