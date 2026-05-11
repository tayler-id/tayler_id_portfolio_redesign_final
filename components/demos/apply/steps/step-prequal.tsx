'use client'

import React from 'react'
import type { Lender } from '../../_system/data/lenders'

interface StepPrequalProps {
  lender: Lender
  /** Merchant display name woven into the invite copy (e.g. "CITY Furniture"). */
  merchantName?: string
  /** Applicant display name shown in the invite line. */
  applicantName?: string
  /** Eligible credit-line amount displayed as the hero figure. */
  amount?: string
  compact?: boolean
}

export function StepPrequal({
  lender,
  merchantName = 'CITY Furniture',
  applicantName = 'John Doe',
  amount = '$2,400.00',
  compact = false,
}: StepPrequalProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p
          className="text-[15px] font-semibold tracking-tight"
          style={{ color: lender.brandColor }}
        >
          {lender.name}
        </p>
        <p className="text-[14.5px] leading-relaxed text-[var(--text-primary)] max-w-prose">
          <span className="font-semibold">{applicantName}</span>, you&rsquo;re invited to apply
          to finance your {merchantName} purchase through {lender.name}.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 py-2">
        <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">
          You may be eligible for a credit line of
        </p>
        <p
          className={
            (compact ? 'text-[40px] ' : 'text-[48px] sm:text-[56px] ') +
            'font-bold leading-none tracking-tight'
          }
          style={{ color: 'var(--positive)' }}
        >
          {amount}
        </p>
        <p className="text-[12.5px] font-semibold text-[var(--text-primary)] mt-2">
          Click continue to see your offer!
        </p>
      </div>
    </div>
  )
}
