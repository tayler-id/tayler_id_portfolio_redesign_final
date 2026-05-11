'use client'

import React from 'react'
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react'
import { ThemeProvider } from '@/components/demos/_system/theme-provider'
import { IPadFrame } from '@/components/demos/_system/primitives/device-frame'
import {
  Card,
  Button,
  StepperVertical,
  FormSection,
  ShowInput,
  Checkbox,
} from '@/components/demos/_system/primitives'

/**
 * TD Bank Commercial — white-label spotlight.
 *
 * Same primitives as the Apply demo (Card, Button, StepperVertical, FormSection,
 * ShowInput, Checkbox), but wrapped in `<ThemeProvider project="tdbank">` so the
 * tokens resolve to TD's palette (green accent, orange CTA pill). The only
 * bespoke piece is <GreenWave/> — that's TD's signature brand mark, not a
 * generic UI primitive.
 *
 * Four screens, identical structural skeleton: header → body → footer row.
 */

export function TDBankCommercialFlow() {
  const screens: { caption: string; render: () => React.ReactNode }[] = [
    {
      caption: 'Consent gate — authority to act on behalf of the business',
      render: () => <ConsentGateScreen />,
    },
    {
      caption: 'Section overview — five steps before submit, with an active-step indicator',
      render: () => <StepperScreen />,
    },
    {
      caption: 'Business Information — green-outlined inputs, inline NAICS guidance',
      render: () => <BusinessFormScreen />,
    },
    {
      caption: 'Account Terms & Conditions — closing affirmation + dual-button confirmation',
      render: () => <TermsScreen />,
    },
  ]

  return (
    <ThemeProvider project="tdbank">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {screens.map((s) => (
          <figure key={s.caption} className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md">
              <IPadFrame orientation="portrait">
                <ScreenShell>{s.render()}</ScreenShell>
              </IPadFrame>
            </div>
            <figcaption className="text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground leading-snug text-center max-w-xs">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </ThemeProvider>
  )
}

/* ------------------------------------------------------------------ */
/* Shared screen skeleton — fixed header / body / footer slots so the */
/* CTA always lands in the same place across all four screens         */
/* ------------------------------------------------------------------ */

function ScreenShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 bg-[var(--card-bg)] flex flex-col">
      {children}
      <GreenWave />
    </div>
  )
}

function ScreenHeading({ eyebrow, sub }: { eyebrow: string; sub?: string }) {
  return (
    <div className="px-6 pt-6">
      <div className="text-[18px] font-bold leading-tight tracking-tight text-[var(--accent)]">
        {eyebrow}
      </div>
      {sub && (
        <div className="mt-1 text-[13px] leading-snug text-[var(--text-secondary)]">
          {sub}
        </div>
      )}
    </div>
  )
}

function ScreenBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex-1 min-h-0 px-6 py-4 ${className ?? ''}`}>{children}</div>
}

function ScreenFooter({ children }: { children?: React.ReactNode }) {
  // Anchored above the wave so CTAs sit at the same y across screens.
  return (
    <div className="relative z-10 px-6 pb-6 pt-3 flex items-center justify-end gap-3 min-h-[68px]">
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* TD brand mark — signature two-tone green wave                       */
/* ------------------------------------------------------------------ */

function GreenWave() {
  return (
    <svg
      viewBox="0 0 400 90"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 right-0 w-full h-[70px] pointer-events-none"
      aria-hidden
    >
      <path d="M0,55 C90,15 240,80 400,30 L400,90 L0,90 Z" fill="#A6D9A4" />
      <path d="M0,75 C110,45 250,95 400,55 L400,90 L0,90 Z" fill="#2BA947" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 1 — Consent gate (Frame 2)                                          */
/* ------------------------------------------------------------------ */

function ConsentGateScreen() {
  return (
    <>
      <ScreenHeading
        eyebrow="Welcome!"
        sub="Before we begin, please answer the following"
      />
      <ScreenBody className="flex flex-col items-center justify-center gap-6">
        <div className="text-center text-[14px] font-semibold leading-snug px-6 text-[var(--text-primary)]">
          Do you have authority to act on behalf of the Business Borrower?
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
          <BinaryChoiceCard variant="no" />
          <BinaryChoiceCard variant="yes" />
        </div>
      </ScreenBody>
      <ScreenFooter>{/* intentional empty — the choice cards are the action */}</ScreenFooter>
    </>
  )
}

function BinaryChoiceCard({ variant }: { variant: 'yes' | 'no' }) {
  const isYes = variant === 'yes'
  return (
    <Card
      variant="raised"
      padding="sm"
      className="flex flex-col items-center justify-center gap-2 aspect-square"
      style={
        isYes
          ? {
              boxShadow:
                '0 4px 14px rgba(0,138,0,0.18), inset 0 0 0 1px var(--positive)',
            }
          : undefined
      }
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
        style={{
          background: isYes ? 'var(--positive-bg)' : 'var(--negative-bg)',
          color: isYes ? 'var(--positive)' : 'var(--negative)',
        }}
      >
        {isYes ? <Check className="h-5 w-5" strokeWidth={3} /> : <X className="h-5 w-5" strokeWidth={3} />}
      </span>
      <span
        className="text-[13px] font-bold"
        style={{ color: isYes ? 'var(--positive)' : 'var(--negative)' }}
      >
        {isYes ? 'Yes' : 'No'}
      </span>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — Section overview / stepper (Frame 3)                            */
/* ------------------------------------------------------------------ */

function StepperScreen() {
  const steps = [
    'Business Information',
    'Applicant Information',
    'Beneficial Owner Information',
    'Authorized User Information',
    'Fair Lending Information',
  ]
  return (
    <>
      <ScreenHeading
        eyebrow="Let’s get started"
        sub="Each section must be completed before submitting the application"
      />
      <ScreenBody className="flex items-center justify-center">
        <StepperVertical steps={steps} active={0} size="md" />
      </ScreenBody>
      <ScreenFooter>
        <Button variant="ghost" className="gap-1.5 text-[var(--cta)] hover:text-[var(--cta-hover)]">
          Next
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Button>
      </ScreenFooter>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — Business Information form with inline tooltip (Frame 4_d)       */
/* ------------------------------------------------------------------ */

function BusinessFormScreen() {
  return (
    <>
      <ScreenHeading eyebrow="Your Business" sub="Business Information" />
      <ScreenBody>
        <FormSection title="Business Information" bodyClassName="grid-cols-2">
          <ShowInput label="Credit Purpose" affordance="chevron" />
          <ShowInput label="Legal Business Name" />
          <NAICSField />
          <ShowInput label="Description" />
          <ShowInput label="EIN / Tax ID" />
          <ShowInput label="Business Email" />
        </FormSection>
      </ScreenBody>
      <ScreenFooter>
        <Button className="rounded-full px-6">Let’s Go!</Button>
      </ScreenFooter>
    </>
  )
}

function NAICSField() {
  return (
    <div className="relative">
      <div className="mb-1 flex items-center gap-1 text-[12px] font-semibold text-[var(--text-primary)]">
        <span>NAICS</span>
        <span className="font-normal text-[var(--text-tertiary)]">code (2022)</span>
        <HelpCircle className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2} />
      </div>
      <div
        className="h-12 rounded-[var(--radius-sm)] bg-[var(--card-bg)] shadow-[var(--shadow-xs)]"
        style={{ border: '1px solid var(--border)' }}
      />
      <Tooltip />
    </div>
  )
}

function Tooltip() {
  return (
    <div
      className="absolute z-20 left-1/2 -translate-x-1/2 -top-1 -translate-y-full w-[200px] rounded-md bg-[#1A1A1A] text-white text-[10.5px] leading-snug p-2.5 shadow-lg"
      role="tooltip"
    >
      Use your 6-digit NAICS code from your most recent Federal Tax Return.{' '}
      <span style={{ color: '#A6D9A4' }}>Visit the Government’s NAICS page</span> and search 2022 codes.
      <span
        aria-hidden
        className="absolute left-[35%] -bottom-1 w-2 h-2 rotate-45 bg-[#1A1A1A]"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — Account Terms & Conditions (Frame 33)                           */
/* ------------------------------------------------------------------ */

function TermsScreen() {
  return (
    <>
      <ScreenHeading eyebrow="Account Terms and Conditions" />
      <ScreenBody className="flex flex-col gap-4">
        <p className="text-[13px] leading-snug text-[var(--text-primary)]">
          Click{' '}
          <a className="font-semibold underline" style={{ color: '#1E4FB8' }}>
            HERE
          </a>{' '}
          to open and review the pricing, terms, conditions and Commercial Account
          Agreement in a separate window. Please save a copy for your records.
        </p>
        <p className="text-[12px] font-bold text-[var(--text-primary)] leading-snug">
          Before submitting your application, please review all application data
          and agree to all disclosures
        </p>
        <Checkbox
          checked
          accentColor="var(--positive)"
          size="sm"
          label={
            <span>
              <strong>By checking this box and submitting this application</strong>, I
              consent to receive Account Opening Documents electronically as described
              in the E-Sign Disclosure and Consent.
            </span>
          }
        />
      </ScreenBody>
      <ScreenFooter>
        <Button variant="outline" className="rounded-full px-5">
          Return to E-sign
        </Button>
        <Button className="rounded-full px-6">Continue</Button>
      </ScreenFooter>
    </>
  )
}
