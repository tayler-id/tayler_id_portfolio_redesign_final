'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BrandHeaderProps {
  logo?: { src: string; width: number; height: number; alt: string } | null
  brandName?: string
  brandColor?: string
  title?: string
  className?: string
  align?: 'left' | 'right' | 'center'
}

export function BrandHeader({
  logo,
  brandName,
  brandColor,
  title,
  align = 'left',
  className,
}: BrandHeaderProps) {
  const justify =
    align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'

  return (
    <div className={cn('flex items-center gap-3', justify, className)}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          style={{ width: logo.width * 0.75, height: 'auto' }}
          className="shrink-0 object-contain"
        />
      ) : (
        <span
          className="text-base font-semibold tracking-tight"
          style={{ color: brandColor ?? 'currentColor' }}
        >
          {brandName}
        </span>
      )}
      {title && (
        <>
          <span className="h-7 w-px bg-[var(--border-strong)]/70" aria-hidden />
          <span className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
            {title}
          </span>
        </>
      )}
    </div>
  )
}
