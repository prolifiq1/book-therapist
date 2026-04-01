/**
 * Book Therapist — Ingestion Script
 *
 * Fetches 20,000+ books from Open Library and inserts into database.
 * Resilient to Neon serverless connection drops with retry logic.
 *
 * Usage: npx tsx scripts/ingest-books.ts
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
    max: 2,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000,
  });
}

let pool = createPool();

const SUBJECTS = [
  "literary_fiction", "science_fiction", "fantasy", "romance",
  "mystery", "thriller", "horror", "historical_fiction",
  "adventure", "dystopian", "classics", "short_stories",
  "young_adult_fiction", "graphic_novels", "mythology",
  "magical_realism", "war_fiction", "crime_fiction",
  "psychological_fiction", "contemporary_fiction",
  "fairy_tales", "gothic_fiction", "domestic_fiction",
  "satirical_fiction", "epic_fantasy", "space_opera",
  "urban_fantasy", "paranormal_romance", "cozy_mystery",
  "literary_classics", "postmodern_fiction", "absurdist_fiction",
  "southern_gothic", "noir_fiction", "spy_fiction",
  "biography", "memoir", "self-help", "psychology",
  "philosophy", "science", "history", "business",
  "economics", "politics", "sociology", "spirituality",
  "travel", "nature", "art", "music", "health",
  "technology", "education", "leadership", "motivation",
  "mindfulness", "feminism", "social_justice",
  "true_crime", "popular_science", "mathematics",
  "astronomy", "environmental_science", "neuroscience",
  "anthropology", "archaeology", "linguistics",
  "parenting", "cooking", "sports", "journalism",
  "essays", "humor", "poetry", "drama",
  "african_american_literature", "latin_american_literature",
  "asian_literature", "european_literature",
  "love", "death", "friendship", "identity",
  "coming_of_age", "race", "immigration",
  "grief", "trauma", "healing", "survival",
  "power", "freedom", "creativity", "dreams",
];

const BOOKS_PER_SUBJECT = 500;
const TARGET_BOOKS = 20000;

function slugify(text: string): string {
  return text.toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);
}
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
function cuid(): string {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

// In-memory caches
const authorCache = new Map<string, string>();
const genreCache = new Map<string, string>();
const themeCache = new Map<string, string>();
const tagCache = new Map<string, string>();
const seenSlugs = new Set<string>();
const seenDedup = new Set<string>();

let totalInserted = 0;
let totalSkipped = 0;

async function queryWithRetry(sql: string, params: any[], retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await pool.query(sql, params);
    } catch (err: any) {
      const isConnectionError = err.message?.includes("Connection terminated") ||
        err.message?.includes("connection") ||
        err.code === "ECONNRESET" ||
        err.code === "57P01";

      if (isConnectionError && i < retries - 1) {
        console.log(`\n⚡ Connection lost, reconnecting (attempt ${i + 2})...`);
        try { await pool.end(); } catch {}
        pool = createPool();
        await sleep(2000);
        continue;
      }
      throw err;
    }
  }
}

async function getOrCreateEntity(
  cache: Map<string, string>,
  table: string,
  name: string,
): Promise<string> {
  const slug = slugify(name);
  if (cache.has(slug)) return cache.get(slug)!;

  const id = cuid();
  await queryWithRetry(
    `INSERT INTO "${table}" (id, name, slug) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`,
    [id, name, slug]
  );
  const res = await queryWithRetry(`SELECT id FROM "${table}" WHERE slug = $1`, [slug]);
  const realId = res.rows[0]?.id || id;
  cache.set(slug, realId);
  return realId;
}

interface OLWork {
  title: string;
  key?: string;
  authors?: { name: string }[];
  subject?: string[];
  first_publish_year?: number;
  cover_id?: number;
}

async function fetchSubjectPage(subject: string, offset: number, limit: number): Promise<OLWork[] | null> {
  const url = `https://openlibrary.org/subjects/${subject}.json?limit=${limit}&offset=${offset}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "BookTherapist/1.0" } });
      if (!res.ok) {
        if (res.status === 429) {
          await sleep(5000);
          continue;
        }
        return null;
      }
      const data = await res.json();
      return data.works || null;
    } catch {
      await sleep(2000);
    }
  }
  return null;
}

async function insertBook(work: OLWork, subjectName: string): Promise<boolean> {
  if (!work.title || work.title.length < 2) return false;

  const authorNames = work.authors?.map((a) => a.name) || ["Unknown Author"];
  const dedupeKey = `${work.title.toLowerCase()}|${authorNames[0]?.toLowerCase()}`;
  if (seenDedup.has(dedupeKey)) return false;
  seenDedup.add(dedupeKey);

  const slug = slugify(work.title);
  if (!slug || slug.length < 2 || seenSlugs.has(slug)) return false;
  seenSlugs.add(slug);

  const subjects = work.subject || [subjectName];
  const description = `${work.title} by ${authorNames.join(", ")}.${work.first_publish_year ? ` First published in ${work.first_publish_year}.` : ""}`;
  const coverImage = work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : null;

  const meta = { subjects, description, title: work.title };
  const personalityFit = generatePersonalityFit(meta);
  const themeVector = generateThemeVector(meta);
  const toneVector = generateToneVector(meta);
  const pacing = inferPacing(meta, null);
  const difficulty = inferDifficulty(meta, null);
  const isFiction = inferFiction(subjects);
  const emotionalTone = extractEmotionalTone(meta);
  const themes = extractTopThemes(meta);
  const genres = extractGenres(subjects);
  const tags = extractTags(meta, null);

  const bookId = cuid();

  try {
    const result = await queryWithRetry(
      `INSERT INTO "Book" (id, title, slug, description, "longDescription", "coverImage", "avgRating", "ratingsCount",
       "readingDifficulty", pacing, "emotionalTone", "isFiction", "personalityFit", "themeVector", "toneVector",
       "publishedDate", language, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW(), NOW())
       ON CONFLICT (slug) DO NOTHING RETURNING id`,
      [
        bookId, work.title, slug, description.slice(0, 500), description, coverImage,
        Math.round((3.2 + Math.random() * 1.5) * 10) / 10,
        Math.floor(Math.random() * 50000) + 100,
        difficulty, pacing, emotionalTone, isFiction,
        JSON.stringify(personalityFit), JSON.stringify(themeVector), JSON.stringify(toneVector),
        work.first_publish_year ? `${work.first_publish_year}-01-01` : null, "English",
      ]
    );

    if (result.rowCount === 0) return false;

    // Insert relations (composite PK tables — no id column)
    for (const name of authorNames.slice(0, 3)) {
      const authorId = await getOrCreateEntity(authorCache, "Author", name);
      await queryWithRetry(
        `INSERT INTO "BookAuthor" ("bookId", "authorId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [bookId, authorId]
      );
    }
    for (const name of genres) {
      const genreId = await getOrCreateEntity(genreCache, "Genre", name);
      await queryWithRetry(
        `INSERT INTO "BookGenre" ("bookId", "genreId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [bookId, genreId]
      );
    }
    for (const name of themes) {
      const themeId = await getOrCreateEntity(themeCache, "Theme", name);
      await queryWithRetry(
        `INSERT INTO "BookTheme" ("bookId", "themeId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [bookId, themeId]
      );
    }
    for (const name of tags) {
      const tagId = await getOrCreateEntity(tagCache, "Tag", name);
      await queryWithRetry(
        `INSERT INTO "BookTag" ("bookId", "tagId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [bookId, tagId]
      );
    }

    return true;
  } catch (err: any) {
    if (err.code === "23505") return false;
    // Log but continue
    console.error(`\n⚠️ Error inserting "${work.title}": ${err.message}`);
    return false;
  }
}

async function ingestSubject(subject: string) {
  const subjectName = subject.replace(/_/g, " ");
  process.stdout.write(`\n📚 ${subjectName}: `);

  let offset = 0;
  let fetched = 0;
  let inserted = 0;

  while (fetched < BOOKS_PER_SUBJECT && totalInserted < TARGET_BOOKS) {
    const limit = Math.min(100, BOOKS_PER_SUBJECT - fetched);
    const works = await fetchSubjectPage(subject, offset, limit);
    if (!works || works.length === 0) break;

    for (const work of works) {
      if (totalInserted >= TARGET_BOOKS) break;
      const ok = await insertBook(work, subjectName);
      if (ok) {
        inserted++;
        totalInserted++;
        if (totalInserted % 100 === 0) process.stdout.write(`[${totalInserted}] `);
      } else {
        totalSkipped++;
      }
    }

    fetched += works.length;
    offset += limit;
    await sleep(800); // Rate limit
    if (works.length < limit) break;
  }

  console.log(`→ +${inserted} (total: ${totalInserted})`);
}

async function main() {
  console.log("🔮 Book Therapist — Ingestion Pipeline (Resilient)");
  console.log(`   Target: ${TARGET_BOOKS.toLocaleString()} books, ${SUBJECTS.length} subjects\n`);

  try {
    const res = await pool.query("SELECT count(*) as c FROM \"Book\"");
    const existing = parseInt(res.rows[0].c);
    console.log(`✅ Database connected (${existing} existing books)\n`);
    if (existing > 0) {
      const slugs = await pool.query("SELECT slug FROM \"Book\"");
      for (const row of slugs.rows) seenSlugs.add(row.slug);
      console.log(`   Loaded ${seenSlugs.size} existing slugs to skip\n`);
    }
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }

  const startTime = Date.now();

  for (const subject of SUBJECTS) {
    if (totalInserted >= TARGET_BOOKS) {
      console.log(`\n🎉 Reached target!`);
      break;
    }
    try {
      await ingestSubject(subject);
    } catch (err: any) {
      console.error(`\n❌ Subject "${subject}" failed: ${err.message}`);
      // Reconnect and continue with next subject
      try { await pool.end(); } catch {}
      pool = createPool();
      await sleep(3000);
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  try {
    const { rows } = await pool.query("SELECT count(*) as c FROM \"Book\"");
    console.log(`\n${"=".repeat(50)}`);
    console.log(`✅ Done! +${totalInserted} books (${totalSkipped} skipped) in ${Math.floor(elapsed / 60)}m ${elapsed % 60}s`);
    console.log(`   Total in DB: ${rows[0].c}`);
    console.log("=".repeat(50));
  } catch {
    console.log(`\n✅ Done! +${totalInserted} books in ${Math.floor(elapsed / 60)}m ${elapsed % 60}s`);
  }

  await pool.end();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
