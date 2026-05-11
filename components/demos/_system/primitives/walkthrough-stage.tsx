'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Tablet, Smartphone } from 'lucide-react'
import { IPadFrame, PhoneFrame } from './device-frame'
import { useMotionSafe } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export type WalkthroughViewport = 'tablet' | 'mobile'

export interface WalkthroughScreen {
  /** Step title shown in the caption sidebar. */
  title: string
  /** Eyebrow (e.g. "Step 1 of 4"). */
  eyebrow?: string
  /** Caption body — rendered as-is. */
  body: React.ReactNode
  /**
   * Renders the chrome + content that sits inside the device frame.
   * `compact` is true when the active viewport is mobile, so callers can
   * dispatch ChromeMobile vs ChromeTablet and pass `compact` to step
   * components that have a phone variant.
   */
  render: (compact: boolean) => React.ReactNode
  /**
   * Optional overlay rendered absolutely inside the device frame
   * (e.g. a privacy-policy modal). Receives the same `compact` flag.
   */
  overlay?: (compact: boolean) => React.ReactNode
}

export interface WalkthroughStageProps {
  screens: WalkthroughScreen[]
  defaultViewport?: WalkthroughViewport
  defaultIndex?: number
  /** Show the right-side caption sidebar (default: true). */
  showCaption?: boolean
  /** Hide the iPad/Mobile pill (default: false). */
  hideViewportSwitcher?: boolean
  /** Unique id for the motion layoutId on the viewport pill — must be unique per instance. */
  layoutGroupId?: string
  /** iPad orientation (default: 'portrait'). */
  tabletOrientation?: 'portrait' | 'landscape'
  className?: string
}

/**
 * Multi-screen walkthrough with viewport switching.
 *
 * Renders each screen inside an iPad-portrait or iPhone frame. The screen's
 * `render(compact)` function returns the chrome + content for the active
 * viewport so the case study can swap ChromeTablet ↔ ChromeMobile while
 * reusing the same step component bodies. Keyboard arrows advance steps.
 */
export function WalkthroughStage({
  screens,
  defaultViewport = 'tablet',
  defaultIndex = 0,
  showCaption = true,
  hideViewportSwitcher = false,
  layoutGroupId = 'walkthrough-viewport-pill',
  tabletOrientation = 'portrait',
  className,
}: WalkthroughStageProps) {
  const total = screens.length
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, defaultIndex), Math.max(0, total - 1)),
  )
  const [viewport, setViewport] = useState<WalkthroughViewport>(defaultViewport)
  const { prefersReducedMotion } = useMotionSafe()
  const containerRef = useRef<HTMLDivElement>(null)

  const atFirst = index === 0
  const atLast = index === total - 1
  const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  const goNext = () => setIndex((i) => Math.min(total - 1, i + 1))
  const goTo = (i: number) => setIndex(Math.min(Math.max(0, i), total - 1))

  // Force mobile on narrow viewports — iPad chrome will not fit.
  const [isNarrow, setIsNarrow] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(max-width: 640px)')
    const sync = () => setIsNarrow(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [])
  useEffect(() => {
    if (isNarrow && viewport !== 'mobile') setViewport('mobile')
  }, [isNarrow, viewport])
  const effectiveViewport: WalkthroughViewport = isNarrow ? 'mobile' : viewport

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

  if (total === 0) return null

  const active = screens[index]
  const compact = effectiveViewport === 'mobile'
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  const stageContent = (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${effectiveViewport}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="absolute inset-0 overflow-y-auto"
        >
          {active.render(compact)}
        </motion.div>
      </AnimatePresence>
      {active.overlay?.(compact)}
    </div>
  )

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className={cn(
        'flex flex-col gap-4 outline-none',
        showCaption && 'sm:grid sm:grid-cols-[1fr_minmax(260px,340px)] sm:items-start sm:gap-8',
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {!hideViewportSwitcher && !isNarrow && (
          <div className="flex items-center gap-2">
            <span
              className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Viewport
            </span>
            <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
              {(
                [
                  { key: 'tablet', label: 'iPad', Icon: Tablet },
                  { key: 'mobile', label: 'Mobile', Icon: Smartphone },
                ] as const
              ).map(({ key, label, Icon }) => {
                const isActive = viewport === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setViewport(key)}
                    className={
                      'relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-colors ' +
                      (isActive
                        ? 'text-[var(--cta-text,white)]'
                        : 'text-muted-foreground hover:text-foreground')
                    }
                  >
                    {isActive && (
                      <motion.span
                        layoutId={layoutGroupId}
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'var(--cta, #2563eb)' }}
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      />
                    )}
                    <Icon className="relative h-3.5 w-3.5" strokeWidth={2} />
                    <span className="relative">{label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="relative">
          {effectiveViewport === 'tablet' ? (
            <IPadFrame orientation={tabletOrientation}>{stageContent}</IPadFrame>
          ) : (
            <PhoneFrame>{stageContent}</PhoneFrame>
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
