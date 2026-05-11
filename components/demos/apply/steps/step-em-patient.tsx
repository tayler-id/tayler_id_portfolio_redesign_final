'use client'

import React from 'react'
import {
  ShowInput,
  FormSection,
  Checkbox,
  Disclosure,
  RadioYesNo,
} from '../../_system/primitives'
import type { Lender } from '../../_system/data/lenders'
import type { Merchant } from '../../_system/data/merchants'

interface StepEMPatientProps {
  lender: Lender
  merchant: Merchant
  compact?: boolean
}

/**
 * Elective-medical Step 1 — Patient information.
 *
 * Modeled on the Western Dental × CareCredit / Sonrava form (Figma EM panel
 * "Multi Lender Choice — Tablet, Patient Info"). Distinct from the WSH HI
 * form in field set: care provider, treatment estimate, insurance, and the
 * minor/guardian status that EM consumers see.
 */
export function StepEMPatient({ merchant, compact = false }: StepEMPatientProps) {
  const accent = merchant.headlineColor ?? merchant.brandColor ?? 'var(--accent)'
  const ctaAccent = merchant.ctaColor ?? 'var(--cta)'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h3
          className={
            compact
              ? 'text-[15px] font-extrabold uppercase tracking-tight'
              : 'text-[20px] font-extrabold uppercase tracking-tight'
          }
          style={{ color: accent }}
        >
          Patient Information
        </h3>
        <p className="text-[12.5px] leading-[1.55] text-[var(--text-secondary)]">
          By providing your contact information below, delivery of any service or item by phone is
          for any purpose. You will be contacted via call or text message about your application
          status. Standard message and data rates may apply.
        </p>
      </div>

      <FormSection title="Patient" accentColor={accent} bodyClassName={compact ? '' : 'grid-cols-2'}>
        <ShowInput label="First Name*" />
        <ShowInput label="Last Name*" />
        <ShowInput label="Date of Birth*" affordance="calendar" />
        <ShowInput label="Email*" />
        <ShowInput label="Primary Phone*" />
        <ShowInput label="Type*" affordance="chevron" />
      </FormSection>

      <RadioYesNo question="Is the patient a minor?" selected="no" accentColor={ctaAccent} />

      <FormSection title="Treatment" accentColor={accent} bodyClassName={compact ? '' : 'grid-cols-2'}>
        <ShowInput label="Estimated Treatment Cost*" />
        <ShowInput label="Treatment Type*" affordance="chevron" />
        <ShowInput label="Procedure Date*" affordance="calendar" />
        <ShowInput label="Office Location*" affordance="chevron" />
      </FormSection>

      <FormSection title="Insurance" accentColor={accent}>
        <RadioYesNo
          question="Do you have dental insurance?*"
          selected="yes"
          accentColor={ctaAccent}
        />
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3'}>
          <ShowInput label="Insurance Carrier" />
          <ShowInput label="Member ID" />
        </div>
      </FormSection>

      <Disclosure
        accentColor={accent}
        segments={[
          'By providing your information, you authorize ',
          { link: true, text: merchant.name },
          ' and its participating lenders to obtain consumer credit reports for the purpose of pre-qualifying you for in-office treatment financing. Pre-qualification will not affect your credit score.',
        ]}
      />

      <Checkbox
        accentColor={ctaAccent}
        checked
        label="I confirm the information above is accurate and authorize a soft credit inquiry."
      />
    </div>
  )
}
