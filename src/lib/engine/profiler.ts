import { type PersonalityType, PERSONALITY_PROFILES } from "@/types";
import type { QuizAnswer } from "@/types";

type ProfileWeights = Record<string, number>;

function createEmptyWeights(): ProfileWeights {
  return {
    "reflective-thinker": 0,
    "ambitious-builder": 0,
    "emotional-healer": 0,
    "curious-explorer": 0,
    "deep-feeler": 0,
    "intellectual-strategist": 0,
    "soulful-romantic": 0,
    "resilient-rebuilder": 0,
  };
}

const storyTypeMapping: Record<string, Record<string, number>> = {
  "Stories of personal growth and transformation": {
    "reflective-thinker": 0.7,
    "emotional-healer": 0.5,
    "resilient-rebuilder": 0.8,
  },
  "Epic adventures in vast worlds": {
    "curious-explorer": 0.9,
    "ambitious-builder": 0.4,
  },
  "Intimate character studies": {
    "deep-feeler": 0.8,
    "reflective-thinker": 0.6,
    "soulful-romantic": 0.5,
  },
  "Mind-bending ideas and concepts": {
    "intellectual-strategist": 0.9,
    "curious-explorer": 0.6,
  },
  "Love stories and deep connections": {
    "soulful-romantic": 0.9,
    "deep-feeler": 0.7,
  },
  "Stories of overcoming adversity": {
    "resilient-rebuilder": 0.9,
    "emotional-healer": 0.6,
    "ambitious-builder": 0.5,
  },
  "Mysteries and puzzles to solve": {
    "intellectual-strategist": 0.7,
    "curious-explorer": 0.5,
  },
  "True stories from real life": {
    "reflective-thinker": 0.5,
    "curious-explorer": 0.4,
    "ambitious-builder": 0.4,
  },
};

const personalityTraitMapping: Record<string, Record<string, number>> = {
  Reflective: { "reflective-thinker": 1.0, "deep-feeler": 0.3 },
  Ambitious: { "ambitious-builder": 1.0, "intellectual-strategist": 0.3 },
  Emotional: { "deep-feeler": 0.8, "emotional-healer": 0.7, "soulful-romantic": 0.4 },
  Analytical: { "intellectual-strategist": 1.0, "reflective-thinker": 0.3 },
  Adventurous: { "curious-explorer": 1.0, "ambitious-builder": 0.3 },
  Romantic: { "soulful-romantic": 1.0, "deep-feeler": 0.4 },
  Spiritual: { "reflective-thinker": 0.6, "emotional-healer": 0.6 },
  Practical: { "ambitious-builder": 0.7, "intellectual-strategist": 0.5 },
  Creative: { "curious-explorer": 0.6, "deep-feeler": 0.5, "soulful-romantic": 0.4 },
  Empathetic: { "emotional-healer": 0.9, "deep-feeler": 0.6 },
};

const seekingMapping: Record<string, Record<string, number>> = {
  "Comfort and warmth": { "emotional-healer": 0.8, "soulful-romantic": 0.5 },
  "Challenge and growth": { "ambitious-builder": 0.8, "intellectual-strategist": 0.5 },
  "Inspiration and motivation": { "ambitious-builder": 0.7, "resilient-rebuilder": 0.6 },
  "Healing and understanding": { "emotional-healer": 0.9, "reflective-thinker": 0.5 },
  "Depth and meaning": { "reflective-thinker": 0.9, "deep-feeler": 0.6 },
  "Escape and adventure": { "curious-explorer": 0.9, "soulful-romantic": 0.3 },
  "Knowledge and insight": { "intellectual-strategist": 0.8, "curious-explorer": 0.5 },
  "Transformation and change": { "resilient-rebuilder": 0.8, "reflective-thinker": 0.5 },
};

const emotionalToneMapping: Record<string, Record<string, number>> = {
  "Warm and comforting": { "emotional-healer": 0.7, "soulful-romantic": 0.4 },
  "Dark and intense": { "deep-feeler": 0.7, "intellectual-strategist": 0.4 },
  "Hopeful and uplifting": { "resilient-rebuilder": 0.7, "emotional-healer": 0.5 },
  "Thought-provoking and cerebral": { "intellectual-strategist": 0.8, "reflective-thinker": 0.6 },
  "Funny and lighthearted": { "curious-explorer": 0.5 },
  "Raw and honest": { "deep-feeler": 0.7, "resilient-rebuilder": 0.5 },
  "Lyrical and beautiful": { "soulful-romantic": 0.8, "deep-feeler": 0.5 },
  "Energizing and motivating": { "ambitious-builder": 0.8, "resilient-rebuilder": 0.4 },
};

const lifeSituationMapping: Record<string, Record<string, number>> = {
  "Starting something new — a chapter, a career, a relationship": {
    "ambitious-builder": 0.7,
    "curious-explorer": 0.5,
  },
  "Going through a tough time and seeking comfort": {
    "emotional-healer": 0.9,
    "resilient-rebuilder": 0.6,
  },
  "Feeling curious and wanting to learn": {
    "curious-explorer": 0.8,
    "intellectual-strategist": 0.5,
  },
  "Looking for purpose or direction": {
    "reflective-thinker": 0.8,
    "resilient-rebuilder": 0.5,
  },
  "Wanting to escape into another world": {
    "curious-explorer": 0.7,
    "soulful-romantic": 0.4,
  },
  "Feeling good and wanting to grow further": {
    "ambitious-builder": 0.7,
    "reflective-thinker": 0.4,
  },
  "Processing emotions or past experiences": {
    "emotional-healer": 0.8,
    "deep-feeler": 0.6,
  },
  "Building something and seeking strategy": {
    "ambitious-builder": 0.8,
    "intellectual-strategist": 0.7,
  },
};

function applyMapping(
  weights: ProfileWeights,
  answers: string[],
  mapping: Record<string, Record<string, number>>,
  multiplier: number = 1
) {
  for (const answer of answers) {
    const mapped = mapping[answer];
    if (!mapped) continue;
    for (const [key, value] of Object.entries(mapped)) {
      weights[key] = (weights[key] || 0) + value * multiplier;
    }
  }
}

export interface ProfileResult {
  type: PersonalityType;
  label: string;
  description: string;
  traits: ProfileWeights;
  preferredGenres: string[];
  preferredThemes: string[];
  preferredTone: string[];
  preferredPace: string;
  fictionPref: string;
  avoidTopics: string[];
  weeklyReadTime: string;
}

export function generateReaderProfile(answers: QuizAnswer[]): ProfileResult {
  const weights = createEmptyWeights();

  const answerMap = new Map<string, string | string[]>();
  for (const a of answers) {
    answerMap.set(a.questionId, a.answer);
  }

  // Process story types (personality weight: high)
  const storyTypes = answerMap.get("story-type");
  if (Array.isArray(storyTypes)) {
    applyMapping(weights, storyTypes, storyTypeMapping, 1.0);
  }

  // Process personality traits (highest weight)
  const traits = answerMap.get("personality-traits");
  if (Array.isArray(traits)) {
    applyMapping(weights, traits, personalityTraitMapping, 1.5);
  }

  // Process seeking (high weight)
  const seeking = answerMap.get("seeking");
  if (Array.isArray(seeking)) {
    applyMapping(weights, seeking, seekingMapping, 1.2);
  }

  // Process emotional tone
  const tone = answerMap.get("emotional-tone");
  if (Array.isArray(tone)) {
    applyMapping(weights, tone, emotionalToneMapping, 0.8);
  }

  // Process life situation
  const lifeSit = answerMap.get("life-situation");
  if (typeof lifeSit === "string") {
    applyMapping(weights, [lifeSit], lifeSituationMapping, 1.0);
  }

  // Normalize weights to 0-1 range
  const maxWeight = Math.max(...Object.values(weights), 1);
  for (const key of Object.keys(weights)) {
    weights[key] = Math.round((weights[key] / maxWeight) * 100) / 100;
  }

  // Determine primary personality type
  const sortedTypes = (Object.entries(weights) as [PersonalityType, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const primaryType = sortedTypes[0][0];
  const profile = PERSONALITY_PROFILES[primaryType];

  // Extract preferences from quiz
  const pacingAnswer = answerMap.get("pacing");
  let preferredPace = "medium";
  if (typeof pacingAnswer === "string") {
    if (pacingAnswer.includes("Slow")) preferredPace = "slow";
    else if (pacingAnswer.includes("Fast")) preferredPace = "fast";
  }

  const fictionAnswer = answerMap.get("fiction-pref");
  let fictionPref = "both";
  if (typeof fictionAnswer === "string") {
    if (fictionAnswer.includes("Fiction —")) fictionPref = "fiction";
    else if (fictionAnswer.includes("Nonfiction")) fictionPref = "nonfiction";
  }

  const avoidTopics: string[] = [];
  const avoidAnswer = answerMap.get("avoid-topics");
  if (Array.isArray(avoidAnswer)) {
    if (!avoidAnswer.includes("Nothing — I'm open to everything")) {
      avoidTopics.push(...avoidAnswer);
    }
  }

  const weeklyTimeAnswer = answerMap.get("reading-time");
  const weeklyReadTime = typeof weeklyTimeAnswer === "string" ? weeklyTimeAnswer : "1–3 hours";

  // Map drawn-topics to themes
  const topicToTheme: Record<string, string[]> = {
    "Love & Relationships": ["love", "intimacy", "connection"],
    "Identity & Self-Discovery": ["identity", "self-discovery", "transformation"],
    "History & Culture": ["civilization", "culture", "history"],
    "Science & Technology": ["science", "technology", "innovation"],
    "Philosophy & Meaning": ["meaning", "purpose", "consciousness"],
    "Power & Politics": ["power", "politics", "totalitarianism"],
    "Nature & Environment": ["nature", "ecology", "isolation"],
    "Mental Health & Psychology": ["trauma", "healing", "cognition"],
    "Spirituality & Mindfulness": ["mindfulness", "spirituality", "presence"],
    "Business & Leadership": ["leadership", "ambition", "productivity"],
    "Art & Creativity": ["creativity", "beauty", "music"],
    "Family & Community": ["family", "belonging", "community"],
    "Justice & Equality": ["justice", "equality", "racism"],
    "Adventure & Exploration": ["adventure", "exploration", "discovery"],
  };

  const drawnTopics = answerMap.get("drawn-topics");
  const preferredThemes = [...profile.recommendedThemes];
  if (Array.isArray(drawnTopics)) {
    for (const topic of drawnTopics) {
      const themes = topicToTheme[topic];
      if (themes) {
        for (const t of themes) {
          if (!preferredThemes.includes(t)) preferredThemes.push(t);
        }
      }
    }
  }

  // Map tone preferences
  const toneToTones: Record<string, string[]> = {
    "Warm and comforting": ["warm", "comforting", "cozy"],
    "Dark and intense": ["dark", "intense", "haunting"],
    "Hopeful and uplifting": ["hopeful", "uplifting", "inspiring"],
    "Thought-provoking and cerebral": ["cerebral", "analytical", "provocative"],
    "Funny and lighthearted": ["funny", "lighthearted", "humorous"],
    "Raw and honest": ["raw", "honest", "powerful"],
    "Lyrical and beautiful": ["lyrical", "enchanting", "atmospheric"],
    "Energizing and motivating": ["motivating", "energizing", "direct"],
  };

  const preferredTone = [...profile.recommendedTones];
  if (Array.isArray(tone)) {
    for (const t of tone) {
      const tones = toneToTones[t];
      if (tones) {
        for (const tn of tones) {
          if (!preferredTone.includes(tn)) preferredTone.push(tn);
        }
      }
    }
  }

  return {
    type: primaryType,
    label: profile.label,
    description: profile.description,
    traits: weights,
    preferredGenres: profile.recommendedGenres,
    preferredThemes: preferredThemes.slice(0, 10),
    preferredTone: preferredTone.slice(0, 8),
    preferredPace: preferredPace,
    fictionPref,
    avoidTopics,
    weeklyReadTime,
  };
}
