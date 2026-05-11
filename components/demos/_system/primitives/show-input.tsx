'use client'

import React from 'react'
import { Calendar, ChevronDown, Eye, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Affordance = 'calendar' | 'eye' | 'chevron' | 'none'

interface ShowInputProps {
  label: string
  affordance?: Affordance
  className?: string
  size?: 'md' | 'lg'
}

const ICON: Record<Exclude<Affordance, 'none'>, LucideIcon> = {
  calendar: Calendar,
  eye: Eye,
  chevron: ChevronDown,
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
        'flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--card-bg)] px-4',
        'shadow-[var(--shadow-xs)] transition-colors',
        size === 'lg' ? 'h-14 text-base' : 'h-12 text-[15px]',
        className,
      )}
    >
      <span className="font-medium tracking-tight text-[var(--text-primary)]">{label}</span>
      {Icon && <Icon className="ml-auto h-4 w-4 text-[var(--text-tertiary)]" strokeWidth={1.75} />}
    </div>
  )
}
