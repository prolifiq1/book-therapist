import type { PersonalityType } from "@/types";

export interface BookVector {
  id: string;
  title: string;
  slug: string;
  personalityFit: Record<string, number>;
  themeVector: Record<string, number>;
  toneVector: Record<string, number>;
  pacing: string;
  isFiction: boolean;
  avgRating: number;
  ratingsCount: number;
  readingDifficulty: string;
  emotionalTone: string[];
  genres: string[];
  themes: string[];
  tags: string[];
}

export interface UserVector {
  personalityType: PersonalityType;
  traits: Record<string, number>;
  preferredThemes: string[];
  preferredTone: string[];
  preferredPace: string;
  fictionPref: string;
  avoidTopics: string[];
  preferredGenres: string[];
}

export interface ScoredBook {
  bookId: string;
  score: number;
  explanation: string;
  factors: {
    personalityScore: number;
    themeScore: number;
    toneScore: number;
    pacingScore: number;
    fictionScore: number;
    popularityScore: number;
  };
}

// Weights for combining different scoring factors
const WEIGHTS = {
  personality: 0.30,
  theme: 0.25,
  tone: 0.15,
  pacing: 0.10,
  fiction: 0.10,
  popularity: 0.10,
};

function cosineSimilarity(a: Record<string, number>, b: Record<string, number>): number {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const key of keys) {
    const va = a[key] || 0;
    const vb = b[key] || 0;
    dotProduct += va * vb;
    normA += va * va;
    normB += vb * vb;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function scorePersonalityFit(book: BookVector, user: UserVector): number {
  if (!book.personalityFit) return 0;
  // Direct lookup for primary personality type
  const directFit = book.personalityFit[user.personalityType] || 0;
  // Weighted average across all personality dimensions
  const similarity = cosineSimilarity(book.personalityFit, user.traits);
  return directFit * 0.6 + similarity * 0.4;
}

function scoreThemeFit(book: BookVector, user: UserVector): number {
  if (!book.themeVector || user.preferredThemes.length === 0) return 0;

  // Build a user theme vector from preferences
  const userThemeVec: Record<string, number> = {};
  for (let i = 0; i < user.preferredThemes.length; i++) {
    // Weight decreases for later preferences
    userThemeVec[user.preferredThemes[i]] = 1 - i * 0.08;
  }

  return cosineSimilarity(book.themeVector, userThemeVec);
}

function scoreToneFit(book: BookVector, user: UserVector): number {
  if (!book.toneVector || user.preferredTone.length === 0) return 0;

  const userToneVec: Record<string, number> = {};
  for (let i = 0; i < user.preferredTone.length; i++) {
    userToneVec[user.preferredTone[i]] = 1 - i * 0.1;
  }

  return cosineSimilarity(book.toneVector, userToneVec);
}

function scorePacingFit(book: BookVector, user: UserVector): number {
  if (book.pacing === user.preferredPace) return 1.0;
  const paceOrder = ["slow", "medium", "fast"];
  const bookIdx = paceOrder.indexOf(book.pacing);
  const userIdx = paceOrder.indexOf(user.preferredPace);
  const diff = Math.abs(bookIdx - userIdx);
  return diff === 1 ? 0.5 : 0.1;
}

function scoreFictionFit(book: BookVector, user: UserVector): number {
  if (user.fictionPref === "both") return 1.0;
  if (user.fictionPref === "fiction" && book.isFiction) return 1.0;
  if (user.fictionPref === "nonfiction" && !book.isFiction) return 1.0;
  return 0.3; // Slight penalty for mismatch
}

function scorePopularity(book: BookVector): number {
  // Normalize rating to 0-1 (assuming 0-5 scale)
  const ratingScore = book.avgRating / 5;
  // Log-scale popularity
  const popularityScore = Math.min(Math.log10(book.ratingsCount + 1) / 7, 1);
  return ratingScore * 0.7 + popularityScore * 0.3;
}

function hasAvoidedTopics(book: BookVector, avoidTopics: string[]): boolean {
  if (avoidTopics.length === 0) return false;
  const bookTags = new Set([...book.tags, ...book.emotionalTone, ...book.themes]);
  const avoidMap: Record<string, string[]> = {
    "Graphic violence": ["dark", "violent", "war", "graphic"],
    "Heavy trauma content": ["trauma", "abuse", "devastating", "dark"],
    "Romance-heavy plots": ["romantic", "romance", "love"],
    "Overly academic or dense writing": ["dense", "academic", "challenging"],
    "Religious or spiritual content": ["spiritual", "religious", "spirituality"],
    "Political themes": ["political", "politics", "totalitarianism"],
    "Dark or depressing endings": ["dark", "devastating", "tragic", "haunting"],
  };

  for (const topic of avoidTopics) {
    const keywords = avoidMap[topic] || [];
    for (const keyword of keywords) {
      if (bookTags.has(keyword)) return true;
    }
  }
  return false;
}

function generateExplanation(
  book: BookVector,
  user: UserVector,
  factors: ScoredBook["factors"]
): string {
  const parts: string[] = [];
  const profileLabels: Record<string, string> = {
    "reflective-thinker": "a Reflective Thinker",
    "ambitious-builder": "an Ambitious Builder",
    "emotional-healer": "an Emotional Healer",
    "curious-explorer": "a Curious Explorer",
    "deep-feeler": "a Deep Feeler",
    "intellectual-strategist": "an Intellectual Strategist",
    "soulful-romantic": "a Soulful Romantic",
    "resilient-rebuilder": "a Resilient Rebuilder",
  };

  // Personality fit
  if (factors.personalityScore > 0.7) {
    parts.push(`As ${profileLabels[user.personalityType]}, this book deeply resonates with how you experience stories`);
  } else if (factors.personalityScore > 0.5) {
    parts.push(`This aligns well with your ${profileLabels[user.personalityType]} reading style`);
  }

  // Theme match
  if (factors.themeScore > 0.5) {
    const matchedThemes = book.themes.filter((t) => user.preferredThemes.includes(t));
    if (matchedThemes.length > 0) {
      const themeStr = matchedThemes.slice(0, 3).join(", ");
      parts.push(`it explores themes of ${themeStr} that you're drawn to`);
    }
  }

  // Tone match
  if (factors.toneScore > 0.5) {
    const tones = book.emotionalTone.slice(0, 2).join(" and ");
    parts.push(`its ${tones} tone matches what you're looking for`);
  }

  // Pacing
  if (factors.pacingScore === 1.0) {
    parts.push(`the ${book.pacing} pacing fits your reading preference perfectly`);
  }

  // Popularity
  if (book.avgRating >= 4.3) {
    parts.push("it's critically acclaimed and highly rated");
  }

  if (parts.length === 0) {
    return "This book matches your reading preferences and personality profile.";
  }

  // Capitalize first part and join
  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  if (parts.length === 1) return parts[0] + ".";
  if (parts.length === 2) return parts[0] + " — " + parts[1] + ".";
  return parts[0] + ". Also, " + parts.slice(1).join(", and ") + ".";
}

export function scoreBooks(
  books: BookVector[],
  user: UserVector,
  limit: number = 10
): ScoredBook[] {
  const scored: ScoredBook[] = [];

  for (const book of books) {
    // Skip books with avoided topics
    if (hasAvoidedTopics(book, user.avoidTopics)) continue;

    const factors = {
      personalityScore: scorePersonalityFit(book, user),
      themeScore: scoreThemeFit(book, user),
      toneScore: scoreToneFit(book, user),
      pacingScore: scorePacingFit(book, user),
      fictionScore: scoreFictionFit(book, user),
      popularityScore: scorePopularity(book),
    };

    const totalScore =
      factors.personalityScore * WEIGHTS.personality +
      factors.themeScore * WEIGHTS.theme +
      factors.toneScore * WEIGHTS.tone +
      factors.pacingScore * WEIGHTS.pacing +
      factors.fictionScore * WEIGHTS.fiction +
      factors.popularityScore * WEIGHTS.popularity;

    const explanation = generateExplanation(book, user, factors);

    scored.push({
      bookId: book.id,
      score: Math.round(totalScore * 100) / 100,
      explanation,
      factors,
    });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
