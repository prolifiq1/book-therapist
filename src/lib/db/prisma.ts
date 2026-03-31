// Prisma client setup — requires a running PostgreSQL database
// For the demo MVP, data is served from src/lib/data/books.ts (in-memory seed data)
// When deploying with a real database, run `npx prisma generate` and `npx prisma db push`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;

try {
  // Dynamic import to avoid build failures when Prisma client isn't generated
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("user:password")) {
    const { PrismaClient } = require("@prisma/client");
    const globalForPrisma = globalThis as unknown as { prisma: typeof prisma };
    prisma = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
  }
} catch {
  // Prisma client not generated yet — running in demo mode
}

export { prisma };
