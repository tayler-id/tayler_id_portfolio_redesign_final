"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BentoCard({ children, className, size = "md" }: BentoCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-muted/50 border border-border/50 p-6 transition-colors hover:border-border",
        size === "sm" && "p-4",
        size === "lg" && "p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}
