'use client'

import React from 'react'
import { Calendar, ChevronDown, Eye, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Affordance = 'calendar' | 'eye' | 'chevron' | 'none'

interface ShowInputProps {
  label: string
  affordance?: Affordance
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const ICON: Record<Exclude<Affordance, 'none'>, LucideIcon> = {
  calendar: Calendar,
  eye: Eye,
  chevron: ChevronDown,
}

const SIZE_STYLES: Record<NonNullable<ShowInputProps['size']>, string> = {
  sm: 'h-10 px-3 text-[12px]',
  md: 'h-12 px-4 text-[15px]',
  lg: 'h-14 px-4 text-base',
}

/**
 * A non-interactive "show" input — visually identical to a real input so
 * demos look like real product views without form state plumbing.
 */
export function ShowInput({
  label,
  affordance = 'none',
  className,
  size = 'md',
}: ShowInputProps) {
  const Icon = affordance !== 'none' ? ICON[affordance] : null
  return (
    <div
      role="presentation"
      className={cn(
        'flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--card-bg)]',
        'shadow-[var(--shadow-xs)] transition-colors',
        SIZE_STYLES[size],
        className,
      )}
    >
      <span className="font-medium tracking-tight text-[var(--text-primary)]">{label}</span>
      {Icon && <Icon className="ml-auto h-4 w-4 text-[var(--text-tertiary)]" strokeWidth={1.75} />}
    </div>
  )
}
