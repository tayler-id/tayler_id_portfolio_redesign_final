'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps {
  checked?: boolean
  label?: React.ReactNode
  /** Optional accent color override (e.g. merchant CTA). */
  accentColor?: string
  className?: string
  /** Visual size — `sm` matches inline disclosure rows. */
  size?: 'sm' | 'md'
}

/**
 * Display-only checkbox. Lays out as a square box + label on the right.
 * When `checked`, fills with the merchant accent and shows a check.
 */
export function Checkbox({
  checked = false,
  label,
  accentColor,
  className,
  size = 'md',
}: CheckboxProps) {
  const box = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'
  const icon = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'
  return (
    <label
      className={cn(
        'inline-flex cursor-default items-start gap-2 text-[13px] leading-[1.5] text-[var(--text-primary)]',
        className,
      )}
    >
      <span
        className={cn(
          'mt-[2px] inline-flex shrink-0 items-center justify-center rounded-[3px] border transition-colors',
          box,
          checked ? '' : 'border-[var(--border-strong)] bg-[var(--card-bg)]',
        )}
        style={
          checked
            ? {
                background: accentColor ?? 'var(--cta)',
                borderColor: accentColor ?? 'var(--cta)',
              }
            : undefined
        }
        role="presentation"
      >
        {checked ? <Check className={cn(icon, 'text-white')} strokeWidth={3} /> : null}
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}
