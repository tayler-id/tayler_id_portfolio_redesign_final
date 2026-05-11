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
              className="relative shrink-0"
              style={{ width: s.node, height: s.node }}
            >
              <span
                className="absolute inset-0 z-10 flex items-center justify-center rounded-full font-semibold transition-colors"
                style={{
                  fontSize: s.font,
                  ...(done
                    ? {
                        background: 'var(--card-bg)',
                        color: 'var(--positive)',
                        boxShadow: 'inset 0 0 0 2px var(--positive)',
                      }
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
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '100%',
                    transform: 'translateX(-50%)',
                    width: 1,
                    height: s.gap + s.node,
                    background: done ? 'var(--positive)' : 'var(--border-strong)',
                    transition: 'background 200ms ease',
                  }}
                />
              )}
            </span>
            <span
              className="font-semibold tracking-tight"
              style={{
                fontSize: s.label,
                color: done
                  ? 'var(--positive)'
                  : isActive
                  ? 'var(--text-primary)'
                  : 'var(--text-tertiary)',
              }}
            >
              {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/** @deprecated Use StepperVertical. */
export const Stepper = StepperVertical
