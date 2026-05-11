'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'outline'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-12 px-7 text-base',
}

const variantStyle: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--cta)] text-[var(--cta-text)] shadow-[var(--shadow-xs)] hover:bg-[var(--cta-hover)] active:scale-[0.98]',
  ghost: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  outline:
    'border border-[var(--border-strong)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--neutral-bg)]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium tracking-tight transition-all',
        sizeMap[size],
        variantStyle[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
