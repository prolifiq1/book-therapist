"use client";

import { useState } from "react";
import Link from "next/link";
import { BookHeart, Compass, Library, Sparkles, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/library", label: "My Library", icon: Library },
  { href: "/recommendations", label: "Recommendations", icon: Sparkles },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <BookHeart className="h-7 w-7 text-primary-600 transition-transform group-hover:scale-110" />
          <span className="text-lg font-bold text-foreground">
            Book <span className="text-primary-600">Therapist</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* User menu area */}
          <Link
            href="/profile"
            className="hidden md:flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border",
          mobileOpen ? "max-h-64" : "max-h-0 border-t-0"
        )}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
