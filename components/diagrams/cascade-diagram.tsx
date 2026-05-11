'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface Lender {
  name: string
  tier: string
  status: 'declined' | 'approved' | 'skipped'
}

const lenders: Lender[] = [
  { name: 'Synchrony', tier: 'Primary', status: 'declined' },
  { name: 'Wells Fargo', tier: 'Primary', status: 'declined' },
  { name: 'Acima', tier: 'Secondary', status: 'approved' },
  { name: 'Concora', tier: 'Tertiary', status: 'skipped' },
  { name: 'AFF', tier: 'Tertiary', status: 'skipped' },
]

export function CascadeDiagram() {
  const ref = React.useRef<HTMLDivElement>(null)
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const animate = noAnimation || isInView

  const fade = (delay = 0): React.ComponentProps<typeof motion.div> => ({
    initial: noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    animate: animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: noAnimation
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: 'easeOut' },
  })

  return (
    <div
      ref={ref}
      className="w-full max-w-3xl mx-auto py-2"
      role="img"
      aria-label="The Cascade: one consumer application waterfalls through Primary, Secondary, and Tertiary lenders until approved"
    >
      <ol className="space-y-10 sm:space-y-12">
        {/* Step 1 */}
        <motion.li {...fade(0)} className="flex flex-col items-start">
          <Eyebrow>Step 01 · Input</Eyebrow>
          <Headline>Consumer applies — one form, one device</Headline>
        </motion.li>

        <Divider delay={0.1} animate={animate} noAnimation={noAnimation} />

        {/* Step 2 — primary accent */}
        <motion.li {...fade(0.15)} className="border-l-2 border-primary pl-6">
          <Eyebrow accent>Step 02 · Platform</Eyebrow>
          <Headline accent>Versatile Apply API — one contract · 35+ lenders</Headline>
          <p className="text-sm text-muted-foreground mt-2">
            The gateway absorbs every lender&apos;s compliance copy, language, and field requirements.
          </p>
        </motion.li>

        <Divider delay={0.25} animate={animate} noAnimation={noAnimation} />

        {/* Step 3 — Cascade row */}
        <motion.li {...fade(0.3)} className="flex flex-col items-start">
          <Eyebrow>Step 03 · Cascade in priority order</Eyebrow>
          <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-5 py-5 border-y border-border/60">
            {lenders.map((lender, i) => (
              <motion.div key={lender.name} {...fade(0.35 + i * 0.06)}>
                <LenderRow lender={lender} />
              </motion.div>
            ))}
          </div>
        </motion.li>

        <Divider delay={0.75} animate={animate} noAnimation={noAnimation} />

        {/* Step 4 — Outcome */}
        <motion.li {...fade(0.85)} className="border-l-2 border-primary pl-6">
          <Eyebrow accent>Step 04 · Outcome</Eyebrow>
          <Headline accent>Approved</Headline>
          <p className="text-sm text-muted-foreground mt-2">
            Customer sees one outcome. The declines never appear in the experience.
          </p>
        </motion.li>
      </ol>

      <motion.p
        {...fade(1)}
        className="text-xs text-muted-foreground mt-12 text-center max-w-md mx-auto leading-relaxed font-mono uppercase tracking-[0.2em]"
      >
        One form · 35+ lenders attempted in priority order
      </motion.p>
    </div>
  )
}

function Eyebrow({
  children,
  accent = false,
}: {
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <span
      className={cn(
        'text-[11px] uppercase tracking-[0.25em] font-mono mb-2',
        accent ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {children}
    </span>
  )
}

function Headline({
  children,
  accent = false,
}: {
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <p
      className={cn(
        'text-2xl sm:text-3xl font-display font-bold tracking-tight leading-tight',
        accent ? 'text-primary' : 'text-foreground'
      )}
    >
      {children}
    </p>
  )
}

function LenderRow({ lender }: { lender: Lender }) {
  const isApproved = lender.status === 'approved'
  const isDeclined = lender.status === 'declined'
  const isSkipped = lender.status === 'skipped'

  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        isSkipped && 'opacity-40',
        isDeclined && 'opacity-60'
      )}
    >
      <span
        className={cn(
          'text-base font-display font-semibold tracking-tight',
          isApproved && 'text-primary',
          isDeclined && 'text-muted-foreground line-through decoration-1',
          isSkipped && 'text-muted-foreground'
        )}
      >
        {lender.name}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
        {lender.tier}
        {isApproved && <span className="text-primary"> · approved</span>}
        {isSkipped && <span> · skipped</span>}
      </span>
    </div>
  )
}

function Divider({
  delay,
  animate,
  noAnimation,
}: {
  delay: number
  animate: boolean
  noAnimation: boolean
}) {
  return (
    <li className="flex justify-start pl-1" aria-hidden="true">
      <motion.span
        className="block w-px h-10 bg-border"
        initial={noAnimation ? { scaleY: 1 } : { scaleY: 0 }}
        animate={animate ? { scaleY: 1 } : { scaleY: 0 }}
        transition={noAnimation ? { duration: 0 } : { duration: 0.4, delay, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
      />
    </li>
  )
}
