'use client'

import React from 'react'
import { Download, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalOverlayProps {
  /** Brand mark + title rendered in the modal header (e.g. lender logo + name). */
  header: React.ReactNode
  /** Bold sub-title bar under the header (centered, accent-colored). */
  subTitle?: string
  /** Body content — long disclosure text typically. */
  children: React.ReactNode
  /** Footer action label (defaults to "Download"). */
  actionLabel?: string
  /** Optional accent color used for the sub-title bar and action button. */
  accentColor?: string
  className?: string
}

/**
 * Centered modal overlay — used for lender Privacy Policy / Terms screens
 * that float over the application form. Display-only; no real dismiss
 * behavior because demos walk through fixed states.
 */
export function ModalOverlay({
  header,
  subTitle,
  children,
  actionLabel = 'Download',
  accentColor,
  className,
}: ModalOverlayProps) {
  return (
    <div
      role="presentation"
      className={cn(
        'absolute inset-0 z-40 flex items-center justify-center bg-black/30 px-3 py-4',
        className,
      )}
    >
      <div className="relative flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">{header}</div>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>

        {subTitle && (
          <div
            className="px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accentColor ?? 'var(--accent)' }}
          >
            {subTitle}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-3 text-[11px] leading-[1.55] text-[var(--text-secondary)]">
          {children}
        </div>

        <div className="border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold text-white shadow-sm"
            style={{ background: accentColor ?? 'var(--cta)' }}
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
