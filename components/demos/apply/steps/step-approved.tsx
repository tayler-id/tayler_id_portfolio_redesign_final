'use client'

import React from 'react'
import type { Lender } from '../../_system/data/lenders'

interface StepApprovedProps {
  lender: Lender
  amount?: string
  compact?: boolean
}

export function StepApproved({
  lender,
  amount = '$4,500.00',
  compact = false,
}: StepApprovedProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h3
          className={
            compact
              ? 'text-[19px] font-bold tracking-tight text-[var(--text-primary)]'
              : 'text-[22px] font-bold tracking-tight text-[var(--text-primary)]'
          }
        >
          Congratulations!
        </h3>
        <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
          Your {lender.name} account credit limit is
        </p>
        <span
          className={
            compact
              ? 'text-[36px] font-bold tracking-tight'
              : 'text-[48px] font-bold tracking-tight'
          }
          style={{ color: 'var(--positive)' }}
        >
          {amount}
        </span>
      </div>

      <section className="flex flex-col gap-2">
        <h4 className="text-[13.5px] font-bold tracking-tight text-[var(--text-primary)]">
          Before You Leave
        </h4>
        <p className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
          Let your dentist know that you were approved. Take all of your printed documents with you.
          We will reach out within 24 hours to answer any questions you may have. Schedule your next
          appointment and make your initial down payment.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h4 className="text-[13.5px] font-bold tracking-tight text-[var(--text-primary)]">
          Patient Financing Promise
        </h4>
        <p className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
          At Dental Practice, we strive for your total satisfaction. The Patient Financing Promise
          allows you to cancel your financing within 9 days of offer acceptance. We will be
          responsible for any treatment costs already incurred. That's our promise. We want to make
          sure you understand your offer before we finalize your application.
        </p>
      </section>
    </div>
  )
}
