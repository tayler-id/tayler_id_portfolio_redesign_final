'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type Status = 'approved' | 'declined' | 'pending' | 'skipped' | 'neutral'

interface StatusBadgeProps {
  status: Status
  label?: string
  className?: string
}

const STATUS_TOKENS: Record<Status, { bg: string; fg: string; label: string }> = {
  approved: { bg: 'var(--positive-bg)', fg: 'var(--positive)', label: 'Approved' },
  declined: { bg: 'var(--negative-bg)', fg: 'var(--negative)', label: 'Declined' },
  pending: { bg: 'var(--warning-bg)', fg: 'var(--warning)', label: 'Pending' },
  skipped: { bg: 'var(--neutral-bg)', fg: 'var(--text-tertiary)', label: 'Skipped' },
  neutral: { bg: 'var(--neutral-bg)', fg: 'var(--text-secondary)', label: '' },
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const t = STATUS_TOKENS[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-full)] px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase',
        className,
      )}
      style={{ backgroundColor: t.bg, color: t.fg }}
    >
      <span
        className="h-1.5 w-1.5 rounded-[var(--radius-full)]"
        style={{ backgroundColor: t.fg }}
        aria-hidden
      />
      {label ?? t.label}
    </span>
  )
}
