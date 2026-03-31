import {
  Brain,
  Rocket,
  Heart,
  Compass,
  Flame,
  Target,
  Sparkles,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PersonalityType } from "@/types";

interface PersonalityConfig {
  icon: LucideIcon;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const personalityMap: Record<PersonalityType, PersonalityConfig> = {
  "reflective-thinker": {
    icon: Brain,
    label: "Reflective Thinker",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  "ambitious-builder": {
    icon: Rocket,
    label: "Ambitious Builder",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  "emotional-healer": {
    icon: Heart,
    label: "Emotional Healer",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
  },
  "curious-explorer": {
    icon: Compass,
    label: "Curious Explorer",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
  },
  "deep-feeler": {
    icon: Flame,
    label: "Deep Feeler",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
  "intellectual-strategist": {
    icon: Target,
    label: "Intellectual Strategist",
    bgColor: "bg-slate-50",
    textColor: "text-slate-700",
    borderColor: "border-slate-200",
  },
  "soulful-romantic": {
    icon: Sparkles,
    label: "Soulful Romantic",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    borderColor: "border-pink-200",
  },
  "resilient-rebuilder": {
    icon: Shield,
    label: "Resilient Rebuilder",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
};

export interface PersonalityBadgeProps {
  type: PersonalityType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "px-2.5 py-1 gap-1.5 text-xs",
    icon: "h-3.5 w-3.5",
  },
  md: {
    container: "px-3 py-1.5 gap-2 text-sm",
    icon: "h-4 w-4",
  },
  lg: {
    container: "px-4 py-2 gap-2.5 text-base",
    icon: "h-5 w-5",
  },
};

export function PersonalityBadge({
  type,
  size = "md",
  className,
}: PersonalityBadgeProps) {
  const config = personalityMap[type];
  const styles = sizeStyles[size];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        config.bgColor,
        config.textColor,
        config.borderColor,
        styles.container,
        className
      )}
    >
      <Icon className={styles.icon} />
      {config.label}
    </span>
  );
}
