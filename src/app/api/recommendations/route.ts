import { getBookVectors } from "@/lib/data/books";
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

    // Generate reader profile from quiz answers
    const profile = generateReaderProfile(answers);

    // Build user vector for recommendation engine
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

    // Score and rank books
    const bookVectors = getBookVectors();
    const scored = scoreBooks(bookVectors, userVector, 12);

    return Response.json({
      profile,
      recommendations: scored,
    });
  } catch {
    return Response.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
