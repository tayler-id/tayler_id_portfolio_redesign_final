'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface FormSectionProps {
  title: string
  /** Optional merchant accent override for the section heading. */
  accentColor?: string
  /** Optional helper / right-aligned note (e.g. "* Required Field"). */
  rightNote?: React.ReactNode
  /** Grid layout for the section body. Defaults to a single column; pass a
   *  Tailwind grid class string for multi-column layouts. */
  bodyClassName?: string
  children: React.ReactNode
}

/**
 * A demo form section: small uppercase title in the merchant's accent color,
 * followed by a grid of inputs / fields. Matches the WSH "Personal / Address /
 * Contact" section pattern from the Sunlight Financial application.
 */
export function FormSection({
  title,
  accentColor,
  rightNote,
  bodyClassName,
  children,
}: FormSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline justify-between gap-3">
        <h4
          className="text-[15px] font-bold tracking-tight"
          style={{ color: accentColor ?? 'var(--accent)' }}
        >
          {title}
        </h4>
        {rightNote ? (
          <span className="text-[11px] text-[var(--text-tertiary)]">{rightNote}</span>
        ) : null}
      </header>
      <div className={cn('grid grid-cols-1 gap-3', bodyClassName)}>{children}</div>
    </section>
  )
}
