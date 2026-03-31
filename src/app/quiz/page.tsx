"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookHeart, Check, Sparkles } from "lucide-react";
import { quizQuestions } from "@/data/quiz-questions";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils/cn";
import { saveUserProfile, saveQuizAnswers, saveRecommendations } from "@/lib/data/user-store";
import type { QuizAnswer } from "@/types";

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | string[]>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = quizQuestions[currentStep];
  const totalSteps = quizQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentAnswer = answers.get(question.id);

  const handleSelect = useCallback(
    (option: string) => {
      setAnswers((prev) => {
        const next = new Map(prev);
        if (question.type === "single-select") {
          next.set(question.id, option);
        } else {
          const current = (next.get(question.id) as string[]) || [];
          if (current.includes(option)) {
            next.set(
              question.id,
              current.filter((o) => o !== option)
            );
          } else {
            if (question.maxSelect && current.length >= question.maxSelect) return prev;
            next.set(question.id, [...current, option]);
          }
        }
        return next;
      });
    },
    [question]
  );

  const isOptionSelected = (option: string): boolean => {
    const answer = currentAnswer;
    if (Array.isArray(answer)) return answer.includes(option);
    return answer === option;
  };

  const canProceed = (): boolean => {
    const answer = currentAnswer;
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return answer.length > 0;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const quizAnswers: QuizAnswer[] = Array.from(answers.entries()).map(([questionId, answer]) => {
        const q = quizQuestions.find((q) => q.id === questionId)!;
        return { questionId, answer, category: q.category };
      });

      saveQuizAnswers(quizAnswers);

      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: quizAnswers }),
      });

      if (!res.ok) throw new Error("Failed to get recommendations");

      const data = await res.json();

      saveUserProfile({
        name: "Reader",
        email: "",
        profileType: data.profile.type,
        profileLabel: data.profile.label,
        profileDescription: data.profile.description,
        traits: data.profile.traits,
        preferredGenres: data.profile.preferredGenres,
        preferredThemes: data.profile.preferredThemes,
        preferredTone: data.profile.preferredTone,
        preferredPace: data.profile.preferredPace,
        fictionPref: data.profile.fictionPref,
        avoidTopics: data.profile.avoidTopics,
        weeklyReadTime: data.profile.weeklyReadTime,
        quizCompletedAt: new Date().toISOString(),
      });

      saveRecommendations(
        data.recommendations.map((r: { bookId: string; score: number; explanation: string }) => ({
          bookSlug: r.bookId,
          score: r.score,
          explanation: r.explanation,
          recommendedAt: new Date().toISOString(),
        }))
      );

      router.push("/recommendations");
    } catch (error) {
      console.error("Quiz submission error:", error);
      setIsSubmitting(false);
    }
  };

  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <BookHeart className="h-5 w-5 text-primary-600" />
            <span className="font-semibold text-foreground">Book Therapist</span>
          </button>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <ProgressBar value={progress} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-2">
                {question.question}
              </h2>
              {question.type === "multi-select" && (
                <p className="text-center text-muted-foreground mb-8">
                  {question.maxSelect
                    ? `Select up to ${question.maxSelect}`
                    : "Select all that apply"}
                </p>
              )}
              {question.type === "single-select" && (
                <p className="text-center text-muted-foreground mb-8">Choose one</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option) => {
                  const selected = isOptionSelected(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "relative text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                        selected
                          ? "border-primary-500 bg-primary-50 text-primary-900 shadow-md"
                          : "border-border bg-card text-foreground hover:border-primary-200 hover:bg-primary-50/50"
                      )}
                    >
                      <span className="text-sm font-medium leading-snug">{option}</span>
                      {selected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3"
                        >
                          <Check className="h-4 w-4 text-primary-600" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full border-t border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {isLast ? (
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={!canProceed()}
              loading={isSubmitting}
            >
              <Sparkles className="h-4 w-4" />
              Get My Recommendations
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
