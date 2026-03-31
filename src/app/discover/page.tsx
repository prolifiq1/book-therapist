"use client";

import { useState, useEffect, useMemo, Suspense, useCallback } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils/cn";
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

interface BookResult {
  title: string;
  slug: string;
  description: string;
  coverImage: string | null;
  avgRating: number;
  authors: string[];
  genres: string[];
  pacing: string;
}

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
  const [books, setBooks] = useState<BookResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [genres, setGenres] = useState<{ name: string; slug: string; count: number }[]>([]);

  const [filters, setFilters] = useState({
    genre: searchParams.get("genre") || "",
    theme: searchParams.get("theme") || "",
    mood: searchParams.get("mood") || "",
    pacing: searchParams.get("pacing") || "",
    fiction: searchParams.get("fiction") || "",
    difficulty: searchParams.get("difficulty") || "",
    minRating: searchParams.get("minRating") || "",
    awards: searchParams.get("awards") || "",
    adaptations: searchParams.get("adaptations") || "",
    tag: searchParams.get("tag") || "",
    personality: searchParams.get("personality") || "",
  });

  // Fetch genres on mount
  useEffect(() => {
    fetch("/api/genres")
      .then((r) => r.json())
      .then((d) => setGenres(d.genres || []))
      .catch(() => {});
  }, []);

  // Initialize quick filter from URL params
  useEffect(() => {
    if (searchParams.get("awards") === "true") setActiveQuick("awards");
    else if (searchParams.get("adaptations") === "true") setActiveQuick("adaptations");
    else if (searchParams.get("minRating")) setActiveQuick("rated");
  }, [searchParams]);

  // Fetch books
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "40");

      if (query.trim()) {
        params.set("q", query.trim());
      } else if (activeQuick === "awards") {
        params.set("awards", "true");
      } else if (activeQuick === "adaptations") {
        params.set("adaptations", "true");
      } else if (activeQuick === "rated") {
        params.set("minRating", "4.2");
      } else {
        // Apply filters
        if (filters.genre) params.set("genre", filters.genre);
        if (filters.theme) params.set("theme", filters.theme);
        if (filters.mood) params.set("mood", filters.mood);
        if (filters.pacing) params.set("pacing", filters.pacing);
        if (filters.fiction) params.set("fiction", filters.fiction);
        if (filters.difficulty) params.set("difficulty", filters.difficulty);
        if (filters.minRating) params.set("minRating", filters.minRating);
        if (filters.awards) params.set("awards", filters.awards);
        if (filters.adaptations) params.set("adaptations", filters.adaptations);
        if (filters.tag) params.set("tag", filters.tag);
        if (filters.personality) params.set("personality", filters.personality);
      }

      const res = await fetch(`/api/books?${params.toString()}`);
      const data = await res.json();

      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || data.books?.length || 0);
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [query, activeQuick, filters, page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleQuickFilter = (key: string) => {
    setActiveQuick(key);
    setQuery("");
    setPage(1);
    if (key === "all") {
      setFilters({ genre: "", theme: "", mood: "", pacing: "", fiction: "", difficulty: "", minRating: "", awards: "", adaptations: "", tag: "", personality: "" });
    }
  };

  const updateFilter = (key: string, value: string) => {
    setActiveQuick("all");
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ genre: "", theme: "", mood: "", pacing: "", fiction: "", difficulty: "", minRating: "", awards: "", adaptations: "", tag: "", personality: "" });
    setActiveQuick("all");
    setQuery("");
    setPage(1);
  };

  const activeFilterCount = Object.values(filters).filter((v) => v).length;

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
              Search, filter, and explore our collection of {totalCount.toLocaleString()}+ books
            </p>

            {/* Search */}
            <div className="mt-6 flex gap-3">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveQuick("all"); setPage(1); }}
                  onKeyDown={(e) => e.key === "Enter" && fetchBooks()}
                  placeholder="Search by title, author, genre, theme..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); setPage(1); }}
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
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Genre</label>
                  <select value={filters.genre} onChange={(e) => updateFilter("genre", e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer">
                    <option value="">All genres</option>
                    {genres.map((g) => (
                      <option key={g.slug} value={g.slug}>{g.name} ({g.count})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Pacing</label>
                  <select value={filters.pacing} onChange={(e) => updateFilter("pacing", e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer">
                    <option value="">Any pace</option>
                    <option value="slow">Slow</option>
                    <option value="medium">Medium</option>
                    <option value="fast">Fast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Type</label>
                  <select value={filters.fiction} onChange={(e) => updateFilter("fiction", e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer">
                    <option value="">Fiction & Nonfiction</option>
                    <option value="fiction">Fiction</option>
                    <option value="nonfiction">Nonfiction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Difficulty</label>
                  <select value={filters.difficulty} onChange={(e) => updateFilter("difficulty", e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer">
                    <option value="">Any level</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Mood</label>
                  <select value={filters.mood} onChange={(e) => updateFilter("mood", e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer">
                    <option value="">Any mood</option>
                    {moodOptions.map((m) => (
                      <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Personality</label>
                  <select value={filters.personality} onChange={(e) => updateFilter("personality", e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer">
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
              {totalCount.toLocaleString()} book{totalCount !== 1 ? "s" : ""} found
              {totalPages > 1 && ` — Page ${page} of ${totalPages}`}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : books.length === 0 ? (
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
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {books.map((book) => (
                  <BookCard
                    key={book.slug}
                    id={book.slug}
                    title={book.title}
                    authors={book.authors}
                    coverImage={book.coverImage}
                    rating={book.avgRating}
                    genres={book.genres?.slice(0, 2)}
                    description={book.description}
                    onClick={() => router.push(`/books/${book.slug}`)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => { setPage(page - 1); window.scrollTo(0, 0); }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => { setPage(page + 1); window.scrollTo(0, 0); }}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
