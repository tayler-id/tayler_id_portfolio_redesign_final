'use client'

import React from 'react'
import { ShowInput, FormSection, Checkbox } from '../../_system/primitives'
import type { Lender } from '../../_system/data/lenders'
import type { Merchant } from '../../_system/data/merchants'

interface StepHIPersonalProps {
  lender: Lender
  merchant: Merchant
  compact?: boolean
}

/**
 * Home-improvement Step 1 — Personal / Address / Installation Address / Contact.
 *
 * Modeled on the West Shore Home × Sunlight Financial application form
 * (Figma board "Group 43") — the consumer's first screen after entering the
 * apply flow from the in-home sales appointment.
 */
export function StepHIPersonal({ merchant, compact = false }: StepHIPersonalProps) {
  const accent = merchant.headlineColor ?? merchant.brandColor ?? 'var(--accent)'

  return (
    <div className="flex flex-col gap-5">
      {/* Headline block — merchant-tone marketing line */}
      <div className="flex flex-col gap-1.5">
        <h3
          className={
            compact
              ? 'text-[15px] font-extrabold uppercase tracking-tight'
              : 'text-[20px] font-extrabold uppercase tracking-tight'
          }
          style={{ color: accent }}
        >
          To get started we need to learn more about you
        </h3>
        <p className="text-[12.5px] leading-[1.55] text-[var(--text-secondary)]">
          Some of the information needed to apply has already been collected from our records. We&apos;ll
          just need a few additional pieces of information to connect you with financing.
        </p>
      </div>

      <FormSection
        title="Personal"
        accentColor={accent}
        rightNote="* Required Field"
        bodyClassName={compact ? '' : 'grid-cols-2'}
      >
        <ShowInput label="First Name*" />
        <ShowInput label="Last Name*" />
        <ShowInput label="Date of Birth*" affordance="calendar" />
        <ShowInput label="Social Security Number*" affordance="eye" />
      </FormSection>

      <FormSection title="Address" accentColor={accent}>
        <ShowInput label="Street*" />
        <p className="-mt-1 text-[10.5px] font-semibold text-[var(--text-tertiary)]">
          PO Boxes are not accepted
        </p>
        <ShowInput label="Apt/Suite/Other" />
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-[1fr_1fr_140px] gap-3'}>
          <ShowInput label="City*" />
          <ShowInput label="State*" affordance="chevron" />
          <ShowInput label="ZIP Code*" />
        </div>
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3'}>
          <ShowInput label="Housing*" affordance="chevron" />
          <ShowInput label="Years at Current Residence*" />
        </div>
        <ShowInput label="Monthly Housing Payment Amount*" />
      </FormSection>

      <FormSection title="Installation Address" accentColor={accent}>
        <Checkbox
          checked
          accentColor={merchant.ctaColor}
          label="Installation address information is same as address information"
        />
      </FormSection>

      <FormSection title="Contact" accentColor={accent}>
        <Checkbox label="You, the applicant, agree and understand the following notice*" />
        <p className="text-[11.5px] leading-[1.55] text-[var(--text-secondary)]">
          By providing your contact information below, including any cellular or other phone numbers,
          you agree to be contacted by any of the lenders who receive your information through this
          the Merchant financing process via calls to cell phones, text messages or telephone calls,
          including the use of artificial or pre-recorded message calls, as well as calls made via
          automatic telephone dialing systems, or via e-mail.
        </p>
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3'}>
          <ShowInput label="Home Phone*" />
          <ShowInput label="Cell Phone*" />
        </div>
        <ShowInput label="Email*" />
      </FormSection>
    </div>
  )
}
