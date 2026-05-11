'use client'

import React from 'react'
import {
  FormSection,
  ShowInput,
  RadioYesNo,
  Checkbox,
  Disclosure,
} from '../../_system/primitives'
import type { Merchant } from '../../_system/data/merchants'

interface StepHIEligibilityFormProps {
  merchant: Merchant
  /** When true, render the post-modal filled-in variant (cell phone shown,
   *  Additional Info + Lender Pre-Qualification Terms appended). */
  filled?: boolean
  compact?: boolean
}

/**
 * West Shore Home — "You may be eligible for multiple offers" eligibility form.
 *
 * Two variants:
 *  - default: empty form, fields show placeholder labels
 *  - filled:  same form with Cell Phone populated and the Additional Info +
 *             Lender Pre-Qualification Terms & Conditions sections appended
 *             (matches Figma frame 392 — post-modal state).
 */
export function StepHIEligibilityForm({
  merchant,
  filled = false,
  compact = false,
}: StepHIEligibilityFormProps) {
  const accent = merchant.headlineColor ?? merchant.brandColor ?? 'var(--accent)'
  const colsTwo = compact ? 'grid-cols-1' : 'grid-cols-2'
  const colsThree = compact ? 'grid-cols-1' : 'grid-cols-3'
  const inputSize = 'sm' as const

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-[14px] font-extrabold uppercase tracking-tight"
          style={{ color: accent }}
        >
          You may be eligible for multiple offers!
        </h3>
        <p className="text-[11px] leading-[1.55] text-[var(--text-secondary)]">
          You may be eligible for multiple offers. We just need a few more pieces of information to
          submit your application to multiple lenders.
        </p>
      </div>

      <FormSection
        title="Financial"
        accentColor={accent}
        bodyClassName={`gap-2.5 ${colsTwo}`}
      >
        <ShowInput size={inputSize} label="Gross Annual Income*" affordance="chevron" />
        <ShowInput size={inputSize} label="Income Type*" affordance="chevron" />
        <p className="col-span-full text-[9.5px] leading-[1.5] text-[var(--text-secondary)]">
          <span className="font-bold">Annual / Yearly salary</span> (before taxes), alimony, child
          support, investment income, social security, etc.{' '}
          <span className="font-bold">NOTICE:</span> Alimony, child support, or separate maintenance
          payments need not be revealed if you do not wish to have it considered as a basis for
          repaying this account.{' '}
          <span className="font-bold">Married Wisconsin Residents:</span> If you are applying for an
          individual account and your spouse is also a Wisconsin resident, combine you and your
          spouse&apos;s financial information.
        </p>
        <ShowInput
          size={inputSize}
          label="Years of Income From Current Source*"
          affordance="chevron"
          className="col-span-full"
        />
        <ShowInput size={inputSize} label="All Other Household Income" />
        <ShowInput size={inputSize} label="All Other Household Income Type" />
        <Checkbox label="is non taxable income" accentColor={accent} className="col-span-full" />
      </FormSection>

      <FormSection
        title="Employment"
        accentColor={accent}
        bodyClassName={`gap-2.5 ${colsTwo}`}
      >
        <ShowInput size={inputSize} label="Employer Name*" />
        <ShowInput size={inputSize} label="Job Title*" />
        <p className="col-span-full text-[9.5px] leading-[1.5] text-[var(--text-secondary)]">
          If retired, enter <span className="font-bold">retired.</span> If unemployed, enter{' '}
          <span className="font-bold">unemployed.</span>
        </p>
        <ShowInput size={inputSize} label="Employer  ZIP Code*" />
        <ShowInput size={inputSize} label="Time at Employer (Years)*" />
      </FormSection>

      <FormSection
        title="Identification"
        accentColor={accent}
        bodyClassName={`gap-2.5 ${colsThree}`}
      >
        <ShowInput size={inputSize} label="ID Number*" affordance="chevron" />
        <ShowInput size={inputSize} label="ID Type*" affordance="chevron" />
        <ShowInput size={inputSize} label="ID State*" affordance="chevron" />
        <RadioYesNo
          question="Are you a U.S. Citizen?*"
          accentColor={accent}
          className="col-span-full"
        />
        <RadioYesNo
          question="Are you active military?*"
          accentColor={accent}
          className="col-span-full"
        />
      </FormSection>

      <FormSection title="Mobile Opt-in" accentColor={accent}>
        <ShowInput size={inputSize} label={filled ? '(717) 574-9248' : 'Cell Phone*'} />
        <Checkbox
          label='I would like to receive marketing text messages about this account.'
          accentColor={accent}
        />
        <Disclosure
          accentColor={accent}
          segments={[
            'By checking "Yes," you authorize any financial institution that makes a ',
            { link: true, text: 'GreenSky® Program' },
            ' loan to you to send agents, contractors, successors, assigns, or service providers to contact you at this mobile number, and any other number you provide to us in the future, for any reason. This authorization is for telephone calls, texts, and prerecorded or artificial voice messages, and is delivered via automated telephone dialing systems. Carrier messages, including, but not limited to, ',
            { link: true, text: '(722) 543-9248' },
            ' may apply. Your hope to receive consent at any time by contacting us at 1-866-936-0602 or 833-254-3909, Atlanta, GA 30331.',
          ]}
        />
      </FormSection>

      {filled && (
        <>
          <FormSection title="Additional Info" accentColor={accent}>
            <ShowInput size={inputSize} label="Down Payment" />
          </FormSection>

          <FormSection
            title="Lender Pre-Qualification Terms & Conditions"
            accentColor={accent}
          >
            <Checkbox
              checked
              accentColor={accent}
              label={
                <>
                  I/we, the applicants, authorize{' '}
                  <span style={{ color: accent }} className="underline">
                    Sunlight Financial
                  </span>{' '}
                  to obtain credit reports and any other information necessary to evaluate this loan
                  request.
                </>
              }
            />
            <p className="text-[11px] leading-[1.5] text-[var(--text-secondary)]">
              <span className="font-bold">Cell Phone:</span>{' '}
              <span style={{ color: accent }} className="underline">
                717-574-9248
              </span>
            </p>
            <Disclosure
              accentColor={accent}
              segments={[
                'By providing your phone number(s), you are providing express consent to be contacted at this telephone number, including by automatic telephone dialing systems and prerecorded voice messages, by Sunlight Financial, its subsidiaries or affiliates, and its agents, in connection with your loan or this application.',
              ]}
            />
          </FormSection>
        </>
      )}
    </div>
  )
}
