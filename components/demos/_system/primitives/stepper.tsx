'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface StepperVerticalProps {
  steps: string[]
  /** 0-indexed active step. */
  active: number
  size?: Size
  className?: string
}

const SIZE_MAP: Record<Size, { node: number; gap: number; font: number; check: number; label: number }> = {
  sm: { node: 22, gap: 18, font: 11, check: 10, label: 12 },
  md: { node: 26, gap: 22, font: 12, check: 11, label: 13 },
  lg: { node: 36, gap: 36, font: 14.5, check: 14, label: 15 },
}

export function StepperVertical({ steps, active, size = 'md', className }: StepperVerticalProps) {
  const s = SIZE_MAP[size]
  return (
    <ol
      className={cn('relative flex flex-col', className)}
      style={{ gap: s.gap }}
      aria-label="Progress"
    >
      {steps.map((label, idx) => {
        const done = idx < active
        const isActive = idx === active
        const isLast = idx === steps.length - 1
        return (
          <li key={label} className="relative flex items-center gap-3" aria-current={isActive ? 'step' : undefined}>
            <span
              className="relative z-10 flex shrink-0 items-center justify-center rounded-full font-semibold transition-colors"
              style={{
                width: s.node,
                height: s.node,
                fontSize: s.font,
                ...(done
                  ? { background: 'var(--cta)', color: 'var(--cta-text)' }
                  : isActive
                  ? {
                      background: 'var(--card-bg)',
                      color: 'var(--cta)',
                      boxShadow: 'inset 0 0 0 2px var(--cta)',
                    }
                  : {
                      background: 'var(--card-bg)',
                      color: 'var(--text-tertiary)',
                      boxShadow: 'inset 0 0 0 1px var(--border-strong)',
                    }),
              }}
            >
              {done ? <Check style={{ width: s.check, height: s.check }} strokeWidth={3} /> : idx + 1}
            </span>
            <span
              className="font-medium tracking-tight"
              style={{
                fontSize: s.label,
                color: done || isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}
            >
              {label}
            </span>
            {!isLast && (
              <span
                aria-hidden
                className="absolute"
                style={{
                  left: s.node / 2 - 0.5,
                  top: s.node,
                  width: 1,
                  height: s.gap,
                  background: done ? 'var(--cta)' : 'var(--border-strong)',
                  transition: 'background 200ms ease',
                }}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

/** @deprecated Use StepperVertical. */
export const Stepper = StepperVertical
