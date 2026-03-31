"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  RefreshCw,
  Heart,
  BookmarkPlus,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PersonalityBadge } from "@/components/ui/PersonalityBadge";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getUserProfile, getRecommendations, saveBookToLibrary } from "@/lib/data/user-store";
import { getBookBySlug } from "@/lib/data/books";
import type { PersonalityType } from "@/types";

interface RecommendationEntry {
  bookSlug: string;
  score: number;
  explanation: string;
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ReturnType<typeof getUserProfile>>(null);
  const [recommendations, setRecommendations] = useState<RecommendationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const p = getUserProfile();
    const r = getRecommendations();
    setProfile(p);
    setRecommendations(r);
    setLoading(false);
  }, []);

  const handleSave = (slug: string) => {
    saveBookToLibrary(slug, "want_to_read");
    setSavedSlugs((prev) => new Set(prev).add(slug));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <EmptyState
            icon={Sparkles}
            title="No recommendations yet"
            description="Take the reading personality quiz to get personalized book recommendations."
            action={
              <Link href="/quiz">
                <Button variant="primary" size="lg">
                  <BookOpen className="h-4 w-4" />
                  Take the Quiz
                </Button>
              </Link>
            }
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Profile Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <PersonalityBadge
              type={profile.profileType as PersonalityType}
              size="lg"
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {profile.profileLabel}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {profile.profileDescription}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {profile.preferredThemes.slice(0, 6).map((theme) => (
                <span
                  key={theme}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-medium"
                >
                  {theme}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/quiz">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retake Quiz
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-foreground">Your Personalized Recommendations</h2>
          </div>

          <div className="space-y-6">
            {recommendations.map((rec, index) => {
              const book = getBookBySlug(rec.bookSlug);
              if (!book) return null;

              return (
                <motion.div
                  key={rec.bookSlug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary-200 transition-all"
                >
                  {/* Book cover */}
                  <Link href={`/books/${book.slug}`} className="shrink-0">
                    <div className="w-28 h-40 rounded-lg overflow-hidden bg-neutral-100 shadow-md">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                          <BookOpen className="h-8 w-8 text-primary-300" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Book info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/books/${book.slug}`}>
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary-600 transition-colors">
                            {book.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {book.authors.join(", ")}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round(rec.score * 100)}% match
                      </div>
                    </div>

                    {/* Why this fits */}
                    <div className="mt-3 p-3 rounded-lg bg-primary-50 border border-primary-100">
                      <p className="text-sm text-primary-800 flex items-start gap-2">
                        <Heart className="h-4 w-4 shrink-0 mt-0.5 text-primary-500" />
                        <span>{rec.explanation}</span>
                      </p>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {book.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {book.genres.slice(0, 3).map((g) => (
                        <span
                          key={g}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium"
                        >
                          {g}
                        </span>
                      ))}
                      {book.pacing && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-medium">
                          {book.pacing} pace
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-3">
                      <Link href={`/books/${book.slug}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant={savedSlugs.has(rec.bookSlug) ? "secondary" : "primary"}
                        size="sm"
                        onClick={() => handleSave(rec.bookSlug)}
                        disabled={savedSlugs.has(rec.bookSlug)}
                      >
                        <BookmarkPlus className="h-3.5 w-3.5" />
                        {savedSlugs.has(rec.bookSlug) ? "Saved" : "Save to Library"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
