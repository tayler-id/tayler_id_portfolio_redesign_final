'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

type Theme = 'dark' | 'light'

interface ModeShot {
  id: string
  label: string
  caption: string
  dark?: string
  light?: string
}

const shots: ModeShot[] = [
  {
    id: 'empty',
    label: 'Empty',
    caption:
      'Cold-start chat against a fresh corpus. The agent does nothing speculative — no canned suggestions, no inferred intent. Until a user asks, there is nothing to ground.',
    dark: '/assets/doc-domain/chat-empty.png',
  },
  {
    id: 'bluf',
    label: 'BLUF',
    caption:
      'Bottom-Line-Up-Front response format: verdict first, then evidence, then fix, then safety warnings. Same shape every answer so the reader can scan once and decide whether to keep reading or act.',
    dark: '/assets/doc-domain/bluf-response.png',
  },
  {
    id: 'citations',
    label: 'Citations',
    caption:
      'Every claim carries a citation chip mapped to its source span. Expand the chip and the inline references resolve to the original document, page, and section — no hallucinated authority.',
    dark: '/assets/doc-domain/bluf-citations-expanded.png',
  },
  {
    id: 'gap',
    label: 'Gap',
    caption:
      'Reasoning surfaces every step: Analyzing Query → Broad Search → Analyzing Results. When confidence drops below 85% the agent stops, names the gap explicitly ("Information not found"), and refuses to guess. The verdict is "I cannot find this information in the provided manuals," not a hallucinated answer.',
    dark: '/assets/doc-domain/gap-detection.png',
  },
  {
    id: 'verify',
    label: 'Verify',
    caption:
      'Click any citation and the answer splits into source view. The PDF renders with bounding boxes drawn on the exact span the model quoted — verification by direct comparison, not by trust.',
    dark: '/assets/doc-domain/split-view-bounding-box.png',
    light: '/assets/doc-domain/split-view-bounding-box-light.png',
  },
  {
    id: 'upload',
    label: 'Upload',
    caption:
      'Gap-detection drives upload. When confidence drops below 85%, the agent surfaces an upload prompt instead of guessing — turning AI limits into collaborative moments where the user fills the missing context.',
    dark: '/assets/doc-domain/add-documents-modal.png',
    light: '/assets/doc-domain/add-documents-modal-light.png',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    caption:
      'Items dashboard groups every domain entity (instruments, contracts, claims — whatever the deployment is) with their indexed corpus. Same shell across domains; the agent is reused, not rebuilt.',
    dark: '/assets/doc-domain/items-dashboard.png',
    light: '/assets/doc-domain/items-dashboard-light.png',
  },
  {
    id: 'combinations',
    label: 'Combos',
    caption:
      'Stitch multiple items into one queryable workflow. The agent reasons across the joined corpus and returns one BLUF answer with citations spanning every source in the combination.',
    dark: '/assets/doc-domain/combinations.png',
  },
  {
    id: 'admin',
    label: 'Admin',
    caption:
      'RBAC-scoped admin view. Roles, access, and audit trail — the same primitives that ship in Rayni — surfaced here as the framework default, since high-stakes deployments need them on day one.',
    dark: '/assets/doc-domain/admin-users.png',
  },
]

export function DocDomainEvidence() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const [activeId, setActiveId] = React.useState(shots[0].id)
  const [theme, setTheme] = React.useState<Theme>('dark')
  const active = shots.find((s) => s.id === activeId) ?? shots[0]
  const hasDark = Boolean(active.dark)
  const hasLight = Boolean(active.light)
  const effectiveTheme: Theme =
    theme === 'dark' && hasDark ? 'dark' : hasLight ? 'light' : 'dark'
  const src = (effectiveTheme === 'dark' ? active.dark : active.light) as string

  return (
    <figure
      className="space-y-5"
      aria-labelledby="doc-domain-evidence-caption"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border/60 pb-3">
        <div
          role="tablist"
          aria-label="Document Domain Agents states"
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.14em] font-mono"
        >
          {shots.map((shot) => {
            const isActive = shot.id === activeId
            return (
              <button
                key={shot.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`doc-domain-mode-panel-${shot.id}`}
                id={`doc-domain-mode-tab-${shot.id}`}
                onClick={() => setActiveId(shot.id)}
                className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
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

        <div
          role="group"
          aria-label="Theme"
          className="flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-mono p-1 border border-border/60 rounded-full"
        >
          {(['dark', 'light'] as Theme[]).map((t) => {
            const disabled = (t === 'light' && !hasLight) || (t === 'dark' && !hasDark)
            const pressed = effectiveTheme === t
            return (
              <button
                key={t}
                type="button"
                aria-pressed={pressed}
                aria-disabled={disabled}
                disabled={disabled}
                title={disabled ? 'Capture not available for this view' : undefined}
                onClick={() => !disabled && setTheme(t)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  pressed
                    ? 'bg-primary text-primary-foreground'
                    : disabled
                      ? 'text-muted-foreground/40 cursor-not-allowed'
                      : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      <div
        id={`doc-domain-mode-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`doc-domain-mode-tab-${active.id}`}
        className="relative rounded-lg overflow-hidden border border-border/60 bg-card/40 shadow-sm"
      >
        <div className="relative aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-${effectiveTheme}`}
              initial={noAnimation ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={noAnimation ? { opacity: 1 } : { opacity: 0 }}
              transition={noAnimation ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`Document Domain Agents — ${active.label} (${effectiveTheme})`}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover object-center"
                priority={active.id === shots[0].id && effectiveTheme === 'dark'}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <figcaption
        id="doc-domain-evidence-caption"
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
