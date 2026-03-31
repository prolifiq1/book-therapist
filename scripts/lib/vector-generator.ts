// Algorithmic vector generation for book recommendation
// Generates personalityFit, themeVector, and toneVector from book metadata

const PERSONALITY_TYPES = [
  "reflective-thinker",
  "ambitious-builder",
  "emotional-healer",
  "curious-explorer",
  "deep-feeler",
  "intellectual-strategist",
  "soulful-romantic",
  "resilient-rebuilder",
] as const;

// Subject → personality type mappings (weighted)
const SUBJECT_PERSONALITY_MAP: Record<string, Record<string, number>> = {
  // Fiction genres
  "literary fiction": { "reflective-thinker": 0.7, "deep-feeler": 0.6, "soulful-romantic": 0.4 },
  "science fiction": { "curious-explorer": 0.8, "intellectual-strategist": 0.6 },
  fantasy: { "curious-explorer": 0.7, "deep-feeler": 0.5, "soulful-romantic": 0.3 },
  romance: { "soulful-romantic": 0.9, "deep-feeler": 0.6, "emotional-healer": 0.3 },
  mystery: { "intellectual-strategist": 0.7, "curious-explorer": 0.5 },
  thriller: { "intellectual-strategist": 0.6, "curious-explorer": 0.5, "ambitious-builder": 0.3 },
  horror: { "deep-feeler": 0.5, "curious-explorer": 0.4 },
  "historical fiction": { "reflective-thinker": 0.5, "curious-explorer": 0.6, "deep-feeler": 0.4 },
  adventure: { "curious-explorer": 0.8, "ambitious-builder": 0.4 },
  dystopian: { "intellectual-strategist": 0.7, "reflective-thinker": 0.5 },
  classics: { "reflective-thinker": 0.7, "deep-feeler": 0.5, "intellectual-strategist": 0.4 },
  poetry: { "deep-feeler": 0.8, "soulful-romantic": 0.7, "reflective-thinker": 0.5 },
  drama: { "deep-feeler": 0.7, "emotional-healer": 0.5 },
  humor: { "curious-explorer": 0.4, "emotional-healer": 0.3 },
  "young adult": { "curious-explorer": 0.5, "deep-feeler": 0.4 },
  "graphic novels": { "curious-explorer": 0.5, "deep-feeler": 0.4 },
  mythology: { "curious-explorer": 0.6, "reflective-thinker": 0.5, "soulful-romantic": 0.4 },
  "fairy tales": { "soulful-romantic": 0.5, "deep-feeler": 0.4 },
  crime: { "intellectual-strategist": 0.6, "curious-explorer": 0.4 },
  war: { "reflective-thinker": 0.5, "resilient-rebuilder": 0.6 },
  // Nonfiction
  biography: { "ambitious-builder": 0.6, "reflective-thinker": 0.5, "resilient-rebuilder": 0.5 },
  memoir: { "emotional-healer": 0.6, "reflective-thinker": 0.6, "resilient-rebuilder": 0.5 },
  autobiography: { "ambitious-builder": 0.5, "resilient-rebuilder": 0.5 },
  "self-help": { "ambitious-builder": 0.7, "resilient-rebuilder": 0.6, "emotional-healer": 0.5 },
  psychology: { "reflective-thinker": 0.7, "intellectual-strategist": 0.6, "emotional-healer": 0.5 },
  philosophy: { "reflective-thinker": 0.9, "intellectual-strategist": 0.6, "deep-feeler": 0.3 },
  science: { "curious-explorer": 0.7, "intellectual-strategist": 0.8 },
  history: { "curious-explorer": 0.6, "intellectual-strategist": 0.5, "reflective-thinker": 0.4 },
  business: { "ambitious-builder": 0.9, "intellectual-strategist": 0.6 },
  economics: { "intellectual-strategist": 0.8, "ambitious-builder": 0.5 },
  politics: { "intellectual-strategist": 0.6, "reflective-thinker": 0.4 },
  sociology: { "reflective-thinker": 0.5, "intellectual-strategist": 0.4, "emotional-healer": 0.3 },
  spirituality: { "reflective-thinker": 0.6, "emotional-healer": 0.6, "deep-feeler": 0.4 },
  religion: { "reflective-thinker": 0.5, "emotional-healer": 0.4 },
  health: { "emotional-healer": 0.5, "ambitious-builder": 0.3 },
  travel: { "curious-explorer": 0.8, "soulful-romantic": 0.3 },
  nature: { "reflective-thinker": 0.4, "curious-explorer": 0.5, "deep-feeler": 0.3 },
  art: { "deep-feeler": 0.6, "soulful-romantic": 0.5, "curious-explorer": 0.4 },
  music: { "deep-feeler": 0.6, "soulful-romantic": 0.5 },
  cooking: { "curious-explorer": 0.3 },
  technology: { "intellectual-strategist": 0.7, "curious-explorer": 0.5, "ambitious-builder": 0.4 },
  education: { "ambitious-builder": 0.5, "intellectual-strategist": 0.4, "resilient-rebuilder": 0.4 },
  leadership: { "ambitious-builder": 0.8, "intellectual-strategist": 0.5 },
  motivation: { "ambitious-builder": 0.7, "resilient-rebuilder": 0.7 },
  mindfulness: { "reflective-thinker": 0.7, "emotional-healer": 0.7 },
  meditation: { "reflective-thinker": 0.7, "emotional-healer": 0.6 },
  feminism: { "intellectual-strategist": 0.5, "resilient-rebuilder": 0.5 },
  "social justice": { "emotional-healer": 0.5, "reflective-thinker": 0.4 },
  love: { "soulful-romantic": 0.8, "deep-feeler": 0.7 },
  family: { "emotional-healer": 0.6, "deep-feeler": 0.5 },
  friendship: { "emotional-healer": 0.5, "deep-feeler": 0.5 },
  death: { "reflective-thinker": 0.5, "deep-feeler": 0.6 },
  grief: { "emotional-healer": 0.7, "deep-feeler": 0.7, "resilient-rebuilder": 0.5 },
  trauma: { "emotional-healer": 0.8, "resilient-rebuilder": 0.7 },
  healing: { "emotional-healer": 0.9, "resilient-rebuilder": 0.6 },
  survival: { "resilient-rebuilder": 0.8, "curious-explorer": 0.4 },
  identity: { "reflective-thinker": 0.7, "deep-feeler": 0.5, "resilient-rebuilder": 0.4 },
  "coming of age": { "deep-feeler": 0.6, "resilient-rebuilder": 0.5, "reflective-thinker": 0.4 },
  race: { "reflective-thinker": 0.5, "emotional-healer": 0.4, "resilient-rebuilder": 0.4 },
  immigration: { "resilient-rebuilder": 0.6, "emotional-healer": 0.4, "curious-explorer": 0.3 },
};

// Subject → theme mappings
const SUBJECT_THEME_MAP: Record<string, string[]> = {
  "literary fiction": ["identity", "meaning", "beauty", "truth"],
  "science fiction": ["technology", "future", "discovery", "survival"],
  fantasy: ["magic", "adventure", "power", "destiny"],
  romance: ["love", "intimacy", "passion", "connection"],
  mystery: ["truth", "justice", "deception", "strategy"],
  thriller: ["survival", "power", "danger", "strategy"],
  horror: ["fear", "survival", "darkness"],
  "historical fiction": ["history", "culture", "identity", "power"],
  adventure: ["adventure", "exploration", "courage", "discovery"],
  dystopian: ["freedom", "power", "surveillance", "resistance"],
  biography: ["ambition", "leadership", "resilience", "identity"],
  memoir: ["identity", "family", "resilience", "healing"],
  "self-help": ["growth", "habits", "productivity", "self-improvement"],
  psychology: ["cognition", "behavior", "consciousness", "healing"],
  philosophy: ["meaning", "truth", "consciousness", "existence"],
  science: ["knowledge", "discovery", "evolution", "innovation"],
  history: ["civilization", "power", "culture", "war"],
  business: ["leadership", "strategy", "innovation", "success"],
  spirituality: ["mindfulness", "presence", "peace", "consciousness"],
  poetry: ["beauty", "love", "loss", "nature"],
  drama: ["conflict", "family", "identity", "truth"],
  love: ["love", "intimacy", "passion", "longing"],
  family: ["family", "belonging", "connection", "identity"],
  grief: ["loss", "grief", "healing", "resilience"],
  trauma: ["trauma", "healing", "survival", "resilience"],
  war: ["war", "sacrifice", "courage", "survival"],
  nature: ["nature", "ecology", "beauty", "solitude"],
  art: ["creativity", "beauty", "expression", "culture"],
  music: ["music", "passion", "creativity", "expression"],
  technology: ["technology", "innovation", "future", "knowledge"],
  education: ["education", "growth", "knowledge", "transformation"],
  race: ["race", "identity", "justice", "equality"],
  feminism: ["equality", "empowerment", "identity", "justice"],
  "social justice": ["justice", "equality", "freedom", "resistance"],
  immigration: ["identity", "belonging", "resilience", "culture"],
  "coming of age": ["growth", "identity", "discovery", "transformation"],
  classics: ["meaning", "truth", "identity", "beauty"],
};

// Tone keywords found in descriptions → tone vector
const TONE_KEYWORDS: Record<string, string[]> = {
  inspiring: ["inspiring", "uplifting", "motivat", "empowering", "triumph", "hope"],
  warm: ["warm", "tender", "gentle", "comforting", "heartwarming", "cozy"],
  dark: ["dark", "grim", "bleak", "haunt", "disturb", "sinister", "chilling"],
  philosophical: ["philosophical", "profound", "contemplat", "meditat", "existential", "meaning"],
  emotional: ["emotional", "moving", "poignant", "touching", "heartbreak", "devastat"],
  funny: ["funny", "humor", "witty", "hilarious", "comic", "laugh", "satirical"],
  lyrical: ["lyrical", "poetic", "beautiful", "prose", "elegant", "literary"],
  cerebral: ["cerebral", "intellectual", "thought-provoking", "complex", "analytical"],
  epic: ["epic", "sweeping", "grand", "ambitious", "sprawling", "vast"],
  intimate: ["intimate", "personal", "quiet", "introspective", "character-driven"],
  suspenseful: ["suspenseful", "gripping", "tense", "thriller", "page-turner", "twist"],
  raw: ["raw", "honest", "unflinching", "brutal", "visceral"],
  hopeful: ["hopeful", "optimistic", "redemptive", "uplifting", "light"],
  melancholic: ["melancholic", "bittersweet", "wistful", "nostalg", "longing"],
  romantic: ["romantic", "passionate", "sensual", "love story", "affair"],
  provocative: ["provocative", "controversial", "challenging", "bold", "subversive"],
  enchanting: ["enchanting", "magical", "whimsical", "wonder", "fantastical"],
  powerful: ["powerful", "forceful", "compelling", "riveting", "unputdownable"],
  peaceful: ["peaceful", "serene", "tranquil", "calm", "meditative"],
  motivating: ["motivating", "actionable", "practical", "strategic", "energizing"],
};

interface BookMetadata {
  subjects: string[];
  description: string;
  title: string;
}

function normalizeSubject(subject: string): string {
  return subject.toLowerCase().trim()
    .replace(/^(fiction|nonfiction)\s*[,/]\s*/i, "")
    .replace(/\s*\(.*\)$/, "")
    .replace(/\s+/g, " ");
}

function matchSubjectToKey(subject: string, keys: string[]): string | null {
  const normalized = normalizeSubject(subject);
  // Direct match
  for (const key of keys) {
    if (normalized === key || normalized.includes(key) || key.includes(normalized)) {
      return key;
    }
  }
  // Partial match on words
  const words = normalized.split(" ");
  for (const key of keys) {
    for (const word of words) {
      if (word.length > 3 && key.includes(word)) {
        return key;
      }
    }
  }
  return null;
}

export function generatePersonalityFit(meta: BookMetadata): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const type of PERSONALITY_TYPES) {
    scores[type] = 0;
  }

  const mapKeys = Object.keys(SUBJECT_PERSONALITY_MAP);

  for (const subject of meta.subjects) {
    const key = matchSubjectToKey(subject, mapKeys);
    if (key && SUBJECT_PERSONALITY_MAP[key]) {
      for (const [type, weight] of Object.entries(SUBJECT_PERSONALITY_MAP[key])) {
        scores[type] = Math.max(scores[type], weight);
      }
    }
  }

  // Boost based on description keywords
  const desc = (meta.description + " " + meta.title).toLowerCase();
  if (/transform|journey|self-discover|personal growth/.test(desc)) {
    scores["reflective-thinker"] = Math.max(scores["reflective-thinker"], 0.5);
    scores["resilient-rebuilder"] = Math.max(scores["resilient-rebuilder"], 0.5);
  }
  if (/ambiti|success|entrepreneur|leader|ceo|startup/.test(desc)) {
    scores["ambitious-builder"] = Math.max(scores["ambitious-builder"], 0.6);
  }
  if (/heal|trauma|recover|therapy|grief|loss/.test(desc)) {
    scores["emotional-healer"] = Math.max(scores["emotional-healer"], 0.7);
  }
  if (/explor|discover|adventure|quest|voyage|expedition/.test(desc)) {
    scores["curious-explorer"] = Math.max(scores["curious-explorer"], 0.6);
  }
  if (/love|heart|passion|romance|soul|emotion/.test(desc)) {
    scores["deep-feeler"] = Math.max(scores["deep-feeler"], 0.5);
    scores["soulful-romantic"] = Math.max(scores["soulful-romantic"], 0.4);
  }
  if (/strateg|system|framework|analysis|logic|rational/.test(desc)) {
    scores["intellectual-strategist"] = Math.max(scores["intellectual-strategist"], 0.5);
  }
  if (/resilien|overcome|surviv|rebuild|adversity|strength/.test(desc)) {
    scores["resilient-rebuilder"] = Math.max(scores["resilient-rebuilder"], 0.6);
  }

  // Ensure at least some non-zero values
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    // Default: mild fit for reflective-thinker and curious-explorer
    scores["reflective-thinker"] = 0.3;
    scores["curious-explorer"] = 0.3;
  }

  // Round
  for (const key of Object.keys(scores)) {
    scores[key] = Math.round(scores[key] * 100) / 100;
  }

  return scores;
}

export function generateThemeVector(meta: BookMetadata): Record<string, number> {
  const themes: Record<string, number> = {};
  const mapKeys = Object.keys(SUBJECT_THEME_MAP);

  for (const subject of meta.subjects) {
    const key = matchSubjectToKey(subject, mapKeys);
    if (key && SUBJECT_THEME_MAP[key]) {
      for (const theme of SUBJECT_THEME_MAP[key]) {
        themes[theme] = Math.min((themes[theme] || 0) + 0.3, 0.95);
      }
    }
  }

  // Boost from description
  const desc = (meta.description + " " + meta.title).toLowerCase();
  const themeKeywords: Record<string, string[]> = {
    love: ["love", "romance", "heart", "passion"],
    identity: ["identity", "who am i", "self", "belonging"],
    power: ["power", "authority", "control", "dominion"],
    family: ["family", "mother", "father", "sibling", "parent", "daughter", "son"],
    friendship: ["friend", "companion", "bond", "loyalty"],
    freedom: ["freedom", "liberty", "escape", "independence"],
    justice: ["justice", "equality", "fair", "rights"],
    survival: ["survival", "survive", "danger", "threat"],
    knowledge: ["knowledge", "wisdom", "learn", "discover"],
    growth: ["growth", "develop", "evolve", "transform"],
    courage: ["courage", "brave", "hero", "fearless"],
    truth: ["truth", "honest", "reveal", "secret"],
    nature: ["nature", "wilderness", "forest", "ocean", "mountain"],
    technology: ["technology", "digital", "computer", "artificial"],
    creativity: ["creative", "artist", "music", "paint", "write"],
    spirituality: ["spiritual", "soul", "divine", "sacred", "enlighten"],
    resilience: ["resilience", "overcome", "endure", "persevere"],
    ambition: ["ambition", "goal", "achieve", "success", "dream"],
  };

  for (const [theme, keywords] of Object.entries(themeKeywords)) {
    for (const kw of keywords) {
      if (desc.includes(kw)) {
        themes[theme] = Math.min((themes[theme] || 0) + 0.25, 0.95);
      }
    }
  }

  // Round and return top themes
  const entries = Object.entries(themes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const result: Record<string, number> = {};
  for (const [theme, score] of entries) {
    result[theme] = Math.round(score * 100) / 100;
  }
  return result;
}

export function generateToneVector(meta: BookMetadata): Record<string, number> {
  const tones: Record<string, number> = {};
  const text = (meta.description + " " + meta.title).toLowerCase();

  for (const [tone, keywords] of Object.entries(TONE_KEYWORDS)) {
    for (const kw of keywords) {
      if (text.includes(kw)) {
        tones[tone] = Math.min((tones[tone] || 0) + 0.3, 0.9);
      }
    }
  }

  // Subject-based tone inference
  const subjectStr = meta.subjects.join(" ").toLowerCase();
  if (/romance|love/.test(subjectStr)) tones["romantic"] = Math.max(tones["romantic"] || 0, 0.6);
  if (/horror|dark/.test(subjectStr)) tones["dark"] = Math.max(tones["dark"] || 0, 0.6);
  if (/humor|comedy/.test(subjectStr)) tones["funny"] = Math.max(tones["funny"] || 0, 0.6);
  if (/science fiction|fantasy/.test(subjectStr)) tones["epic"] = Math.max(tones["epic"] || 0, 0.4);
  if (/philosophy|psychology/.test(subjectStr)) tones["cerebral"] = Math.max(tones["cerebral"] || 0, 0.5);
  if (/self-help|motivation/.test(subjectStr)) tones["motivating"] = Math.max(tones["motivating"] || 0, 0.6);
  if (/memoir|biography/.test(subjectStr)) tones["intimate"] = Math.max(tones["intimate"] || 0, 0.4);
  if (/poetry/.test(subjectStr)) tones["lyrical"] = Math.max(tones["lyrical"] || 0, 0.6);
  if (/spirituality|meditation/.test(subjectStr)) tones["peaceful"] = Math.max(tones["peaceful"] || 0, 0.5);
  if (/thriller|suspense/.test(subjectStr)) tones["suspenseful"] = Math.max(tones["suspenseful"] || 0, 0.6);

  // Default if empty
  if (Object.keys(tones).length === 0) {
    tones["intimate"] = 0.3;
  }

  const entries = Object.entries(tones)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const result: Record<string, number> = {};
  for (const [tone, score] of entries) {
    result[tone] = Math.round(score * 100) / 100;
  }
  return result;
}

export function inferPacing(meta: BookMetadata, pageCount: number | null): string {
  const subjectStr = meta.subjects.join(" ").toLowerCase();
  const desc = meta.description.toLowerCase();

  if (/thriller|suspense|action|adventure|crime/.test(subjectStr)) return "fast";
  if (/page-turner|gripping|fast-paced|couldn't put/.test(desc)) return "fast";
  if (/philosophy|meditation|contemplat|literary fiction|poetry/.test(subjectStr)) return "slow";
  if (/dense|slow|meditat|contemplat/.test(desc)) return "slow";
  if (pageCount && pageCount > 500) return "slow";
  if (pageCount && pageCount < 250) return "fast";
  return "medium";
}

export function inferDifficulty(meta: BookMetadata, pageCount: number | null): string {
  const subjectStr = meta.subjects.join(" ").toLowerCase();
  if (/young adult|children|beginner|easy/.test(subjectStr)) return "easy";
  if (/academic|graduate|advanced|philosophy|economics|quantum/.test(subjectStr)) return "challenging";
  if (pageCount && pageCount > 600) return "challenging";
  if (pageCount && pageCount < 200) return "easy";
  return "moderate";
}

export function inferFiction(subjects: string[]): boolean {
  const subjectStr = subjects.join(" ").toLowerCase();
  const fictionSignals = ["fiction", "novel", "stories", "fantasy", "science fiction", "romance", "mystery", "thriller", "horror", "fairy tales", "mythology", "adventure fiction"];
  const nonfictionSignals = ["nonfiction", "non-fiction", "biography", "memoir", "self-help", "history", "science", "business", "psychology", "philosophy", "economics", "politics", "health", "travel", "cooking", "technology"];

  let fictionScore = 0;
  let nonfictionScore = 0;

  for (const signal of fictionSignals) {
    if (subjectStr.includes(signal)) fictionScore++;
  }
  for (const signal of nonfictionSignals) {
    if (subjectStr.includes(signal)) nonfictionScore++;
  }

  return fictionScore >= nonfictionScore;
}

export function extractEmotionalTone(meta: BookMetadata): string[] {
  const toneVec = generateToneVector(meta);
  return Object.entries(toneVec)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tone]) => tone);
}

export function extractTopThemes(meta: BookMetadata): string[] {
  const themeVec = generateThemeVector(meta);
  return Object.entries(themeVec)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([theme]) => theme);
}

export function extractGenres(subjects: string[]): string[] {
  const genreKeywords: Record<string, string[]> = {
    "Literary Fiction": ["literary fiction", "fiction", "novels", "literature"],
    "Science Fiction": ["science fiction", "sci-fi", "speculative fiction"],
    Fantasy: ["fantasy", "magic", "mytholog"],
    Romance: ["romance", "love stories"],
    Mystery: ["mystery", "detective", "whodunit"],
    Thriller: ["thriller", "suspense"],
    Horror: ["horror", "gothic"],
    "Historical Fiction": ["historical fiction", "historical novel"],
    Biography: ["biography", "biograph"],
    Memoir: ["memoir", "autobiograph"],
    "Self-Help": ["self-help", "self help", "personal development", "self-improvement"],
    Psychology: ["psychology", "psychological"],
    Philosophy: ["philosophy", "philosophical"],
    Science: ["science", "scientific"],
    History: ["history", "historical"],
    Business: ["business", "management", "entrepreneur"],
    Poetry: ["poetry", "poems"],
    Adventure: ["adventure"],
    Drama: ["drama", "plays"],
    "Young Adult": ["young adult", "ya fiction"],
    Classics: ["classics", "classic literature"],
    Humor: ["humor", "comedy", "satire"],
    Spirituality: ["spirituality", "spiritual", "religion"],
    Travel: ["travel", "voyage"],
    Art: ["art", "photography", "design"],
    Nonfiction: ["nonfiction", "non-fiction", "essays"],
  };

  const subjectStr = subjects.join("|").toLowerCase();
  const matched: string[] = [];

  for (const [genre, keywords] of Object.entries(genreKeywords)) {
    for (const kw of keywords) {
      if (subjectStr.includes(kw)) {
        matched.push(genre);
        break;
      }
    }
  }

  return matched.length > 0 ? matched.slice(0, 5) : ["General"];
}

export function extractTags(meta: BookMetadata, pageCount: number | null): string[] {
  const tags: Set<string> = new Set();
  const desc = meta.description.toLowerCase();
  const subjectStr = meta.subjects.join(" ").toLowerCase();

  // Reading experience tags
  if (/page-turner|couldn't put|gripping|compelling/.test(desc)) tags.add("page-turner");
  if (/beautifully written|lyrical|prose|literary/.test(desc)) tags.add("literary");
  if (/thought-provoking|makes you think|intellectual/.test(desc)) tags.add("thought-provoking");
  if (/heartwarming|feel-good|uplifting/.test(desc)) tags.add("heartwarming");
  if (/devastating|gut-wrenching|heartbreaking/.test(desc)) tags.add("devastating");
  if (/classic|timeless|masterpiece/.test(desc)) tags.add("classic");
  if (/award|prize|winner/.test(desc)) tags.add("award-winning");
  if (/bestseller|best-seller|best seller/.test(desc)) tags.add("bestseller");
  if (/debut/.test(desc)) tags.add("debut");

  // Subject-based tags
  if (/queer|lgbtq|gay|lesbian|bisexual|transgender/.test(subjectStr)) tags.add("queer");
  if (/feminist|feminism/.test(subjectStr)) tags.add("feminist");
  if (/african american|black/.test(subjectStr)) tags.add("diverse-voices");
  if (/multicultural|diverse/.test(subjectStr)) tags.add("diverse-voices");

  // Content tags from tone
  if (/dark|grim|violent/.test(desc)) tags.add("dark");
  if (/funny|humor|hilarious/.test(desc)) tags.add("funny");
  if (/inspiring|inspirat/.test(desc)) tags.add("inspiring");
  if (/practical|actionable|how-to/.test(desc)) tags.add("practical");

  if (pageCount && pageCount < 200) tags.add("quick-read");
  if (pageCount && pageCount > 600) tags.add("epic");

  return Array.from(tags).slice(0, 8);
}
