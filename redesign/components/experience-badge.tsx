"use client";

import { cn } from "@/lib/utils";

interface ExperienceBadgeProps {
  label: string;
  company: string;
  className?: string;
}

export function ExperienceBadge({
  label,
  company,
  className,
}: ExperienceBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[80px]">
        {label}
      </span>
      <span className="font-medium">{company}</span>
    </div>
  );
}
