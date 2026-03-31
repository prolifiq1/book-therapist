// Prisma client setup with pg adapter for Prisma 7
// Falls back gracefully when database is not configured

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;

try {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("user:password")) {
    const { PrismaClient } = require("@prisma/client");
    const { PrismaPg } = require("@prisma/adapter-pg");
    const { Pool } = require("pg");

    const globalForPrisma = globalThis as unknown as { prisma: typeof prisma };

    if (!globalForPrisma.prisma) {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
      const adapter = new PrismaPg(pool);
      globalForPrisma.prisma = new PrismaClient({ adapter });
    }

    prisma = globalForPrisma.prisma;
  }
} catch {
  // Prisma client not available — running in demo mode with seed data
}

export { prisma };
