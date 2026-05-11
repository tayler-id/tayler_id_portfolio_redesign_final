'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IPadFrame, PhoneFrame } from './device-frame'
import { useMotionSafe } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface Screen {
  content: React.ReactNode
  eyebrow?: string
  title: string
  body: React.ReactNode
}

export interface ScreenFlowProps {
  screens: Screen[]
  device?: 'ipad-landscape' | 'ipad-portrait' | 'iphone'
  defaultIndex?: number
  autoAdvanceMs?: number
  clickToAdvance?: boolean
  showCaption?: boolean
  className?: string
}

export function ScreenFlow({
  screens,
  device = 'ipad-landscape',
  defaultIndex = 0,
  autoAdvanceMs,
  clickToAdvance = true,
  showCaption = true,
  className,
}: ScreenFlowProps) {
  const total = screens.length
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, defaultIndex), Math.max(0, total - 1))
  )
  const { prefersReducedMotion } = useMotionSafe()
  const containerRef = useRef<HTMLDivElement>(null)

  const atFirst = index === 0
  const atLast = index === total - 1

  const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  const goNext = () => setIndex((i) => Math.min(total - 1, i + 1))
  const goTo = (i: number) => setIndex(Math.min(Math.max(0, i), total - 1))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = containerRef.current
      if (!el || !el.contains(document.activeElement)) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(total - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  useEffect(() => {
    if (!autoAdvanceMs || autoAdvanceMs <= 0 || total <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, autoAdvanceMs)
    return () => window.clearInterval(id)
  }, [autoAdvanceMs, total])

  if (total === 0) return null

  const active = screens[index]
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: 'easeOut' as const }

  const renderDevice = (children: React.ReactNode) => {
    if (device === 'iphone') return <PhoneFrame>{children}</PhoneFrame>
    return (
      <IPadFrame orientation={device === 'ipad-portrait' ? 'portrait' : 'landscape'}>
        {children}
      </IPadFrame>
    )
  }

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className={cn(
        'flex flex-col gap-6 outline-none',
        showCaption &&
          'sm:grid sm:grid-cols-[1fr_minmax(260px,340px)] sm:items-start sm:gap-8',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="relative">
          {renderDevice(
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  className="absolute inset-0 overflow-y-auto"
                >
                  {active.content}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            disabled={atFirst}
            aria-label="Previous screen"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-opacity hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[5.5rem] text-center text-sm tabular-nums text-foreground/70">
            Step {index + 1} of {total}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={atLast}
            aria-label="Next screen"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-opacity hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showCaption && (
        <div
          className="rounded-2xl border border-border bg-card p-5"
          aria-live="polite"
          aria-atomic="true"
        >
          {active.eyebrow && (
            <p className="mb-2 text-xs uppercase tracking-wider text-foreground/50">
              {active.eyebrow}
            </p>
          )}
          <h3 className="mb-3 text-lg font-semibold text-foreground">{active.title}</h3>
          <div className="space-y-3 text-sm leading-relaxed text-foreground/70">{active.body}</div>
        </div>
      )}
    </div>
  )
}
