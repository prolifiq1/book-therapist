"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md",
        secondary:
          "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:bg-neutral-300",
        ghost:
          "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
        outline:
          "border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400",
        danger:
          "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-10 px-5 text-sm rounded-lg",
        lg: "h-12 px-7 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
