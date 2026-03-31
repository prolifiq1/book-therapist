export type ReadingStatus = "want_to_read" | "reading" | "finished";

export type PersonalityType =
  | "reflective-thinker"
  | "ambitious-builder"
  | "emotional-healer"
  | "curious-explorer"
  | "deep-feeler"
  | "intellectual-strategist"
  | "soulful-romantic"
  | "resilient-rebuilder";

export type Pacing = "slow" | "medium" | "fast";
export type FictionPref = "fiction" | "nonfiction" | "both";
export type Difficulty = "easy" | "moderate" | "challenging";

export interface PersonalityProfile {
  type: PersonalityType;
  label: string;
  description: string;
  traits: Record<string, number>;
  recommendedGenres: string[];
  recommendedThemes: string[];
  recommendedTones: string[];
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  category: string;
}

export interface BookWithDetails {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  longDescription: string | null;
  coverImage: string | null;
  pageCount: number | null;
  language: string;
  isbn10: string | null;
  isbn13: string | null;
  publishedDate: string | null;
  publisher: string | null;
  avgRating: number;
  ratingsCount: number;
  readingDifficulty: string;
  pacing: string;
  emotionalTone: string[];
  isFiction: boolean;
  themeVector: Record<string, number> | null;
  toneVector: Record<string, number> | null;
  personalityFit: Record<string, number> | null;
  authors: { author: { id: string; name: string; slug: string } }[];
  genres: { genre: { id: string; name: string; slug: string } }[];
  themes: { theme: { id: string; name: string; slug: string } }[];
  tags: { tag: { id: string; name: string; slug: string } }[];
  awards: { id: string; name: string; category: string | null; year: number | null; won: boolean }[];
  adaptations: { id: string; type: string; title: string; year: number | null; platform: string | null }[];
  reviews: { id: string; source: string; content: string; rating: number | null; highlight: string | null; sentiment: string | null }[];
  quotes: { id: string; text: string; page: number | null }[];
  similarTo: { similarTo: { id: string; title: string; slug: string; coverImage: string | null; avgRating: number } }[];
}

export interface RecommendationResult {
  book: BookWithDetails;
  score: number;
  explanation: string;
}

export const PERSONALITY_PROFILES: Record<PersonalityType, Omit<PersonalityProfile, "traits">> = {
  "reflective-thinker": {
    type: "reflective-thinker",
    label: "The Reflective Thinker",
    description: "You seek depth, meaning, and understanding. You're drawn to books that make you pause, reflect, and see the world differently.",
    recommendedGenres: ["literary-fiction", "philosophy", "memoir", "psychology"],
    recommendedThemes: ["identity", "meaning", "consciousness", "solitude", "self-discovery"],
    recommendedTones: ["introspective", "philosophical", "contemplative", "quiet"],
  },
  "ambitious-builder": {
    type: "ambitious-builder",
    label: "The Ambitious Builder",
    description: "You're driven to grow, achieve, and create. You read to gain strategic insight, learn from the best, and level up.",
    recommendedGenres: ["business", "biography", "self-help", "science"],
    recommendedThemes: ["ambition", "leadership", "innovation", "success", "growth"],
    recommendedTones: ["motivating", "direct", "strategic", "energizing"],
  },
  "emotional-healer": {
    type: "emotional-healer",
    label: "The Emotional Healer",
    description: "You read to process, heal, and find comfort. You're drawn to stories of resilience, recovery, and emotional honesty.",
    recommendedGenres: ["literary-fiction", "memoir", "self-help", "poetry"],
    recommendedThemes: ["healing", "resilience", "family", "trauma", "forgiveness"],
    recommendedTones: ["warm", "tender", "hopeful", "cathartic"],
  },
  "curious-explorer": {
    type: "curious-explorer",
    label: "The Curious Explorer",
    description: "You love discovering new worlds, ideas, and perspectives. Novelty, adventure, and wonder drive your reading.",
    recommendedGenres: ["science-fiction", "travel", "history", "popular-science"],
    recommendedThemes: ["adventure", "discovery", "wonder", "culture", "exploration"],
    recommendedTones: ["adventurous", "fascinating", "expansive", "vivid"],
  },
  "deep-feeler": {
    type: "deep-feeler",
    label: "The Deep Feeler",
    description: "You experience books on a profound emotional level. You seek stories that move you, break you open, and stay with you.",
    recommendedGenres: ["literary-fiction", "poetry", "romance", "drama"],
    recommendedThemes: ["love", "loss", "grief", "beauty", "connection"],
    recommendedTones: ["emotional", "lyrical", "haunting", "passionate"],
  },
  "intellectual-strategist": {
    type: "intellectual-strategist",
    label: "The Intellectual Strategist",
    description: "You love complex ideas, logical frameworks, and deep analysis. You read to sharpen your mind and understand systems.",
    recommendedGenres: ["science", "philosophy", "thriller", "economics"],
    recommendedThemes: ["power", "systems", "truth", "strategy", "knowledge"],
    recommendedTones: ["cerebral", "sharp", "analytical", "provocative"],
  },
  "soulful-romantic": {
    type: "soulful-romantic",
    label: "The Soulful Romantic",
    description: "You're drawn to beauty, passion, and deep human connection. You seek stories that celebrate love, longing, and the poetry of life.",
    recommendedGenres: ["romance", "literary-fiction", "poetry", "historical-fiction"],
    recommendedThemes: ["love", "beauty", "passion", "longing", "fate"],
    recommendedTones: ["romantic", "lyrical", "lush", "dreamy"],
  },
  "resilient-rebuilder": {
    type: "resilient-rebuilder",
    label: "The Resilient Rebuilder",
    description: "You've faced challenges and seek books about overcoming adversity, transformation, and finding strength after hardship.",
    recommendedGenres: ["memoir", "self-help", "literary-fiction", "biography"],
    recommendedThemes: ["resilience", "transformation", "survival", "hope", "reinvention"],
    recommendedTones: ["inspiring", "honest", "powerful", "uplifting"],
  },
};
