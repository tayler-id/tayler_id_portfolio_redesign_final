'use client'

import React from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import type { Lender } from '../../_system/data/lenders'

interface StepPrequalProps {
  lender: Lender
  amount?: string
  compact?: boolean
}

export function StepPrequal({
  lender,
  amount = '$4,500.00',
  compact = false,
}: StepPrequalProps) {
  return (
    <div className="flex flex-col gap-5 text-center">
      <div className="flex flex-col gap-1">
        <h3
          className={
            compact
              ? 'text-[19px] font-bold tracking-tight text-[var(--text-primary)]'
              : 'text-[22px] font-bold tracking-tight text-[var(--text-primary)]'
          }
        >
          Congratulations!
        </h3>
        <p
          className={
            compact
              ? 'mx-auto max-w-[280px] text-[12.5px] leading-relaxed text-[var(--text-secondary)]'
              : 'mx-auto max-w-[440px] text-[13.5px] leading-relaxed text-[var(--text-secondary)]'
          }
        >
          You have been pre-qualified for a {lender.name} account issued by First Electronic Bank,
          Member FDIC.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span
          className="text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Approval Amount
        </span>
        <span
          className={
            compact
              ? 'text-[36px] font-bold tracking-tight text-[var(--text-primary)]'
              : 'text-[48px] font-bold tracking-tight text-[var(--text-primary)]'
          }
        >
          {amount}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <p
          className="text-[12px] font-semibold text-[var(--text-primary)]"
        >
          Select a financing option that works for you
        </p>

        {/* Treatment amount stepper */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11.5px] font-semibold tracking-tight text-[var(--text-primary)]">
            Treatment: $3,000.00
          </span>
          <div className="flex items-stretch overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)]">
            <button
              className="flex items-center justify-center bg-[var(--cta)] px-3 text-[var(--cta-text)]"
              aria-label="Decrease"
              type="button"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
            <div className="flex min-w-[120px] items-center justify-center bg-[var(--card-bg)] px-4 text-[13.5px] font-semibold text-[var(--text-primary)]">
              $3,000.00
            </div>
            <button
              className="flex items-center justify-center bg-[var(--cta)] px-3 text-[var(--cta-text)]"
              aria-label="Increase"
              type="button"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Offer card */}
        <div className="mt-1 flex items-start justify-between gap-3 rounded-[var(--radius-md)] border-2 border-[var(--cta)] bg-[var(--card-bg)] p-3 text-left">
          <div className="flex flex-col gap-0.5">
            {lender.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lender.logo.src}
                alt={lender.name}
                style={{ height: 22, width: 'auto' }}
                className="object-contain object-left"
              />
            ) : (
              <span
                className="text-[13px] font-semibold tracking-tight"
                style={{ color: lender.brandColor }}
              >
                {lender.shortName}
              </span>
            )}
            <span className="mt-1 text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>
              Revolving Line of Credit
            </span>
            <span className="text-[11.5px] font-semibold" style={{ color: 'var(--cta)' }}>
              29.99% APR
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[12px] font-bold text-white"
              style={{ background: 'var(--cta)' }}
            >
              $149/mo
            </span>
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-[var(--cta)] bg-[var(--cta)]">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
