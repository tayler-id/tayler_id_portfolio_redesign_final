'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-reduced-motion'
import { ImageLightbox, type LightboxItem } from './image-lightbox'

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
    id: 'workspace',
    label: 'Workspace',
    caption:
      'Single workspace replaces six separate routes with one mode-aware shell. Three primary actions on the welcome surface: chat, knowledge, combinations.',
    dark: '/assets/rayni_ai/workspace/01-welcome.png',
    light: '/assets/rayni_ai/workspace/Light/01-welcome-light.png',
  },
  {
    id: 'history',
    label: 'History',
    caption:
      'Previous chats group under the selected instrument. Threads stay scoped — no cross-context bleed when you switch instruments.',
    dark: '/assets/rayni_ai/workspace/03-chat-history.png',
    light: '/assets/rayni_ai/workspace/Light/02-chat-history-light.png',
  },
  {
    id: 'verification',
    label: 'Verify',
    caption:
      'Click any citation chip and the answer splits to show the source PDF, deep-linked to the cited page in the user manual.',
    dark: '/assets/rayni_ai/workspace/04-split-verification.png',
    light: '/assets/rayni_ai/workspace/Light/03-split-verification-light.png',
  },
  {
    id: 'knowledge',
    label: 'Knowledge',
    caption:
      'Per-instrument knowledge folders live as a context panel — Maintenance, Protocols, Manuals, Catalogs, Troubleshooting — with an upload-in-progress chip on indexed files.',
    dark: '/assets/rayni_ai/workspace/06-knowledge-folders.png',
    light: '/assets/rayni_ai/workspace/Light/04-knowledge-folders-light.png',
  },
  {
    id: 'combination',
    label: 'Canvas',
    caption:
      'Build instrument workflows on a visual canvas. Same shell, Canvas tab in the context panel — chat with the whole pipeline at once.',
    dark: '/assets/rayni_ai/workspace/05-combo-canvas.png',
    light: '/assets/rayni_ai/workspace/Light/05-new-combination-light.png',
  },
  {
    id: 'access',
    label: 'Access',
    caption:
      'Role-based access control on a single matrix. Roles (User, Admin, Expert) gate what someone can do in the workspace; the matrix gates what they can see — toggling per-user access to each instrument and combination, in bulk. One source of truth for what every account can read, query, and edit.',
    dark: '/assets/rayni_ai/workspace/09-user-management.png',
    light: '/assets/rayni_ai/workspace/Light/09-user-management-light.png',
  },
  {
    id: 'access-detail',
    label: 'Per user',
    caption:
      'Drill into one user and pick exactly which instruments and combinations they can reach. Same RBAC primitive, single-row view — used for narrow exceptions without breaking the bulk grid above.',
    dark: '/assets/rayni_ai/workspace/11-instrument-access.png',
    light: '/assets/rayni_ai/workspace/Light/11-instrument-access-light.png',
  },
]

export function RayniWorkspaceEvidence() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const [activeId, setActiveId] = React.useState(shots[0].id)
  const [theme, setTheme] = React.useState<Theme>('dark')
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const active = shots.find((s) => s.id === activeId) ?? shots[0]
  const activeIndex = shots.findIndex((s) => s.id === active.id)
  const hasDark = Boolean(active.dark)
  const hasLight = Boolean(active.light)
  const effectiveTheme: Theme =
    theme === 'dark' && hasDark ? 'dark' : hasLight ? 'light' : 'dark'
  const src = (effectiveTheme === 'dark' ? active.dark : active.light) as string

  const lightboxItems: LightboxItem[] = shots.map((s) => ({
    src: (s.dark ?? s.light) as string,
    label: s.label,
    caption: s.caption,
  }))

  return (
    <figure
      className="space-y-5"
      aria-labelledby="rayni-evidence-caption"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border/60 pb-3">
        <div
          role="tablist"
          aria-label="Rayni workspace modes"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.18em] font-mono"
        >
          {shots.map((shot) => {
            const isActive = shot.id === activeId
            return (
              <button
                key={shot.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`rayni-mode-panel-${shot.id}`}
                id={`rayni-mode-tab-${shot.id}`}
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
                title={disabled ? 'Light capture not available for this view' : undefined}
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

      <button
        type="button"
        id={`rayni-mode-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`rayni-mode-tab-${active.id}`}
        aria-label={`Open enlarged view of ${active.label}`}
        onClick={() => setLightboxOpen(true)}
        className="relative block w-full text-left rounded-lg overflow-hidden border border-border/60 bg-card/40 shadow-sm cursor-zoom-in transition-transform hover:scale-[1.005]"
      >
        <div className="relative aspect-[3456/2160]">
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
                alt={`Rayni — ${active.label} mode (${effectiveTheme})`}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover object-center"
                priority={active.id === shots[0].id && effectiveTheme === 'dark'}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </button>

      <figcaption
        id="rayni-evidence-caption"
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
