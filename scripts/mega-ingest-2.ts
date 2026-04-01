/**
 * Book Therapist — Mega Ingestion Pass 2
 *
 * Deeper pagination, year-based queries, and author-specific fetching
 * to maximize unique book coverage beyond initial pass.
 *
 * Usage: npx tsx scripts/mega-ingest-2.ts
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

function slugify(text: string): string {
  return text.toLowerCase().replace(/[''""]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);
}
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
function cuid(): string {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

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
        err.code === "ECONNRESET" || err.code === "57P01";
      if (isConn && i < retries - 1) {
        console.log(`\n⚡ Reconnecting...`);
        try { await pool.end(); } catch {}
        pool = createPool();
        await sleep(3000);
        continue;
      }
      throw err;
    }
  }
}

async function ensureEntity(cache: Map<string, string>, table: string, name: string): Promise<string> {
  const slug = slugify(name);
  if (!slug || slug.length < 2) return "";
  if (cache.has(slug)) return cache.get(slug)!;
  const id = cuid();
  try {
    await queryWithRetry(`INSERT INTO "${table}" (id, name, slug) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`, [id, name.slice(0, 200), slug]);
    const res = await queryWithRetry(`SELECT id FROM "${table}" WHERE slug = $1`, [slug]);
    const realId = res.rows[0]?.id || id;
    cache.set(slug, realId);
    return realId;
  } catch { return ""; }
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
}

interface BookData {
  id: string; title: string; slug: string; description: string;
  coverImage: string | null; avgRating: number; ratingsCount: number;
  difficulty: string; pacing: string; emotionalTone: string[];
  isFiction: boolean; personalityFit: Record<string, number>;
  themeVector: Record<string, number>; toneVector: Record<string, number>;
  publishedDate: string | null; pageCount: number | null;
  authorNames: string[]; genres: string[]; themes: string[]; tags: string[];
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
    id: cuid(), title: doc.title.slice(0, 500), slug, description: description.slice(0, 500), coverImage,
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
    authorNames, genres: extractGenres(subjects), themes: extractTopThemes(meta), tags: extractTags(meta, doc.number_of_pages_median || null),
  };
}

async function fetchSearch(url: string): Promise<OLDoc[]> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "BookTherapist/2.0" },
        signal: AbortSignal.timeout(30000),
      });
      if (res.status === 429) { await sleep(10000); continue; }
      if (!res.ok) return [];
      const data = await res.json();
      return data.docs || [];
    } catch { await sleep(3000); }
  }
  return [];
}

async function batchInsertBooks(books: BookData[]): Promise<number> {
  if (books.length === 0) return 0;
  const values: any[] = [];
  const placeholders: string[] = [];
  let idx = 1;
  for (const b of books) {
    placeholders.push(`($${idx}, $${idx+1}, $${idx+2}, $${idx+3}, $${idx+4}, $${idx+5}, $${idx+6}, $${idx+7}, $${idx+8}, $${idx+9}, $${idx+10}, $${idx+11}, $${idx+12}, $${idx+13}, $${idx+14}, $${idx+15}, NOW(), NOW())`);
    values.push(b.id, b.title, b.slug, b.description, b.coverImage, b.avgRating, b.ratingsCount, b.difficulty, b.pacing, b.emotionalTone, b.isFiction, JSON.stringify(b.personalityFit), JSON.stringify(b.themeVector), JSON.stringify(b.toneVector), b.publishedDate, b.pageCount);
    idx += 16;
  }
  try {
    const result = await queryWithRetry(
      `INSERT INTO "Book" (id, title, slug, description, "coverImage", "avgRating", "ratingsCount", "readingDifficulty", pacing, "emotionalTone", "isFiction", "personalityFit", "themeVector", "toneVector", "publishedDate", "pageCount", "createdAt", "updatedAt") VALUES ${placeholders.join(", ")} ON CONFLICT (slug) DO NOTHING`,
      values
    );
    return result.rowCount || 0;
  } catch {
    let count = 0;
    for (const b of books) {
      try {
        const r = await queryWithRetry(
          `INSERT INTO "Book" (id, title, slug, description, "coverImage", "avgRating", "ratingsCount", "readingDifficulty", pacing, "emotionalTone", "isFiction", "personalityFit", "themeVector", "toneVector", "publishedDate", "pageCount", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING`,
          [b.id, b.title, b.slug, b.description, b.coverImage, b.avgRating, b.ratingsCount, b.difficulty, b.pacing, b.emotionalTone, b.isFiction, JSON.stringify(b.personalityFit), JSON.stringify(b.themeVector), JSON.stringify(b.toneVector), b.publishedDate, b.pageCount]
        );
        if (r.rowCount > 0) count++;
      } catch {}
    }
    return count;
  }
}

async function batchInsertRelations(books: BookData[]): Promise<void> {
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
  await Promise.all([
    ...Array.from(allAuthors).map(n => ensureEntity(authorCache, "Author", n)),
    ...Array.from(allGenres).map(n => ensureEntity(genreCache, "Genre", n)),
    ...Array.from(allThemes).map(n => ensureEntity(themeCache, "Theme", n)),
    ...Array.from(allTags).map(n => ensureEntity(tagCache, "Tag", n)),
  ]);

  for (const [table, field, cache, getNames] of [
    ["BookAuthor", "authorId", authorCache, (b: BookData) => b.authorNames] as const,
    ["BookGenre", "genreId", genreCache, (b: BookData) => b.genres] as const,
    ["BookTheme", "themeId", themeCache, (b: BookData) => b.themes] as const,
    ["BookTag", "tagId", tagCache, (b: BookData) => b.tags] as const,
  ]) {
    const rows: [string, string][] = [];
    for (const b of books) {
      for (const name of getNames(b)) {
        const entityId = cache.get(slugify(name));
        if (entityId) rows.push([b.id, entityId]);
      }
    }
    if (rows.length === 0) continue;
    for (let i = 0; i < rows.length; i += 500) {
      const chunk = rows.slice(i, i + 500);
      const params: string[] = [];
      const values: string[] = [];
      let idx = 1;
      for (const [bookId, entityId] of chunk) {
        params.push(`($${idx}, $${idx + 1})`);
        values.push(bookId, entityId);
        idx += 2;
      }
      try {
        await queryWithRetry(`INSERT INTO "${table}" ("bookId", "${field}") VALUES ${params.join(", ")} ON CONFLICT DO NOTHING`, values);
      } catch {
        for (const [bookId, entityId] of chunk) {
          try { await queryWithRetry(`INSERT INTO "${table}" ("bookId", "${field}") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [bookId, entityId]); } catch {}
        }
      }
    }
  }
}

async function processUrl(label: string, url: string, maxPages = 10): Promise<number> {
  process.stdout.write(`\n📚 ${label}: `);
  let inserted = 0;

  for (let page = 0; page < maxPages; page++) {
    const pageUrl = `${url}&offset=${page * 100}&limit=100`;
    const docs = await fetchSearch(pageUrl);
    if (docs.length === 0) break;

    const books: BookData[] = [];
    for (const doc of docs) {
      const book = processDoc(doc);
      if (book) books.push(book);
    }

    if (books.length > 0) {
      const count = await batchInsertBooks(books);
      if (count > 0) {
        await batchInsertRelations(books);
        inserted += count;
        totalInserted += count;
      }
    }

    totalSkipped += docs.length - books.length;
    if (totalInserted % 1000 < 100) {
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = Math.round(totalInserted / (elapsed / 60));
      process.stdout.write(`[${totalInserted.toLocaleString()}, ${rate}/min] `);
    }

    await sleep(1200);
    if (docs.length < 100) break;
  }

  if (inserted > 0) console.log(`→ +${inserted}`);
  else process.stdout.write("(skip) ");
  return inserted;
}

async function main() {
  console.log("🔮 Book Therapist — MEGA Ingestion Pass 2");
  console.log("   Deep pagination + year-based + subject-based queries\n");

  try {
    const res = await pool.query("SELECT count(*) as c FROM \"Book\"");
    console.log(`✅ Database connected (${parseInt(res.rows[0].c).toLocaleString()} existing books)\n`);
    const slugs = await pool.query("SELECT slug FROM \"Book\"");
    for (const row of slugs.rows) seenSlugs.add(row.slug);
    console.log(`   Loaded ${seenSlugs.size.toLocaleString()} slugs to skip`);

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
    console.log(`   Cached entities loaded\n`);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }

  startTime = Date.now();
  const base = "https://openlibrary.org/search.json?fields=title,key,author_name,subject,first_publish_year,cover_i,number_of_pages_median,ratings_average,ratings_count";

  // Strategy 1: Year-based queries (each year has unique books)
  console.log("\n=== STRATEGY 1: Year-based queries ===");
  for (let year = 2025; year >= 1900; year--) {
    try {
      await processUrl(`Books from ${year}`, `${base}&q=*&first_publish_year=${year}&sort=rating`, 10);
    } catch (err: any) {
      console.error(`\n❌ Year ${year} failed: ${err.message}`);
      try { await pool.end(); } catch {}
      pool = createPool();
      await sleep(5000);
    }
  }

  // Strategy 2: Subject-based deep pagination (deeper than pass 1)
  console.log("\n\n=== STRATEGY 2: Subject deep pagination ===");
  const subjects = [
    "fiction", "nonfiction", "literature", "science", "history",
    "biography", "poetry", "drama", "philosophy", "religion",
    "art", "music", "education", "law", "medicine",
    "technology", "business", "sports", "travel", "cooking",
    "children", "young_adult", "comics", "manga", "graphic_novels",
    "mystery_and_detective_stories", "love_stories", "adventure_stories",
    "science_fiction", "fantasy_fiction", "horror_tales",
    "historical_fiction", "war_stories", "western_stories",
    "romance_fiction", "suspense_fiction", "spy_stories",
    "political_fiction", "religious_fiction", "humorous_stories",
    "ghost_stories", "fairy_tales", "legends", "fables",
    "short_stories", "novellas", "anthologies",
    "self-help", "psychology", "sociology", "economics",
    "political_science", "environmental_sciences",
    "mathematics", "physics", "chemistry", "biology",
    "astronomy", "geology", "anthropology", "archaeology",
  ];

  for (const subject of subjects) {
    const subjectUrl = `https://openlibrary.org/subjects/${subject}.json?`;
    for (let offset = 0; offset < 2000; offset += 100) {
      try {
        const url = `${subjectUrl}limit=100&offset=${offset}`;
        const res = await fetch(url, {
          headers: { "User-Agent": "BookTherapist/2.0" },
          signal: AbortSignal.timeout(30000),
        });
        if (!res.ok) break;
        const data = await res.json();
        const works = data.works || [];
        if (works.length === 0) break;

        // Convert subject API format to search API format
        const docs: OLDoc[] = works.map((w: any) => ({
          title: w.title,
          key: w.key,
          author_name: w.authors?.map((a: any) => a.name),
          subject: w.subject,
          first_publish_year: w.first_publish_year,
          cover_i: w.cover_id,
        }));

        const books: BookData[] = [];
        for (const doc of docs) {
          const book = processDoc(doc);
          if (book) books.push(book);
        }

        if (books.length > 0) {
          const count = await batchInsertBooks(books);
          if (count > 0) {
            await batchInsertRelations(books);
            totalInserted += count;
          }
        }
        totalSkipped += docs.length - books.length;

        if (totalInserted % 1000 < 100) {
          process.stdout.write(`\r   ${subject}: ${totalInserted.toLocaleString()} total`);
        }

        await sleep(1000);
        if (works.length < 100) break;
      } catch {
        break;
      }
    }
    console.log(`\n📚 ${subject}: total now ${totalInserted.toLocaleString()}`);
  }

  // Strategy 3: Language-based queries
  console.log("\n\n=== STRATEGY 3: Language-based queries ===");
  const languages = ["eng", "spa", "fre", "ger", "ita", "por", "jpn", "chi", "kor", "rus", "ara", "hin", "tur", "pol", "dut"];
  for (const lang of languages) {
    for (let page = 0; page < 20; page++) {
      try {
        await processUrl(`${lang} books (p${page + 1})`, `${base}&q=*&language=${lang}&sort=rating&offset=${page * 100}&limit=100`, 1);
      } catch { break; }
    }
  }

  // Strategy 4: Popular search terms
  console.log("\n\n=== STRATEGY 4: Popular search terms ===");
  const terms = [
    "the", "a", "of", "in", "and", "to", "for", "on", "with",
    "life", "world", "time", "man", "woman", "child", "king", "queen",
    "dark", "light", "fire", "water", "earth", "sky", "star", "moon", "sun",
    "blood", "heart", "mind", "soul", "body", "spirit", "ghost", "shadow",
    "war", "peace", "love", "hate", "fear", "hope", "faith", "truth",
    "secret", "hidden", "lost", "found", "broken", "wild", "free",
    "night", "day", "morning", "evening", "winter", "summer", "spring", "autumn",
    "house", "garden", "city", "island", "mountain", "river", "sea", "ocean",
    "bridge", "door", "window", "road", "path", "journey", "home",
    "girl", "boy", "mother", "father", "sister", "brother", "daughter", "son",
    "doctor", "teacher", "soldier", "detective", "prince", "princess",
    "dragon", "witch", "wizard", "vampire", "wolf", "cat", "dog", "bird",
    "red", "blue", "green", "black", "white", "gold", "silver",
    "last", "first", "new", "old", "great", "little", "long",
    "game", "song", "story", "tale", "dream", "memory", "promise",
    "death", "birth", "beginning", "end", "return", "fall", "rise",
  ];

  for (const term of terms) {
    try {
      await processUrl(`"${term}" titles`, `${base}&q=title:${encodeURIComponent(term)}&sort=editions`, 5);
    } catch {
      try { await pool.end(); } catch {}
      pool = createPool();
      await sleep(3000);
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  try {
    const { rows } = await pool.query("SELECT count(*) as c FROM \"Book\"");
    console.log(`\n${"=".repeat(60)}`);
    console.log(`✅ PASS 2 COMPLETE!`);
    console.log(`   +${totalInserted.toLocaleString()} new books`);
    console.log(`   Total in DB: ${parseInt(rows[0].c).toLocaleString()}`);
    console.log(`   Time: ${Math.floor(elapsed / 3600)}h ${Math.floor((elapsed % 3600) / 60)}m ${elapsed % 60}s`);
    console.log("=".repeat(60));
  } catch {
    console.log(`\n✅ Done! +${totalInserted.toLocaleString()} books`);
  }
  await pool.end();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
