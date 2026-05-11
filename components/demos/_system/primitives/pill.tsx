'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PillGroupItem {
  key: string
  label: React.ReactNode
  accentColor?: string // shows as a small dot on the left of the pill
}

interface PillGroupProps {
  items: PillGroupItem[]
  active: string
  onChange: (key: string) => void
  layoutGroupId?: string // unique per instance so multiple groups don't share active state
  className?: string
}

export function PillGroup({
  items,
  active,
  onChange,
  layoutGroupId = 'pill-group',
  className,
}: PillGroupProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-background/60 p-1.5 backdrop-blur-sm',
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.key === active
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={cn(
              'relative rounded-full px-4 py-1.5 text-[13px] font-medium tracking-tight transition-colors',
              isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground',
            )}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId={layoutGroupId}
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {item.accentColor && (
                <span
                  className="h-1.5 w-1.5 rounded-[var(--radius-full)]"
                  style={{ backgroundColor: isActive ? item.accentColor : item.accentColor + '99' }}
                  aria-hidden
                />
              )}
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
