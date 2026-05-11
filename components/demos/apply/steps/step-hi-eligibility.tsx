'use client'

import React from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3
          className={
            compact
              ? 'text-[17px] font-extrabold uppercase tracking-tight'
              : 'text-[22px] font-extrabold uppercase tracking-tight'
          }
          style={{ color: accent }}
        >
          Let&apos;s Review Your Selection
        </h3>
        <p className="text-[12.5px] leading-[1.55] text-[var(--text-secondary)]">
          DEMO, we are all about transparency. We want to make sure you understand your offer before we
          finalize your application.
        </p>
      </div>

      <SelectedOfferRow
        lender={sunlight}
        loanType="Installment Loan"
        terms="Special Rate of 9.99% APR With 60 Equal Monthly Payments"
        amount="$43/mo"
        accent={accent}
      />

      <p className="text-center text-[11.5px] leading-[1.5] text-[var(--text-secondary)]">
        Adjust your down payment amount to monthly payment by using the buttons below, or by entering a
        custom amount.
      </p>

      <DownPaymentStepper value="$0.00" accent={accent} />

      <div className="flex flex-col gap-2">
        <p className="text-[12px] font-bold" style={{ color: accent }}>
          Please review your payment details below
        </p>
        <PaymentTable
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

function SelectedOfferRow({
  lender,
  loanType,
  terms,
  amount,
  accent,
}: {
  lender: Lender
  loanType: string
  terms: string
  amount: string
  accent: string
}) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card-bg)]">
      <div className="w-1.5 flex-shrink-0" style={{ background: accent }} />
      <div className="flex flex-1 items-center gap-3 px-3 py-2.5 min-w-0">
        <div
          className="h-3.5 w-3.5 flex-shrink-0 rounded-full"
          style={{ border: `2px solid ${accent}` }}
        />
        {lender.logo && 'src' in lender.logo && (
          <Image
            src={lender.logo.src}
            alt={lender.name}
            width={lender.logo.width}
            height={lender.logo.height}
            style={{ height: 14, width: 'auto' }}
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-[11px] font-bold" style={{ color: accent }}>
            {loanType}
          </p>
          <p className="text-[10.5px] leading-tight text-[var(--text-secondary)]">{terms}</p>
        </div>
      </div>
      <div
        className="flex flex-shrink-0 items-center justify-center px-3"
        style={{ background: 'var(--neutral-bg)' }}
      >
        <p className="text-[12.5px] font-bold text-[var(--text-primary)]">{amount}</p>
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
}: {
  rows: Array<{ label: string; value: string; header?: boolean }>
}) {
  return (
    <table className="w-full overflow-hidden rounded-md border border-[var(--border)] text-[11.5px]">
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.label} className={i === 0 ? '' : 'border-t border-[var(--border)]'}>
            <td
              className={`align-top px-3 py-2 text-[var(--text-primary)] ${
                row.header ? 'font-bold' : ''
              }`}
            >
              {row.label}
            </td>
            <td
              className={`align-top px-3 py-2 text-[var(--text-primary)] ${
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
