'use client'

import React from 'react'
import { motion, useInView, type MotionProps } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

type Branch = {
  key: 'hi' | 'retail' | 'em'
  vertical: string
  channel: string
  lenders: string
  merchant: string
}

const BRANCHES: Branch[] = [
  {
    key: 'hi',
    vertical: 'Home Improvement',
    channel: 'In-home tablet',
    lenders: 'Sunlight · Wells Fargo · TD Bank',
    merchant: 'West Shore Home · locked stack',
  },
  {
    key: 'retail',
    vertical: 'Retail',
    channel: 'In-store kiosk · POS',
    lenders: 'Synchrony · Wells Fargo · +5 in cascade',
    merchant: 'Ashley · City Furniture',
  },
  {
    key: 'em',
    vertical: 'Elective Medical',
    channel: 'In-chair tablet · mobile handoff',
    lenders: 'CareCredit · Sonrava · Concora',
    merchant: 'Western Dental',
  },
]

export function ThreeVerticalsFlow() {
  const ref = React.useRef<HTMLDivElement>(null)
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const animate = noAnimation || isInView

  const fade = (delay = 0, dur = 0.25): MotionProps => ({
    initial: noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    animate: animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: noAnimation
      ? { duration: 0 }
      : { duration: dur, delay, ease: 'easeOut' },
  })

  return (
    <div
      ref={ref}
      className="w-full max-w-3xl mx-auto py-4"
      role="img"
      aria-label="One application form forks into three verticals (Home Improvement, Retail, and Elective Medical), each with its own channel and signature lender stack"
    >
      <motion.div
        {...fade(0)}
        className="mx-auto w-fit border-y border-primary/30 py-2 px-6 text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary">
          Versatile Apply
        </p>
        <p className="font-display text-lg sm:text-xl font-bold tracking-tight">
          One application form
        </p>
      </motion.div>

      <Trunk delay={0.06} dur={0.2} animate={animate} noAnimation={noAnimation} />
      <ForkBar delay={0.12} dur={0.22} animate={animate} noAnimation={noAnimation} />

      <div className="hidden sm:grid grid-cols-3 gap-x-4">
        {BRANCHES.map((branch, i) => (
          <motion.div
            key={branch.key}
            {...fade(0.16 + i * 0.08, 0.24)}
            className="flex flex-col items-center text-center px-2"
          >
            <span
              className="block w-px h-5 bg-primary/60 mb-3"
              aria-hidden="true"
            />
            <BranchBody branch={branch} />
          </motion.div>
        ))}
      </div>

      <div className="sm:hidden mt-4 space-y-5">
        {BRANCHES.map((branch, i) => (
          <motion.div
            key={branch.key}
            {...fade(0.16 + i * 0.08, 0.24)}
            className="border-l-2 border-primary/40 pl-4 py-1"
          >
            <BranchBody branch={branch} />
          </motion.div>
        ))}
      </div>

      <motion.p
        {...fade(0.46, 0.22)}
        className="text-[11px] text-muted-foreground mt-10 text-center max-w-md mx-auto leading-relaxed font-mono uppercase tracking-[0.2em]"
      >
        The flow is the same. The stack underneath isn&apos;t.
      </motion.p>
    </div>
  )
}

function Trunk({
  delay,
  dur,
  animate,
  noAnimation,
}: {
  delay: number
  dur: number
  animate: boolean
  noAnimation: boolean
}) {
  return (
    <div className="flex justify-center mt-3" aria-hidden="true">
      <motion.span
        className="block w-px h-6 bg-primary"
        initial={noAnimation ? { scaleY: 1 } : { scaleY: 0 }}
        animate={animate ? { scaleY: 1 } : { scaleY: 0 }}
        transition={
          noAnimation ? { duration: 0 } : { duration: dur, delay, ease: 'easeOut' }
        }
        style={{ transformOrigin: 'top' }}
      />
    </div>
  )
}

function ForkBar({
  delay,
  dur,
  animate,
  noAnimation,
}: {
  delay: number
  dur: number
  animate: boolean
  noAnimation: boolean
}) {
  return (
    <div className="hidden sm:flex justify-center" aria-hidden="true">
      <motion.span
        className="block h-px bg-primary/60"
        style={{ width: '66.667%', transformOrigin: 'center' }}
        initial={noAnimation ? { scaleX: 1 } : { scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          noAnimation ? { duration: 0 } : { duration: dur, delay, ease: 'easeOut' }
        }
      />
    </div>
  )
}

function BranchBody({ branch }: { branch: Branch }) {
  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.25em] font-mono font-semibold text-foreground">
        {branch.vertical}
      </p>
      <p className="font-display text-base sm:text-lg font-bold tracking-tight mt-2 text-foreground">
        {branch.channel}
      </p>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
        {branch.lenders}
      </p>
      <p className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground mt-3">
        {branch.merchant}
      </p>
    </>
  )
}
