'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-reduced-motion'
import { ImageLightbox, type LightboxItem } from './image-lightbox'

interface ModeShot {
  id: string
  label: string
  src: string
  caption: string
}

const shots: ModeShot[] = [
  {
    id: 'welcome',
    label: 'Welcome',
    src: '/assets/qualified/01-welcome-intro.png',
    caption:
      'Side panel docks beside any retail site. No checkout integration required. Qualified rides along while you shop and asks what you are looking for.',
  },
  {
    id: 'products',
    label: 'Products',
    src: '/assets/qualified/03-product-grid.png',
    caption:
      'Tell it the intent in chat ("a new living room set") and a product-search tool returns a hydrated grid of options as inline MCP UI, not a wall of text.',
  },
  {
    id: 'detail',
    label: 'Detail',
    src: '/assets/qualified/05-product-detail-boswell.png',
    caption:
      'Click any card and the detail tool returns specs, pricing, and a buying-options panel, rendered inside the conversation thread alongside the product page.',
  },
  {
    id: 'waterfall',
    label: 'Lender waterfall',
    src: '/assets/qualified/07-lender-waterfall.png',
    caption:
      'Synchrony (prime), Fortiva (near-prime), Acima (lease-to-own), plus Affirm and Klarna BNPL. Every customer qualifies for something. Same waterfall pattern from Versatile / Synchrony, surfaced the moment intent shows.',
  },
  {
    id: 'calculator',
    label: 'Payment calculator',
    src: '/assets/qualified/09-payment-calculator.png',
    caption:
      'Ask "show me how much I will be paying" and a calculator tool returns a month-by-month payment chart in chat. Interactive, not a static answer.',
  },
  {
    id: 'apply',
    label: 'Apply',
    src: '/assets/qualified/08-application-form.png',
    caption:
      'Pre-filled application form rendered inside a sandboxed iframe. PostMessage hydrates the UI; the agent stays in the loop while the customer fills in income, housing, and employment.',
  },
]

export function QualifiedEvidence() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const [activeId, setActiveId] = React.useState(shots[0].id)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const active = shots.find((s) => s.id === activeId) ?? shots[0]
  const activeIndex = shots.findIndex((s) => s.id === active.id)

  const lightboxItems: LightboxItem[] = shots.map((s) => ({
    src: s.src,
    label: s.label,
    caption: s.caption,
  }))

  return (
    <figure
      className="space-y-5"
      aria-labelledby="qualified-tabs-caption"
    >
      <div
        role="tablist"
        aria-label="Qualified extension states"
        className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.22em] font-mono border-b border-border/60 pb-3"
      >
        {shots.map((shot) => {
          const isActive = shot.id === activeId
          return (
            <button
              key={shot.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`qualified-mode-panel-${shot.id}`}
              id={`qualified-mode-tab-${shot.id}`}
              onClick={() => setActiveId(shot.id)}
              className={`transition-colors py-1 -mb-[13px] border-b-2 ${
                isActive
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {shot.label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        id={`qualified-mode-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`qualified-mode-tab-${active.id}`}
        aria-label={`Open enlarged view of ${active.label}`}
        onClick={() => setLightboxOpen(true)}
        className="relative block w-full text-left rounded-lg overflow-hidden border border-border/60 bg-card/40 shadow-sm cursor-zoom-in transition-transform hover:scale-[1.005]"
      >
        <div className="relative aspect-[3456/2234]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={noAnimation ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={noAnimation ? { opacity: 1 } : { opacity: 0 }}
              transition={noAnimation ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={active.src}
                alt={`Qualified · ${active.label}`}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover object-top"
                priority={active.id === shots[0].id}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </button>

      <figcaption
        id="qualified-tabs-caption"
        className="text-sm text-muted-foreground leading-relaxed max-w-2xl"
      >
        <span className="font-mono uppercase tracking-[0.18em] text-foreground mr-2">
          {active.label}.
        </span>
        {active.caption}
      </figcaption>

      <ImageLightbox
        items={lightboxItems}
        index={activeIndex}
        open={lightboxOpen}
        onIndexChange={(i) => setActiveId(shots[i].id)}
        onOpenChange={setLightboxOpen}
      />
    </figure>
  )
}
