'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface RadioYesNoProps {
  question: string
  selected?: 'yes' | 'no' | null
  accentColor?: string
  className?: string
}

/**
 * Inline yes/no radio group. Display-only — matches the WSH "Are you a U.S.
 * Citizen?" pattern with the question above and two radio buttons below.
 */
export function RadioYesNo({
  question,
  selected = null,
  accentColor,
  className,
}: RadioYesNoProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className="text-[13px] font-medium text-[var(--text-primary)]">{question}</span>
      <div className="flex items-center gap-6">
        {(['yes', 'no'] as const).map((value) => {
          const active = selected === value
          return (
            <span key={value} className="inline-flex items-center gap-2 text-[13px]">
              <span
                role="presentation"
                className={cn(
                  'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                  active ? '' : 'border-[var(--border-strong)] bg-[var(--card-bg)]',
                )}
                style={
                  active
                    ? {
                        borderColor: accentColor ?? 'var(--cta)',
                      }
                    : undefined
                }
              >
                {active ? (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: accentColor ?? 'var(--cta)' }}
                  />
                ) : null}
              </span>
              <span className="capitalize text-[var(--text-secondary)]">{value}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
