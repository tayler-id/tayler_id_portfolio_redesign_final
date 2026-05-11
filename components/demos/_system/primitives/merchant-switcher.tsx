'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MERCHANTS, type MerchantKey, type Vertical } from '../data/merchants'

interface MerchantSwitcherProps {
  active: MerchantKey
  onChange: (key: MerchantKey) => void
  /** Optional filter — e.g. only show home-improvement merchants. */
  verticals?: Vertical[]
  className?: string
}

const VERTICAL_LABEL: Record<Vertical, string> = {
  retail: 'Retail',
  'home-improvement': 'Home Improvement',
  'elective-medical': 'Elective Medical',
}

/**
 * Merchant pill row, grouped visually by vertical. Lets the demo swap brand
 * chrome + form vocabulary (retail → home-improvement → elective-medical).
 */
export function MerchantSwitcher({
  active,
  onChange,
  verticals,
  className,
}: MerchantSwitcherProps) {
  const items = verticals
    ? MERCHANTS.filter((m) => verticals.includes(m.vertical))
    : MERCHANTS

  // Group items by vertical for the visual label rows.
  const byVertical = items.reduce<Record<Vertical, typeof items>>((acc, m) => {
    if (!acc[m.vertical]) acc[m.vertical] = []
    acc[m.vertical].push(m)
    return acc
  }, {} as Record<Vertical, typeof items>)

  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
      {(Object.keys(byVertical) as Vertical[]).map((vertical) => (
        <div key={vertical} className="flex items-center gap-2">
          <span
            className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {VERTICAL_LABEL[vertical]}
          </span>
          <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] p-0.5">
            {byVertical[vertical].map((m) => {
              const isActive = m.key === active
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => onChange(m.key)}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors',
                    isActive
                      ? 'text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="apply-merchant-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: m.brandColor ?? 'var(--text-primary)' }}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                  <span className="relative z-[1]">{m.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
