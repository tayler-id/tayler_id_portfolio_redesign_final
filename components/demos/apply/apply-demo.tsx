'use client'

import React, { CSSProperties, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tablet, Smartphone } from 'lucide-react'

import { ThemeProvider } from '../_system/theme-provider'
import { MerchantSwitcher, PillGroup } from '../_system/primitives'
import { IPadFrame, PhoneFrame } from '../_system/primitives/device-frame'
import {
  VERTICAL_CASCADE,
  getLender,
  type LenderKey,
} from '../_system/data/lenders'
import {
  getMerchant,
  type MerchantKey,
  type Vertical,
} from '../_system/data/merchants'

import { DeclineCard } from './decline-card'
import { ChromeTablet } from './chromes/chrome-tablet'
import { ChromeMobile } from './chromes/chrome-mobile'
import { StepApplicant } from './steps/step-applicant'
import { StepPrequal } from './steps/step-prequal'
import { StepApproved } from './steps/step-approved'
import { StepHIPersonal } from './steps/step-hi-personal'
import { StepHIEligibility } from './steps/step-hi-eligibility'
import { StepEMPatient } from './steps/step-em-patient'
import { StepEMOffers } from './steps/step-em-offers'

type Viewport = 'tablet' | 'mobile'

type RetailStepKey = 'applicant' | 'prequal' | 'approved'
type HIStepKey = 'hi-personal' | 'hi-eligibility'
type EMStepKey = 'em-patient' | 'em-offers'
type StepKey = RetailStepKey | HIStepKey | EMStepKey

interface StepDef {
  key: StepKey
  title: string
  tabletLabel: string
}

const RETAIL_STEPS: StepDef[] = [
  { key: 'applicant', title: 'Applicant Info', tabletLabel: 'Applicant Info' },
  { key: 'prequal', title: 'Pre-qualified', tabletLabel: 'Pre-qualified' },
  { key: 'approved', title: 'Approved', tabletLabel: 'Decision' },
]

const HI_STEPS: StepDef[] = [
  { key: 'hi-personal', title: 'About You', tabletLabel: 'About You' },
  { key: 'hi-eligibility', title: 'Eligibility', tabletLabel: 'Eligibility' },
]

const EM_STEPS: StepDef[] = [
  { key: 'em-patient', title: 'Patient Info', tabletLabel: 'Patient Info' },
  { key: 'em-offers', title: 'Multi-Lender Choice', tabletLabel: 'Choose Offer' },
]

const STEPS_BY_VERTICAL: Record<Vertical, StepDef[]> = {
  retail: RETAIL_STEPS,
  'home-improvement': HI_STEPS,
  'elective-medical': EM_STEPS,
}

interface ApplyDemoProps {
  defaultLender?: LenderKey
  defaultViewport?: Viewport
  defaultMerchant?: MerchantKey
  /** When provided, hides the merchant switcher and locks the demo to this
   *  merchant. Used inside the verticals panel of the case study. */
  lockMerchant?: MerchantKey
  /** When set, hides the lender pill row (useful for an embedded vertical
   *  card where only the brand chrome matters). */
  hideLenderSwitcher?: boolean
  /** Hide the viewport (iPad / Mobile) switcher. */
  hideViewportSwitcher?: boolean
  hideDecline?: boolean
}

export function ApplyDemo({
  defaultLender,
  defaultViewport = 'tablet',
  defaultMerchant = 'layers',
  lockMerchant,
  hideLenderSwitcher = false,
  hideViewportSwitcher = false,
  hideDecline,
}: ApplyDemoProps) {
  // Merchant state (locked when caller pins one)
  const initialMerchant = lockMerchant ?? defaultMerchant
  const [activeMerchant, setActiveMerchant] = useState<MerchantKey>(initialMerchant)
  const merchant = getMerchant(activeMerchant)
  const vertical = merchant.vertical

  // Vertical → cascade → default primary lender
  const cascade = VERTICAL_CASCADE[vertical]
  const primaryKey = cascade[0]
  const cascadeLenders = useMemo(() => cascade.map(getLender), [cascade])

  // Active lender state — defaults to the secondary in retail (so decline notice
  // is visible by default) and to the primary in non-retail.
  const startingLender =
    defaultLender ?? (vertical === 'retail' ? (cascade[1] ?? cascade[0]) : primaryKey)
  const [activeLender, setActiveLender] = useState<LenderKey>(startingLender)
  const [viewport, setViewport] = useState<Viewport>(defaultViewport)
  const [stepIndex, setStepIndex] = useState(0)

  // When merchant changes, snap lender to the new vertical's cascade.
  React.useEffect(() => {
    const startKey =
      vertical === 'retail' ? cascade[1] ?? cascade[0] : cascade[0]
    setActiveLender(startKey)
    setStepIndex(0)
  }, [activeMerchant, cascade, vertical])

  const lender = getLender(activeLender)
  const stepDefs = STEPS_BY_VERTICAL[vertical]
  const currentStep = stepDefs[stepIndex] ?? stepDefs[0]

  const isPrimary = lender.key === primaryKey
  const showDecline = hideDecline ? false : !isPrimary && stepIndex === 0
  const primaryLender = getLender(primaryKey)

  const canBack = stepIndex > 0
  const canNext = stepIndex < stepDefs.length - 1
  const nextLabel =
    currentStep.key === 'prequal' ||
    currentStep.key === 'hi-personal' ||
    currentStep.key === 'em-patient'
      ? 'Continue'
      : currentStep.key === 'approved' || currentStep.key === 'em-offers'
      ? 'Finished'
      : currentStep.key === 'hi-eligibility'
      ? 'Confirm & Continue'
      : 'Next'

  const onBack = () => setStepIndex((i) => Math.max(0, i - 1))
  const onNext = () => setStepIndex((i) => Math.min(stepDefs.length - 1, i + 1))

  const onLenderChange = (k: LenderKey) => {
    setActiveLender(k)
    setStepIndex(0)
  }

  const renderStepContent = (compact: boolean) => {
    switch (currentStep.key) {
      case 'applicant':
        return <StepApplicant lender={lender} compact={compact} />
      case 'prequal':
        return (
          <StepPrequal
            lender={lender}
            merchantName={merchant.name}
            compact={compact}
          />
        )
      case 'approved':
        return <StepApproved lender={lender} compact={compact} />
      case 'hi-personal':
        return <StepHIPersonal lender={lender} merchant={merchant} compact={compact} />
      case 'hi-eligibility':
        return (
          <StepHIEligibility
            lender={lender}
            merchant={merchant}
            cascadeKeys={cascade}
            compact={compact}
          />
        )
      case 'em-patient':
        return <StepEMPatient lender={lender} merchant={merchant} compact={compact} />
      case 'em-offers':
        return <StepEMOffers lender={lender} merchant={merchant} compact={compact} />
    }
  }

  const declineSlot = showDecline ? <DeclineCard lender={primaryLender} /> : null
  const stepLabels = stepDefs.map((s) => s.tabletLabel)

  // Merchant CTA color override — flows into `--cta` / `--cta-hover` on the
  // stage wrapper so both chromes pick up the merchant's brand button colour.
  const merchantCtaStyle: CSSProperties = useMemo(() => {
    const style: CSSProperties = {}
    if (merchant.ctaColor) (style as Record<string, string>)['--cta'] = merchant.ctaColor
    if (merchant.ctaHover) (style as Record<string, string>)['--cta-hover'] = merchant.ctaHover
    return style
  }, [merchant.ctaColor, merchant.ctaHover])

  // Lender pill row filtered to the active vertical's cascade.
  const lenderPills = cascadeLenders.map((l) => ({
    key: l.key,
    label: l.shortName,
    accentColor: l.brandColor,
  }))

  // Vertical-aware heading copy
  const verticalTagline: Record<Vertical, string> = {
    retail: 'Same flow. Six lenders. One platform.',
    'home-improvement': 'In-home appointment to pre-qualified, in two screens.',
    'elective-medical': 'Multi-lender choice in-chair.',
  }

  return (
    <ThemeProvider project="apply" className="flex flex-col gap-6">
      {/* Toolbar — merchant switcher */}
      {!lockMerchant && (
        <MerchantSwitcher
          active={activeMerchant}
          onChange={(k) => setActiveMerchant(k)}
        />
      )}

      {/* Toolbar — lender switcher */}
      {!hideLenderSwitcher && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Interactive · {viewport === 'tablet' ? 'iPad' : 'Mobile'} · {currentStep.title}
            </span>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
              {verticalTagline[vertical]}
            </h3>
          </div>
          <PillGroup
            layoutGroupId="apply-demo-lender"
            active={activeLender}
            onChange={(k) => onLenderChange(k as LenderKey)}
            items={lenderPills}
          />
        </div>
      )}

      {/* Viewport switcher */}
      {!hideViewportSwitcher && (
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Viewport
          </span>
          <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] p-0.5">
            {(
              [
                { key: 'tablet', label: 'iPad', Icon: Tablet },
                { key: 'mobile', label: 'Mobile', Icon: Smartphone },
              ] as const
            ).map(({ key, label, Icon }) => {
              const active = viewport === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setViewport(key)}
                  className={
                    'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ' +
                    (active
                      ? 'text-[var(--cta-text)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]')
                  }
                >
                  {active && (
                    <motion.span
                      layoutId="apply-viewport-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: 'var(--cta)' }}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Stage — device frame. merchantCtaStyle threads --cta / --cta-hover
          so the chrome's CTA button uses the merchant brand colour. */}
      <div
        className="relative rounded-[var(--radius-xl)] bg-[var(--pad)]/40 p-6 sm:p-10 ring-1 ring-[var(--border)] overflow-hidden"
        style={merchantCtaStyle}
      >
        <AnimatePresence mode="wait" initial={false}>
          {viewport === 'tablet' ? (
            <motion.div
              key="tablet"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto"
              style={{ maxWidth: 980 }}
            >
              <IPadFrame>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeMerchant}-${lender.key}-${currentStep.key}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="h-full"
                  >
                    <ChromeTablet
                      merchant={activeMerchant}
                      activeStepIndex={Math.min(stepIndex, stepLabels.length - 1)}
                      stepLabels={stepLabels}
                      stepTitle={currentStep.title}
                      lender={lender}
                      declineSlot={declineSlot}
                      onBack={onBack}
                      onNext={onNext}
                      canBack={canBack}
                      canNext={canNext}
                      nextLabel={nextLabel}
                    >
                      {renderStepContent(false)}
                    </ChromeTablet>
                  </motion.div>
                </AnimatePresence>
              </IPadFrame>
            </motion.div>
          ) : (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto"
            >
              <PhoneFrame>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeMerchant}-${lender.key}-${currentStep.key}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="h-full"
                  >
                    <ChromeMobile
                      merchant={activeMerchant}
                      activeStepIndex={stepIndex}
                      stepLabels={stepLabels}
                      stepTitle={currentStep.title}
                      lender={lender}
                      declineSlot={declineSlot}
                      onBack={onBack}
                      onNext={onNext}
                      canBack={canBack}
                      canNext={canNext}
                      nextLabel={nextLabel}
                    >
                      {renderStepContent(true)}
                    </ChromeMobile>
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
        One application, themed for the active lender. When the primary lender declines, the gateway
        rolls the same applicant data to the next in priority. Switch merchant to change vertical,
        lender to change cascade position, or viewport for iPad vs mobile.
      </p>
    </ThemeProvider>
  )
}

