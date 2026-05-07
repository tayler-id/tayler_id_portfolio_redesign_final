'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface SupportingMetric {
  value: string
  label: string
}

interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  heroStat: string
  heroLabel: string
  body: string
  metrics: SupportingMetric[]
  tags: string[]
  externalUrl?: string
}

const projects: Project[] = [
  {
    id: 'onboard-iq',
    number: '01',
    title: 'OnboardIQ',
    subtitle: 'Merchant onboarding workflow product. 0-to-1 at Versatile / Synchrony.',
    heroStat: '5 days → 2 hours',
    heroLabel: '500 locations onboarded in a single session for an elective medical practice program.',
    body:
      'Merchant onboarding ate a full cross-functional team. Five days of meetings per partner to gather configurations from sales, ops, risk, and the partner themselves. Six entity types, each with about ten metadata fields, arrived through email and Slack threads. Tickets dropped, configs drifted, and stakeholders had no visibility into program status without booking a meeting. I designed OnboardIQ from a blank canvas: a flexible workflow product that codified the entire process into configurable, partner-aware steps. Audits and automation went directly into the workflow, so validation, status, and handoffs were surfaced inline instead of chased over Slack.',
    metrics: [
      { value: '30,000+', label: 'Merchants onboarded' },
      { value: '3', label: 'Verticals (retail, elective medical, home improvement)' },
      { value: '3 days → 3 hours', label: 'Support ticket resolution' },
    ],
    tags: ['Workflow Product', 'Fintech', '0-to-1'],
  },
  {
    id: 'rayni',
    number: '02',
    title: 'Rayni',
    subtitle: 'AI document intelligence platform. In daily production at scientific research labs.',
    heroStat: '60% faster',
    heroLabel: 'document verification vs. manual PDF search.',
    body:
      'Lab technicians couldn\'t trust AI answers without seeing the source documents — existing tools gave answers without verification. I built a split-screen verification interface with citation deep-linking to exact PDF coordinates so users validate every response. Designed a gap-detection UX with an 85% confidence threshold that asks for missing documents instead of guessing. The pattern was later extracted into Document Domain Agents, a domain-agnostic framework for high-stakes RAG.',
    metrics: [
      { value: '92%', label: 'User compliance with upload prompts' },
      { value: '40%', label: 'Reduction in false-positive responses' },
      { value: '50+', label: 'Design system components' },
    ],
    tags: ['AI / RAG', 'In Production', '0-to-1'],
  },
  {
    id: 'doc-domain-agent',
    number: '03',
    title: 'Document Domain Agents',
    subtitle: 'Domain-agnostic, high-stakes RAG framework. Extracted from Rayni.',
    heroStat: '85%',
    heroLabel: 'confidence threshold for the "never guess" gating policy.',
    body:
      'Most RAG systems guess when they don\'t have enough information, creating dangerous false confidence in safety-critical contexts. Document Domain Agents is the framework I extracted from Rayni for any domain where AI accuracy is non-negotiable. The gap-detection UX turns AI limitations into collaborative moments — users upload missing documents instead of losing trust in the system. Verification is split-screen, BLUF formatting handles scannability, and confidence indicators are calibrated to domain risk.',
    metrics: [
      { value: '5', label: 'RAG platforms in competitive analysis' },
      { value: '3', label: 'Iteration cycles before launch' },
      { value: 'Any domain', label: 'Framework portability' },
    ],
    tags: ['AI Framework', 'Trust UX'],
  },
  {
    id: 'mindpattern',
    number: '04',
    title: 'MindPattern',
    subtitle: 'Autonomous AI research pipeline plus an MCP-powered chat with generative UI. Personal infrastructure I run every day.',
    heroStat: '~47K lines · 13 agents',
    heroLabel: 'Python pipeline runs daily at 7 AM. Gathers ~400 items from 8 sources, dispatches 13 research agents in parallel, synthesizes a 4,500-word newsletter, and posts to social.',
    body:
      'MindPattern is two systems wired together. The backend is a deterministic 12-phase Python pipeline that operates as a one-person media company on autopilot: preflight data collection across eight sources (RSS, Hacker News, arXiv, GitHub, Reddit, Twitter, YouTube, LinkedIn), parallel dispatch of thirteen specialist research agents, synthesis of 150+ findings, newsletter publishing, and platform-native social posting. A self-improving harness finds bugs in the pipeline, writes fixes using TDD, reviews its own PRs, and merges them. The public site is a chat interface built around generative UI — when the AI invokes MCP tools that return structured data, React components (finding cards, source tables, health dashboards, pattern lists, skill cards) render directly inside the conversation instead of plain text. Wrapped in a Wire Room intelligence-dossier aesthetic: JetBrains Mono everywhere, manila palette, stamp badges, grid-paper textures.',
    metrics: [
      { value: '12 phases · 8 sources', label: 'Daily autonomous run' },
      { value: '9 MCP UI components', label: 'Generative UI in chat' },
      { value: 'Self-improving harness', label: 'TDD agents write + merge their own PRs' },
    ],
    tags: ['Personal Project', 'Agentic Systems', 'MCP Generative UI'],
    externalUrl: 'https://mindpattern.ai',
  },
]

export function ProjectsSection() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 relative"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20 sm:mb-28 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
            Selected Work · Past 24 Months
          </div>
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-4"
          >
            Featured projects
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Fintech at scale, AI in production, and personal infrastructure for autonomous research.
            Numbers are real, no synthetic personas.
          </p>
        </div>

        {/* Project entries */}
        <div className="space-y-24 sm:space-y-32">
          {projects.map((project) => (
            <ProjectEntry
              key={project.id}
              project={project}
              total={projects.length}
              noAnimation={noAnimation}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-32 sm:mt-40 pt-12 border-t border-border/60 max-w-3xl">
          <p className="text-base text-muted-foreground leading-relaxed">
            Most of the products above aren\'t public. Reach out and I\'ll walk you through them in detail —
            screen recordings, codebases, or a live ticket together.
          </p>
        </div>
      </div>
    </section>
  )
}

interface ProjectEntryProps {
  project: Project
  total: number
  noAnimation: boolean
}

function ProjectEntry({ project, total, noAnimation }: ProjectEntryProps) {
  const initial = noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
  const animate = { opacity: 1, y: 0 }

  return (
    <motion.article
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={noAnimation ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
      className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16"
    >
      {/* Number column */}
      <div className="font-mono text-sm text-muted-foreground tracking-wider">
        <div className="lg:sticky lg:top-32 flex lg:flex-col items-baseline lg:items-start gap-2">
          <span className="text-foreground font-semibold">{project.number}</span>
          <span className="opacity-60">/ {String(total).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Content column */}
      <div className="space-y-10 max-w-3xl">
        {/* Title block */}
        <div className="space-y-3">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.05]">
            {project.title}
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Hero stat */}
        <motion.div
          initial={noAnimation ? { opacity: 1 } : { opacity: 0, x: -16 }}
          whileInView={noAnimation ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={noAnimation ? { duration: 0 } : { duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="border-l-2 border-primary pl-6 py-2"
        >
          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-primary leading-none">
            {project.heroStat}
          </div>
          <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 max-w-md">
            {project.heroLabel}
          </div>
        </motion.div>

        {/* Body */}
        <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
          {project.body}
        </p>

        {/* Supporting metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 border-y border-border/50">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="space-y-1.5">
              <div className="text-xl sm:text-2xl font-bold font-display tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground leading-snug">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags + optional external link */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs uppercase tracking-wider font-mono text-muted-foreground">
            {project.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono text-primary hover:text-primary/80 transition-colors group"
            >
              <span>Visit live</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
