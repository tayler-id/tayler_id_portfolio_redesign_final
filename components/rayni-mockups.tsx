'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface Mockup {
  id: string
  label: string
  caption: string
  src: string
}

const mockups: Mockup[] = [
  {
    id: 'chat',
    label: 'Chat',
    src: '/assets/rayni_ai/wireframe-1-chat-interface.png',
    caption:
      'Reasoning + streaming text + inline citations + sources badge. The four primitives that anchor every Rayni response, designed before a single line of production UI was written.',
  },
  {
    id: 'knowledge',
    label: 'Knowledge',
    src: '/assets/rayni_ai/wireframe-2-knowledge-store.png',
    caption:
      'Folder tree on the left, file grid on the right, processing chip on uploads in flight. The structure had to make a 50-instrument knowledge store legible — folders are the unit of scope.',
  },
  {
    id: 'verify',
    label: 'Verification',
    src: '/assets/rayni_ai/wireframe-3-citation-verification.png',
    caption:
      'Citation link → split-screen PDF with the cited span highlighted. The wireframe pinned the contract: every claim resolves to a visible source, not a tooltip.',
  },
  {
    id: 'confidence',
    label: 'Confidence',
    src: '/assets/rayni_ai/wireframe-4-confidence-indicator.png',
    caption:
      'Color pills + percentage + caveat language. High (94%) shows a confident result; medium (72%) flags a verify nudge; low (41%) triggers gap detection — the agent asks for missing documents instead of guessing.',
  },
  {
    id: 'instrument',
    label: 'Instrument',
    src: '/assets/rayni_ai/wireframe-5-document-upload.png',
    caption:
      'New-instrument flow: name + vendor + model, then a drag-drop zone for manuals. Three steps so a lab tech can onboard a device without leaving the chat surface.',
  },
  {
    id: 'combinations',
    label: 'Combinations',
    src: '/assets/rayni_ai/wireframe-6-instrument-combinations.png',
    caption:
      'Combination cards stitch instruments into a workflow with one chat thread. Open Canvas opens the visual builder; New Chat queries the joined corpus directly.',
  },
]

export function RayniMockups() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const [activeId, setActiveId] = React.useState(mockups[0].id)
  const active = mockups.find((m) => m.id === activeId) ?? mockups[0]

  return (
    <figure
      className="space-y-5"
      aria-labelledby="rayni-mockups-caption"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border/60 pb-3">
        <div
          role="tablist"
          aria-label="Rayni mockups"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.18em] font-mono"
        >
          {mockups.map((m) => {
            const isActive = m.id === activeId
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`rayni-mockup-panel-${m.id}`}
                id={`rayni-mockup-tab-${m.id}`}
                onClick={() => setActiveId(m.id)}
                className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {m.label}
              </button>
            )
          })}
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
          Mockups · pre-build
        </span>
      </div>

      <div
        id={`rayni-mockup-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`rayni-mockup-tab-${active.id}`}
        className="relative rounded-lg overflow-hidden border border-border/60 shadow-sm"
        style={{ backgroundColor: '#dddee2' }}
      >
        <div className="relative aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={noAnimation ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={noAnimation ? { opacity: 1 } : { opacity: 0 }}
              transition={noAnimation ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={active.src}
                alt={`Rayni mockup — ${active.label}`}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <figcaption
        id="rayni-mockups-caption"
        className="text-sm text-muted-foreground leading-relaxed max-w-2xl"
      >
        <span className="font-mono uppercase tracking-[0.18em] text-foreground mr-2">
          {active.label}.
        </span>
        {active.caption}
      </figcaption>
    </figure>
  )
}
