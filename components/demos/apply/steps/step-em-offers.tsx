'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLender, type Lender, type LenderKey } from '../../_system/data/lenders'
import type { Merchant } from '../../_system/data/merchants'

interface OfferDef {
  lenderKey: LenderKey
  approvedAmount: string
  monthlyPayment?: string
  apr?: string
  promoLabel?: string
}

interface StepEMOffersProps {
  lender: Lender
  merchant: Merchant
  offers?: OfferDef[]
  compact?: boolean
}

const DEFAULT_OFFERS: OfferDef[] = [
  {
    lenderKey: 'carecredit',
    approvedAmount: '$5,000',
    monthlyPayment: '$135 /mo',
    apr: '0.00% APR · 36-month promo',
    promoLabel: 'Pre-qualified',
  },
  {
    lenderKey: 'sonrava',
    approvedAmount: '$2,500',
    monthlyPayment: '$99 /mo',
    apr: 'Installment loan',
    promoLabel: 'Pre-approved up to',
  },
]

/**
 * Elective-medical Step 2 — Multi-lender choice.
 *
 * The signature EM moment: instead of cascading through one lender at a
 * time, the patient sees every pre-qualified offer side-by-side and picks
 * which one to advance with — directly in-chair on the operatory tablet.
 *
 * Modeled on the Western Dental × CareCredit / Sonrava "MULTI LENDER CHOICE"
 * boards.
 */
export function StepEMOffers({ merchant, offers = DEFAULT_OFFERS, compact = false }: StepEMOffersProps) {
  const accent = merchant.headlineColor ?? merchant.brandColor ?? 'var(--accent)'
  const ctaAccent = merchant.ctaColor ?? 'var(--cta)'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3
          className={
            compact
              ? 'text-[18px] font-extrabold tracking-tight'
              : 'text-[24px] font-extrabold tracking-tight'
          }
          style={{ color: accent }}
        >
          Congratulations
        </h3>
        <p className="text-[13.5px] font-medium text-[var(--text-primary)]">
          You have multiple offers!
        </p>
      </div>

      <div className={cn('grid gap-3', compact ? 'grid-cols-1' : 'grid-cols-2')}>
        {offers.map((offer, i) => {
          const l = getLender(offer.lenderKey)
          const isFeatured = i === 0
          return (
            <article
              key={offer.lenderKey}
              className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card-bg-raised)] p-4 shadow-[var(--shadow-sm)]"
              style={
                isFeatured
                  ? { borderColor: ctaAccent, boxShadow: `0 0 0 1px ${ctaAccent}` }
                  : undefined
              }
            >
              <header className="flex items-center justify-between gap-2">
                {l.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={l.logo.src}
                    alt={l.name}
                    style={{ height: 22, width: 'auto', maxWidth: 130 }}
                    className="object-contain object-left"
                  />
                ) : (
                  <span
                    className="text-[14px] font-semibold tracking-tight"
                    style={{ color: l.brandColor }}
                  >
                    {l.shortName}
                  </span>
                )}
                {isFeatured && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white"
                    style={{ background: ctaAccent }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                    Best Match
                  </span>
                )}
              </header>

              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {offer.promoLabel ?? 'Pre-qualified for'}
                </span>
                <span
                  className="text-[28px] font-extrabold tracking-tight"
                  style={{ color: l.brandColor }}
                >
                  {offer.approvedAmount}
                </span>
                {offer.monthlyPayment && (
                  <span className="text-[12px] text-[var(--text-secondary)]">
                    {offer.monthlyPayment} · {offer.apr}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="mt-auto rounded-full px-4 py-2 text-[12.5px] font-semibold text-white shadow-[var(--shadow-xs)] transition-transform active:scale-[0.98]"
                style={{ background: l.brandColor }}
              >
                Continue with {l.shortName}
              </button>
            </article>
          )
        })}
      </div>

      <p className="text-center text-[11.5px] leading-[1.6] text-[var(--text-tertiary)]">
        Choose the offer that works best for your treatment plan. You can review the terms before
        accepting. Your selection won&apos;t affect your credit score.
      </p>
    </div>
  )
}
