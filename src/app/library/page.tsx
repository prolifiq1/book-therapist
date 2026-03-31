"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Library,
  BookOpen,
  BookCheck,
  BookMarked,
  Star,
  Trash2,
  FileText,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils/cn";
import {
  getLibrary,
  removeBookFromLibrary,
  updateBookStatus,
  rateBook,
} from "@/lib/data/user-store";
import { getBookBySlug } from "@/lib/data/books";
import type { ReadingStatus } from "@/types";

type Tab = "all" | ReadingStatus;

const tabs: { key: Tab; label: string; icon: typeof Library }[] = [
  { key: "all", label: "All Books", icon: Library },
  { key: "want_to_read", label: "Want to Read", icon: BookMarked },
  { key: "reading", label: "Reading", icon: BookOpen },
  { key: "finished", label: "Finished", icon: BookCheck },
];

export default function LibraryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [library, setLibrary] = useState(getLibrary());
  const [, setRefresh] = useState(0);

  useEffect(() => {
    setLibrary(getLibrary());
  }, []);

  const filtered = activeTab === "all" ? library : library.filter((e) => e.status === activeTab);

  const handleStatusChange = (slug: string, status: ReadingStatus) => {
    updateBookStatus(slug, status);
    setLibrary(getLibrary());
    setRefresh((r) => r + 1);
  };

  const handleRemove = (slug: string) => {
    removeBookFromLibrary(slug);
    setLibrary(getLibrary());
    setRefresh((r) => r + 1);
  };

  const handleRate = (slug: string, rating: number) => {
    rateBook(slug, rating);
    setLibrary(getLibrary());
    setRefresh((r) => r + 1);
  };

  const statusColors: Record<ReadingStatus, string> = {
    want_to_read: "bg-sky-100 text-sky-800",
    reading: "bg-amber-100 text-amber-800",
    finished: "bg-emerald-100 text-emerald-800",
  };

  const statusLabels: Record<ReadingStatus, string> = {
    want_to_read: "Want to Read",
    reading: "Reading",
    finished: "Finished",
  };

  const counts = {
    all: library.length,
    want_to_read: library.filter((e) => e.status === "want_to_read").length,
    reading: library.filter((e) => e.status === "reading").length,
    finished: library.filter((e) => e.status === "finished").length,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-neutral-50 to-white border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-2">
              <Library className="h-7 w-7 text-primary-500" />
              <h1 className="text-3xl font-bold text-foreground">My Library</h1>
            </div>
            <p className="text-muted-foreground">Track your reading journey</p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                    activeTab === tab.key
                      ? "border-primary-300 bg-primary-50 shadow-sm"
                      : "border-border bg-card hover:border-primary-200"
                  )}
                >
                  <tab.icon className={cn("h-5 w-5", activeTab === tab.key ? "text-primary-600" : "text-muted-foreground")} />
                  <div className="text-left">
                    <p className={cn("text-2xl font-bold", activeTab === tab.key ? "text-primary-700" : "text-foreground")}>
                      {counts[tab.key]}
                    </p>
                    <p className="text-xs text-muted-foreground">{tab.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Library}
              title={activeTab === "all" ? "Your library is empty" : `No ${statusLabels[activeTab as ReadingStatus].toLowerCase()} books`}
              description="Start exploring and add books to your library."
              action={
                <Link href="/discover">
                  <Button variant="primary">
                    <BookOpen className="h-4 w-4" />
                    Discover Books
                  </Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {filtered.map((entry) => {
                const book = getBookBySlug(entry.bookSlug);
                if (!book) return null;

                return (
                  <div
                    key={entry.bookSlug}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                  >
                    {/* Cover */}
                    <Link href={`/books/${book.slug}`} className="shrink-0">
                      <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg overflow-hidden bg-neutral-100 shadow-sm">
                        {book.coverImage ? (
                          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                            <BookOpen className="h-6 w-6 text-primary-300" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/books/${book.slug}`}>
                            <h3 className="font-semibold text-foreground hover:text-primary-600 transition-colors line-clamp-1">
                              {book.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{book.authors.join(", ")}</p>
                        </div>
                        <Badge variant="mood" className={statusColors[entry.status]}>
                          {statusLabels[entry.status]}
                        </Badge>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        {/* Status selector */}
                        <select
                          value={entry.status}
                          onChange={(e) => handleStatusChange(entry.bookSlug, e.target.value as ReadingStatus)}
                          className="text-xs border border-border rounded-lg px-2 py-1 bg-card text-foreground cursor-pointer"
                        >
                          <option value="want_to_read">Want to Read</option>
                          <option value="reading">Reading</option>
                          <option value="finished">Finished</option>
                        </select>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <StarRating
                            rating={entry.rating || 0}
                            size="sm"
                            interactive
                            onRate={(r) => handleRate(entry.bookSlug, r)}
                          />
                        </div>

                        {/* Note indicator */}
                        {entry.note && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            Note
                          </span>
                        )}

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(entry.bookSlug)}
                          className="text-muted-foreground hover:text-accent-600 transition-colors cursor-pointer"
                          title="Remove from library"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
