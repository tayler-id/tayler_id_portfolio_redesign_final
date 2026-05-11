'use client'

import React from 'react'
import Image from 'next/image'
import { AlertCircle } from 'lucide-react'
import { SelectedOfferRow } from '../../_system/primitives'
import { getLender, type Lender } from '../../_system/data/lenders'
import type { Merchant } from '../../_system/data/merchants'

interface StepHIPersonalProps {
  lender: Lender
  merchant: Merchant
  compact?: boolean
}

export function StepHIPersonal({ merchant, compact = false }: StepHIPersonalProps) {
  const accent = merchant.headlineColor ?? merchant.brandColor ?? 'var(--accent)'
  const sunlight = getLender('sunlight')
  const tdBank = getLender('td-bank')
  const wellsFargo = getLender('wells-fargo')

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-[13px] leading-[1.55] text-[var(--text-secondary)]">
          <span className="font-bold text-[var(--text-primary)]">Great news!</span> You&apos;ve received
          financing offers from two of our trusted lending partners, providing you with the flexibility to
          choose the offer that best suits your needs.
        </p>
        <p className="text-[13px] leading-[1.55] text-[var(--text-secondary)]">
          Choose the lender that works for you, and start your project with confidence!
        </p>
      </div>

      <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3'}>
        <OfferCard name="John Doe" lender={sunlight} approval="$12,000" accent={accent} selected compact={compact} />
        <OfferCard name="John Doe" lender={tdBank} approval="$14,900" accent={accent} compact={compact} />
      </div>

      <p className="text-[10.5px] text-center text-[var(--text-tertiary)]">
        Offers may be contingent on Proof of Home Ownership or Proof of Income
      </p>

      <SelectedOfferRow
        lender={sunlight}
        loanType="Installment Loan"
        terms="60 month @ 8.99% APR"
        subterms="with monthly loan payments of $199.23."
        amount="$199/mo"
        accent={accent}
        compact={compact}
      />

      <div className="flex items-start gap-2 rounded-md border border-[var(--border)] p-2.5 text-[10.5px] leading-[1.5] text-[var(--text-secondary)]">
        <AlertCircle
          className="mt-px h-4 w-4 flex-shrink-0 text-red-600"
          strokeWidth={2.5}
        />
        <p>
          Sorry, {wellsFargo.name}, was unable to pre-qualify you. You may proceed with the{' '}
          {wellsFargo.shortName} Application. (If you tried to pre-qualify using an ITIN{' '}
          <span style={{ color: accent }} className="underline">click here</span> to apply.) Completing
          this application will result in a hard inquiry on your credit report.
        </p>
      </div>
    </div>
  )
}

function OfferCard({
  name,
  lender,
  approval,
  accent,
  selected,
  compact = false,
}: {
  name: string
  lender: Lender
  approval: string
  accent: string
  selected?: boolean
  compact?: boolean
}) {
  const logoBoxH = compact ? 44 : 36
  return (
    <div
      className="flex flex-col gap-2 rounded-md bg-[var(--card-bg)] px-3.5 py-3.5"
      style={{
        border: selected ? `2px solid ${accent}` : '1px solid var(--border)',
      }}
    >
      <p className="text-[13.5px] font-bold leading-tight" style={{ color: accent }}>
        {name}
      </p>
      <p className="text-[11px] leading-[1.4] text-[var(--text-secondary)]">
        You have an offer from{' '}
        <span className="font-semibold text-[var(--text-primary)]">{lender.shortName}</span>
      </p>
      {lender.logo && 'src' in lender.logo && (
        <div className="flex items-center justify-center" style={{ height: logoBoxH }}>
          <Image
            src={lender.logo.src}
            alt={lender.name}
            width={lender.logo.width}
            height={lender.logo.height}
            style={{
              maxHeight: logoBoxH,
              maxWidth: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      )}
      <div className="mt-1 flex flex-col items-center gap-0.5 border-t border-[var(--border)] pt-2.5">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-[var(--text-primary)]">
          Approval Amount
        </p>
        <p
          className={
            compact
              ? 'text-[26px] font-extrabold tracking-tight'
              : 'text-[22px] font-extrabold tracking-tight'
          }
          style={{ color: accent }}
        >
          {approval}
        </p>
      </div>
    </div>
  )
}

