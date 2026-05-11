'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMotionPreference } from '@/hooks/use-reduced-motion'
import { RayniWorkspaceEvidence } from './rayni-workspace-evidence'
import { RayniMockups } from './rayni-mockups'
import { QualifiedEvidence } from './qualified-evidence'
import { DocDomainEvidence } from './doc-domain-evidence'
import { DocDomainMockups } from './doc-domain-mockups'
import { OnboardIqEvidence } from './onboard-iq-evidence'

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
  internalHref?: string
}

const versatileProjects: Project[] = [
  {
    id: 'versatile-apply',
    number: '01',
    title: 'Versatile Apply',
    subtitle: 'Consumer financing across 4 channels and 35+ lenders.',
    heroStat: '+157%',
    heroLabel:
      'Near-prime approvals at Ashley Furniture. 6M annual applications. 3-min decision.',
    body:
      'A consumer applies for financing once. The merchant wants that one application to reach 35+ lenders without 35 forms, 35 redirects, or 35 different compliance gauntlets. Every lender has its own gateway, fields, and regulatory language. The platform absorbs all of it with one application contract that themes per merchant and per lender. Compliance text becomes a design-system token, not content.',
    metrics: [
      { value: '6M', label: 'Annual applications across 4 channels and 35+ lender integrations' },
      { value: '+92%', label: 'Prime applicants at Ashley Furniture (paired with +157% near-prime)' },
      { value: '3 min', label: 'Time-to-decision vs 10–15 min traditional' },
    ],
    tags: ['Fintech', 'Multi-tenant', 'Design Systems'],
    internalHref: '/work/versatile-apply',
  },
  {
    id: 'onboard-iq',
    number: '02',
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
]

const otherProjects: Project[] = [
  {
    id: 'rayni',
    number: '01',
    title: 'Rayni',
    subtitle: 'AI document intelligence platform. In daily production at scientific research labs.',
    heroStat: '60% faster',
    heroLabel: 'document verification vs. manual PDF search.',
    body:
      'Lab technicians couldn\'t trust AI answers without seeing the source documents. Existing tools gave answers but no verification. I built a split-screen verification interface with citation deep-linking to exact PDF coordinates so users could validate every response. The gap-detection UX uses an 85% confidence threshold: if the model isn\'t sure, it asks for the missing documents instead of guessing. The pattern was later extracted into Document Domain Agents, a domain-agnostic framework for high-stakes RAG.',
    metrics: [
      { value: '92%', label: 'User compliance with upload prompts' },
      { value: '40%', label: 'Reduction in false-positive responses' },
      { value: '50+', label: 'Design system components' },
    ],
    tags: ['AI / RAG', 'In Production', '0-to-1'],
  },
  {
    id: 'doc-domain-agent',
    number: '02',
    title: 'Document Domain Agents',
    subtitle: 'Domain-agnostic, high-stakes RAG framework. Extracted from Rayni.',
    heroStat: '85%',
    heroLabel: 'confidence threshold for the "never guess" gating policy.',
    body:
      'Most RAG systems guess when they don\'t have enough information, which creates dangerous false confidence in safety-critical contexts. Document Domain Agents is the framework I extracted from Rayni for any domain where AI accuracy is non-negotiable. The gap-detection UX turns AI limitations into collaborative moments. When the system needs more, users upload the missing documents instead of losing trust in it. Verification is split-screen, BLUF formatting handles scannability, and confidence indicators are calibrated to domain risk.',
    metrics: [
      { value: '11 nodes', label: 'LangGraph stateful agent workflow with checkpointing' },
      { value: '3 layers', label: 'Vector search, graph augmentation, cross-encoder reranking' },
      { value: 'BLUF', label: 'Verdict, evidence, fix, and safety warnings in every response' },
    ],
    tags: ['AI Framework', 'Trust UX'],
  },
  {
    id: 'qualified',
    number: '03',
    title: 'Qualified',
    subtitle: 'AI-powered financing sidecar. A Chrome side-panel extension that surfaces multi-lender financing while you shop, with rich interactive UI rendered inline in chat.',
    heroStat: '5-lender waterfall · in chat',
    heroLabel: 'Synchrony (prime), Fortiva (near-prime), Acima (lease-to-own), Affirm and Klarna BNPL. Every customer qualifies for something.',
    body:
      'Qualified is a Chrome extension that lives in the browser side panel while you shop. Tell it what you want (say, "a laptop under $1,000") and it searches products, compares them side-by-side, and surfaces real financing options from five lenders the moment intent shows, not at checkout. Architecture: React side panel → Express server on Fly.io → Claude (sonnet-4-6) with eight tool definitions → tool execution → streamed back. The wedge is MCP Apps, an extension of Anthropic\'s Model Context Protocol where tools return interactive HTML UIs instead of just text. Sandboxed iframes hydrate via postMessage to render comparison tables, payment calculators, product grids, and pre-filled application forms directly inside the conversation. Same multi-lender waterfall pattern as Versatile / Synchrony, reimagined as an agentic sidecar with generative UI.',
    metrics: [
      { value: '8 tools', label: 'Agent decides the flow, 7 return interactive MCP UI' },
      { value: '5 lenders', label: 'Synchrony, Fortiva, Acima, Affirm, Klarna · prime to BNPL' },
      { value: 'Sidecar', label: 'Sits next to any retail site, no checkout integration required' },
    ],
    tags: ['Chrome Extension', 'AI Sidecar', 'MCP Apps', 'Embedded Fintech'],
  },
  {
    id: 'mindpattern',
    number: '04',
    title: 'MindPattern',
    subtitle: 'Autonomous AI research pipeline plus an MCP-powered chat with generative UI. Personal infrastructure I run every day.',
    heroStat: '13 agents · daily',
    heroLabel: 'Python pipeline runs autonomously every morning. Gathers ~400 items from 8 sources, dispatches 13 research agents in parallel, synthesizes a 4,500-word newsletter, and posts to social.',
    body:
      'MindPattern is two systems wired together. The backend is a deterministic 12-phase Python pipeline that operates as a one-person media company on autopilot: preflight data collection across eight sources (RSS, Hacker News, arXiv, GitHub, Reddit, Twitter, YouTube, LinkedIn), parallel dispatch of thirteen specialist research agents, synthesis of 150+ findings, newsletter publishing, and platform-native social posting. A self-improving harness finds bugs in the pipeline, writes fixes using TDD, reviews its own PRs, and merges them. The public site is a chat interface built around generative UI. When the AI invokes MCP tools that return structured data, React components render directly inside the conversation instead of plain text: finding cards, source tables, health dashboards, pattern lists, skill cards. Wrapped in a Wire Room intelligence-dossier aesthetic: JetBrains Mono everywhere, manila palette, stamp badges, grid-paper textures.',
    metrics: [
      { value: '12 phases', label: 'Fully autonomous daily run across 8 sources' },
      { value: '9 components', label: 'Generative UI rendered inline in chat' },
      { value: 'Self-merging', label: 'TDD agents write, review, and ship their own PRs' },
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

        {/* Versatile Credit parent overview — frames Apply / Transact / OnboardIQ as one platform */}
        <div className="mb-16 sm:mb-20 max-w-3xl border-l-2 border-primary pl-6 py-2">
          <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-mono">
            Versatile Credit · part of Synchrony (NYSE: SYF)
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4 leading-[1.05]">
            Versatile Credit
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
            One platform, three product surfaces. Lead designer across all three.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
            Versatile Credit is the consumer-financing platform behind $16B+ in financing annually,
            6 million applications in 2024, and 13,000+ retail locations. The platform was recently
            acquired by Synchrony (NYSE: SYF). I&apos;m the lead designer across all three of its
            product surfaces: the consumer-facing applications, the merchant operator console, and
            the internal tool Versatile uses to onboard new merchants. Three different audiences.
            Three different design languages. Three different design systems. One designer across
            all of them.
          </p>
        </div>

        {/* Versatile sub-projects (Apply, OnboardIQ, future Transact) */}
        <div className="space-y-24 sm:space-y-32">
          {versatileProjects.map((project) => (
            <ProjectEntry
              key={project.id}
              project={project}
              total={versatileProjects.length}
              noAnimation={noAnimation}
            />
          ))}
        </div>

        {/* Section break — separates Versatile umbrella from standalone projects */}
        <div className="mt-24 mb-20 sm:mt-32 sm:mb-24 pt-12 border-t border-border/60 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4 font-mono">
            Other selected work
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight leading-[1.05]">
            Outside Versatile
          </h3>
        </div>

        {/* Standalone projects (Rayni, Doc Domain Agents, Qualified, MindPattern) */}
        <div className="space-y-24 sm:space-y-32">
          {otherProjects.map((project) => (
            <ProjectEntry
              key={project.id}
              project={project}
              total={otherProjects.length}
              noAnimation={noAnimation}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-32 sm:mt-40 pt-12 border-t border-border/60 max-w-3xl">
          <p className="text-base text-muted-foreground leading-relaxed">
            Most of the products above aren\'t public. Reach out and I\'ll walk you through them in
            detail: screen recordings, codebases, or a live ticket together.
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
          initial={noAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
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

        {/* Inline evidence */}
        {project.id === 'rayni' && (
          <>
            <RayniWorkspaceEvidence />
            <RayniMockups />
          </>
        )}
        {project.id === 'doc-domain-agent' && (
          <>
            <DocDomainEvidence />
            <DocDomainMockups />
          </>
        )}
        {project.id === 'qualified' && <QualifiedEvidence />}
        {project.id === 'onboard-iq' && <OnboardIqEvidence />}

        {/* Supporting metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 border-y border-border/50">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="text-2xl font-bold font-display tracking-tight leading-none whitespace-nowrap">
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
          {project.internalHref && (
            <Link
              href={project.internalHref}
              className="ml-auto inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono text-primary hover:text-primary/80 transition-colors group"
            >
              <span>Read the case study</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${project.internalHref ? '' : 'ml-auto '}inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono text-primary hover:text-primary/80 transition-colors group`}
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
