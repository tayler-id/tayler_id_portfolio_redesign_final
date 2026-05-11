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
    id: 'tasks',
    label: 'Tasks',
    src: '/assets/onboardIQ/01-my-tasks.png',
    caption:
      'Single inbox cuts across every running deployment. 107 active, 32 done, 22 in flight, 40 overdue. The same view that replaced the weekly coordination meeting with a 5-minute daily brief.',
  },
  {
    id: 'instances',
    label: 'Instances',
    src: '/assets/onboardIQ/02-workflow-instances.png',
    caption:
      'Every deployment is a workflow instance with progress, status, and SLA. The list scales. What used to be tracked across spreadsheets and Slack threads now lives in one place across 30,000+ merchants.',
  },
  {
    id: 'step',
    label: 'Step',
    src: '/assets/onboardIQ/03-active-step.png',
    caption:
      'Open an instance: every step has owner, started, completed, duration, SLA. Activity log on the right traces who launched, who escalated, who signed off. Audit-grade by default, not bolted on.',
  },
  {
    id: 'form',
    label: 'Form',
    src: '/assets/onboardIQ/04-select-features.png',
    caption:
      'One step, full depth: business + vertical + program + provider products + deployment options on the left, live Selection Summary and 100% Compatibility Score on the right. Six entity types, ~10 fields each, tamed into one guided funnel.',
  },
  {
    id: 'collect',
    label: 'Collect',
    src: '/assets/onboardIQ/05-collect-locations.png',
    caption:
      'Collect Data step renders entities as editable tables with hierarchy on the left. Locations, devices, users, domains. Same shell, scoped to whichever entity the workflow needs at this step.',
  },
  {
    id: 'import',
    label: 'Import',
    src: '/assets/onboardIQ/06-bulk-import.png',
    caption:
      'Bulk CSV import with auto-suggested column mapping for users, locations, and devices in one pass. Five days of cross-team meetings collapsed to two hours for 500 locations because the manual entry stopped being manual.',
  },
  {
    id: 'designer',
    label: 'Designer',
    src: '/assets/onboardIQ/07-workflow-designer.png',
    caption:
      'Workflow designer: step library on the left, canvas in the middle, per-step config on the right. Critical Path, Review Required, Sign-Off. Operations primitives baked into every workflow without writing custom logic.',
  },
  {
    id: 'compare',
    label: 'Compare',
    src: '/assets/onboardIQ/08-lender-comparison.png',
    caption:
      'Cross-deployment lender performance: time-to-launch, completion rate, first-deal latency. The same telemetry that justified the 3-day → 3-hour support ticket resolution.',
  },
  {
    id: 'roles',
    label: 'Roles',
    src: '/assets/onboardIQ/09-workflow-roles.png',
    caption:
      'RBAC for the workflow itself. Default permissions per role, default sign-off and review users. A workflow is a contract, not a checklist, and the people side ships with the steps.',
  },
]

export function OnboardIqEvidence() {
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
      aria-labelledby="onboard-iq-tabs-caption"
    >
      <div
        role="tablist"
        aria-label="OnboardIQ states"
        className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.18em] font-mono border-b border-border/60 pb-3"
      >
        {shots.map((shot) => {
          const isActive = shot.id === activeId
          return (
            <button
              key={shot.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`onboard-iq-mode-panel-${shot.id}`}
              id={`onboard-iq-mode-tab-${shot.id}`}
              onClick={() => setActiveId(shot.id)}
              className={`whitespace-nowrap transition-colors py-1 -mb-[13px] border-b-2 ${
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
        id={`onboard-iq-mode-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`onboard-iq-mode-tab-${active.id}`}
        aria-label={`Open enlarged view of ${active.label}`}
        onClick={() => setLightboxOpen(true)}
        className="relative block w-full text-left rounded-lg overflow-hidden border border-border/60 bg-card/40 shadow-sm cursor-zoom-in transition-transform hover:scale-[1.005]"
      >
        <div className="relative aspect-[3456/2160]">
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
                alt={`OnboardIQ · ${active.label}`}
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
        id="onboard-iq-tabs-caption"
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
