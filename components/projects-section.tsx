'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  ExternalLink,
  FileText,
  TrendingUp,
  Clock,
  Users,
  Palette,
  Code,
  Layers,
  Search,
  Monitor,
  Zap,
  Database
} from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { FloatingCard } from './animate-ui/floating-card'
import { MagneticButton } from './animate-ui/magnetic-button'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ProjectCaseStudyModal } from './project-case-study-modal'

export function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [showCaseStudy, setShowCaseStudy] = useState(false)

  const openCaseStudy = useCallback((projectId: string) => {
    setSelectedProjectId(projectId)
    setShowCaseStudy(true)
    // Push state to browser history so back button closes modal
    window.history.pushState({ caseStudy: projectId }, '', `#project/${projectId}`)
  }, [])

  const closeCaseStudy = useCallback(() => {
    setShowCaseStudy(false)
    setSelectedProjectId(null)
    // Only push state if we're not already handling a popstate
    if (window.location.hash.startsWith('#project/')) {
      window.history.pushState({}, '', window.location.pathname)
    }
  }, [])

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.caseStudy) {
        // User navigated forward to a case study
        setSelectedProjectId(event.state.caseStudy)
        setShowCaseStudy(true)
      } else {
        // User pressed back - close the modal
        setShowCaseStudy(false)
        setSelectedProjectId(null)
      }
    }

    // Check if URL has a project hash on mount
    const hash = window.location.hash
    if (hash.startsWith('#project/')) {
      const projectId = hash.replace('#project/', '')
      setSelectedProjectId(projectId)
      setShowCaseStudy(true)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const projects = [
    {
      id: 'onboard-iq',
      title: 'OnboardIQ Workflow Instance Platform',
      category: ['full-stack', 'ui-ux'],
      featured: true,
      status: 'live',
      description: 'Enterprise workflow orchestration platform built on Kotlin/Spring Boot with ServiceKit. Launch, configure, monitor, and manage live workflow instances with cascading configuration, SLA tracking, and role-based assignments across 5 deployment environments.',
      metrics: [
        { icon: TrendingUp, value: '$2.1M', label: 'Revenue Impact' },
        { icon: Clock, value: '65%', label: 'Process Improvement' },
        { icon: Database, value: '49', label: 'Flyway Migrations' }
      ],
      story: [
        { icon: Search, phase: 'Architecture', description: '4 core capabilities: Launch Workflow, Instance List with filters, Instance View with progress timeline, Instance Edit. Cascading config from workflow → version → step → instance.' },
        { icon: Palette, phase: 'Enterprise UI', description: '35+ Pebble macro components with Tailwind CSS. Drag-drop workflow builder, card grid lists, animated execution timelines. ServiceKit brownfield compatibility.' },
        { icon: Code, phase: 'Kotlin Backend', description: '25+ Controllers (Web + REST dual API), 12 Services, 20+ DAOs with JDBC Template. Role-based access, Google SSO + password auth, audit logging.' },
        { icon: Monitor, phase: 'Database & CI/CD', description: 'PostgreSQL with UUID keys, 49 Flyway migrations, soft-delete support. GitLab Auto-DevOps to 5 environments: Test, UAT, Pentest, Demo, Production.' }
      ],
      tags: ['Kotlin/Spring Boot', 'Pebble', 'PostgreSQL'],
      gradient: 'from-blue-500 to-purple-600',
      image: '/assets/images/onboard-iq-hero.png'
    },
    {
      id: 'rayni-platform',
      title: 'Rayni AI Document Intelligence Platform',
      category: ['ai-ml', 'full-stack'],
      status: 'live',
      description: 'AI-powered instrument knowledge management for scientific research labs. Built 360K+ lines of code solo using AI-augmented workflows. Hybrid RAG system with LangGraph agents.',
      metrics: [
        { icon: Code, value: '360K+', label: 'Lines of Code' },
        { icon: Layers, value: '98K', label: 'Frontend LOC' },
        { icon: Monitor, value: '260K', label: 'Backend LOC' }
      ],
      story: [
        { icon: Search, phase: 'Architecture', description: 'Hybrid RAG system combining tree-based document navigation with semantic vector search (pgvector, 1536-dim embeddings).' },
        { icon: Zap, phase: 'AI/ML', description: 'LangGraph stateful agents with human-in-the-loop gap detection and conversation checkpointing.' },
        { icon: Code, phase: 'Frontend', description: 'SSE streaming chat with optimistic UI, real-time token rendering, and citation deep-linking to PDF locations.' },
        { icon: Palette, phase: 'Design', description: 'Custom "no borders needed" Tailwind design system using color layering and dual-layer shadows.' }
      ],
      tags: ['AI/ML', 'LangGraph', 'RAG'],
      gradient: 'from-violet-500 to-indigo-600',
      demoUrl: 'https://rayni.ai',
      image: '/assets/images/rayni-hero.png'
    },
    {
      id: 'doc-domain-agent',
      title: 'Doc Domain Agent - Precision RAG System',
      category: ['ai-ml', 'full-stack'],
      status: 'live',
      description: 'Zero-hallucination RAG platform for scientific instrumentation. Neo4j GraphRAG with LangGraph agents, human-in-the-loop gap detection, and deep-linking citations with bounding box verification.',
      metrics: [
        { icon: Clock, value: '<30s', label: 'Time to Answer' },
        { icon: Zap, value: '<0.1%', label: 'Hallucination Rate' },
        { icon: Layers, value: '758', label: 'Test Functions' }
      ],
      story: [
        { icon: Search, phase: 'GraphRAG', description: 'Neo4j knowledge graph with native vector search. Device → Document → Chunk hierarchy with cross-encoder reranking.' },
        { icon: Zap, phase: 'LangGraph Agent', description: '7-node stateful workflow: Intent Classification → Hybrid Retrieval → Gap Detection → BLUF Response Generation.' },
        { icon: Code, phase: 'Zero-Hallucination', description: '3-layer gap detection (confidence/semantic/structural) triggers HITL interrupts rather than guessing.' },
        { icon: Monitor, phase: 'Verification UI', description: 'Deep-linking citations with bounding box highlights. Click to verify any answer against source PDF.' }
      ],
      tags: ['Neo4j', 'LangGraph', 'GraphRAG'],
      gradient: 'from-emerald-500 to-teal-600',
      image: '/assets/images/doc-domain-hero.png'
    },
    {
      id: 'blue-moon-telehealth',
      title: 'Blue Moon Senior Counseling - Telehealth Platform',
      category: ['full-stack', 'ui-ux'],
      status: 'live',
      description: 'Premium telehealth video therapy platform for Medicare-covered geriatric counseling. WebRTC video conferencing, Three.js animations, comprehensive accessibility suite.',
      metrics: [
        { icon: Users, value: 'HIPAA', label: 'Compliant' },
        { icon: Clock, value: 'CPT', label: 'Auto-Billing' },
        { icon: Zap, value: 'WCAG', label: 'Accessible' }
      ],
      story: [
        { icon: Monitor, phase: 'Video', description: 'WebRTC video conferencing supporting 1-on-1 PIP and adaptive multi-participant grid layouts.' },
        { icon: TrendingUp, phase: 'Billing', description: 'Automatic CPT medical billing code detection (90832/90834/90837) with session timer.' },
        { icon: Palette, phase: 'Design', description: 'Premium gold-on-black design system with Three.js particle morphing loader (1000+ particles).' },
        { icon: Users, phase: 'Accessibility', description: 'Live captions (Web Speech API), background blur, high contrast, reduced motion, 6-level font sizing.' }
      ],
      tags: ['Healthcare', 'WebRTC', 'Accessibility'],
      gradient: 'from-amber-500 to-orange-600',
      demoUrl: 'https://bluemoonseniorcounseling.com',
      image: '/assets/images/blue-moon-hero.png'
    },
    {
      id: 'ashley-furniture',
      title: 'Ashley Furniture Financing Console',
      category: ['ui-ux', 'frontend'],
      description: 'Redesigned in-store financing experience for sales associates. Led UX research with store managers to identify approval bottlenecks, then designed and built a streamlined console that increased approval rates.',
      metrics: [
        { icon: TrendingUp, value: '+12%', label: 'Approval Rate' },
        { icon: Users, value: '18', label: 'Store Pilot' },
        { icon: Clock, value: '-40%', label: 'App Time' }
      ],
      story: [
        { icon: Search, phase: 'Research', description: 'Conducted contextual inquiry at 5 retail locations, shadowing sales associates through financing workflows.' },
        { icon: Palette, phase: 'Design', description: 'Created progressive disclosure UI reducing cognitive load - associates see only relevant fields per customer segment.' },
        { icon: Code, phase: 'Development', description: 'Vue.js components with real-time Synchrony Bank API integration and instant credit decisioning.' }
      ],
      tags: ['Retail', 'Fintech', 'Vue.js'],
      image: '/assets/images/ashley-hero.png',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'aspen-dental',
      title: 'Aspen Dental Patient Financing Portal',
      category: ['ui-ux', 'frontend'],
      description: 'Patient-facing financing portal deployed across 1,100+ dental clinics. Designed for anxious patients needing treatment financing - focused on clarity, trust signals, and instant decisioning.',
      metrics: [
        { icon: Users, value: '1,100+', label: 'Clinics' },
        { icon: Clock, value: '<30s', label: 'Decision Time' },
        { icon: TrendingUp, value: '+15%', label: 'Conversion' }
      ],
      story: [
        { icon: Search, phase: 'UX Research', description: 'Interviewed dental office managers to understand patient anxiety points around unexpected treatment costs.' },
        { icon: Palette, phase: 'UI Design', description: 'Calming color palette, clear cost breakdowns, and trust badges. Mobile-first for tablet use at chairside.' },
        { icon: Code, phase: 'Frontend', description: 'React application with HIPAA-compliant form handling and multi-lender waterfall integration.' }
      ],
      tags: ['Healthcare', 'Fintech', 'React'],
      image: '/assets/images/aspen-hero.png',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'dell-technologies',
      title: 'Dell Technologies Dell Pay Waterfall',
      category: ['frontend', 'full-stack'],
      description: 'Integrated Bread Pay into Dell\'s existing checkout as a waterfall financing option. Built the frontend integration layer connecting Dell\'s e-commerce platform to multiple lender APIs.',
      metrics: [
        { icon: Layers, value: '4', label: 'Lender APIs' },
        { icon: Clock, value: '99.9%', label: 'Uptime' },
        { icon: TrendingUp, value: '+$2M', label: 'Monthly Volume' }
      ],
      story: [
        { icon: Code, phase: 'Architecture', description: 'Designed waterfall logic: primary lender → secondary → tertiary, with graceful degradation and retry handling.' },
        { icon: Monitor, phase: 'Integration', description: 'Built adapter layer translating Dell checkout data to each lender\'s unique API schema requirements.' },
        { icon: Zap, phase: 'Performance', description: 'Implemented response caching and parallel API calls to maintain sub-2-second checkout experience.' }
      ],
      tags: ['E-commerce', 'API', 'TypeScript'],
      image: '/assets/images/dell-hero.png',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'helzberg-diamonds',
      title: 'Helzberg Diamonds Digital Flex-Pay Kiosk',
      category: ['ui-ux', 'frontend'],
      description: 'In-store kiosk enabling customers to self-serve financing applications. Reduced associate involvement while dramatically improving approval rates through optimized form flow.',
      metrics: [
        { icon: TrendingUp, value: '+28%', label: 'Lease Approvals' },
        { icon: Clock, value: '-57%', label: 'App Time' },
        { icon: Users, value: '200+', label: 'Stores' }
      ],
      story: [
        { icon: Search, phase: 'Problem', description: 'Associates struggled explaining lease-to-own options. Customers abandoned due to complexity and stigma.' },
        { icon: Palette, phase: 'Solution', description: 'Self-service kiosk with jewelry-appropriate luxury aesthetic. Private, judgment-free financing exploration.' },
        { icon: Code, phase: 'Implementation', description: 'Touch-optimized Vue.js app with large tap targets, progress indicators, and instant pre-qualification.' }
      ],
      tags: ['Retail', 'Fintech', 'Kiosk'],
      image: '/assets/images/helzberg-hero.png',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'ifit-health',
      title: 'iFit Health Spend Checkout',
      category: ['ui-ux', 'frontend'],
      description: 'Added HSA/FSA payment option to iFit\'s direct-to-consumer checkout. Positioned fitness equipment as health expense, opening new customer segment.',
      metrics: [
        { icon: TrendingUp, value: '8%', label: 'DTC Revenue' },
        { icon: Users, value: 'New', label: 'Customer Segment' },
        { icon: Clock, value: 'Instant', label: 'Card Validation' }
      ],
      story: [
        { icon: Search, phase: 'Opportunity', description: 'Identified that fitness equipment qualifies for HSA/FSA spending - untapped market for iFit\'s premium products.' },
        { icon: Palette, phase: 'UX Design', description: 'Clear eligibility messaging, HSA/FSA card detection, and itemized receipts for reimbursement claims.' },
        { icon: Code, phase: 'Integration', description: 'Health Spend API integration with real-time card BIN validation and automatic receipt generation.' }
      ],
      tags: ['Health & Wellness', 'Fintech', 'E-commerce'],
      image: '/assets/images/ifit-hero.png',
      gradient: 'from-orange-500 to-red-600'
    },
  ]

  const featuredProject = projects.find(p => p.featured)
  const regularProjects = projects.filter(p => !p.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section id="projects" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-xs sm:text-sm mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Portfolio
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Real-world solutions with measurable impact and exceptional user experiences
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Project */}
        {featuredProject && (
          <ScrollReveal delay={0.4}>
            <FloatingCard className="mb-16 overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Project Visual */}
                <div className={cn(
                  'relative aspect-video lg:aspect-auto lg:min-h-[400px] bg-gradient-to-br overflow-hidden',
                  featuredProject.gradient
                )}>
                  {featuredProject.image && (
                    <Image
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Status Badge */}
                  {featuredProject.status === 'live' && (
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-semibold z-10">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Live Demo
                    </div>
                  )}

                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30 z-10">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Featured
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {featuredProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-display mb-3 sm:mb-4">
                        {featuredProject.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {featuredProject.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    {featuredProject.metrics && (
                      <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        {featuredProject.metrics.map((metric) => (
                          <div key={metric.label} className="text-center p-2 sm:p-4 rounded-xl bg-accent/50 border border-border/50">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-primary">
                              <metric.icon className="w-full h-full" />
                            </div>
                            <div className="font-bold text-base sm:text-lg">{metric.value}</div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Development Story */}
                    {featuredProject.story && (
                      <div className="space-y-2 sm:space-y-3">
                        <h4 className="font-semibold text-base sm:text-lg">Development Journey</h4>
                        {featuredProject.story.map((phase, index) => (
                          <div key={phase.phase} className="flex gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-accent/30 border border-border/50">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <phase.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1">{phase.phase}</div>
                              <div className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                                {phase.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <MagneticButton
                        onClick={() => openCaseStudy(featuredProject.id)}
                        className="flex-1 justify-center group"
                      >
                        <FileText className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        View Full Case Study
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </FloatingCard>
          </ScrollReveal>
        )}

        {/* Regular Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                layout
                className="group cursor-pointer"
                onClick={() => openCaseStudy(project.id)}
              >
                <FloatingCard
                  className="h-full overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                  delay={index * 0.1}
                  distance={15}
                  duration={5 + index}
                >
                  {/* Project Image/Visual */}
                  <div className={cn(
                    'relative aspect-video bg-gradient-to-br flex items-center justify-center overflow-hidden',
                    project.gradient || 'from-gray-400 to-gray-600'
                  )}>
                    {project.image ? (
                      project.image.includes('hero') ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full bg-white flex items-center justify-center p-6">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )
                    ) : (
                      <div className="text-white text-center">
                        <Monitor className="w-16 h-16 mx-auto mb-2 opacity-60" />
                        <div className="text-sm font-medium opacity-80">Project Visual</div>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm font-medium">View Project</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 sm:py-1 bg-accent text-accent-foreground text-[10px] sm:text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0 h-auto font-medium text-xs sm:text-sm group-hover:translate-x-1 transition-transform"
                        onClick={() => openCaseStudy(project.id)}
                      >
                        View Case Study
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <ScrollReveal delay={0.8}>
          <div className="text-center mt-12 sm:mt-16">
            <div className="max-w-2xl mx-auto px-2">
              <h3 className="text-xl sm:text-2xl font-bold font-display mb-3 sm:mb-4">
                Ready to work together?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Let's discuss how I can help bring your next project to life with exceptional
                user experience and technical expertise.
              </p>
              <MagneticButton
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Start a Project
                <ExternalLink className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Project Case Study Modal */}
      <ProjectCaseStudyModal 
        projectId={selectedProjectId}
        isOpen={showCaseStudy}
        onClose={closeCaseStudy}
      />
    </section>
  )
}