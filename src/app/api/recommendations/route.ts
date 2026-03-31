import { getBookVectorsFromDb } from "@/lib/data/db-books";
import { scoreBooks, type UserVector } from "@/lib/engine/recommender";
import { generateReaderProfile } from "@/lib/engine/profiler";
import type { QuizAnswer } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body as { answers: QuizAnswer[] };

    if (!answers || !Array.isArray(answers)) {
      return Response.json({ error: "Invalid quiz answers" }, { status: 400 });
    }

    const profile = generateReaderProfile(answers);

    const userVector: UserVector = {
      personalityType: profile.type,
      traits: profile.traits,
      preferredThemes: profile.preferredThemes,
      preferredTone: profile.preferredTone,
      preferredPace: profile.preferredPace,
      fictionPref: profile.fictionPref,
      avoidTopics: profile.avoidTopics,
      preferredGenres: profile.preferredGenres,
    };

    const bookVectors = await getBookVectorsFromDb();
    const scored = scoreBooks(bookVectors, userVector, 12);

    return Response.json({
      profile,
      recommendations: scored,
    });
  } catch {
    return Response.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
