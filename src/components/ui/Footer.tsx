import { BookHeart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <BookHeart className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-semibold text-foreground">
            Book Therapist
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Discover your perfect read. Built with care for book lovers everywhere.
        </p>
      </div>
    </footer>
  );
}
