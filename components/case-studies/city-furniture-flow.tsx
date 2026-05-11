'use client'

import React from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { WalkthroughStage, ShowInput, Checkbox, FormSection } from '@/components/demos/_system/primitives'
import type { WalkthroughScreen } from '@/components/demos/_system/primitives'
import { ChromeTablet } from '@/components/demos/apply/chromes/chrome-tablet'
import { ChromeMobile } from '@/components/demos/apply/chromes/chrome-mobile'
import { StepApplicant } from '@/components/demos/apply/steps/step-applicant'
import { DeclineCard } from '@/components/demos/apply/decline-card'
import { getLender, type Lender } from '@/components/demos/_system/data/lenders'
import { ThemeProvider } from '@/components/demos/_system/theme-provider'

const WELLS_FARGO = getLender('wells-fargo')
const FORTIVA = getLender('fortiva')
const STEP_LABELS = ['Applicant Info', 'Disclosures', 'Decision']
const ACCENT = '#2563eb' // matches Figma board accent (Layers blue)

function getNextLabel(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return 'Next'
    case 1:
      return 'Continue'
    case 2:
      return 'Finished'
    default:
      return 'Next'
  }
}

function renderChrome({
  compact,
  stepIndex,
  stepTitle,
  lender,
  children,
  declineSlot,
}: {
  compact: boolean
  stepIndex: number
  stepTitle: string
  lender: Lender
  children: React.ReactNode
  declineSlot?: React.ReactNode
}) {
  const baseProps = {
    merchant: 'city-furniture' as const,
    activeStepIndex: stepIndex,
    stepLabels: STEP_LABELS,
    stepTitle,
    lender,
    canBack: stepIndex > 0,
    canNext: stepIndex < STEP_LABELS.length - 1,
    nextLabel: getNextLabel(stepIndex),
    declineSlot,
  }
  return (
    <ThemeProvider project="apply" className="relative h-full w-full">
      {compact ? (
        <ChromeMobile {...baseProps}>{children}</ChromeMobile>
      ) : (
        <ChromeTablet {...baseProps} orientation="landscape">
          {children}
        </ChromeTablet>
      )}
    </ThemeProvider>
  )
}

/* ───────────────────────────────────────────────────────────────
 * SCREEN 2 — Email / phone + SYNCB prequal disclosures
 * Figma: landscape board with Fortiva header, body lead paragraph,
 * 2-col Email + Phone, "no email" checkbox, terms block.
 * ─────────────────────────────────────────────────────────────── */
function StepEmailDisclosures({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
        By providing your contact information below, including any cellular or other phone numbers,
        you agree to receive account updates and information for many of the lenders who receive
        your information through this CITY Furniture customer financing process via cell phones,
        text messages or telephone calls, including the use of artificial or pre-recorded message
        calls. Standard text messaging rates may apply.
      </p>

      <div className={compact ? 'flex flex-col gap-3' : 'grid grid-cols-2 gap-3'}>
        <ShowInput label="Email" />
        <ShowInput label="Primary Phone Type" affordance="chevron" />
      </div>

      <p className="text-[11px] text-[var(--text-tertiary)] -mt-1">
        This will only be used to send lender-specific communication.
      </p>

      <Checkbox label="I don't have an active email address" />

      <FormSection title="Lender Prequalification Terms &amp; Conditions">
        <p className="text-[11.5px] leading-relaxed text-[var(--text-secondary)]">
          I understand that this is not a credit application, but a request to be prequalified for a
          credit card issued by Synchrony Bank (&ldquo;SYNCB&rdquo;). I understand that if
          prequalified, I will need to accept the offer and complete the application process. I
          authorize SYNCB to obtain consumer reports about me to determine if I am prequalified for
          the credit card.
        </p>
        <p className="text-[11.5px] leading-relaxed text-[var(--text-secondary)] mt-2">
          This prequalification and any information I submit to SYNCB may be shared with and
          retained by CITY Furniture and the merchants it supports. I also agree that any
          information I submit with this prequalification request may be forwarded to other
          creditors or lease-to-own providers.
        </p>
      </FormSection>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────
 * SCREEN 3 — Income + Credit Authorization
 * ─────────────────────────────────────────────────────────────── */
function StepIncome({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
        We just need a few more pieces of information to submit your application.
      </p>

      <div className="flex flex-col gap-1.5">
        <ShowInput label="Annual Gross Income" />
        <p className="text-[10.5px] text-[var(--text-tertiary)]">
          This is a hint text to help user.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <ShowInput label="Additional Annual Gross Income" />
        <p className="text-[10.5px] leading-relaxed text-[var(--text-tertiary)]">
          You may include income from the applicant&apos;s spouse or household investments,
          retirement, or other sources. Alimony, child support, or separate maintenance income need
          not be included unless relied upon for loan repayment.
        </p>
      </div>

      <div className={compact ? 'flex flex-col gap-3' : 'grid grid-cols-2 gap-3'}>
        <ShowInput label="Monthly House Payment Type" affordance="chevron" />
        <ShowInput label="Monthly House Payment Amount" />
      </div>

      <FormSection title="Credit Authorization">
        <p className="text-[11.5px] leading-relaxed text-[var(--text-secondary)]">
          You understand that you are pre-qualifying for a loan under the CITY Furniture financing
          program. A provider representative will share your application information with the
          lenders in the cascade so they can return a decision.
        </p>
      </FormSection>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────
 * SCREEN 4 — Pre-qualified + amount stepper + offer card
 * ─────────────────────────────────────────────────────────────── */
function StepPrequalifiedWithCalculator({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center flex flex-col gap-1">
        <h3 className="text-[20px] font-bold tracking-tight text-[var(--text-primary)]">
          Congratulations!
        </h3>
        <p className="text-[12px] leading-relaxed text-[var(--text-secondary)] max-w-prose mx-auto">
          You have been pre-qualified for a Fortiva Retail Credit Account issued by The Bank of
          Missouri.
        </p>
      </div>

      <div className="flex flex-col items-center gap-0.5 py-1">
        <p className="text-[11.5px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
          Approved Amount
        </p>
        <p
          className={
            compact
              ? 'text-[38px] font-bold leading-none tracking-tight'
              : 'text-[46px] font-bold leading-none tracking-tight'
          }
          style={{ color: 'var(--positive)' }}
        >
          $4,500.00
        </p>
        <p className="text-[12px] font-semibold text-[var(--text-primary)] mt-1">
          Select a financing option in the amount that works for you
        </p>
      </div>

      <div className={compact ? 'flex flex-col gap-3' : 'grid grid-cols-2 gap-4 items-start'}>
        <div className="flex flex-col gap-2">
          <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
            Below is a calculator that lets you adjust the financed amount. The rate table updates
            your estimated monthly payment.
          </p>
          <p className="text-[11.5px] font-semibold text-[var(--text-primary)] mt-1">
            Treatment: $3,000.00
          </p>
          <AmountStepper value="$3,000.00" />
        </div>

        <OfferCard
          lender={FORTIVA}
          loanType="Revolving Line of Credit"
          apr="29.99% APR"
          expires="Offer Exp: 12/20/2025 (50 days)"
          description="Equal monthly payments based on your outstanding balance, will be due until you pay your balance in full. Interest will be charged to your account and included in your payment."
          amount="$149/mo"
          selected
        />
      </div>
    </div>
  )
}

function AmountStepper({ value }: { value: string }) {
  return (
    <div className="flex w-full max-w-[260px] items-stretch overflow-hidden rounded-md border border-[var(--border)]">
      <button
        type="button"
        className="flex w-11 items-center justify-center"
        style={{ background: `color-mix(in oklab, ${ACCENT} 14%, transparent)` }}
        aria-label="Decrease amount"
      >
        <ChevronDown className="h-4 w-4" style={{ color: ACCENT }} />
      </button>
      <div className="flex flex-1 items-center justify-center text-[13.5px] font-medium text-[var(--text-primary)]">
        {value}
      </div>
      <button
        type="button"
        className="flex w-11 items-center justify-center"
        style={{ background: ACCENT }}
        aria-label="Increase amount"
      >
        <ChevronUp className="h-4 w-4 text-white" />
      </button>
    </div>
  )
}

function OfferCard({
  lender,
  loanType,
  apr,
  expires,
  description,
  amount,
  selected,
}: {
  lender: Lender
  loanType: string
  apr: string
  expires: string
  description: string
  amount: string
  selected?: boolean
}) {
  return (
    <div
      className="flex items-stretch overflow-hidden rounded-md bg-[var(--card-bg)]"
      style={{ border: selected ? `2px solid ${ACCENT}` : '1px solid var(--border)' }}
    >
      <div className="flex flex-1 flex-col items-start gap-1.5 px-3 py-3 min-w-0">
        {lender.logo && 'src' in lender.logo && (
          <Image
            src={lender.logo.src}
            alt={lender.name}
            width={lender.logo.width}
            height={lender.logo.height}
            style={{ height: 20, width: 'auto' }}
          />
        )}
        <p className="text-[12.5px] font-bold text-[var(--text-primary)]">{loanType}</p>
        <p className="text-[11px] font-semibold" style={{ color: ACCENT }}>
          {apr}
        </p>
        <p className="text-[10.5px] text-[var(--text-tertiary)]">{expires}</p>
        <p className="text-[10.5px] leading-snug text-[var(--text-secondary)] mt-1">
          <span className="font-bold text-[var(--text-primary)]">Description: </span>
          {description}
        </p>
      </div>
      <div
        className="flex items-center justify-center px-3 flex-shrink-0"
        style={{ background: 'var(--neutral-bg)' }}
      >
        <p className="text-[13px] font-bold text-[var(--text-primary)] whitespace-nowrap">
          {amount}
        </p>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────
 * SCREEN 5 — Review selected offer + payment breakdown table
 * ─────────────────────────────────────────────────────────────── */
function StepReviewSelection({ compact = false }: { compact?: boolean }) {
  const rows = [
    { range: '$0 - $1,000', payment: '$49' },
    { range: '$1,001 - $2,000', payment: '$89' },
    { range: '$2,001 - $3,000', payment: '$149' },
    { range: '$3,001 - $5,000', payment: '$229' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-[18px] font-bold tracking-tight text-[var(--text-primary)]">
          Let&apos;s review your selection
        </h3>
        <p className="text-[12px] leading-relaxed text-[var(--text-secondary)] max-w-prose mx-auto">
          We are all about transparency. We want to make sure you understand your offer before we
          finalize your application.
        </p>
        <p className="text-[12.5px] font-bold mt-2" style={{ color: ACCENT }}>
          Your Selected Offer
        </p>
      </div>

      <div className={compact ? 'flex flex-col gap-3' : 'grid grid-cols-[1fr_1fr] gap-4 items-start'}>
        <OfferCard
          lender={FORTIVA}
          loanType="Revolving Line of Credit"
          apr="29.99% APR"
          expires="Offer Exp: 12/20/2025 (50 days)"
          description="Equal monthly payments based on your outstanding balance, will be due until you pay your balance in full. Interest will be charged to your account and included in your payment."
          amount="$149/mo"
          selected
        />

        <table className="w-full overflow-hidden rounded-md border border-[var(--border)] text-[11px]">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--neutral-bg)]">
              <th className="px-2.5 py-1.5 text-left font-bold text-[var(--text-primary)]">
                If the amount of your balance is
              </th>
              <th className="px-2.5 py-1.5 text-left font-bold text-[var(--text-primary)]">
                Then your monthly payment will be
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.range} className={i === 0 ? '' : 'border-t border-[var(--border)]'}>
                <td className="px-2.5 py-1.5 text-[var(--text-secondary)]">{r.range}</td>
                <td className="px-2.5 py-1.5 text-[var(--text-primary)] font-semibold">
                  {r.payment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────
 * Assembly
 * ─────────────────────────────────────────────────────────────── */
const screens: WalkthroughScreen[] = [
  {
    title: 'Wells Fargo declines · Fortiva picks up',
    eyebrow: 'Step 1 of 5',
    body: (
      <p>
        Wells Fargo returns a decline. The cascade rolls the same application forward to Fortiva
        automatically. Same form, same device, no restart.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 0,
        stepTitle: 'Applicant Information',
        lender: FORTIVA,
        declineSlot: <DeclineCard lender={WELLS_FARGO} />,
        children: <StepApplicant lender={FORTIVA} compact={compact} />,
      }),
  },
  {
    title: 'Email & phone · prequal disclosures',
    eyebrow: 'Step 2 of 5',
    body: (
      <p>
        Contact information opens the lender-specific channel. The Synchrony Bank (SYNCB)
        prequalification block sits in plain language so the customer knows what they are agreeing
        to.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 0,
        stepTitle: 'Applicant Information',
        lender: FORTIVA,
        children: <StepEmailDisclosures compact={compact} />,
      }),
  },
  {
    title: 'Income & credit authorization',
    eyebrow: 'Step 3 of 5',
    body: (
      <p>
        Income, housing payment, and the credit authorization. The bare-minimum set the lender
        needs to make a decision, written so a customer can read it.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 1,
        stepTitle: 'Disclosures',
        lender: FORTIVA,
        children: <StepIncome compact={compact} />,
      }),
  },
  {
    title: 'Pre-qualified · pick your amount',
    eyebrow: 'Step 4 of 5',
    body: (
      <p>
        Fortiva returns $4,500.00 approved. The calculator lets the customer dial the financed
        amount up or down, and the revolving line offer card previews the matching monthly payment.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 1,
        stepTitle: 'Pre-qualified',
        lender: FORTIVA,
        children: <StepPrequalifiedWithCalculator compact={compact} />,
      }),
  },
  {
    title: 'Review your selection',
    eyebrow: 'Step 5 of 5',
    body: (
      <p>
        Selected offer recap with the payment-by-balance rate table. The customer signs off on
        plain-language terms before the hard pull.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 2,
        stepTitle: 'Review your selection',
        lender: FORTIVA,
        children: <StepReviewSelection compact={compact} />,
      }),
  },
]

export function CityFurnitureFlow({
  showCaption = true,
  defaultViewport,
  hideViewportSwitcher,
}: {
  showCaption?: boolean
  defaultViewport?: 'tablet' | 'mobile'
  hideViewportSwitcher?: boolean
} = {}) {
  return (
    <div className={showCaption ? 'mx-auto flex w-full max-w-3xl flex-col gap-6' : 'w-full'}>
      <WalkthroughStage
        screens={screens}
        showCaption={showCaption}
        layoutGroupId="city-furniture-walkthrough-viewport"
        tabletOrientation="landscape"
        defaultViewport={defaultViewport}
        hideViewportSwitcher={hideViewportSwitcher}
      />
    </div>
  )
}
