'use client'

import React from 'react'
import {
  ShowInput,
  FormSection,
  Checkbox,
  RadioYesNo,
  Disclosure,
  LenderTermsBlock,
} from '../../_system/primitives'
import { getLender, type Lender, type LenderKey } from '../../_system/data/lenders'
import type { Merchant } from '../../_system/data/merchants'

interface StepHIEligibilityProps {
  lender: Lender
  merchant: Merchant
  /** Lender cascade for the merchant's vertical, used to render T&C blocks. */
  cascadeKeys?: LenderKey[]
  compact?: boolean
}

/**
 * Home-improvement Step 2 — eligibility for multiple offers.
 *
 * Modeled on the West Shore Home × Sunlight Financial form ("Frame 392") —
 * runs the consumer through Financial, Employment, Identification, and
 * Mobile Opt-In sections, then surfaces per-lender pre-qualification T&Cs.
 */
export function StepHIEligibility({
  merchant,
  cascadeKeys = ['sunlight', 'wells-fargo'],
  compact = false,
}: StepHIEligibilityProps) {
  const accent = merchant.headlineColor ?? merchant.brandColor ?? 'var(--accent)'
  const ctaAccent = merchant.ctaColor ?? 'var(--cta)'

  return (
    <div className="flex flex-col gap-6">
      {/* Headline */}
      <div className="flex flex-col gap-1.5">
        <h3
          className={
            compact
              ? 'text-[15px] font-extrabold uppercase tracking-tight'
              : 'text-[20px] font-extrabold uppercase tracking-tight'
          }
          style={{ color: accent }}
        >
          You may be eligible for multiple offers!
        </h3>
        <p className="text-[12.5px] leading-[1.55] text-[var(--text-secondary)]">
          You may be eligible for multiple offers. We just need a few more pieces of information to
          submit your application to multiple lenders.
        </p>
      </div>

      {/* Financial */}
      <FormSection title="Financial" accentColor={accent}>
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3'}>
          <ShowInput label="Gross Annual Income*" />
          <ShowInput label="Income Type*" affordance="chevron" />
        </div>
        <p className="-mt-1 text-[10.5px] leading-[1.5] text-[var(--text-tertiary)]">
          <span className="font-semibold">Annual / hourly salary</span> (before taxes), alimony, child
          support, investment income, social security, etc. <span className="font-semibold">NOTICE:</span>{' '}
          Alimony, child support, or separate maintenance income need not be revealed if you do not wish
          for it to be considered as a basis for repaying this account.
        </p>
        <ShowInput label="Years of Income From Current Source*" affordance="chevron" />
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-3'}>
          <ShowInput label="All Other Household Income" />
          <ShowInput label="All Other Household Income Type" affordance="chevron" />
        </div>
        <Checkbox label="Is non taxable income" />
      </FormSection>

      {/* Employment */}
      <FormSection
        title="Employment"
        accentColor={accent}
        bodyClassName={compact ? '' : 'grid-cols-2'}
      >
        <ShowInput label="Employer Name*" />
        <ShowInput label="Job Title*" />
        <p className="text-[10.5px] text-[var(--text-tertiary)] -mt-1">
          If retired, enter retired. If unemployed, enter unemployed.
        </p>
        <span />
        <ShowInput label="Employer ZIP Code*" />
        <ShowInput label="Time at Employer (Years)*" />
      </FormSection>

      {/* Identification */}
      <FormSection title="Identification" accentColor={accent}>
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-3 gap-3'}>
          <ShowInput label="ID Number*" />
          <ShowInput label="ID Type*" affordance="chevron" />
          <ShowInput label="ID State*" affordance="chevron" />
        </div>
        <RadioYesNo question="Are you a U.S. Citizen?*" selected="yes" accentColor={ctaAccent} />
        <RadioYesNo question="Are you active military?*" selected="no" accentColor={ctaAccent} />
      </FormSection>

      {/* Mobile opt-in */}
      <FormSection title="Mobile Opt-In" accentColor={accent}>
        <ShowInput label="Cell Phone*" />
        <Checkbox label="Yes, I would like to receive servicing text messages about my account.*" />
      </FormSection>

      {/* TCPA-style disclosure */}
      <Disclosure
        accentColor={accent}
        segments={[
          'By checking "Yes" you authorize any financial institution that makes a GreenSky® Program loan to you and its agents, contractors, successors, assigns, or service providers to contact you at this mobile number, and any future number that you provide for your cellular telephone or other wireless device, by phone or text message using automated telephone dialing system or artificial or prerecorded voice messages, for any legal purpose, including, but not limited to, 29429 a loan. You may revoke your consent at any time by contacting us at 1-866-936-0602 or P.O. Box 29429, Atlanta, GA 30359.',
        ]}
      />

      {/* Additional Info */}
      <FormSection title="Additional Info" accentColor={accent}>
        <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-[200px_1fr] gap-3'}>
          <ShowInput label="Down Payment" />
          <span />
        </div>
      </FormSection>

      {/* Lender Pre-Qualification Terms & Conditions */}
      <section className="flex flex-col gap-4">
        <h4
          className="border-b border-[var(--border)] pb-1.5 text-[15px] font-bold tracking-tight"
          style={{ color: accent }}
        >
          Lender Pre-Qualification Terms & Conditions
        </h4>
        {cascadeKeys.map((key) => {
          const lender = getLender(key)
          if (key === 'sunlight') {
            return (
              <LenderTermsBlock
                key={key}
                lender={lender}
                checked
                accentColor={ctaAccent}
                consentLine={
                  <>
                    I/we, the applicant and co-applicant (if applicable),
                  </>
                }
                body={
                  <>
                    have reviewed the Notice About Use of Credit Reporting Act for Sunlight Financial,
                    Financial Network, Inc., and any and all financial institutions that may review
                    my/our request to obtain one or more consumer credit reports from one or more
                    consumer reporting agencies in order to process my/our credit application. I/we
                    are also providing express written consent for the above financial institutions to
                    obtain a recent consumer credit report 365 days from today if the lender PII
                    system has not been installed or my home improvement project has not been completed
                    within 180 days from today, or my installer has not requested funding from
                    Sunlight within 180 days from today and the installer requires that I obtain a
                    credit extension. I/we understand that today&apos;s credit report is a soft pull of
                    credit and that a hard inquiry will appear on my/our credit report after the
                    contractor requests funds from Sunlight. I/we understand that any subsequent
                    requests for an extension prior to the contractor requesting funds from Sunlight
                    will be soft pulls of credit and any requests for an extension after the
                    contractor requests funds from Sunlight results in an additional hard inquiry
                    which may affect my/our credit score. Such information shall be deemed to be
                    application information.
                    <br />
                    <br />
                    <span className="inline-block font-semibold" style={{ color: accent }}>
                      Cell Phone: 717-574-3245
                    </span>
                    <br />
                    <br />
                    By providing your phone number above, you are providing express written consent
                    for Sunlight Financial and one of its solar or home improvement partners to call
                    you (including through automated means, e.g. autodialing and pre-recorded or
                    artificial voice calls) on a telephone or mobile device. You are providing this
                    consent even if your telephone number is currently listed on any internal,
                    corporate, state, federal or national Do-Not-Call (DNC) list. Message and data
                    rates may apply. You understand that your consent to receive such calls is not a
                    condition of buying any goods or services from Sunlight Financial or its partners
                    and will not affect whether they provide goods or services to you.
                    <br />
                    <br />
                    Sales, wages, interest, dividends, rental income, retirement benefits. If you are
                    21 or older, you may include income from others that you can reasonably access to
                    pay your bills. If adding a co-applicant that lives in the home, then each
                    applicant should verify that their individual incomes. If "Self-Employed", please
                    provide the sum of your business net income. If "Retired", please provide your
                    previous employer information.
                    <br />
                    <br />
                    By tapping Confirm and Continue, you agree to receive information electronically
                    pursuant to the <span style={{ color: accent }} className="underline">Sunlight E-Sign disclosure</span>.
                    <br />
                    <br />
                    <span style={{ color: accent }} className="underline">Terms of Service</span> |{' '}
                    <span style={{ color: accent }} className="underline">Privacy Policy</span>
                  </>
                }
              />
            )
          }
          if (key === 'wells-fargo') {
            return (
              <LenderTermsBlock
                key={key}
                lender={lender}
                accentColor={ctaAccent}
                consentLine={
                  <>
                    By tapping &quot;Confirm &amp; Continue&quot; you are providing written
                    instruction to Service Finance Company, LLC to obtain your consumer credit report
                    from one or more consumer reporting agencies to evaluate your request for
                    prequalification.
                  </>
                }
                body={
                  <>
                    You agree that the information that you are providing is true, correct and accurate
                    to the best of your knowledge, and that you are at least 18 years of age. You
                    understand that by submitting this request for prequalification that Service
                    Finance may perform one or more soft credit inquiries to consumer reporting
                    agencies which will not affect your credit score. If you choose to continue your
                    application, then Service Finance will request a full credit report from one or
                    more consumer reporting agencies, which will be a "hard" credit pull which can
                    affect your credit score and can be seen by third parties. A prequalification
                    approval is not a guarantee of a full application approval.
                    <br />
                    <br />
                    Please read the following important notices from Service Finance before submitting
                    your request for prequalification:{' '}
                    <span style={{ color: accent }} className="underline">
                      Service Finance&apos;s Electronic Records Disclosure and Consent
                    </span>
                    ,{' '}
                    <span style={{ color: accent }} className="underline">General Application Disclosures</span>
                    ,{' '}
                    <span style={{ color: accent }} className="underline">COPPA Disclosures</span>
                    ,{' '}
                    <span style={{ color: accent }} className="underline">Privacy Policy</span>, and
                    for California residents,{' '}
                    <span style={{ color: accent }} className="underline">Consumer Rights Notice</span>.
                    By tapping &quot;Confirm &amp; Continue&quot;, you acknowledge and agree to the
                    terms contained in these notices.
                  </>
                }
              />
            )
          }
          // Generic fallback for cascade lenders not customized here
          return (
            <LenderTermsBlock
              key={key}
              lender={lender}
              accentColor={ctaAccent}
              consentLine={`I authorize ${lender.name} to obtain my consumer credit report for the purpose of pre-qualification.`}
              body={lender.declineCopy}
            />
          )
        })}
      </section>

      {/* Foundation disclosures */}
      <div className="flex flex-col gap-2">
        <h5 className="text-[12px] font-bold uppercase tracking-tight text-[var(--text-primary)]">
          Foundation Disclosures
        </h5>
        <p className="text-[11.5px] leading-[1.55] text-[var(--text-secondary)]">
          By submitting your prequalification form, you confirm you have read the{' '}
          <span style={{ color: accent }} className="underline">Terms and Conditions</span> and that
          all information is true and complete. Prequalifying is fast &amp; will not affect your
          credit score. If a formal application is submitted, a hard credit inquiry (that may affect
          the your credit score) will be made.
        </p>
        <Checkbox
          label={
            <>
              By tapping the check box you are certifying that {merchant.name} has obtained
              authorization from you to acquire consumer reports from consumer reporting agencies for
              the purpose of evaluating the availability of a prequalification offer. You understand
              that the prequalification will not affect your credit score. If a formal application is
              submitted, then a hard credit inquiry (that may affect the your credit score) will be
              made.
            </>
          }
        />
        <Checkbox
          checked
          accentColor={ctaAccent}
          label="Would you like to Pre-Qualify another applicant?"
        />
      </div>
    </div>
  )
}
