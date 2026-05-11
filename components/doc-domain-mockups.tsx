'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-reduced-motion'
import { ImageLightbox, type LightboxItem } from './image-lightbox'

interface Mockup {
  id: string
  label: string
  caption: string
  src: string
}

const mockups: Mockup[] = [
  {
    id: 'empty',
    label: 'Empty',
    src: '/assets/doc-domain/wireframe-empty-chat.png',
    caption:
      'Cold-start chat. Sidebar lists items, knowledge folders, and admin. No inferred questions, no demo prompts. The agent waits for a real query before doing anything.',
  },
  {
    id: 'query',
    label: 'Query',
    src: '/assets/doc-domain/wireframe-initial-query.png',
    caption:
      'Initial query reasoning: intent classification, broad search, scoped retrieval. Each step is visible so the user can see what the agent is doing on the way to a verdict.',
  },
  {
    id: 'response',
    label: 'Response',
    src: '/assets/doc-domain/wireframe-detailed-response.png',
    caption:
      'BLUF response: verdict at the top, then evidence with confidence pills, then citations, then safety. Same shape every answer so the reader can scan once.',
  },
  {
    id: 'citation-popover',
    label: 'Popover',
    src: '/assets/doc-domain/wireframe-citation-popover.png',
    caption:
      'Hover any citation chip and a popover surfaces the source span without leaving the chat. Click to commit to the full split-screen verification view.',
  },
  {
    id: 'split',
    label: 'Split',
    src: '/assets/doc-domain/wireframe-chat-split-view.png',
    caption:
      'Chat on the left, source PDF on the right. The cited page renders with bounding boxes drawn on the exact span the model quoted. Verification by direct comparison, not by trust.',
  },
  {
    id: 'docs-modal',
    label: 'Docs modal',
    src: '/assets/doc-domain/wireframe-document-list-modal.png',
    caption:
      'Document list scoped to the active item. Add, remove, re-index. The corpus is editable in the same surface the agent reads from.',
  },
  {
    id: 'upload',
    label: 'Upload',
    src: '/assets/doc-domain/wireframe-upload-interface.png',
    caption:
      'Upload UI with drag-drop and progress chips. Triggered both from admin and inline from the gap-detection prompt. Same component, two entry points.',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    src: '/assets/doc-domain/wireframe-dashboard-list.png',
    caption:
      'Items dashboard groups every domain entity with their indexed corpus. Same shell across domains; the agent is reused, not rebuilt for each deployment.',
  },
]

export function DocDomainMockups() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const [activeId, setActiveId] = React.useState(mockups[0].id)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const active = mockups.find((m) => m.id === activeId) ?? mockups[0]
  const activeIndex = mockups.findIndex((m) => m.id === active.id)

  const lightboxItems: LightboxItem[] = mockups.map((m) => ({
    src: m.src,
    label: m.label,
    caption: m.caption,
  }))

  return (
    <figure
      className="space-y-5"
      aria-labelledby="doc-domain-mockups-caption"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border/60 pb-3">
        <div
          role="tablist"
          aria-label="Document Domain Agents mockups"
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
                aria-controls={`doc-domain-mockup-panel-${m.id}`}
                id={`doc-domain-mockup-tab-${m.id}`}
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

      <button
        type="button"
        id={`doc-domain-mockup-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`doc-domain-mockup-tab-${active.id}`}
        aria-label={`Open enlarged view of ${active.label}`}
        onClick={() => setLightboxOpen(true)}
        className="relative block w-full text-left rounded-lg overflow-hidden border border-border/60 shadow-sm cursor-zoom-in transition-transform hover:scale-[1.005]"
        style={{ backgroundColor: '#f6f8f7' }}
      >
        <div className="relative aspect-[917/512]">
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
                alt={`Document Domain Agents mockup · ${active.label}`}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </button>

      <figcaption
        id="doc-domain-mockups-caption"
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
        onIndexChange={(i) => setActiveId(mockups[i].id)}
        onOpenChange={setLightboxOpen}
      />
    </figure>
  )
}
