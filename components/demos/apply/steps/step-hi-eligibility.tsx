'use client'

import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { SelectedOfferRow } from '../../_system/primitives'
import { getLender, type Lender, type LenderKey } from '../../_system/data/lenders'
import type { Merchant } from '../../_system/data/merchants'

interface StepHIEligibilityProps {
  lender: Lender
  merchant: Merchant
  cascadeKeys?: LenderKey[]
  compact?: boolean
}

export function StepHIEligibility({
  merchant,
  compact = false,
}: StepHIEligibilityProps) {
  const accent = merchant.headlineColor ?? merchant.brandColor ?? 'var(--accent)'
  const sunlight = getLender('sunlight')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h3
          className={
            compact
              ? 'text-[14px] font-extrabold uppercase tracking-tight'
              : 'text-[22px] font-extrabold uppercase tracking-tight'
          }
          style={{ color: accent }}
        >
          Let&apos;s Review Your Selection
        </h3>
        <p
          className={
            compact
              ? 'text-[11px] leading-[1.5] text-[var(--text-secondary)]'
              : 'text-[12.5px] leading-[1.55] text-[var(--text-secondary)]'
          }
        >
          DEMO, we are all about transparency. We want to make sure you understand your offer before we
          finalize your application.
        </p>
      </div>

      <SelectedOfferRow
        lender={sunlight}
        loanType="Installment Loan"
        terms="Special Rate of 9.99% APR"
        subterms="With 60 Equal Monthly Payments"
        amount="$43/mo"
        accent={accent}
        compact={compact}
      />

      <p
        className={
          compact
            ? 'text-center text-[10.5px] leading-[1.5] text-[var(--text-secondary)]'
            : 'text-center text-[11.5px] leading-[1.5] text-[var(--text-secondary)]'
        }
      >
        Adjust your down payment amount to monthly payment by using the buttons below, or by entering a
        custom amount.
      </p>

      <DownPaymentStepper value="$0.00" accent={accent} />

      <div className="flex flex-col gap-2">
        <p className="text-[11.5px] font-bold" style={{ color: accent }}>
          Please review your payment details below
        </p>
        <PaymentTable
          compact={compact}
          rows={[
            { label: 'Financing Provided By', value: 'Sunlight Financial Finance', header: true },
            { label: 'Credit Limit Up To', value: '$3,800.00' },
            { label: 'Total Purchase Amount', value: '$2,300.00' },
            { label: 'Total Down Payment', value: '$0.00' },
            { label: 'Total Finance Amount', value: '$2,000.00' },
          ]}
        />
      </div>
    </div>
  )
}


function DownPaymentStepper({ value, accent }: { value: string; accent: string }) {
  return (
    <div className="mx-auto flex w-full max-w-[260px] items-stretch overflow-hidden rounded-md border border-[var(--border)]">
      <button
        type="button"
        className="flex w-12 items-center justify-center transition-opacity hover:opacity-90"
        style={{ background: `color-mix(in oklab, ${accent} 18%, transparent)` }}
        aria-label="Decrease down payment"
      >
        <ChevronDown className="h-4 w-4" style={{ color: accent }} />
      </button>
      <div className="flex flex-1 items-center justify-center text-[14px] font-medium text-[var(--text-secondary)]">
        {value}
      </div>
      <button
        type="button"
        className="flex w-12 items-center justify-center transition-opacity hover:opacity-90"
        style={{ background: accent }}
        aria-label="Increase down payment"
      >
        <ChevronUp className="h-4 w-4 text-white" />
      </button>
    </div>
  )
}

function PaymentTable({
  rows,
  compact = false,
}: {
  rows: Array<{ label: string; value: string; header?: boolean }>
  compact?: boolean
}) {
  const padding = compact ? 'px-2.5 py-1.5' : 'px-3 py-2'
  const textSize = compact ? 'text-[10.5px]' : 'text-[11.5px]'
  return (
    <table className={`w-full overflow-hidden rounded-md border border-[var(--border)] ${textSize}`}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.label} className={i === 0 ? '' : 'border-t border-[var(--border)]'}>
            <td
              className={`align-top ${padding} text-[var(--text-primary)] ${
                row.header ? 'font-bold' : ''
              }`}
            >
              {row.label}
            </td>
            <td
              className={`align-top ${padding} text-[var(--text-primary)] ${
                row.header ? 'font-bold' : ''
              }`}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
