'use client'

import React from 'react'
import { Checkbox } from './checkbox'
import type { Lender } from '../data/lenders'

interface LenderTermsBlockProps {
  lender: Lender
  /** Whether the consent checkbox is rendered as checked. */
  checked?: boolean
  /** Consent line shown next to the checkbox. */
  consentLine: React.ReactNode
  /** Long disclosure paragraph(s) below the checkbox. */
  body: React.ReactNode
  accentColor?: string
}

/**
 * Per-lender pre-qualification terms block. Repeats once per lender in the
 * cascade — each gets its own brand heading, consent checkbox, and body.
 *
 * Matches the WSH "Lender Pre-Qualification Terms & Conditions" section.
 */
export function LenderTermsBlock({
  lender,
  checked = false,
  consentLine,
  body,
  accentColor,
}: LenderTermsBlockProps) {
  return (
    <div className="flex flex-col gap-2">
      <h5
        className="text-[14px] font-semibold tracking-tight"
        style={{ color: lender.brandColor }}
      >
        {lender.name}
      </h5>
      <Checkbox checked={checked} label={consentLine} accentColor={accentColor} size="sm" />
      <div className="pl-6 text-[11px] leading-[1.6] text-[var(--text-secondary)]">{body}</div>
    </div>
  )
}
