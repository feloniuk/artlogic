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
        "bg-clip-text text-transparent",
        variant === "brand"
          ? "bg-gradient-brand"
          : "text-gradient-subtle",
        className
      )}
      style={
        variant === "subtle"
          ? {
              backgroundImage:
                "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
