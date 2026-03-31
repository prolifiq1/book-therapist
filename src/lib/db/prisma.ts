// Prisma client setup with pg adapter for Prisma 7
// Falls back gracefully when database is not configured

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;
let initError: string | null = null;

try {
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && !dbUrl.includes("user:password")) {
    const { PrismaClient } = require("@prisma/client");
    const { PrismaPg } = require("@prisma/adapter-pg");
    const { Pool } = require("pg");

    const globalForPrisma = globalThis as unknown as { prisma: typeof prisma };

    if (!globalForPrisma.prisma) {
      const pool = new Pool({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false },
      });
      const adapter = new PrismaPg(pool);
      globalForPrisma.prisma = new PrismaClient({ adapter });
    }

    prisma = globalForPrisma.prisma;
  }
} catch (err: any) {
  initError = err?.message || String(err);
  console.error("[prisma.ts] Failed to initialize Prisma:", initError);
}

export { prisma, initError };
