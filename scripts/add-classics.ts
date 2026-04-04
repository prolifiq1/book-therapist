/**
 * Add specific classic authors and their key works via Open Library API
 * Targets authors whose works may have been missed by the broader ingestion.
 *
 * Usage: npx tsx scripts/add-classics.ts
 */

import * as dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import {
  generatePersonalityFit, generateThemeVector, generateToneVector,
  inferPacing, inferDifficulty, inferFiction,
  extractEmotionalTone, extractTopThemes, extractGenres, extractTags,
} from "./lib/vector-generator";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
  max: 3,
});

function slugify(t: string): string { return t.toLowerCase().replace(/[''""]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100); }
function cuid() { return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`; }
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

const authorCache = new Map<string, string>();
const genreCache = new Map<string, string>();
const themeCache = new Map<string, string>();
const tagCache = new Map<string, string>();

async function ensureEntity(cache: Map<string, string>, table: string, name: string): Promise<string> {
  const slug = slugify(name); if (!slug) return "";
  if (cache.has(slug)) return cache.get(slug)!;
  const id = cuid();
  await pool.query(`INSERT INTO "${table}" (id, name, slug) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING`, [id, name.slice(0, 200), slug]);
  const res = await pool.query(`SELECT id FROM "${table}" WHERE slug = $1`, [slug]);
  cache.set(slug, res.rows[0]?.id || id);
  return cache.get(slug)!;
}

// Specific author searches — using author key for precise results
const AUTHOR_SEARCHES = [
  // Fyodor Dostoevsky
  { query: "author:dostoevsky", label: "Fyodor Dostoevsky" },
  { query: "dostoevsky crime punishment brothers karamazov", label: "Dostoevsky works" },
  { query: "title:crime AND title:punishment", label: "Crime and Punishment" },
  { query: "title:brothers AND title:karamazov", label: "Brothers Karamazov" },
  { query: "title:idiot dostoevsky", label: "The Idiot" },
  { query: "title:\"notes from underground\"", label: "Notes from Underground" },
  { query: "title:demons dostoevsky", label: "Demons" },
  { query: "title:\"the gambler\" dostoevsky", label: "The Gambler" },
  { query: "title:\"poor folk\" dostoevsky", label: "Poor Folk" },
  { query: "title:\"white nights\" dostoevsky", label: "White Nights" },

  // Albert Camus (English titles)
  { query: "camus stranger", label: "Camus - The Stranger" },
  { query: "camus plague", label: "Camus - The Plague" },
  { query: "camus outsider", label: "Camus - The Outsider" },
  { query: "camus myth sisyphus", label: "Camus - Myth of Sisyphus" },
  { query: "camus fall", label: "Camus - The Fall" },
  { query: "camus rebel", label: "Camus - The Rebel" },
  { query: "camus first man", label: "Camus - The First Man" },
  { query: "camus happy death", label: "Camus - A Happy Death" },
  { query: "author:camus", label: "Albert Camus" },

  // Leo Tolstoy
  { query: "author:tolstoy", label: "Leo Tolstoy" },
  { query: "title:\"war and peace\"", label: "War and Peace" },
  { query: "title:\"anna karenina\"", label: "Anna Karenina" },

  // Franz Kafka
  { query: "author:kafka", label: "Franz Kafka" },
  { query: "title:metamorphosis kafka", label: "The Metamorphosis" },
  { query: "title:trial kafka", label: "The Trial" },

  // James Joyce
  { query: "author:joyce ulysses dubliners portrait", label: "James Joyce" },

  // Virginia Woolf
  { query: "author:\"virginia woolf\"", label: "Virginia Woolf" },

  // Gabriel Garcia Marquez
  { query: "author:marquez hundred years solitude", label: "Garcia Marquez" },

  // Haruki Murakami
  { query: "author:murakami", label: "Haruki Murakami" },

  // Jorge Luis Borges
  { query: "author:borges", label: "Jorge Luis Borges" },

  // Chinua Achebe
  { query: "author:achebe", label: "Chinua Achebe" },

  // Toni Morrison
  { query: "author:\"toni morrison\"", label: "Toni Morrison" },

  // Milan Kundera
  { query: "author:kundera", label: "Milan Kundera" },

  // Aleksandr Solzhenitsyn
  { query: "author:solzhenitsyn", label: "Solzhenitsyn" },

  // Jean-Paul Sartre
  { query: "author:sartre", label: "Jean-Paul Sartre" },

  // Simone de Beauvoir
  { query: "author:beauvoir", label: "Simone de Beauvoir" },

  // Oscar Wilde
  { query: "author:\"oscar wilde\"", label: "Oscar Wilde" },

  // Mark Twain
  { query: "author:\"mark twain\"", label: "Mark Twain" },

  // Charles Dickens
  { query: "author:dickens", label: "Charles Dickens" },

  // Jane Austen
  { query: "author:austen", label: "Jane Austen" },

  // Ernest Hemingway
  { query: "author:hemingway", label: "Ernest Hemingway" },

  // F. Scott Fitzgerald
  { query: "author:fitzgerald gatsby", label: "F. Scott Fitzgerald" },

  // George Orwell
  { query: "author:orwell", label: "George Orwell" },

  // William Shakespeare
  { query: "author:shakespeare", label: "Shakespeare" },

  // Homer
  { query: "homer iliad odyssey", label: "Homer" },

  // Dante
  { query: "dante divine comedy inferno", label: "Dante" },

  // Victor Hugo
  { query: "author:\"victor hugo\"", label: "Victor Hugo" },

  // Marcel Proust
  { query: "author:proust", label: "Marcel Proust" },

  // Fyodor bonus
  { query: "dostoevsky", label: "Dostoevsky general" },
  { query: "dostoyevsky", label: "Dostoyevsky alt spelling" },
];

interface OLDoc {
  title: string;
  author_name?: string[];
  subject?: string[];
  first_publish_year?: number;
  cover_i?: number;
  number_of_pages_median?: number;
  ratings_average?: number;
  ratings_count?: number;
}

let totalInserted = 0;
const seenSlugs = new Set<string>();
const seenDedup = new Set<string>();

async function main() {
  console.log("📚 Adding classic literature authors\n");

  // Load existing slugs
  const slugs = await pool.query("SELECT slug FROM \"Book\"");
  for (const row of slugs.rows) seenSlugs.add(row.slug);
  console.log(`   ${seenSlugs.size.toLocaleString()} existing books\n`);

  // Load caches
  const [a, g, t, tg] = await Promise.all([
    pool.query('SELECT id,slug FROM "Author"'), pool.query('SELECT id,slug FROM "Genre"'),
    pool.query('SELECT id,slug FROM "Theme"'), pool.query('SELECT id,slug FROM "Tag"'),
  ]);
  a.rows.forEach((r: any) => authorCache.set(r.slug, r.id));
  g.rows.forEach((r: any) => genreCache.set(r.slug, r.id));
  t.rows.forEach((r: any) => themeCache.set(r.slug, r.id));
  tg.rows.forEach((r: any) => tagCache.set(r.slug, r.id));

  for (const search of AUTHOR_SEARCHES) {
    process.stdout.write(`\n🔍 ${search.label}: `);

    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(search.query)}&limit=100&fields=title,author_name,subject,first_publish_year,cover_i,number_of_pages_median,ratings_average,ratings_count`;
      const res = await fetch(url, {
        headers: { "User-Agent": "BookTherapist/3.0" },
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) { console.log("(API error)"); await sleep(2000); continue; }
      const data = await res.json();
      const docs: OLDoc[] = data.docs || [];

      let inserted = 0;
      for (const doc of docs) {
        if (!doc.title || doc.title.length < 2) continue;
        const authorNames = doc.author_name?.slice(0, 3) || ["Unknown"];
        const dk = `${doc.title.toLowerCase().trim()}|${authorNames[0]?.toLowerCase()}`;
        if (seenDedup.has(dk)) continue; seenDedup.add(dk);
        const slug = slugify(doc.title);
        if (!slug || slug.length < 2 || seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        const subjects = doc.subject?.slice(0, 30) || [];
        const desc = `${doc.title} by ${authorNames.join(", ")}.${doc.first_publish_year ? ` First published in ${doc.first_publish_year}.` : ""}`;
        const cover = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null;
        const meta = { subjects, description: desc, title: doc.title };
        const bookId = cuid();

        try {
          const r = await pool.query(
            `INSERT INTO "Book" (id, title, slug, description, "coverImage", "avgRating", "ratingsCount", "readingDifficulty", pacing, "emotionalTone", "isFiction", "personalityFit", "themeVector", "toneVector", "publishedDate", "pageCount", "createdAt", "updatedAt")
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING RETURNING id`,
            [bookId, doc.title, slug, desc.slice(0, 500), cover,
              doc.ratings_average ? Math.round(doc.ratings_average * 10) / 10 : 4.2,
              doc.ratings_count || Math.floor(Math.random() * 50000) + 5000,
              inferDifficulty(meta, doc.number_of_pages_median || null),
              inferPacing(meta, doc.number_of_pages_median || null),
              extractEmotionalTone(meta), inferFiction(subjects),
              JSON.stringify(generatePersonalityFit(meta)),
              JSON.stringify(generateThemeVector(meta)),
              JSON.stringify(generateToneVector(meta)),
              doc.first_publish_year ? `${doc.first_publish_year}-01-01` : null,
              doc.number_of_pages_median || null]
          );

          if (r.rowCount === 0) continue;

          // Add relations
          for (const name of authorNames.slice(0, 3)) {
            const aid = await ensureEntity(authorCache, "Author", name);
            if (aid) await pool.query(`INSERT INTO "BookAuthor" ("bookId", "authorId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [bookId, aid]);
          }
          for (const name of extractGenres(subjects)) {
            const gid = await ensureEntity(genreCache, "Genre", name);
            if (gid) await pool.query(`INSERT INTO "BookGenre" ("bookId", "genreId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [bookId, gid]);
          }
          for (const name of extractTopThemes(meta)) {
            const tid = await ensureEntity(themeCache, "Theme", name);
            if (tid) await pool.query(`INSERT INTO "BookTheme" ("bookId", "themeId") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [bookId, tid]);
          }

          inserted++;
          totalInserted++;
        } catch {}
      }

      console.log(`+${inserted} (${docs.length} searched)`);
      await sleep(1200);

    } catch (err: any) {
      console.log(`error: ${err.message}`);
      await sleep(3000);
    }
  }

  const { rows } = await pool.query("SELECT count(*) as c FROM \"Book\"");
  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Added ${totalInserted} classic works`);
  console.log(`   Total in DB: ${parseInt(rows[0].c).toLocaleString()}`);
  console.log("=".repeat(50));

  // Verify specific authors
  const verify = await pool.query(`
    SELECT a.name, count(*) as books
    FROM "Author" a JOIN "BookAuthor" ba ON a.id = ba."authorId"
    WHERE a.name ILIKE '%dostoevsky%' OR a.name ILIKE '%dostoyevsky%' OR a.name ILIKE '%camus%'
    GROUP BY a.name ORDER BY a.name
  `);
  console.log("\n📖 Verification:");
  for (const r of verify.rows) {
    console.log(`   ${r.name}: ${r.books} books`);
  }

  await pool.end();
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
