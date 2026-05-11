'use client'

import React from 'react'
import { StepperVertical } from '../../_system/primitives'
import { getMerchant, type MerchantKey } from '../../_system/data/merchants'
import type { Lender } from '../../_system/data/lenders'

interface ChromeTabletProps {
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

export function ChromeTablet({
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
}: ChromeTabletProps) {
  const m = getMerchant(merchant)
  return (
    <div className="flex h-full w-full flex-row bg-[var(--pad)] p-6">
      {/* Left rail: merchant logo (top) + stepper (vertically centered) */}
      <div className="flex w-[230px] shrink-0 flex-col pt-2 pr-4">
        <div className="flex items-center gap-2 select-none">
          {m.logo && 'src' in m.logo ? (
            // Single combined wordmark
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={m.logo.src}
              alt={m.name}
              style={{ height: 44, width: 'auto', maxWidth: 200 }}
              className="object-contain object-left"
            />
          ) : m.logo && 'logomark' in m.logo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.logo.logomark} alt="" style={{ height: 32, width: 32 }} className="object-contain" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.logo.logotype}
                alt={m.name}
                style={{ height: 18, width: 'auto', maxWidth: 110 }}
                className="object-contain object-left"
              />
            </>
          ) : (
            <span
              className="text-base font-semibold tracking-tight"
              style={{ color: m.brandColor ?? 'var(--text-primary)' }}
            >
              {m.name}
            </span>
          )}
        </div>

        <div className="flex flex-1 items-center">
          <StepperVertical steps={stepLabels} active={activeStepIndex} size="lg" />
        </div>
      </div>

      {/* Right column: cards */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {declineSlot}

        <article className="flex min-h-0 flex-1 flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-md)]">
          {/* Card header: step title + lender brand mark */}
          <header className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
            <h4 className="text-[16px] font-bold tracking-tight text-[var(--text-primary)]">
              {stepTitle}
            </h4>
            {lender.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lender.logo.src}
                alt={lender.name}
                style={{ height: 38, width: 'auto', maxWidth: 200 }}
                className="object-contain object-right"
              />
            ) : (
              <span
                className="text-[13px] font-semibold tracking-tight"
                style={{ color: lender.brandColor }}
              >
                {lender.shortName}
              </span>
            )}
          </header>

          <div className="flex-1 overflow-y-auto pr-1">{children}</div>

          <footer className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onBack}
              disabled={!canBack}
              className="text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:opacity-30"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              className="rounded-full px-6 py-2 text-[13px] font-semibold text-[var(--cta-text)] shadow-[var(--shadow-sm)] transition-transform active:scale-[0.98] disabled:opacity-40"
              style={{ background: 'var(--cta)' }}
            >
              {nextLabel}
            </button>
          </footer>
        </article>
      </div>
    </div>
  )
}
