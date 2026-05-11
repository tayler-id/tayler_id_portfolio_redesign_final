'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'
import type { Lender } from '../_system/data/lenders'

interface DeclineCardProps {
  lender: Lender
}

export function DeclineCard({ lender }: DeclineCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card-bg)]/60 px-4 py-3">
      <AlertCircle
        className="mt-[2px] h-4 w-4 shrink-0 text-[var(--text-tertiary)]"
        strokeWidth={1.75}
      />
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Primary declined
          </span>
          <span className="text-[11px] text-[var(--text-tertiary)]">·</span>
          <span
            className="text-[12px] font-semibold tracking-tight"
            style={{ color: lender.brandColor }}
          >
            {lender.shortName}
          </span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
          {lender.declineCopy}
        </p>
      </div>
    </div>
  )
}
