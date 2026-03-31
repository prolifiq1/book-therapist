"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRate,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number>(0);

  const displayRating = hovered || rating;

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayRating;
        const isHalf = !isFilled && starValue - 0.5 <= displayRating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(starValue)}
            onMouseEnter={() => interactive && setHovered(starValue)}
            className={cn(
              "transition-colors duration-150",
              interactive
                ? "cursor-pointer hover:scale-110"
                : "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeMap[size],
                isFilled
                  ? "fill-primary-400 text-primary-400"
                  : isHalf
                    ? "fill-primary-200 text-primary-400"
                    : "fill-none text-neutral-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
