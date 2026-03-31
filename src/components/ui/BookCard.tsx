"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "./Badge";
import { StarRating } from "./StarRating";

export interface BookCardProps {
  id: string;
  title: string;
  authors: string[];
  coverImage?: string | null;
  rating: number;
  genres?: string[];
  description?: string;
  onClick?: () => void;
  className?: string;
}

export function BookCard({
  title,
  authors,
  coverImage,
  rating,
  genres = [],
  description,
  onClick,
  className,
}: BookCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        "shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer",
        className
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`Cover of ${title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
            <BookOpen className="h-12 w-12 text-primary-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {authors.join(", ")}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={rating} size="sm" />
          <span className="text-xs text-muted-foreground">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="mood" size="sm">
                {genre}
              </Badge>
            ))}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
