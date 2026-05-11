'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye } from 'lucide-react'

import { ThemeProvider } from '@/components/demos/_system/theme-provider'
import { StepperVertical } from '@/components/demos/_system/primitives'
import { IPadFrame } from '@/components/demos/_system/primitives/device-frame'
import { getLender, type LenderKey } from '@/components/demos/_system/data/lenders'
import { getMerchant, type MerchantKey } from '@/components/demos/_system/data/merchants'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface ApprovedVariant {
  key: LenderKey
  amount: string
  cardLast4: string
}

const VARIANTS: ApprovedVariant[] = [
  { key: 'synchrony', amount: '$5,600.00', cardLast4: '1112' },
  { key: 'wells-fargo', amount: '$7,500.00', cardLast4: '0418' },
  { key: 'fortiva', amount: '$2,400.00', cardLast4: '6309' },
]

const CYCLE_MS = 5000

interface ApplyCongratsHeroProps {
  merchant?: MerchantKey
}

export function ApplyCongratsHero({ merchant = 'layers' }: ApplyCongratsHeroProps) {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (noAnimation) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % VARIANTS.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [noAnimation])

  const variant = VARIANTS[index]
  const lender = getLender(variant.key)
  const merchantMeta = getMerchant(merchant)

  return (
    <ThemeProvider project="apply" className="flex flex-col gap-4">
      <div className="mx-auto w-full" style={{ maxWidth: 1024 }}>
        <IPadFrame>
          <div className="flex h-full w-full flex-row bg-[var(--pad)] p-6 sm:p-7">
            {/* Left rail — merchant identity + completed stepper */}
            <aside className="flex w-[210px] shrink-0 flex-col pt-1 pr-4">
              <div className="flex items-center justify-center gap-2 select-none">
                {merchantMeta.logoCombined ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={merchantMeta.logoCombined.src}
                    alt={merchantMeta.name}
                    style={{ height: 44, width: 'auto', maxWidth: 140 }}
                    className="object-contain object-left"
                  />
                ) : merchantMeta.logo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={merchantMeta.logo.logomark}
                      alt=""
                      style={{ height: 28, width: 28 }}
                      className="object-contain"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={merchantMeta.logo.logotype}
                      alt={merchantMeta.name}
                      style={{ height: 16, width: 'auto', maxWidth: 110 }}
                      className="object-contain object-left"
                    />
                  </>
                ) : (
                  <span
                    className="text-[15px] font-bold tracking-tight"
                    style={{ color: merchantMeta.brandColor ?? 'var(--text-primary)' }}
                  >
                    {merchantMeta.name}
                  </span>
                )}
              </div>

              <div className="flex flex-1 items-center">
                <StepperVertical
                  steps={['Applicant Information', 'Applicant Disclosures', 'Applicant Decision']}
                  active={3}
                  size="lg"
                />
              </div>
            </aside>

            {/* Right card — lender-themed congrats */}
            <article className="flex min-h-0 flex-1 flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-md)]">
              {/* Header: [lender logo] | APPLICATION DECISION (cross-fades on swap) */}
              <header className="relative flex items-center justify-center pb-2 min-h-[40px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={lender.key}
                    initial={noAnimation ? { opacity: 1 } : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={noAnimation ? { opacity: 1 } : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex items-center gap-4"
                  >
                    {lender.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={lender.logo.src}
                        alt={lender.name}
                        style={{ height: 24, width: 'auto', maxWidth: 160 }}
                        className="object-contain"
                      />
                    ) : (
                      <span
                        className="text-[15px] font-bold tracking-tight"
                        style={{ color: lender.brandColor }}
                      >
                        {lender.shortName}
                      </span>
                    )}
                    <span
                      className="block h-6 w-px bg-[var(--border-strong)]/80"
                      aria-hidden
                    />
                    <span className="text-[13.5px] font-bold uppercase tracking-[0.1em] text-[var(--text-primary)]">
                      Application Decision
                    </span>
                  </motion.div>
                </AnimatePresence>
              </header>

              {/* Body — Congratulations message + amount + card number */}
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-2">
                <h2 className="text-[44px] sm:text-[56px] font-medium tracking-tight leading-none text-[var(--text-primary)]">
                  Congratulations!
                </h2>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`subtitle-${lender.key}`}
                    initial={noAnimation ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={noAnimation ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="text-[15px] font-bold text-[var(--text-primary)]"
                  >
                    You are now a {lender.name} credit card holder!
                  </motion.p>
                </AnimatePresence>

                <div className="flex flex-col items-center gap-1 pt-3">
                  <p className="text-[14.5px] font-bold text-[var(--text-primary)]">
                    Account Credit Limit
                  </p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={`amount-${lender.key}`}
                      initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="text-[64px] sm:text-[72px] font-bold tracking-tight leading-none"
                      style={{ color: 'var(--positive)' }}
                    >
                      {variant.amount}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[13.5px] font-bold text-[var(--text-primary)]">
                    Card Number
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`card-${lender.key}`}
                      initial={noAnimation ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={noAnimation ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[13.5px] tracking-[0.04em] text-[var(--text-primary)] tabular-nums"
                    >
                      **** **** ****{variant.cardLast4}
                    </motion.span>
                  </AnimatePresence>
                  <Eye
                    className="h-4 w-4"
                    style={{ color: 'var(--cta)' }}
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>

                <p className="max-w-[460px] text-[12px] leading-relaxed text-[var(--text-primary)] font-semibold pt-3">
                  Thank you for applying. You will receive your credit card in the mail in 7–10
                  days. If you wish to use your account today, please proceed to the Customer
                  Service Desk or see a Sales Associate.
                </p>
              </div>

              <footer className="flex items-center justify-end pt-3">
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden
                  className="rounded-[var(--radius-md)] px-5 py-2 text-[13px] font-semibold text-[var(--cta-text)] shadow-[var(--shadow-sm)] pointer-events-none"
                  style={{ background: 'var(--cta)' }}
                >
                  I&rsquo;m Done
                </button>
              </footer>
            </article>
          </div>
        </IPadFrame>
      </div>

      {/* Lender ticker — micro caption below the iPad */}
      <div
        className="mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10.5px] uppercase tracking-[0.22em] font-mono text-muted-foreground"
        aria-live="polite"
      >
        <span>Approved</span>
        <span aria-hidden>·</span>
        <button
          type="button"
          onClick={() => setIndex((index + VARIANTS.length - 1) % VARIANTS.length)}
          className="text-foreground hover:text-primary transition-colors"
          aria-label="Previous lender"
        >
          ‹
        </button>
        {VARIANTS.map((v, i) => {
          const active = i === index
          const l = getLender(v.key)
          return (
            <button
              key={v.key}
              type="button"
              onClick={() => setIndex(i)}
              className={
                'transition-colors ' +
                (active
                  ? 'text-foreground font-bold'
                  : 'text-muted-foreground hover:text-foreground')
              }
              aria-pressed={active}
              aria-label={`Show ${l.shortName} approval`}
              style={active ? { color: l.brandColor } : undefined}
            >
              {l.shortName}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setIndex((index + 1) % VARIANTS.length)}
          className="text-foreground hover:text-primary transition-colors"
          aria-label="Next lender"
        >
          ›
        </button>
        <span aria-hidden>·</span>
        <span>One template</span>
      </div>
    </ThemeProvider>
  )
}
