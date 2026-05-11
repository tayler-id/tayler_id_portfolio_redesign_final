'use client'

import React from 'react'
import { X } from 'lucide-react'
import { StepperHorizontal } from '../../_system/primitives'
import { getMerchant, type MerchantKey } from '../../_system/data/merchants'
import type { Lender } from '../../_system/data/lenders'

interface ChromeMobileProps {
  merchant: MerchantKey
  activeStepIndex: number
  stepLabels?: string[]
  stepTitle: string
  lender: Lender
  declineSlot?: React.ReactNode
  children: React.ReactNode
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  canBack?: boolean
  canNext?: boolean
}

const DEFAULT_LABELS: string[] = ['Applicant Info', 'Pre-qualified', 'Decision']

export function ChromeMobile({
  merchant,
  activeStepIndex,
  stepLabels = DEFAULT_LABELS,
  stepTitle,
  lender,
  declineSlot,
  children,
  onBack,
  onNext,
  nextLabel = 'Next',
  canBack = true,
  canNext = true,
}: ChromeMobileProps) {
  const m = getMerchant(merchant)
  return (
    <div className="flex h-full w-full flex-col bg-[var(--pad)]">
      {/* Top bar: merchant + close X */}
      <header className="flex items-center justify-between px-4 pt-7 pb-3">
        <div className="flex items-center gap-1.5 select-none">
          {m.logo && 'src' in m.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={m.logo.src}
              alt={m.name}
              style={{ height: 32, width: 'auto', maxWidth: 160 }}
              className="object-contain object-left"
            />
          ) : m.logo && 'logomark' in m.logo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.logo.logomark} alt="" style={{ height: 26, width: 26 }} className="object-contain" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.logo.logotype}
                alt={m.name}
                style={{ height: 16, width: 'auto', maxWidth: 96 }}
                className="object-contain object-left"
              />
            </>
          ) : (
            <span
              className="text-[13px] font-semibold tracking-tight"
              style={{ color: m.brandColor ?? 'var(--text-primary)' }}
            >
              {m.name}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--card-bg)] shadow-[var(--shadow-xs)] ring-1 ring-[var(--border)] text-[var(--text-secondary)]"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </header>

      {/* Horizontal centered stepper at top */}
      <div className="px-4 pb-4">
        <StepperHorizontal
          steps={stepLabels}
          active={activeStepIndex}
          size="sm"
          showLabels={false}
        />
      </div>

      {/* Decline notice */}
      {declineSlot && <div className="px-4 pb-1">{declineSlot}</div>}

      {/* Main scrollable card */}
      <main className="flex-1 overflow-y-auto px-4 pb-3">
        <article className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow-sm)]">
          <header className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
            <h4 className="text-[14px] font-bold tracking-tight text-[var(--text-primary)] truncate">
              {stepTitle}
            </h4>
            {lender.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lender.logo.src}
                alt={lender.name}
                style={{ height: 18, width: 'auto', maxWidth: 110 }}
                className="object-contain object-right shrink-0"
              />
            ) : (
              <span
                className="text-[12px] font-semibold tracking-tight shrink-0"
                style={{ color: lender.brandColor }}
              >
                {lender.shortName}
              </span>
            )}
          </header>
          {children}
        </article>
      </main>

      {/* Sticky bottom bar */}
      <footer className="flex items-center justify-between gap-2 border-t border-[var(--border)] bg-[var(--card-bg)] px-3 py-3">
        <button
          type="button"
          onClick={onBack}
          disabled={!canBack}
          className="text-[12px] font-semibold text-[var(--text-secondary)] disabled:opacity-30"
        >
          Back
        </button>
        <span
          className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--pad)] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--text-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Estimate payments
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="rounded-full px-5 py-2 text-[12.5px] font-semibold text-[var(--cta-text)] shadow-[var(--shadow-sm)] transition-transform active:scale-[0.98] disabled:opacity-40"
          style={{ background: 'var(--cta)' }}
        >
          {nextLabel}
        </button>
      </footer>
    </div>
  )
}
