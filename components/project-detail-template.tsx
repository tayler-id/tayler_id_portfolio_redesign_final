'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Play } from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { MagneticButton } from './animate-ui/magnetic-button'
import { FloatingCard } from './animate-ui/floating-card'
import { Button } from './ui/button'
import { VideoPlayer } from './video-player'
import { cn } from '@/lib/utils'

interface ProjectMetric {
  icon: React.ComponentType<any>
  value: string
  label: string
}

interface ProjectPhase {
  icon: React.ComponentType<any>
  phase: string
  description: string
}

interface TechCard {
  title: string
  description: string
  tags: string[]
}

interface ResultCard {
  value: string
  label: string
  description?: string
}

interface ProjectDetailProps {
  // Project metadata
  title: string
  subtitle: string
  description: string
  category: string
  status?: 'live' | 'prototype' | 'archived'
  
  // Visual elements
  gradient: string
  heroIcon?: React.ComponentType<any>
  
  // Project metrics (hero section)
  metrics: ProjectMetric[]
  
  // Project details
  challenge: {
    title: string
    description: string
    quote?: {
      text: string
      author: string
    }
  }
  
  // Process/phases
  process?: {
    title: string
    description: string
    phases: ProjectPhase[]
  }
  
  // Technical implementation
  technical?: {
    title: string
    description: string
    cards: TechCard[]
  }
  
  // Results/impact
  results: {
    title: string
    description: string
    cards: ResultCard[]
    achievements?: string[]
  }
  
  // Reflection/learnings
  reflection?: {
    title: string
    learnings: TechCard[]
    innovations?: string[]
  }
  
  // Demo/links
  demoConfig?: {
    available: boolean
    title: string
    description: string
    features?: string[]
    action?: () => void
    buttonText: string
  }

  // Video demo
  videoDemo?: {
    src: string
    poster?: string
    title?: string
  }

  // Navigation
  onBack?: () => void
  nextSteps?: {
    title: string
    description: string
    primaryAction: {
      text: string
      action: () => void
    }
    secondaryAction: {
      text: string
      action: () => void
    }
  }
}

export function ProjectDetailTemplate(props: ProjectDetailProps) {
  const {
    title,
    subtitle,
    description,
    category,
    status = 'prototype',
    gradient,
    heroIcon: HeroIcon,
    metrics,
    challenge,
    process,
    technical,
    results,
    reflection,
    demoConfig,
    videoDemo,
    onBack,
    nextSteps
  } = props

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className={cn('relative overflow-hidden text-white py-24', gradient)}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          {onBack && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
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

          <div className="text-center mb-12">
            {/* Category Badge */}
            <motion.div
              className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-yellow-300">●</span> {category}
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl lg:text-6xl font-bold font-display mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
              <span className="block text-2xl lg:text-3xl font-normal opacity-90 mt-2">
                {subtitle}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Status Badge */}
          {status === 'live' && (
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white font-semibold">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Live Project
              </div>
            </motion.div>
          )}

          {/* Metrics Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 mx-auto mb-3 text-yellow-300">
                  <metric.icon className="w-full h-full" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">
                  {metric.value}
                </div>
                <div className="text-sm opacity-90">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Section */}
          {demoConfig?.available && (
            <motion.div
              className="mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FloatingCard className="bg-white/95 text-gray-900 backdrop-blur-sm border border-white/30">
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {demoConfig.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {demoConfig.description}
                  </p>
                  
                  {demoConfig.features && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {demoConfig.features.map((feature) => (
                        <div key={feature} className="flex items-center justify-center text-sm">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <MagneticButton onClick={demoConfig.action} className="w-full sm:w-auto">
                    {demoConfig.buttonText}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </MagneticButton>
                </div>
              </FloatingCard>
            </motion.div>
          )}
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold font-display mb-8 text-center">
                {challenge.title}
              </h2>
              
              <FloatingCard className="bg-background/50 backdrop-blur-sm border border-border/50">
                <div className="p-8">
                  <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
                    {challenge.description}
                  </p>
                  
                  {challenge.quote && (
                    <div className="bg-muted/50 border-l-4 border-primary rounded-r-xl p-6">
                      <blockquote className="text-lg italic text-foreground mb-3">
                        "{challenge.quote.text}"
                      </blockquote>
                      <cite className="text-primary font-semibold">
                        — {challenge.quote.author}
                      </cite>
                    </div>
                  )}
                </div>
              </FloatingCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Demo Section */}
      {videoDemo && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4">
                  <Play className="w-4 h-4" />
                  Live Demo
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                  See It In Action
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Watch a walkthrough of the platform features and user experience
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="max-w-5xl mx-auto">
                <VideoPlayer
                  src={videoDemo.src}
                  poster={videoDemo.poster}
                  title={videoDemo.title}
                  className="shadow-2xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Process Section */}
      {process && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                  {process.title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {process.description}
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-4xl mx-auto space-y-6">
              {process.phases.map((phase, index) => (
                <ScrollReveal key={phase.phase} delay={index * 0.1}>
                  <FloatingCard className="bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="p-8">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <phase.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-3">{phase.phase}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {phase.description}
                          </p>
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

      {/* Technical Section */}
      {technical && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                  {technical.title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {technical.description}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {technical.cards.map((card, index) => (
                <ScrollReveal key={card.title} delay={index * 0.1}>
                  <FloatingCard className="h-full bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-3">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {card.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FloatingCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                {results.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {results.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Results Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
            {results.cards.map((card, index) => (
              <ScrollReveal key={card.label} delay={index * 0.1}>
                <FloatingCard className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <div className="p-6 text-center">
                    <div className="text-3xl lg:text-4xl font-bold mb-2">
                      {card.value}
                    </div>
                    <div className="font-medium opacity-90">
                      {card.label}
                    </div>
                    {card.description && (
                      <div className="text-sm opacity-75 mt-2">
                        {card.description}
                      </div>
                    )}
                  </div>
                </FloatingCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Achievements List */}
          {results.achievements && (
            <ScrollReveal delay={0.4}>
              <FloatingCard className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Key Achievements</h3>
                  <ul className="space-y-4">
                    {results.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">
                          {achievement}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FloatingCard>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Reflection Section */}
      {reflection && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                  {reflection.title}
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {reflection.learnings.map((learning, index) => (
                <ScrollReveal key={learning.title} delay={index * 0.1}>
                  <FloatingCard className="h-full bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-3">
                        {learning.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {learning.description}
                      </p>
                    </div>
                  </FloatingCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Innovations */}
            {reflection.innovations && (
              <ScrollReveal delay={0.4}>
                <FloatingCard className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm border border-border/50">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Technical Innovations</h3>
                    <ul className="space-y-4">
                      {reflection.innovations.map((innovation, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {innovation}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FloatingCard>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* Next Steps Section */}
      {nextSteps && (
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                  {nextSteps.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {nextSteps.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton onClick={nextSteps.primaryAction.action}>
                    {nextSteps.primaryAction.text}
                  </MagneticButton>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={nextSteps.secondaryAction.action}
                    className="bg-background/50"
                  >
                    {nextSteps.secondaryAction.text}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  )
}