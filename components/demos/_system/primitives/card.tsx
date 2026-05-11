'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type CardVariant = 'flat' | 'raised' | 'ghost'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const padMap = {
  none: '',
  sm: 'p-4',
  md: 'px-6 py-5',
  lg: 'px-7 py-7 sm:px-9 sm:py-9',
}

const variantStyle: Record<CardVariant, string> = {
  flat: 'bg-[var(--card-bg)] border border-[var(--border)] shadow-[var(--shadow-xs)]',
  raised: 'bg-[var(--card-bg)] border border-[var(--border)] shadow-[var(--shadow-md)]',
  ghost: 'bg-[var(--card-bg)]/70 border border-transparent',
}

export function Card({
  variant = 'flat',
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)]',
        variantStyle[variant],
        padMap[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
