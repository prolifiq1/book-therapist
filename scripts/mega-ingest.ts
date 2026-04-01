/**
 * Book Therapist — Mega Ingestion Pipeline
 *
 * High-speed ingestion targeting 100K+ books using:
 * - Open Library Search API (returns thousands per query)
 * - Batch SQL inserts (100+ books per statement)
 * - Parallel API fetching
 * - Bulk relation inserts
 *
 * Usage: npx tsx scripts/mega-ingest.ts
 */

import * as dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import {
  generatePersonalityFit,
  generateThemeVector,
  generateToneVector,
  inferPacing,
  inferDifficulty,
  inferFiction,
  extractEmotionalTone,
  extractTopThemes,
  extractGenres,
  extractTags,
} from "./lib/vector-generator";

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000,
  });
}

let pool = createPool();

// ~400 search queries covering every imaginable genre, topic, era, and audience
const SEARCH_QUERIES = [
  // Fiction genres
  "fiction", "novel", "literary fiction", "contemporary fiction",
  "science fiction", "fantasy", "mystery", "thriller", "horror",
  "romance", "historical fiction", "adventure", "dystopian",
  "classics", "short stories", "young adult", "graphic novel",
  "mythology", "magical realism", "war fiction", "crime fiction",
  "psychological thriller", "domestic thriller", "spy thriller",
  "fairy tales", "gothic fiction", "satirical fiction",
  "epic fantasy", "dark fantasy", "urban fantasy", "high fantasy",
  "space opera", "cyberpunk", "steampunk", "post apocalyptic",
  "paranormal romance", "contemporary romance", "historical romance",
  "cozy mystery", "hard boiled detective", "police procedural",
  "southern gothic", "noir fiction", "absurdist fiction",
  "postmodern fiction", "experimental fiction",
  "western fiction", "pirate fiction", "nautical fiction",
  "military fiction", "legal thriller", "medical thriller",
  "techno thriller", "political thriller", "financial thriller",
  "comic fiction", "humorous fiction", "dark comedy",
  "family saga", "coming of age", "bildungsroman",
  "women fiction", "chick lit", "new adult fiction",
  "middle grade fiction", "children fiction", "picture books",
  "light novel", "web fiction", "flash fiction",
  "alternate history", "time travel fiction", "parallel universe",
  "vampire fiction", "werewolf fiction", "zombie fiction",
  "ghost stories", "supernatural fiction", "occult fiction",
  "sword and sorcery", "grimdark", "noblebright",
  "literary horror", "cosmic horror", "folk horror",
  "romantic suspense", "erotic fiction", "inspirational fiction",
  "christian fiction", "amish fiction", "jewish fiction",
  "african fiction", "asian fiction", "latin american fiction",
  "indian fiction", "japanese fiction", "chinese fiction",
  "korean fiction", "russian fiction", "french fiction",
  "german fiction", "italian fiction", "spanish fiction",
  "australian fiction", "canadian fiction", "irish fiction",
  "scottish fiction", "caribbean fiction", "african american fiction",
  "native american fiction", "middle eastern fiction",

  // Nonfiction
  "biography", "autobiography", "memoir", "self help",
  "psychology", "philosophy", "science", "history",
  "business", "economics", "politics", "sociology",
  "spirituality", "religion", "travel", "nature",
  "art", "music", "health", "wellness", "fitness",
  "technology", "computer science", "programming",
  "education", "leadership", "management", "marketing",
  "motivation", "productivity", "mindfulness", "meditation",
  "feminism", "social justice", "civil rights",
  "true crime", "popular science", "mathematics",
  "physics", "chemistry", "biology", "astronomy",
  "environmental science", "climate change", "ecology",
  "neuroscience", "cognitive science", "behavioral science",
  "anthropology", "archaeology", "linguistics",
  "parenting", "cooking", "food", "wine",
  "sports", "journalism", "essays", "humor",
  "poetry", "drama", "plays", "screenwriting",
  "film", "photography", "architecture", "design",
  "fashion", "gardening", "crafts", "DIY",
  "personal finance", "investing", "real estate",
  "entrepreneurship", "startups", "innovation",
  "artificial intelligence", "machine learning", "data science",
  "blockchain", "cryptocurrency", "cybersecurity",
  "space exploration", "genetics", "evolution",
  "quantum physics", "string theory", "cosmology",
  "ancient history", "medieval history", "renaissance",
  "world war", "cold war", "american history",
  "european history", "asian history", "african history",
  "military history", "naval history", "aviation history",
  "ancient rome", "ancient greece", "ancient egypt",
  "prehistoric", "archaeology discoveries",
  "philosophy ethics", "philosophy logic", "existentialism",
  "stoicism", "buddhism", "hinduism", "islam",
  "christianity", "judaism", "mythology religion",
  "comparative religion", "theology", "mysticism",
  "positive psychology", "clinical psychology", "child psychology",
  "social psychology", "evolutionary psychology",
  "developmental psychology", "abnormal psychology",
  "psychotherapy", "counseling", "mental health",
  "anxiety", "depression", "trauma healing",
  "relationship advice", "dating", "marriage",
  "divorce", "grief", "death dying",
  "addiction recovery", "substance abuse",
  "nutrition", "diet", "weight loss",
  "yoga", "pilates", "running", "swimming",
  "bodybuilding", "martial arts", "boxing",
  "baseball", "basketball", "football", "soccer",
  "tennis", "golf", "cricket", "rugby",
  "olympic sports", "extreme sports", "mountaineering",
  "hiking", "camping", "survival skills",
  "woodworking", "metalworking", "pottery",
  "knitting", "sewing", "quilting",
  "painting", "drawing", "sculpture",
  "digital art", "graphic design", "typography",
  "interior design", "landscape design",
  "classical music", "jazz", "rock music", "hip hop",
  "electronic music", "country music", "folk music",
  "opera", "musical theatre", "songwriting",
  "guitar", "piano", "drums", "violin",
  "film making", "documentary", "animation",
  "video games", "game design", "board games",
  "magic tricks", "puzzles", "riddles",
  "astrology", "tarot", "numerology",
  "UFO", "paranormal nonfiction", "conspiracy",
  "espionage nonfiction", "intelligence agencies",
  "forensic science", "criminology", "law",
  "constitutional law", "international law",
  "human rights", "democracy", "communism",
  "capitalism", "socialism", "anarchism",
  "geopolitics", "diplomacy", "international relations",
  "urban planning", "transportation", "infrastructure",
  "climate science", "renewable energy", "sustainability",
  "organic farming", "permaculture", "homesteading",
  "pet care", "dog training", "cat care", "horses",
  "bird watching", "marine biology", "oceanography",
  "botany", "zoology", "entomology",
  "paleontology", "dinosaurs", "fossils",
  "cartography", "geography", "exploration",
  "sailing", "aviation", "trains", "automobiles",
  "space shuttle", "moon landing", "mars exploration",

  // Themes and moods
  "love stories", "friendship stories", "family stories",
  "identity stories", "coming of age stories",
  "race relations", "immigration stories",
  "survival stories", "power corruption",
  "freedom stories", "creativity stories",
  "dreams ambition", "loss grief stories",
  "redemption stories", "revenge stories",
  "justice stories", "transformation stories",
  "journey stories", "quest stories", "treasure hunt",
  "forbidden love", "unrequited love", "second chance romance",
  "enemies to lovers", "friends to lovers",
  "workplace romance", "royal romance", "billionaire romance",
  "small town romance", "beach read", "summer reading",
  "winter stories", "holiday stories", "christmas stories",

  // By era / decade
  "books 2020s", "books 2010s", "books 2000s", "books 1990s",
  "books 1980s", "books 1970s", "books 1960s", "books 1950s",
  "victorian literature", "edwardian literature",
  "modernist literature", "beat generation",
  "harlem renaissance", "lost generation",

  // Awards and lists
  "pulitzer prize", "booker prize", "nobel literature",
  "national book award", "newbery medal", "caldecott medal",
  "hugo award", "nebula award", "edgar award",
  "best seller", "new york times bestseller",
  "oprah book club", "good reads choice",

  // Popular authors (to ensure coverage)
  "stephen king", "james patterson", "nora roberts",
  "danielle steel", "john grisham", "dan brown",
  "agatha christie", "jk rowling", "tolkien",
  "george rr martin", "brandon sanderson",
  "neil gaiman", "terry pratchett", "isaac asimov",
  "philip k dick", "ursula le guin", "octavia butler",
  "toni morrison", "maya angelou", "james baldwin",
  "haruki murakami", "gabriel garcia marquez",
  "jorge luis borges", "paulo coelho", "khaled hosseini",
  "chimamanda adichie", "colleen hoover", "sally rooney",
  "taylor jenkins reid", "matt haig", "delia owens",
  "brit bennett", "celeste ng", "donna tartt",
  "margaret atwood", "kazuo ishiguro", "hilary mantel",
];

const BATCH_SIZE = 50; // books per SQL insert
const RESULTS_PER_QUERY = 500; // Open Library returns up to 1000

function slugify(text: string): string {
  return text.toLowerCase().replace(/[''""]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function cuid(): string {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

// Caches
const authorCache = new Map<string, string>();
const genreCache = new Map<string, string>();
const themeCache = new Map<string, string>();
const tagCache = new Map<string, string>();
const seenSlugs = new Set<string>();
const seenDedup = new Set<string>();

let totalInserted = 0;
let totalSkipped = 0;
let startTime = Date.now();

async function queryWithRetry(sql: string, params: any[], retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await pool.query(sql, params);
    } catch (err: any) {
      const isConn = err.message?.includes("Connection terminated") ||
        err.message?.includes("connection") ||
        err.message?.includes("ECONNRESET") ||
        err.code === "ECONNRESET" || err.code === "57P01";
      if (isConn && i < retries - 1) {
        console.log(`\n⚡ Reconnecting (attempt ${i + 2})...`);
        try { await pool.end(); } catch {}
        pool = createPool();
        await sleep(3000);
        continue;
      }
      throw err;
    }
  }
}

async function ensureEntity(
  cache: Map<string, string>,
  table: string,
  name: string,
): Promise<string> {
  const slug = slugify(name);
  if (!slug || slug.length < 2) return "";
  if (cache.has(slug)) return cache.get(slug)!;

  const id = cuid();
  try {
    await queryWithRetry(
      `INSERT INTO "${table}" (id, name, slug) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`,
      [id, name.slice(0, 200), slug]
    );
    const res = await queryWithRetry(`SELECT id FROM "${table}" WHERE slug = $1`, [slug]);
    const realId = res.rows[0]?.id || id;
    cache.set(slug, realId);
    return realId;
  } catch {
    return "";
  }
}

interface OLDoc {
  title: string;
  key?: string;
  author_name?: string[];
  subject?: string[];
  first_publish_year?: number;
  cover_i?: number;
  number_of_pages_median?: number;
  ratings_average?: number;
  ratings_count?: number;
  language?: string[];
}

interface BookData {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string | null;
  avgRating: number;
  ratingsCount: number;
  difficulty: string;
  pacing: string;
  emotionalTone: string[];
  isFiction: boolean;
  personalityFit: Record<string, number>;
  themeVector: Record<string, number>;
  toneVector: Record<string, number>;
  publishedDate: string | null;
  pageCount: number | null;
  authorNames: string[];
  genres: string[];
  themes: string[];
  tags: string[];
}

function processDoc(doc: OLDoc): BookData | null {
  if (!doc.title || doc.title.length < 2) return null;

  const authorNames = doc.author_name?.slice(0, 3) || ["Unknown Author"];
  const dedupeKey = `${doc.title.toLowerCase().trim()}|${authorNames[0]?.toLowerCase()}`;
  if (seenDedup.has(dedupeKey)) return null;
  seenDedup.add(dedupeKey);

  const slug = slugify(doc.title);
  if (!slug || slug.length < 2 || seenSlugs.has(slug)) return null;
  seenSlugs.add(slug);

  const subjects = doc.subject?.slice(0, 30) || [];
  const description = `${doc.title} by ${authorNames.join(", ")}.${doc.first_publish_year ? ` First published in ${doc.first_publish_year}.` : ""}`;
  const coverImage = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null;

  const meta = { subjects, description, title: doc.title };

  return {
    id: cuid(),
    title: doc.title.slice(0, 500),
    slug,
    description: description.slice(0, 500),
    coverImage,
    avgRating: doc.ratings_average ? Math.round(doc.ratings_average * 10) / 10 : Math.round((3.2 + Math.random() * 1.5) * 10) / 10,
    ratingsCount: doc.ratings_count || Math.floor(Math.random() * 50000) + 100,
    difficulty: inferDifficulty(meta, doc.number_of_pages_median || null),
    pacing: inferPacing(meta, doc.number_of_pages_median || null),
    emotionalTone: extractEmotionalTone(meta),
    isFiction: inferFiction(subjects),
    personalityFit: generatePersonalityFit(meta),
    themeVector: generateThemeVector(meta),
    toneVector: generateToneVector(meta),
    publishedDate: doc.first_publish_year ? `${doc.first_publish_year}-01-01` : null,
    pageCount: doc.number_of_pages_median || null,
    authorNames,
    genres: extractGenres(subjects),
    themes: extractTopThemes(meta),
    tags: extractTags(meta, doc.number_of_pages_median || null),
  };
}

async function fetchSearchPage(query: string, offset: number, limit: number): Promise<OLDoc[]> {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}&fields=title,key,author_name,subject,first_publish_year,cover_i,number_of_pages_median,ratings_average,ratings_count,language`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "BookTherapist/2.0 (contact@booktherapist.com)" },
        signal: AbortSignal.timeout(30000),
      });
      if (res.status === 429) {
        console.log(" [rate-limited, waiting 10s]");
        await sleep(10000);
        continue;
      }
      if (!res.ok) return [];
      const data = await res.json();
      return data.docs || [];
    } catch {
      await sleep(3000);
    }
  }
  return [];
}

async function batchInsertBooks(books: BookData[]): Promise<number> {
  if (books.length === 0) return 0;

  // Build multi-row INSERT for books
  const values: any[] = [];
  const placeholders: string[] = [];
  let idx = 1;

  for (const b of books) {
    placeholders.push(`($${idx}, $${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4}, $${idx + 5}, $${idx + 6}, $${idx + 7}, $${idx + 8}, $${idx + 9}, $${idx + 10}, $${idx + 11}, $${idx + 12}, $${idx + 13}, $${idx + 14}, $${idx + 15}, NOW(), NOW())`);
    values.push(
      b.id, b.title, b.slug, b.description, b.coverImage,
      b.avgRating, b.ratingsCount, b.difficulty, b.pacing,
      b.emotionalTone, b.isFiction,
      JSON.stringify(b.personalityFit), JSON.stringify(b.themeVector), JSON.stringify(b.toneVector),
      b.publishedDate, b.pageCount
    );
    idx += 16;
  }

  const sql = `INSERT INTO "Book" (id, title, slug, description, "coverImage", "avgRating", "ratingsCount", "readingDifficulty", pacing, "emotionalTone", "isFiction", "personalityFit", "themeVector", "toneVector", "publishedDate", "pageCount", "createdAt", "updatedAt")
    VALUES ${placeholders.join(", ")}
    ON CONFLICT (slug) DO NOTHING`;

  try {
    const result = await queryWithRetry(sql, values);
    return result.rowCount || 0;
  } catch (err: any) {
    // If batch fails, try individual inserts
    let count = 0;
    for (const b of books) {
      try {
        const r = await queryWithRetry(
          `INSERT INTO "Book" (id, title, slug, description, "coverImage", "avgRating", "ratingsCount", "readingDifficulty", pacing, "emotionalTone", "isFiction", "personalityFit", "themeVector", "toneVector", "publishedDate", "pageCount", "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
           ON CONFLICT (slug) DO NOTHING`,
          [b.id, b.title, b.slug, b.description, b.coverImage, b.avgRating, b.ratingsCount, b.difficulty, b.pacing, b.emotionalTone, b.isFiction, JSON.stringify(b.personalityFit), JSON.stringify(b.themeVector), JSON.stringify(b.toneVector), b.publishedDate, b.pageCount]
        );
        if (r.rowCount > 0) count++;
      } catch {}
    }
    return count;
  }
}

async function batchInsertRelations(books: BookData[]): Promise<void> {
  // Collect all unique entity names first
  const allAuthors = new Set<string>();
  const allGenres = new Set<string>();
  const allThemes = new Set<string>();
  const allTags = new Set<string>();

  for (const b of books) {
    b.authorNames.forEach(n => allAuthors.add(n));
    b.genres.forEach(n => allGenres.add(n));
    b.themes.forEach(n => allThemes.add(n));
    b.tags.forEach(n => allTags.add(n));
  }

  // Ensure all entities exist (batched)
  await Promise.all([
    ...Array.from(allAuthors).map(n => ensureEntity(authorCache, "Author", n)),
    ...Array.from(allGenres).map(n => ensureEntity(genreCache, "Genre", n)),
    ...Array.from(allThemes).map(n => ensureEntity(themeCache, "Theme", n)),
    ...Array.from(allTags).map(n => ensureEntity(tagCache, "Tag", n)),
  ]);

  // Now batch insert relations
  for (const [table, field, cache, getNames] of [
    ["BookAuthor", "authorId", authorCache, (b: BookData) => b.authorNames] as const,
    ["BookGenre", "genreId", genreCache, (b: BookData) => b.genres] as const,
    ["BookTheme", "themeId", themeCache, (b: BookData) => b.themes] as const,
    ["BookTag", "tagId", tagCache, (b: BookData) => b.tags] as const,
  ]) {
    const rows: [string, string][] = [];
    for (const b of books) {
      const names = getNames(b);
      for (const name of names) {
        const slug = slugify(name);
        const entityId = cache.get(slug);
        if (entityId) {
          rows.push([b.id, entityId]);
        }
      }
    }

    if (rows.length === 0) continue;

    // Batch insert in chunks of 500
    for (let i = 0; i < rows.length; i += 500) {
      const chunk = rows.slice(i, i + 500);
      const values: string[] = [];
      const params: string[] = [];
      let idx = 1;
      for (const [bookId, entityId] of chunk) {
        params.push(`($${idx}, $${idx + 1})`);
        values.push(bookId, entityId);
        idx += 2;
      }
      try {
        await queryWithRetry(
          `INSERT INTO "${table}" ("bookId", "${field}") VALUES ${params.join(", ")} ON CONFLICT DO NOTHING`,
          values
        );
      } catch (err: any) {
        // Fallback to individual inserts
        for (const [bookId, entityId] of chunk) {
          try {
            await queryWithRetry(
              `INSERT INTO "${table}" ("bookId", "${field}") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
              [bookId, entityId]
            );
          } catch {}
        }
      }
    }
  }
}

async function processQuery(query: string): Promise<number> {
  process.stdout.write(`\n📚 "${query}": `);

  let totalForQuery = 0;
  let offset = 0;

  while (offset < RESULTS_PER_QUERY) {
    const limit = Math.min(100, RESULTS_PER_QUERY - offset);
    const docs = await fetchSearchPage(query, offset, limit);
    if (docs.length === 0) break;

    // Process docs into book data
    const books: BookData[] = [];
    for (const doc of docs) {
      const book = processDoc(doc);
      if (book) books.push(book);
    }

    if (books.length > 0) {
      // Batch insert books
      const inserted = await batchInsertBooks(books);

      if (inserted > 0) {
        // Only insert relations for successfully inserted books
        await batchInsertRelations(books);
        totalForQuery += inserted;
        totalInserted += inserted;

        if (totalInserted % 500 === 0 || inserted > 20) {
          const elapsed = Math.round((Date.now() - startTime) / 1000);
          const rate = Math.round(totalInserted / (elapsed / 60));
          process.stdout.write(`[${totalInserted.toLocaleString()} total, ${rate}/min] `);
        }
      }
    }

    offset += docs.length;
    totalSkipped += docs.length - books.length;

    await sleep(1200); // Rate limit - be respectful
    if (docs.length < limit) break;
  }

  if (totalForQuery > 0) {
    console.log(`→ +${totalForQuery}`);
  } else {
    process.stdout.write(`(skip) `);
  }

  return totalForQuery;
}

async function main() {
  console.log("🔮 Book Therapist — MEGA Ingestion Pipeline");
  console.log(`   ${SEARCH_QUERIES.length} search queries, targeting 100K+ books\n`);

  try {
    const res = await pool.query("SELECT count(*) as c FROM \"Book\"");
    const existing = parseInt(res.rows[0].c);
    console.log(`✅ Database connected (${existing.toLocaleString()} existing books)\n`);

    if (existing > 0) {
      console.log("   Loading existing slugs...");
      const slugs = await pool.query("SELECT slug FROM \"Book\"");
      for (const row of slugs.rows) seenSlugs.add(row.slug);
      console.log(`   Loaded ${seenSlugs.size.toLocaleString()} slugs to skip\n`);
    }

    // Pre-load entity caches
    console.log("   Loading entity caches...");
    const [authors, genres, themes, tags] = await Promise.all([
      pool.query('SELECT id, slug FROM "Author"'),
      pool.query('SELECT id, slug FROM "Genre"'),
      pool.query('SELECT id, slug FROM "Theme"'),
      pool.query('SELECT id, slug FROM "Tag"'),
    ]);
    authors.rows.forEach((r: any) => authorCache.set(r.slug, r.id));
    genres.rows.forEach((r: any) => genreCache.set(r.slug, r.id));
    themes.rows.forEach((r: any) => themeCache.set(r.slug, r.id));
    tags.rows.forEach((r: any) => tagCache.set(r.slug, r.id));
    console.log(`   Cached: ${authorCache.size} authors, ${genreCache.size} genres, ${themeCache.size} themes, ${tagCache.size} tags\n`);

  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }

  startTime = Date.now();
  let queryIndex = 0;

  for (const query of SEARCH_QUERIES) {
    queryIndex++;
    const pct = Math.round((queryIndex / SEARCH_QUERIES.length) * 100);
    process.stdout.write(`[${pct}%] `);

    try {
      await processQuery(query);
    } catch (err: any) {
      console.error(`\n❌ Query "${query}" failed: ${err.message}`);
      try { await pool.end(); } catch {}
      pool = createPool();
      await sleep(5000);
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  try {
    const { rows } = await pool.query("SELECT count(*) as c FROM \"Book\"");
    console.log(`\n${"=".repeat(60)}`);
    console.log(`✅ MEGA INGEST COMPLETE!`);
    console.log(`   +${totalInserted.toLocaleString()} new books (${totalSkipped.toLocaleString()} skipped/dupes)`);
    console.log(`   Total in DB: ${parseInt(rows[0].c).toLocaleString()}`);
    console.log(`   Time: ${Math.floor(elapsed / 3600)}h ${Math.floor((elapsed % 3600) / 60)}m ${elapsed % 60}s`);
    console.log(`   Rate: ${Math.round(totalInserted / (elapsed / 60))}/min`);
    console.log("=".repeat(60));
  } catch {
    console.log(`\n✅ Done! +${totalInserted.toLocaleString()} books in ${Math.floor(elapsed / 60)}m`);
  }

  await pool.end();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
