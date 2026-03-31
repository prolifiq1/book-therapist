import Link from "next/link";
import {
  BookHeart,
  Brain,
  Heart,
  Compass,
  Award,
  Film,
  Star,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PERSONALITY_PROFILES } from "@/types";

const personalityTypes = Object.values(PERSONALITY_PROFILES);

const steps = [
  {
    icon: Brain,
    title: "Take the Quiz",
    description: "Answer thoughtful questions about your personality, mood, and reading preferences.",
  },
  {
    icon: Sparkles,
    title: "Get Your Profile",
    description: "Discover your unique reader personality type and what drives your reading choices.",
  },
  {
    icon: BookHeart,
    title: "Find Your Books",
    description: "Receive deeply personalized recommendations with explanations for why each book fits you.",
  },
];

const moods = [
  { label: "Comfort & Warmth", color: "bg-amber-100 text-amber-800" },
  { label: "Challenge & Growth", color: "bg-emerald-100 text-emerald-800" },
  { label: "Escape & Adventure", color: "bg-sky-100 text-sky-800" },
  { label: "Healing & Understanding", color: "bg-rose-100 text-rose-800" },
  { label: "Inspiration", color: "bg-violet-100 text-violet-800" },
  { label: "Depth & Meaning", color: "bg-indigo-100 text-indigo-800" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800 mb-8">
              <BookHeart className="h-4 w-4" />
              Your personal book matchmaker
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Find the books that fit{" "}
              <span className="text-primary-600">who you are</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Not just by genre. By personality, emotional state, life situation, and what you need right now.
              Like a therapist — but for your reading list.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5"
              >
                Take the Reading Quiz
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-8 py-3.5 text-base font-semibold text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-400"
              >
                Explore Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How it works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Three steps to your perfect reading list</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary-200">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-6">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover by Personality */}
      <section className="py-20 sm:py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Discover by personality</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your reading personality shapes what resonates with you
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {personalityTypes.map((p) => (
              <Link
                key={p.type}
                href={`/discover?personality=${p.type}`}
                className="group p-6 rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary-200 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-5 w-5 text-primary-500" />
                  <h3 className="font-semibold text-foreground">{p.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {p.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore books <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Discover by Mood */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Discover by mood</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What are you seeking from your next read?
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {moods.map((mood) => (
              <Link
                key={mood.label}
                href={`/discover?mood=${encodeURIComponent(mood.label.toLowerCase())}`}
                className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-md ${mood.color}`}
              >
                {mood.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Adaptations */}
      <section className="py-20 sm:py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/discover?awards=true"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-10 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <Award className="h-12 w-12 text-amber-600 mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Award-Winning Books</h3>
              <p className="text-muted-foreground leading-relaxed">
                Explore Pulitzer Prize winners, Booker nominees, National Book Award honorees, and more.
              </p>
              <div className="mt-6 flex items-center gap-2 text-amber-700 font-medium">
                Browse collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/discover?adaptations=true"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 p-10 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <Film className="h-12 w-12 text-sky-600 mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Adapted Stories</h3>
              <p className="text-muted-foreground leading-relaxed">
                Books turned into films, TV series, and stage productions. Read the original before you watch.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sky-700 font-medium">
                Browse collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Highly Rated */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-6 w-6 text-primary-500 fill-primary-500" />
            <Star className="h-6 w-6 text-primary-500 fill-primary-500" />
            <Star className="h-6 w-6 text-primary-500 fill-primary-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Highly Rated Books</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Critically acclaimed and reader-approved. These books have moved millions.
          </p>
          <Link
            href="/discover?minRating=4.2"
            className="inline-flex items-center gap-2 mt-8 rounded-xl bg-neutral-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:-translate-y-0.5"
          >
            Explore top-rated books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-16">
            What readers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "It felt like the platform actually understood me. The recommendations were spot on — every book resonated deeply.",
                name: "Sarah M.",
                profile: "The Deep Feeler",
              },
              {
                quote: "I was in a reading slump for months. Book Therapist helped me find exactly what I needed to start again.",
                name: "James L.",
                profile: "The Resilient Rebuilder",
              },
              {
                quote: "The personality quiz was eerily accurate. I discovered three new favorite books in one sitting.",
                name: "Priya K.",
                profile: "The Curious Explorer",
              },
            ].map((t) => (
              <div key={t.name} className="p-8 rounded-2xl border border-border bg-card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary-400 fill-primary-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.profile}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 bg-neutral-900 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Compass className="h-12 w-12 text-primary-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to find your next great read?
          </h2>
          <p className="text-lg text-neutral-300 mb-10 leading-relaxed">
            Take our 2-minute quiz and discover books that match your inner world, goals, and growth.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-primary-500/25 transition-all hover:bg-primary-400 hover:-translate-y-0.5"
          >
            Start Your Reading Journey
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
