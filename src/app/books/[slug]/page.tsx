"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Film,
  Quote,
  Star,
  Clock,
  FileText,
  Globe,
  Hash,
  BookmarkPlus,
  Check,
  Heart,
  Gauge,
  ArrowLeft,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BookCard } from "@/components/ui/BookCard";
import { cn } from "@/lib/utils/cn";
import { getBookBySlug, getSimilarBooks } from "@/lib/data/books";
import {
  getBookEntry,
  saveBookToLibrary,
  rateBook,
  addBookNote,
} from "@/lib/data/user-store";
import type { SeedBook } from "@/data/seed-books";
import type { ReadingStatus } from "@/types";

export default function BookDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [book, setBook] = useState<SeedBook | null>(null);
  const [similar, setSimilar] = useState<SeedBook[]>([]);
  const [savedStatus, setSavedStatus] = useState<ReadingStatus | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    const b = getBookBySlug(slug);
    if (b) {
      setBook(b);
      setSimilar(getSimilarBooks(slug));
    }
    const entry = getBookEntry(slug);
    if (entry) {
      setSavedStatus(entry.status);
      if (entry.rating) setUserRating(entry.rating);
      if (entry.note) setNote(entry.note);
    }
  }, [slug]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleSave = (status: ReadingStatus) => {
    saveBookToLibrary(slug, status);
    setSavedStatus(status);
  };

  const handleRate = (rating: number) => {
    rateBook(slug, rating);
    setUserRating(rating);
  };

  const handleSaveNote = () => {
    if (note.trim()) {
      addBookNote(slug, note.trim());
      setShowNoteInput(false);
    }
  };

  const statusLabels: Record<ReadingStatus, string> = {
    want_to_read: "Want to Read",
    reading: "Currently Reading",
    finished: "Finished",
  };

  const difficultyColors: Record<string, string> = {
    easy: "bg-emerald-100 text-emerald-800",
    moderate: "bg-amber-100 text-amber-800",
    challenging: "bg-rose-100 text-rose-800",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Back link */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <Link href="/discover" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Discover
          </Link>
        </div>

        {/* Hero section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cover */}
            <div className="shrink-0">
              <div className="w-56 h-80 mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-2xl bg-neutral-100">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                    <BookOpen className="h-16 w-16 text-primary-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{book.title}</h1>
              {book.subtitle && (
                <p className="text-xl text-muted-foreground mt-1">{book.subtitle}</p>
              )}
              <p className="text-lg text-muted-foreground mt-2">{book.authors.join(", ")}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <StarRating rating={book.avgRating} size="md" />
                <span className="text-lg font-semibold text-foreground">{book.avgRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({book.ratingsCount.toLocaleString()} ratings)
                </span>
              </div>

              {/* Tags row */}
              <div className="flex flex-wrap gap-2 mt-5">
                {book.genres.map((g) => (
                  <Badge key={g} variant="default">{g}</Badge>
                ))}
                <Badge variant="mood">{book.pacing} pace</Badge>
                <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", difficultyColors[book.readingDifficulty])}>
                  {book.readingDifficulty} read
                </span>
                {book.isFiction ? (
                  <Badge variant="outline">Fiction</Badge>
                ) : (
                  <Badge variant="outline">Nonfiction</Badge>
                )}
              </div>

              {/* Emotional tone tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {book.emotionalTone.map((tone) => (
                  <span key={tone} className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium">
                    {tone}
                  </span>
                ))}
                {book.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                {savedStatus ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-success-100 text-success-800 text-sm font-medium">
                      <Check className="h-4 w-4" />
                      {statusLabels[savedStatus]}
                    </span>
                    <select
                      value={savedStatus}
                      onChange={(e) => handleSave(e.target.value as ReadingStatus)}
                      className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground cursor-pointer"
                    >
                      <option value="want_to_read">Want to Read</option>
                      <option value="reading">Currently Reading</option>
                      <option value="finished">Finished</option>
                    </select>
                  </div>
                ) : (
                  <Button variant="primary" onClick={() => handleSave("want_to_read")}>
                    <BookmarkPlus className="h-4 w-4" />
                    Save to Library
                  </Button>
                )}
                <Button variant="outline" onClick={() => setShowNoteInput(!showNoteInput)}>
                  <FileText className="h-4 w-4" />
                  {note ? "Edit Note" : "Add Note"}
                </Button>
              </div>

              {/* User rating */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Your rating:</span>
                <StarRating
                  rating={userRating}
                  interactive
                  onRate={handleRate}
                  size="md"
                />
                {userRating > 0 && (
                  <span className="text-sm font-medium text-primary-600">{userRating}/5</span>
                )}
              </div>

              {/* Note input */}
              {showNoteInput && (
                <div className="mt-4 space-y-2">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add your personal notes about this book..."
                    className="w-full max-w-lg p-3 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground resize-none"
                    rows={3}
                  />
                  <Button variant="primary" size="sm" onClick={handleSaveNote}>
                    Save Note
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary-500" />
            About This Book
          </h2>
          <p className="text-foreground leading-relaxed max-w-3xl">
            {book.longDescription || book.description}
          </p>
        </section>

        {/* Metadata grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Book Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: FileText, label: "Pages", value: book.pageCount },
              { icon: Globe, label: "Language", value: book.language === "en" ? "English" : book.language },
              { icon: Clock, label: "Published", value: book.publishedDate },
              { icon: BookOpen, label: "Publisher", value: book.publisher },
              { icon: Hash, label: "ISBN", value: book.isbn13 },
              { icon: Gauge, label: "Pacing", value: book.pacing.charAt(0).toUpperCase() + book.pacing.slice(1) },
            ]
              .filter((item) => item.value)
              .map((item) => (
                <div key={item.label} className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <item.icon className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">{item.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
          </div>
        </section>

        {/* Quotes */}
        {book.quotes.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary-500" />
              Notable Quotes
            </h2>
            <div className="space-y-4 max-w-3xl">
              {book.quotes.map((quote, i) => (
                <blockquote
                  key={i}
                  className="pl-4 border-l-3 border-primary-300 py-2"
                >
                  <p className="text-foreground italic leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
                  {quote.page && (
                    <p className="text-xs text-muted-foreground mt-1">— Page {quote.page}</p>
                  )}
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {book.awards.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Awards & Recognition
            </h2>
            <div className="flex flex-wrap gap-3">
              {book.awards.map((award, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border",
                    award.won
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-neutral-50 border-border text-neutral-700"
                  )}
                >
                  <Award className={cn("h-4 w-4", award.won ? "text-amber-500" : "text-neutral-400")} />
                  <span className="text-sm font-medium">
                    {award.name}
                    {award.category && ` — ${award.category}`}
                    {award.year && ` (${award.year})`}
                  </span>
                  {award.won && (
                    <span className="text-xs font-bold text-amber-600 ml-1">WINNER</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Adaptations */}
        {book.adaptations.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Film className="h-5 w-5 text-sky-500" />
              Adaptations
            </h2>
            <div className="flex flex-wrap gap-3">
              {book.adaptations.map((adaptation, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card">
                  <Film className="h-5 w-5 text-sky-500" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{adaptation.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {adaptation.type.charAt(0).toUpperCase() + adaptation.type.slice(1)}
                      {adaptation.year && ` (${adaptation.year})`}
                      {adaptation.platform && ` — ${adaptation.platform}`}
                      {adaptation.director && ` — Dir. ${adaptation.director}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        {book.reviews.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary-500" />
              Notable Reviews
            </h2>
            <div className="space-y-4 max-w-3xl">
              {book.reviews.map((review, i) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-foreground text-sm">{review.source}</span>
                    {review.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-primary-400 fill-primary-400" />
                        <span className="text-sm font-medium text-foreground">{review.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{review.content}</p>
                  {review.highlight && (
                    <p className="mt-3 text-sm font-medium text-primary-700 flex items-start gap-2">
                      <Heart className="h-4 w-4 shrink-0 mt-0.5" />
                      {review.highlight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Themes */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Themes</h2>
          <div className="flex flex-wrap gap-2">
            {book.themes.map((theme) => (
              <Link
                key={theme}
                href={`/discover?theme=${theme}`}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-50 text-primary-800 text-sm font-medium hover:bg-primary-100 transition-colors"
              >
                {theme}
              </Link>
            ))}
          </div>
        </section>

        {/* Similar Books */}
        {similar.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Similar Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {similar.map((b) => (
                <BookCard
                  key={b.slug}
                  id={b.slug}
                  title={b.title}
                  authors={b.authors}
                  coverImage={b.coverImage}
                  rating={b.avgRating}
                  genres={b.genres.slice(0, 2)}
                  onClick={() => window.location.href = `/books/${b.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
