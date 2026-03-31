"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  Compass,
  Award,
  Film,
  Star,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils/cn";
import {
  getAllBooks,
  searchBooks,
  filterBooks,
  getGenres,
  getAwardWinningBooks,
  getAdaptedBooks,
  getHighlyRatedBooks,
  type BookFilters,
} from "@/lib/data/books";
import { PERSONALITY_PROFILES } from "@/types";

const quickFilters = [
  { label: "All Books", key: "all", icon: BookOpen },
  { label: "Award Winners", key: "awards", icon: Award },
  { label: "Adapted", key: "adaptations", icon: Film },
  { label: "Highly Rated", key: "rated", icon: Star },
];

const moodOptions = [
  "inspiring", "comforting", "philosophical", "emotional",
  "cerebral", "lyrical", "dark", "funny", "motivating",
  "hopeful", "intimate", "epic", "raw", "warm",
];

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
      <DiscoverContent />
    </Suspense>
  );
}

function DiscoverContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [activeQuick, setActiveQuick] = useState("all");

  const [filters, setFilters] = useState<BookFilters>({
    genre: searchParams.get("genre") || undefined,
    theme: searchParams.get("theme") || undefined,
    mood: searchParams.get("mood") || undefined,
    pacing: searchParams.get("pacing") || undefined,
    fiction: (searchParams.get("fiction") as BookFilters["fiction"]) || undefined,
    difficulty: searchParams.get("difficulty") || undefined,
    minRating: searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined,
    hasAwards: searchParams.get("awards") === "true" || undefined,
    hasAdaptations: searchParams.get("adaptations") === "true" || undefined,
    tag: searchParams.get("tag") || undefined,
    personality: searchParams.get("personality") || undefined,
  });

  // Initialize quick filter from URL params
  useEffect(() => {
    if (searchParams.get("awards") === "true") setActiveQuick("awards");
    else if (searchParams.get("adaptations") === "true") setActiveQuick("adaptations");
    else if (searchParams.get("minRating")) setActiveQuick("rated");
  }, [searchParams]);

  const genres = useMemo(() => getGenres(), []);

  const books = useMemo(() => {
    if (query.trim()) {
      return searchBooks(query.trim());
    }
    if (activeQuick === "awards") return getAwardWinningBooks();
    if (activeQuick === "adaptations") return getAdaptedBooks();
    if (activeQuick === "rated") return getHighlyRatedBooks();

    const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);
    if (hasActiveFilters) return filterBooks(filters);

    return getAllBooks();
  }, [query, activeQuick, filters]);

  const handleQuickFilter = (key: string) => {
    setActiveQuick(key);
    setQuery("");
    if (key === "all") {
      setFilters({});
    } else if (key === "awards") {
      setFilters({ hasAwards: true });
    } else if (key === "adaptations") {
      setFilters({ hasAdaptations: true });
    } else if (key === "rated") {
      setFilters({ minRating: 4.2 });
    }
  };

  const updateFilter = (key: keyof BookFilters, value: string | number | boolean | undefined) => {
    setActiveQuick("all");
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const clearFilters = () => {
    setFilters({});
    setActiveQuick("all");
    setQuery("");
  };

  const activeFilterCount = Object.values(filters).filter((v) => v !== undefined).length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-neutral-50 to-white border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-2">
              <Compass className="h-7 w-7 text-primary-500" />
              <h1 className="text-3xl font-bold text-foreground">Discover Books</h1>
            </div>
            <p className="text-muted-foreground">
              Search, filter, and explore our curated collection
            </p>

            {/* Search */}
            <div className="mt-6 flex gap-3">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveQuick("all"); }}
                  placeholder="Search by title, author, genre, theme..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                variant={showFilters ? "primary" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-primary-200 text-primary-800 text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Quick filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {quickFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => handleQuickFilter(f.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                    activeQuick === f.key
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:bg-neutral-50 hover:text-foreground"
                  )}
                >
                  <f.icon className="h-3.5 w-3.5" />
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Filters panel */}
        {showFilters && (
          <section className="border-b border-border bg-neutral-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Genre */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Genre</label>
                  <select
                    value={filters.genre || ""}
                    onChange={(e) => updateFilter("genre", e.target.value)}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer"
                  >
                    <option value="">All genres</option>
                    {genres.map((g) => (
                      <option key={g.slug} value={g.slug}>{g.name} ({g.count})</option>
                    ))}
                  </select>
                </div>

                {/* Pacing */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Pacing</label>
                  <select
                    value={filters.pacing || ""}
                    onChange={(e) => updateFilter("pacing", e.target.value)}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer"
                  >
                    <option value="">Any pace</option>
                    <option value="slow">Slow</option>
                    <option value="medium">Medium</option>
                    <option value="fast">Fast</option>
                  </select>
                </div>

                {/* Fiction */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Type</label>
                  <select
                    value={filters.fiction || ""}
                    onChange={(e) => updateFilter("fiction", e.target.value)}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer"
                  >
                    <option value="">Fiction & Nonfiction</option>
                    <option value="fiction">Fiction</option>
                    <option value="nonfiction">Nonfiction</option>
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Difficulty</label>
                  <select
                    value={filters.difficulty || ""}
                    onChange={(e) => updateFilter("difficulty", e.target.value)}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer"
                  >
                    <option value="">Any level</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                </div>

                {/* Mood */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Mood</label>
                  <select
                    value={filters.mood || ""}
                    onChange={(e) => updateFilter("mood", e.target.value)}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer"
                  >
                    <option value="">Any mood</option>
                    {moodOptions.map((m) => (
                      <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                    ))}
                  </select>
                </div>

                {/* Personality */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Personality</label>
                  <select
                    value={filters.personality || ""}
                    onChange={(e) => updateFilter("personality", e.target.value)}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer"
                  >
                    <option value="">Any type</option>
                    {Object.entries(PERSONALITY_PROFILES).map(([key, p]) => (
                      <option key={key} value={key}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-3.5 w-3.5" />
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Results */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {books.length} book{books.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {books.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No books found"
              description="Try adjusting your search or filters to discover more books."
              action={
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {books.map((book) => (
                <BookCard
                  key={book.slug}
                  id={book.slug}
                  title={book.title}
                  authors={book.authors}
                  coverImage={book.coverImage}
                  rating={book.avgRating}
                  genres={book.genres.slice(0, 2)}
                  description={book.description}
                  onClick={() => router.push(`/books/${book.slug}`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
