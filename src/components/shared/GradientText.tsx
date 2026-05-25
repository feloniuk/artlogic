"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "brand" | "subtle";
}

export function GradientText({
  children,
  className,
  variant = "brand",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        variant === "brand"
          ? "text-violet-400 font-semibold"
          : "text-violet-300",
        className
      )}
    >
      {children}
    </span>
  );
}
