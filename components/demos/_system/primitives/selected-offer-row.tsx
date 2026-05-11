'use client'

import React from 'react'
import Image from 'next/image'
import type { Lender } from '../data/lenders'

interface SelectedOfferRowProps {
  lender: Lender
  /** Big bold label (e.g. "Installment Loan"). */
  loanType: string
  /** Primary terms line (e.g. "60 month @ 8.99% APR"). */
  terms: string
  /** Optional second terms line (e.g. "with monthly loan payments of $199.23."). */
  subterms?: string
  /** Right-edge price (e.g. "$199/mo"). */
  amount: string
  /** Accent color — drives the left rail and the loanType label. */
  accent: string
  /** When true, stacks rows for narrow viewports (mobile chrome). */
  compact?: boolean
  className?: string
}

/**
 * Pill-style row that displays the lender's selected loan offer with
 * radio + brand logo + loan terms + monthly price. Used on the offers
 * step (post-prequal) and on the review step (final confirmation).
 *
 * One component, two variants: the default sits inside the iPad chrome
 * with a horizontal layout; `compact` rebuilds it as a stacked card for
 * the iPhone chrome where the long terms string would otherwise be
 * crushed by the lender logo + amount on the same row.
 */
export function SelectedOfferRow({
  lender,
  loanType,
  terms,
  subterms,
  amount,
  accent,
  compact = false,
  className,
}: SelectedOfferRowProps) {
  const logoNode =
    lender.logo && 'src' in lender.logo ? (
      <Image
        src={lender.logo.src}
        alt={lender.name}
        width={lender.logo.width}
        height={lender.logo.height}
        style={{ height: compact ? 20 : 16, width: 'auto' }}
      />
    ) : null

  if (compact) {
    return (
      <div
        className={
          'flex items-stretch overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card-bg)] ' +
          (className ?? '')
        }
      >
        <div className="w-1.5 flex-shrink-0" style={{ background: accent }} />
        <div className="flex flex-1 flex-col gap-1.5 px-3 py-2.5 min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="h-3.5 w-3.5 flex-shrink-0 rounded-full"
                style={{ border: `2px solid ${accent}` }}
              />
              {logoNode}
            </div>
            <p className="text-[14px] font-bold text-[var(--text-primary)] flex-shrink-0">
              {amount}
            </p>
          </div>
          <p className="text-[12px] font-bold" style={{ color: accent }}>
            {loanType}
          </p>
          <div className="flex flex-col gap-0.5">
            <p className="text-[10.5px] leading-snug text-[var(--text-secondary)]">{terms}</p>
            {subterms && (
              <p className="text-[10.5px] leading-snug text-[var(--text-secondary)]">{subterms}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        'flex items-stretch overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card-bg)] ' +
        (className ?? '')
      }
    >
      <div className="w-1.5 flex-shrink-0" style={{ background: accent }} />
      <div className="flex flex-1 items-center gap-3 px-3 py-2.5 min-w-0">
        <div
          className="h-3.5 w-3.5 flex-shrink-0 rounded-full"
          style={{ border: `2px solid ${accent}` }}
        />
        {logoNode}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-[12px] font-bold leading-tight" style={{ color: accent }}>
            {loanType}
          </p>
          <p className="text-[11px] leading-snug text-[var(--text-secondary)]">{terms}</p>
          {subterms && (
            <p className="text-[11px] leading-snug text-[var(--text-secondary)]">{subterms}</p>
          )}
        </div>
      </div>
      <div
        className="flex flex-shrink-0 items-center justify-center px-4"
        style={{ background: 'var(--neutral-bg)' }}
      >
        <p className="text-[13px] font-bold text-[var(--text-primary)] whitespace-nowrap">
          {amount}
        </p>
      </div>
    </div>
  )
}
