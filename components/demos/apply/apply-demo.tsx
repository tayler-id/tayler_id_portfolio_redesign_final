'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tablet, Smartphone } from 'lucide-react'

import { ThemeProvider } from '../_system/theme-provider'
import { PillGroup } from '../_system/primitives'
import { IPadFrame, PhoneFrame } from '../_system/primitives/device-frame'
import { LENDERS, getLender, type LenderKey } from '../_system/data/lenders'
import type { MerchantKey } from '../_system/data/merchants'

import { DeclineCard } from './decline-card'
import { ChromeTablet } from './chromes/chrome-tablet'
import { ChromeMobile } from './chromes/chrome-mobile'
import { StepApplicant } from './steps/step-applicant'
import { StepPrequal } from './steps/step-prequal'
import { StepApproved } from './steps/step-approved'

type Viewport = 'tablet' | 'mobile'
type StepKey = 'applicant' | 'prequal' | 'approved'

interface ApplyDemoProps {
  defaultLender?: LenderKey
  defaultViewport?: Viewport
  merchant?: MerchantKey
  hideDecline?: boolean
}

const STEPS: { key: StepKey; title: string; tabletLabel: string }[] = [
  { key: 'applicant', title: 'Applicant Info', tabletLabel: 'Applicant Info' },
  { key: 'prequal', title: 'Pre-qualified', tabletLabel: 'Pre-qualified' },
  { key: 'approved', title: 'Approved', tabletLabel: 'Decision' },
]

export function ApplyDemo({
  defaultLender = 'fortiva',
  defaultViewport = 'tablet',
  merchant = 'layers',
  hideDecline,
}: ApplyDemoProps) {
  const [activeLender, setActiveLender] = useState<LenderKey>(defaultLender)
  const [viewport, setViewport] = useState<Viewport>(defaultViewport)
  const [stepIndex, setStepIndex] = useState(0)

  const lender = getLender(activeLender)
  const isPrimary = lender.positionLabel === 'Primary'
  const showDecline = hideDecline ? false : !isPrimary && stepIndex === 0
  const primaryLender = getLender('wells-fargo')

  const currentStep = STEPS[stepIndex]
  const canBack = stepIndex > 0
  const canNext = stepIndex < STEPS.length - 1
  const nextLabel = currentStep.key === 'prequal' ? 'Continue' : currentStep.key === 'approved' ? 'Finished' : 'Next'

  const onBack = () => setStepIndex((i) => Math.max(0, i - 1))
  const onNext = () => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))

  // Reset to step 0 when switching lender
  const onLenderChange = (k: LenderKey) => {
    setActiveLender(k)
    setStepIndex(0)
  }

  const renderStepContent = (compact: boolean) => {
    switch (currentStep.key) {
      case 'applicant':
        return <StepApplicant lender={lender} compact={compact} />
      case 'prequal':
        return <StepPrequal lender={lender} compact={compact} />
      case 'approved':
        return <StepApproved lender={lender} compact={compact} />
    }
  }

  const declineSlot = showDecline ? <DeclineCard lender={primaryLender} /> : null

  return (
    <ThemeProvider project="apply" className="flex flex-col gap-6">
      {/* Toolbar — switcher row 1 (lenders) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Interactive · {viewport === 'tablet' ? 'iPad' : 'Mobile'} · {currentStep.title}
          </span>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
            Same flow. Six lenders. One platform.
          </h3>
        </div>
        <PillGroup
          layoutGroupId="apply-demo-lender"
          active={activeLender}
          onChange={(k) => onLenderChange(k as LenderKey)}
          items={LENDERS.map((l) => ({
            key: l.key,
            label: l.shortName,
            accentColor: l.brandColor,
          }))}
        />
      </div>

      {/* Toolbar row 2 — viewport switcher */}
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

      {/* Stage — device frame */}
      <div className="relative rounded-[var(--radius-xl)] bg-[var(--pad)]/40 p-6 sm:p-10 ring-1 ring-[var(--border)] overflow-hidden">
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
                    key={`${lender.key}-${currentStep.key}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="h-full"
                  >
                    <ChromeTablet
                      merchant={merchant}
                      activeStepIndex={Math.min(stepIndex, 2)}
                      stepLabels={[
                        STEPS[0].tabletLabel,
                        STEPS[1].tabletLabel,
                        STEPS[2].tabletLabel,
                      ]}
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
                    key={`${lender.key}-${currentStep.key}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="h-full"
                  >
                    <ChromeMobile
                      merchant={merchant}
                      activeStepIndex={stepIndex}
                      stepLabels={[
                        STEPS[0].tabletLabel,
                        STEPS[1].tabletLabel,
                        STEPS[2].tabletLabel,
                      ]}
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
        rolls the same applicant data to the next in priority. Switch lenders, change viewports, or
        click through Applicant → Pre-qualified → Approved.
      </p>
    </ThemeProvider>
  )
}
