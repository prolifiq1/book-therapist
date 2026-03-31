import { getAllBooks, searchBooks, filterBooks, type BookFilters } from "@/lib/data/books";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const genre = searchParams.get("genre");
  const theme = searchParams.get("theme");
  const mood = searchParams.get("mood");
  const pacing = searchParams.get("pacing");
  const fiction = searchParams.get("fiction") as BookFilters["fiction"];
  const difficulty = searchParams.get("difficulty");
  const minRating = searchParams.get("minRating");
  const hasAwards = searchParams.get("awards");
  const hasAdaptations = searchParams.get("adaptations");
  const tag = searchParams.get("tag");
  const personality = searchParams.get("personality");

  if (query) {
    return Response.json({ books: searchBooks(query) });
  }

  const hasFilters = genre || theme || mood || pacing || fiction || difficulty || minRating || hasAwards || hasAdaptations || tag || personality;
  if (hasFilters) {
    const filters: BookFilters = {};
    if (genre) filters.genre = genre;
    if (theme) filters.theme = theme;
    if (mood) filters.mood = mood;
    if (pacing) filters.pacing = pacing;
    if (fiction) filters.fiction = fiction;
    if (difficulty) filters.difficulty = difficulty;
    if (minRating) filters.minRating = parseFloat(minRating);
    if (hasAwards === "true") filters.hasAwards = true;
    if (hasAdaptations === "true") filters.hasAdaptations = true;
    if (tag) filters.tag = tag;
    if (personality) filters.personality = personality;
    return Response.json({ books: filterBooks(filters) });
  }

  return Response.json({ books: getAllBooks() });
}
