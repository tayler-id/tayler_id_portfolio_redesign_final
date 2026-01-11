'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, Users, Target, Lightbulb, Palette, Code, CheckCircle2, Quote, Play, Eye, MousePointer, Layers, X, ZoomIn } from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { MagneticButton } from './animate-ui/magnetic-button'
import { FloatingCard } from './animate-ui/floating-card'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Types for the design case study
interface UserPersona {
  name: string
  role: string
  avatar?: string
  quote: string
  painPoints: string[]
  goals: string[]
}

interface ResearchInsight {
  stat: string
  label: string
  description: string
}

interface DesignArtifact {
  type: 'wireframe' | 'mockup' | 'prototype' | 'flow' | 'component'
  title: string
  description: string
  image?: string
  annotations?: string[]
}

interface DesignIteration {
  version: string
  title: string
  description: string
  image?: string
  changes: string[]
}

interface UsabilityFinding {
  task: string
  successRate: string
  insight: string
  action: string
}

interface DesignCaseStudyProps {
  // Meta
  title: string
  subtitle: string
  role: string
  timeline: string
  team?: string[]
  tools: string[]

  // Hero
  heroImage?: string
  gradient: string
  status?: 'live' | 'prototype' | 'archived'
  liveUrl?: string

  // Problem
  problemStatement: string
  problemContext: string[]
  businessGoals: string[]

  // Research
  researchMethods: string[]
  personas?: UserPersona[]
  researchInsights: ResearchInsight[]
  keyFinding: {
    quote: string
    attribution: string
  }

  // Design Process
  designPrinciples: {
    title: string
    description: string
    icon: React.ComponentType<any>
  }[]

  // Information Architecture
  informationArchitecture?: {
    title: string
    description: string
    image?: string
  }

  // Wireframes
  wireframes?: DesignArtifact[]

  // User Flows
  userFlows?: {
    title: string
    description: string
    steps: {
      step: string
      description: string
    }[]
  }[]

  // Visual Design
  visualDesign: {
    colorPalette: { name: string; hex: string; usage: string }[]
    typography: { name: string; usage: string; sample: string }[]
    designDecisions: { decision: string; rationale: string }[]
  }

  // Iterations
  iterations?: DesignIteration[]

  // Usability Testing
  usabilityTesting?: {
    participants: string
    methodology: string
    findings: UsabilityFinding[]
  }

  // Final Design
  finalDesign: {
    screens: DesignArtifact[]
    highlights: string[]
  }

  // Component Library (if applicable)
  componentLibrary?: {
    stats: { value: string; label: string }[]
    components: { name: string; description: string; image?: string }[]
  }

  // Results
  results: {
    metrics: { value: string; label: string; improvement?: string }[]
    testimonial?: { quote: string; author: string; role: string }
    achievements: string[]
  }

  // Reflection
  reflection: {
    learnings: string[]
    whatWorked: string[]
    challenges: string[]
  }

  // Navigation
  onBack?: () => void
}

export function DesignCaseStudyTemplate(props: DesignCaseStudyProps) {
  const {
    title,
    subtitle,
    role,
    timeline,
    team,
    tools,
    heroImage,
    gradient,
    status,
    liveUrl,
    problemStatement,
    problemContext,
    businessGoals,
    researchMethods,
    personas,
    researchInsights,
    keyFinding,
    designPrinciples,
    informationArchitecture,
    wireframes,
    userFlows,
    visualDesign,
    iterations,
    usabilityTesting,
    finalDesign,
    componentLibrary,
    results,
    reflection,
    onBack
  } = props

  // Image lightbox state
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)

  // Clickable image component
  const ClickableImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
    <div
      className={cn("relative cursor-pointer group", className)}
      onClick={() => setLightboxImage({ src, alt })}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
          <ZoomIn className="w-6 h-6 text-gray-900" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full">
              {lightboxImage.alt} • Click anywhere to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className={cn('relative overflow-hidden text-white', gradient)}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          {/* Back Button */}
          {onBack && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-white hover:text-white/80 hover:bg-white/10 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {status === 'live' && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/90 rounded-full text-sm font-medium mb-4">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Live Project
                  </div>
                )}

                <h1 className="text-4xl lg:text-6xl font-bold font-display mb-4 leading-tight">
                  {title}
                </h1>
                <p className="text-xl lg:text-2xl opacity-90 mb-6">
                  {subtitle}
                </p>

                {/* Project Meta */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-sm opacity-70 mb-1">My Role</div>
                    <div className="font-semibold">{role}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-sm opacity-70 mb-1">Timeline</div>
                    <div className="font-semibold">{timeline}</div>
                  </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {liveUrl && (
                  <MagneticButton
                    onClick={() => window.open(liveUrl, '_blank')}
                    className="bg-white text-gray-900 hover:bg-white/90"
                  >
                    View Live Site
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </MagneticButton>
                )}
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {heroImage ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <ClickableImage
                    src={heroImage}
                    alt={title}
                    className="absolute inset-0"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Layers className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <div className="text-lg opacity-70">Product Screenshots</div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display">The Problem</h2>
              </div>

              <FloatingCard className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                <div className="p-8">
                  <p className="text-xl lg:text-2xl font-medium text-red-900 dark:text-red-100 leading-relaxed mb-8">
                    {problemStatement}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Context
                      </h3>
                      <ul className="space-y-3">
                        {problemContext.map((item, i) => (
                          <li key={i} className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Business Goals
                      </h3>
                      <ul className="space-y-3">
                        {businessGoals.map((item, i) => (
                          <li key={i} className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* User Research */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-display">User Research</h2>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
              Understanding our users through qualitative and quantitative research methods.
            </p>
          </ScrollReveal>

          {/* Research Methods */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-12">
              {researchMethods.map((method) => (
                <span
                  key={method}
                  className="px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-500/20"
                >
                  {method}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Personas */}
          {personas && personas.length > 0 && (
            <ScrollReveal delay={0.2}>
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8">User Personas</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {personas.map((persona, index) => (
                    <FloatingCard key={persona.name} className="bg-background/50 backdrop-blur-sm border border-border/50">
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {persona.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">{persona.name}</h4>
                            <p className="text-muted-foreground">{persona.role}</p>
                          </div>
                        </div>

                        <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4 mb-6">
                          "{persona.quote}"
                        </blockquote>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-red-500 mb-2 text-sm">Pain Points</h5>
                            <ul className="space-y-1">
                              {persona.painPoints.map((point, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-red-500 mt-1">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-500 mb-2 text-sm">Goals</h5>
                            <ul className="space-y-1">
                              {persona.goals.map((goal, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-green-500 mt-1">•</span>
                                  {goal}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </FloatingCard>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Research Insights */}
          <ScrollReveal delay={0.3}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-8">Key Insights</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {researchInsights.map((insight, index) => (
                  <FloatingCard key={insight.label} className="bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="p-6 text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{insight.stat}</div>
                      <div className="font-semibold mb-2">{insight.label}</div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Key Finding Quote */}
          <ScrollReveal delay={0.4}>
            <FloatingCard className="bg-primary/5 border-primary/20">
              <div className="p-8 text-center">
                <Quote className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
                <blockquote className="text-2xl font-medium italic mb-4">
                  "{keyFinding.quote}"
                </blockquote>
                <cite className="text-muted-foreground">— {keyFinding.attribution}</cite>
              </div>
            </FloatingCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-display">Design Principles</h2>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
              Guiding principles that informed every design decision.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designPrinciples.map((principle, index) => (
              <ScrollReveal key={principle.title} delay={index * 0.1}>
                <FloatingCard className="h-full bg-background/50 backdrop-blur-sm border border-border/50">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <principle.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </div>
                </FloatingCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wireframes & User Flows */}
      {(wireframes || userFlows) && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-amber-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display">Design Exploration</h2>
              </div>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
                Early explorations and information architecture.
              </p>
            </ScrollReveal>

            {/* User Flows */}
            {userFlows && userFlows.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8">User Flows</h3>
                {userFlows.map((flow, flowIndex) => (
                  <ScrollReveal key={flow.title} delay={flowIndex * 0.1}>
                    <FloatingCard className="mb-8 bg-background/50 backdrop-blur-sm border border-border/50">
                      <div className="p-8">
                        <h4 className="text-xl font-bold mb-2">{flow.title}</h4>
                        <p className="text-muted-foreground mb-6">{flow.description}</p>

                        <div className="flex flex-wrap items-center gap-4">
                          {flow.steps.map((step, stepIndex) => (
                            <React.Fragment key={step.step}>
                              <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                                  {stepIndex + 1}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{step.step}</div>
                                  <div className="text-xs text-muted-foreground">{step.description}</div>
                                </div>
                              </div>
                              {stepIndex < flow.steps.length - 1 && (
                                <div className="text-muted-foreground">→</div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </FloatingCard>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Wireframes */}
            {wireframes && wireframes.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-8">Wireframes</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wireframes.map((wireframe, index) => (
                    <ScrollReveal key={wireframe.title} delay={index * 0.1}>
                      <FloatingCard className="bg-background/50 backdrop-blur-sm border border-border/50 overflow-hidden">
                        <div className="aspect-video bg-muted/50 flex items-center justify-center border-b border-border/50 relative overflow-hidden">
                          {wireframe.image ? (
                            <ClickableImage
                              src={wireframe.image}
                              alt={wireframe.title}
                              className="absolute inset-0"
                            />
                          ) : (
                            <WireframePlaceholder type={wireframe.type} />
                          )}
                        </div>
                        <div className="p-4">
                          <span className="text-xs text-primary font-medium uppercase tracking-wider">{wireframe.type}</span>
                          <h4 className="font-bold mt-1">{wireframe.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{wireframe.description}</p>
                        </div>
                      </FloatingCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Visual Design */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Palette className="w-6 h-6 text-pink-500" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-display">Visual Design</h2>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
              The visual language that brings the experience to life.
            </p>
          </ScrollReveal>

          {/* Color Palette */}
          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8">Color Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {visualDesign.colorPalette.map((color) => (
                  <div key={color.name} className="text-center">
                    <div
                      className="w-full aspect-square rounded-xl mb-3 shadow-lg border border-border/50"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="font-semibold text-sm">{color.name}</div>
                    <div className="text-xs text-muted-foreground">{color.hex}</div>
                    <div className="text-xs text-muted-foreground mt-1">{color.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Typography */}
          <ScrollReveal delay={0.2}>
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8">Typography</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {visualDesign.typography.map((type) => (
                  <FloatingCard key={type.name} className="bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">{type.name}</div>
                      <div className="text-3xl font-display mb-2">{type.sample}</div>
                      <div className="text-sm text-muted-foreground">{type.usage}</div>
                    </div>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Design Decisions */}
          <ScrollReveal delay={0.3}>
            <div>
              <h3 className="text-2xl font-bold mb-8">Key Design Decisions</h3>
              <div className="space-y-4">
                {visualDesign.designDecisions.map((item, index) => (
                  <FloatingCard key={index} className="bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="p-6">
                      <h4 className="font-bold text-primary mb-2">{item.decision}</h4>
                      <p className="text-muted-foreground">{item.rationale}</p>
                    </div>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Design Iterations */}
      {iterations && iterations.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display">Design Evolution</h2>
              </div>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
                How the design evolved through feedback and testing.
              </p>
            </ScrollReveal>

            <div className="space-y-12">
              {iterations.map((iteration, index) => (
                <ScrollReveal key={iteration.version} delay={index * 0.1}>
                  <FloatingCard className="bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                          {iteration.version}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{iteration.title}</h3>
                        <p className="text-muted-foreground mb-6">{iteration.description}</p>
                        <div>
                          <h4 className="font-semibold mb-3">Key Changes</h4>
                          <ul className="space-y-2">
                            {iteration.changes.map((change, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {change}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="aspect-video bg-muted/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                        {iteration.image ? (
                          <ClickableImage
                            src={iteration.image}
                            alt={iteration.title}
                            className="absolute inset-0 rounded-xl"
                          />
                        ) : (
                          <div className="text-center p-8">
                            <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                            <div className="text-sm text-muted-foreground">Design Screenshot</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FloatingCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Usability Testing */}
      {usabilityTesting && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display">Usability Testing</h2>
              </div>
              <div className="flex flex-wrap gap-4 mb-12">
                <span className="px-4 py-2 bg-muted rounded-full text-sm">
                  <strong>Participants:</strong> {usabilityTesting.participants}
                </span>
                <span className="px-4 py-2 bg-muted rounded-full text-sm">
                  <strong>Method:</strong> {usabilityTesting.methodology}
                </span>
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {usabilityTesting.findings.map((finding, index) => (
                <ScrollReveal key={finding.task} delay={index * 0.1}>
                  <FloatingCard className="bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="p-6">
                      <div className="grid md:grid-cols-4 gap-6">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Task</div>
                          <div className="font-semibold">{finding.task}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                          <div className="font-bold text-2xl text-green-500">{finding.successRate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Insight</div>
                          <div className="text-sm">{finding.insight}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Action Taken</div>
                          <div className="text-sm text-primary">{finding.action}</div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Design */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display">Final Design</h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The polished product ready for users.
              </p>
            </div>
          </ScrollReveal>

          {/* Final Screens */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {finalDesign.screens.map((screen, index) => (
              <ScrollReveal key={screen.title} delay={index * 0.1}>
                <FloatingCard className="bg-background/50 backdrop-blur-sm border border-border/50 overflow-hidden">
                  <div className="aspect-video bg-muted/50 flex items-center justify-center border-b border-border/50 relative overflow-hidden">
                    {screen.image ? (
                      <ClickableImage
                        src={screen.image}
                        alt={screen.title}
                        className="absolute inset-0"
                      />
                    ) : (
                      <MockupPlaceholder title={screen.title} />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold">{screen.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{screen.description}</p>
                  </div>
                </FloatingCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Highlights */}
          <ScrollReveal delay={0.4}>
            <FloatingCard className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Design Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {finalDesign.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Component Library */}
      {componentLibrary && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-cyan-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display">Design System</h2>
              </div>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
                Scalable components for consistent experiences.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {componentLibrary.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-6 bg-muted/30 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Components */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {componentLibrary.components.map((component, index) => (
                <ScrollReveal key={component.name} delay={index * 0.1}>
                  <FloatingCard className="bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="aspect-video bg-muted/50 flex items-center justify-center border-b border-border/50">
                      <ComponentPlaceholder name={component.name} />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold">{component.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
                    </div>
                  </FloatingCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-24 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Results & Impact</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Measurable outcomes that demonstrate design value.
              </p>
            </div>
          </ScrollReveal>

          {/* Metrics */}
          <ScrollReveal delay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {results.metrics.map((metric) => (
                <FloatingCard key={metric.label} className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <div className="p-6 text-center">
                    <div className="text-4xl font-bold mb-1">{metric.value}</div>
                    <div className="font-medium opacity-90">{metric.label}</div>
                    {metric.improvement && (
                      <div className="text-sm opacity-75 mt-1">{metric.improvement}</div>
                    )}
                  </div>
                </FloatingCard>
              ))}
            </div>
          </ScrollReveal>

          {/* Testimonial */}
          {results.testimonial && (
            <ScrollReveal delay={0.2}>
              <FloatingCard className="max-w-3xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50 mb-12">
                <div className="p-8 text-center">
                  <Quote className="w-12 h-12 mx-auto mb-4 text-green-500 opacity-50" />
                  <blockquote className="text-xl italic mb-4">
                    "{results.testimonial.quote}"
                  </blockquote>
                  <cite className="text-muted-foreground">
                    — {results.testimonial.author}, {results.testimonial.role}
                  </cite>
                </div>
              </FloatingCard>
            </ScrollReveal>
          )}

          {/* Achievements */}
          <ScrollReveal delay={0.3}>
            <FloatingCard className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Key Achievements</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {results.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FloatingCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Reflection */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">Reflection</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                What I learned and how I grew.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollReveal delay={0.1}>
              <FloatingCard className="h-full bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                <div className="p-6">
                  <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4">What I Learned</h3>
                  <ul className="space-y-2">
                    {reflection.learnings.map((item, i) => (
                      <li key={i} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FloatingCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <FloatingCard className="h-full bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                <div className="p-6">
                  <h3 className="font-bold text-green-800 dark:text-green-200 mb-4">What Worked</h3>
                  <ul className="space-y-2">
                    {reflection.whatWorked.map((item, i) => (
                      <li key={i} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FloatingCard>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <FloatingCard className="h-full bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                <div className="p-6">
                  <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-4">Challenges Overcome</h3>
                  <ul className="space-y-2">
                    {reflection.challenges.map((item, i) => (
                      <li key={i} className="text-sm text-amber-700 dark:text-amber-300 flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FloatingCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                Let's Work Together
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Interested in bringing thoughtful design to your next project?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Get in Touch
                </MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onBack}
                  className="bg-background/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

// Placeholder components for visual artifacts
function WireframePlaceholder({ type }: { type: string }) {
  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-gray-300" />
        <div className="w-3 h-3 rounded-full bg-gray-300" />
        <div className="w-3 h-3 rounded-full bg-gray-300" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2 mt-4">
          <div className="h-8 bg-gray-300 rounded flex-1" />
          <div className="h-8 bg-gray-200 rounded flex-1" />
        </div>
        <div className="h-24 bg-gray-100 rounded mt-4 border-2 border-dashed border-gray-300" />
      </div>
    </div>
  )
}

function MockupPlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center p-4">
        <Layers className="w-12 h-12 mx-auto mb-2 text-gray-400" />
        <div className="text-sm text-gray-500 font-medium">{title}</div>
      </div>
    </div>
  )
}

function ComponentPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-[200px] space-y-3">
        <div className="h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <div className="w-20 h-4 bg-primary/40 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded flex-1" />
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-3">{name}</div>
    </div>
  )
}
