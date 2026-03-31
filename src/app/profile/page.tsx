"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  RefreshCw,
  Trash2,
  BookOpen,
  Clock,
  Heart,
  Palette,
  Gauge,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { PersonalityBadge } from "@/components/ui/PersonalityBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { getUserProfile, getLibrary, clearAllUserData } from "@/lib/data/user-store";
import type { PersonalityType } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ReturnType<typeof getUserProfile>>(null);
  const [libraryCount, setLibraryCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(getUserProfile());
    setLibraryCount(getLibrary().length);
    setLoaded(true);
  }, []);

  const handleClearData = () => {
    if (confirm("Are you sure? This will clear your profile, library, and recommendations.")) {
      clearAllUserData();
      setProfile(null);
      setLibraryCount(0);
    }
  };

  if (!loaded) return null;

  if (!profile) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <EmptyState
            icon={User}
            title="No profile yet"
            description="Take the reading quiz to create your reader personality profile."
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

      <main className="flex-1">
        {/* Profile header */}
        <section className="bg-gradient-to-b from-primary-50 to-white border-b border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{profile.name || "Reader"}</h1>
            <PersonalityBadge type={profile.profileType as PersonalityType} size="lg" className="mx-auto" />
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {profile.profileDescription}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-5 rounded-xl border border-border bg-card text-center">
              <BookOpen className="h-5 w-5 text-primary-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{libraryCount}</p>
              <p className="text-xs text-muted-foreground">Books Saved</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card text-center">
              <Clock className="h-5 w-5 text-primary-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">{profile.weeklyReadTime}</p>
              <p className="text-xs text-muted-foreground">Weekly Reading</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card text-center">
              <Gauge className="h-5 w-5 text-primary-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground capitalize">{profile.preferredPace}</p>
              <p className="text-xs text-muted-foreground">Preferred Pace</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card text-center">
              <Palette className="h-5 w-5 text-primary-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground capitalize">{profile.fictionPref}</p>
              <p className="text-xs text-muted-foreground">Fiction Pref</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary-500" />
                Preferred Themes
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.preferredThemes.map((theme) => (
                  <span key={theme} className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-50 text-primary-800 text-sm font-medium">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Preferred Tone</h3>
              <div className="flex flex-wrap gap-2">
                {profile.preferredTone.map((tone) => (
                  <span key={tone} className="inline-flex items-center px-3 py-1.5 rounded-full bg-sky-50 text-sky-800 text-sm font-medium">
                    {tone}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Preferred Genres</h3>
              <div className="flex flex-wrap gap-2">
                {profile.preferredGenres.map((genre) => (
                  <span key={genre} className="inline-flex items-center px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {profile.avoidTopics.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Topics to Avoid</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.avoidTopics.map((topic) => (
                    <span key={topic} className="inline-flex items-center px-3 py-1.5 rounded-full bg-rose-50 text-rose-800 text-sm font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Personality Traits */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Personality Traits</h3>
              <div className="space-y-3">
                {Object.entries(profile.traits)
                  .sort(([, a], [, b]) => b - a)
                  .map(([trait, score]) => (
                    <div key={trait} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-48 capitalize">
                        {trait.replace(/-/g, " ")}
                      </span>
                      <div className="flex-1 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
                          style={{ width: `${score * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-10 text-right">
                        {Math.round(score * 100)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-wrap gap-4 border-t border-border pt-8">
            <Link href="/quiz">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4" />
                Retake Quiz
              </Button>
            </Link>
            <Button variant="danger" onClick={handleClearData}>
              <Trash2 className="h-4 w-4" />
              Clear All Data
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
