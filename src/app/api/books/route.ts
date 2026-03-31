import {
  getAllBooksFromDb,
  searchBooksFromDb,
  filterBooksFromDb,
} from "@/lib/data/db-books";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "40");

  if (query) {
    const result = await searchBooksFromDb(query, page, limit);
    return Response.json(result);
  }

  const genre = searchParams.get("genre");
  const theme = searchParams.get("theme");
  const mood = searchParams.get("mood");
  const pacing = searchParams.get("pacing");
  const fiction = searchParams.get("fiction");
  const difficulty = searchParams.get("difficulty");
  const minRating = searchParams.get("minRating");
  const hasAwards = searchParams.get("awards");
  const hasAdaptations = searchParams.get("adaptations");
  const tag = searchParams.get("tag");
  const personality = searchParams.get("personality");

  const hasFilters = genre || theme || mood || pacing || fiction || difficulty || minRating || hasAwards || hasAdaptations || tag || personality;

  if (hasFilters) {
    const result = await filterBooksFromDb(
      {
        genre: genre || undefined,
        theme: theme || undefined,
        mood: mood || undefined,
        pacing: pacing || undefined,
        fiction: fiction || undefined,
        difficulty: difficulty || undefined,
        minRating: minRating ? parseFloat(minRating) : undefined,
        hasAwards: hasAwards === "true" || undefined,
        hasAdaptations: hasAdaptations === "true" || undefined,
        tag: tag || undefined,
        personality: personality || undefined,
      },
      page,
      limit
    );
    return Response.json(result);
  }

  const result = await getAllBooksFromDb(page, limit);
  return Response.json(result);
}
