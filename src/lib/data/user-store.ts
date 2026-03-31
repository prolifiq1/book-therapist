// Client-side user store using localStorage for demo MVP
// In production, this would be replaced with API calls to the database

import type { ReadingStatus, PersonalityType } from "@/types";
import type { QuizAnswer } from "@/types";

interface SavedBookEntry {
  bookSlug: string;
  status: ReadingStatus;
  rating?: number;
  note?: string;
  savedAt: string;
  updatedAt: string;
}

interface UserProfile {
  name: string;
  email: string;
  profileType: PersonalityType;
  profileLabel: string;
  profileDescription: string;
  traits: Record<string, number>;
  preferredGenres: string[];
  preferredThemes: string[];
  preferredTone: string[];
  preferredPace: string;
  fictionPref: string;
  avoidTopics: string[];
  weeklyReadTime: string;
  quizCompletedAt: string;
}

interface RecommendationEntry {
  bookSlug: string;
  score: number;
  explanation: string;
  recommendedAt: string;
}

const KEYS = {
  profile: "bt_user_profile",
  library: "bt_user_library",
  recommendations: "bt_user_recommendations",
  quizAnswers: "bt_quiz_answers",
};

function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function setItem(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Profile
export function getUserProfile(): UserProfile | null {
  return getItem<UserProfile>(KEYS.profile);
}

export function saveUserProfile(profile: UserProfile): void {
  setItem(KEYS.profile, profile);
}

export function clearUserProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.profile);
}

// Quiz answers
export function getQuizAnswers(): QuizAnswer[] | null {
  return getItem<QuizAnswer[]>(KEYS.quizAnswers);
}

export function saveQuizAnswers(answers: QuizAnswer[]): void {
  setItem(KEYS.quizAnswers, answers);
}

// Library
export function getLibrary(): SavedBookEntry[] {
  return getItem<SavedBookEntry[]>(KEYS.library) || [];
}

export function saveBookToLibrary(
  bookSlug: string,
  status: ReadingStatus = "want_to_read"
): void {
  const library = getLibrary();
  const existing = library.find((e) => e.bookSlug === bookSlug);
  if (existing) {
    existing.status = status;
    existing.updatedAt = new Date().toISOString();
  } else {
    library.push({
      bookSlug,
      status,
      savedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  setItem(KEYS.library, library);
}

export function removeBookFromLibrary(bookSlug: string): void {
  const library = getLibrary().filter((e) => e.bookSlug !== bookSlug);
  setItem(KEYS.library, library);
}

export function updateBookStatus(bookSlug: string, status: ReadingStatus): void {
  saveBookToLibrary(bookSlug, status);
}

export function getBookEntry(bookSlug: string): SavedBookEntry | undefined {
  return getLibrary().find((e) => e.bookSlug === bookSlug);
}

export function rateBook(bookSlug: string, rating: number): void {
  const library = getLibrary();
  const existing = library.find((e) => e.bookSlug === bookSlug);
  if (existing) {
    existing.rating = rating;
    existing.updatedAt = new Date().toISOString();
  } else {
    library.push({
      bookSlug,
      status: "finished",
      rating,
      savedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  setItem(KEYS.library, library);
}

export function addBookNote(bookSlug: string, note: string): void {
  const library = getLibrary();
  const existing = library.find((e) => e.bookSlug === bookSlug);
  if (existing) {
    existing.note = note;
    existing.updatedAt = new Date().toISOString();
  } else {
    library.push({
      bookSlug,
      status: "want_to_read",
      note,
      savedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  setItem(KEYS.library, library);
}

export function getBooksByStatus(status: ReadingStatus): SavedBookEntry[] {
  return getLibrary().filter((e) => e.status === status);
}

// Recommendations
export function getRecommendations(): RecommendationEntry[] {
  return getItem<RecommendationEntry[]>(KEYS.recommendations) || [];
}

export function saveRecommendations(recs: RecommendationEntry[]): void {
  setItem(KEYS.recommendations, recs);
}

// Check if user has completed onboarding
export function hasCompletedOnboarding(): boolean {
  return getUserProfile() !== null;
}

// Clear all user data
export function clearAllUserData(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
