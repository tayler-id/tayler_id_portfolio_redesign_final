'use client'

import React, { Fragment } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md'

interface StepperHorizontalProps {
  steps: string[]
  /** 0-indexed active step. */
  active: number
  size?: Size
  showLabels?: boolean
  className?: string
}

const SIZE_MAP: Record<Size, { node: number; font: number; check: number; gap: number; label: number; connectorMin: number }> = {
  sm: { node: 22, font: 11, check: 10, gap: 6, label: 10, connectorMin: 18 },
  md: { node: 28, font: 12.5, check: 12, gap: 10, label: 11.5, connectorMin: 32 },
}

export function StepperHorizontal({
  steps,
  active,
  size = 'md',
  showLabels = true,
  className,
}: StepperHorizontalProps) {
  const s = SIZE_MAP[size]
  return (
    <ol
      className={cn('mx-auto flex w-full max-w-[520px] items-start justify-center', className)}
      aria-label="Progress"
    >
      {steps.map((label, idx) => {
        const done = idx < active
        const isActive = idx === active
        const isLast = idx === steps.length - 1
        return (
          <Fragment key={label}>
            <li
              className="flex min-w-0 flex-col items-center"
              style={{ gap: s.gap, flex: '0 1 auto' }}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className="flex shrink-0 items-center justify-center rounded-full font-semibold transition-colors"
                style={{
                  width: s.node,
                  height: s.node,
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
              {showLabels && (
                <span
                  className="block max-w-[88px] truncate text-center font-semibold tracking-tight"
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
              )}
            </li>
            {!isLast && (
              <span
                aria-hidden
                className="shrink"
                style={{
                  height: 1,
                  marginTop: s.node / 2,
                  marginInline: 8,
                  flex: `1 1 ${s.connectorMin}px`,
                  minWidth: s.connectorMin,
                  background: done ? 'var(--positive)' : 'var(--border-strong)',
                  transition: 'background 200ms ease',
                }}
              />
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}
