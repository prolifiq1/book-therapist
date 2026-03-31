import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const hasUrl = !!process.env.DATABASE_URL;
  const urlPrefix = process.env.DATABASE_URL?.substring(0, 20) || "not set";
  let dbStatus = "prisma is null";
  let bookCount = 0;

  if (prisma) {
    try {
      const result = await prisma.book.count();
      bookCount = result;
      dbStatus = "connected";
    } catch (err: any) {
      dbStatus = `error: ${err.message}`;
    }
  }

  return Response.json({
    hasUrl,
    urlPrefix,
    prismaLoaded: prisma !== null,
    dbStatus,
    bookCount,
  });
}
