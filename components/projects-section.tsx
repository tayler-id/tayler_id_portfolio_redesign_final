'use client'

import React, { useState } from 'react'
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
  Zap
} from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { FloatingCard } from './animate-ui/floating-card'
import { MagneticButton } from './animate-ui/magnetic-button'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ProjectCaseStudyModal } from './project-case-study-modal'

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [showCaseStudy, setShowCaseStudy] = useState(false)

  const openCaseStudy = (projectId: string) => {
    setSelectedProjectId(projectId)
    setShowCaseStudy(true)
  }

  const closeCaseStudy = () => {
    setShowCaseStudy(false)
    setSelectedProjectId(null)
  }

  const filters = [
    { id: 'all', label: 'All Projects', icon: Briefcase },
    { id: 'ui-ux', label: 'UI/UX', icon: Palette },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'full-stack', label: 'Full-Stack', icon: Layers }
  ]

  const projects = [
    {
      id: 'onboard-iq',
      title: 'OnboardIQ Automation Platform',
      category: ['full-stack', 'ui-ux'],
      featured: true,
      status: 'live',
      description: 'Complete UX→UI→Frontend→Backend development. Transformed 6-month manual processes into 2-3 month automated workflows through comprehensive stakeholder research and technical implementation.',
      metrics: [
        { icon: TrendingUp, value: '$2.1M', label: 'Revenue Impact' },
        { icon: Clock, value: '65%', label: 'Process Improvement' },
        { icon: Users, value: '15+', label: 'Stakeholder Interviews' }
      ],
      story: [
        { icon: Search, phase: 'UX Research', description: '15+ stakeholder interviews revealed 6-month onboarding bottlenecks affecting $70/location SaaS revenue across 600+ merchant locations.' },
        { icon: Palette, phase: 'UI Design', description: 'Enterprise design system with performance-optimized animations targeting 60fps for complex data interactions.' },
        { icon: Code, phase: 'Frontend', description: 'JavaScript filtering system with Set-based O(1) performance, hardware-accelerated CSS animations, responsive architecture.' },
        { icon: Monitor, phase: 'Backend', description: 'Node.js/Express API with PostgreSQL, authentication, and RESTful endpoints supporting real-time data operations.' }
      ],
      tags: ['B2B Platform', 'Full-Stack'],
      gradient: 'from-blue-500 to-purple-600',
      demoAction: 'launchOnboardIQDemo'
    },
    {
      id: 'ashley-furniture',
      title: 'Ashley Furniture Financing Console',
      category: ['ui-ux', 'frontend'],
      description: '+12% incremental approvals in 18-store pilot.',
      tags: ['Retail', 'Fintech'],
      image: '/assets/Ashley_logo_2022.svg.png',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'aspen-dental',
      title: 'Aspen Dental Patient Financing Portal',
      category: ['ui-ux', 'frontend'],
      description: 'Instant approvals at 1,100+ clinics.',
      tags: ['Healthcare', 'Fintech'],
      image: '/assets/images/aspen-dental-logo-png_seeklogo-333502.png',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'dell-technologies',
      title: 'Dell Technologies Dell Pay Waterfall',
      category: ['frontend'],
      description: 'Bread Pay → Waterfall API integration.',
      tags: ['E-commerce', 'API'],
      image: '/assets/images/Dell_Logo.svg.png',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'helzberg-diamonds',
      title: 'Helzberg Diamonds Digital Flex-Pay Kiosk',
      category: ['ui-ux'],
      description: 'Lease approvals +28% • App time -57%.',
      tags: ['Retail', 'Fintech'],
      image: '/assets/images/helzberg.svg',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'ifit-health',
      title: 'iFit Health Spend Checkout',
      category: ['ui-ux', 'frontend'],
      description: '8% of DTC revenue now HSA/FSA.',
      tags: ['Health & Wellness', 'Fintech'],
      image: '/assets/images/ifit.svg',
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter))

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

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Briefcase className="w-4 h-4" />
              Portfolio
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold font-display mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world solutions with measurable impact and exceptional user experiences
            </p>
          </div>
        </ScrollReveal>

        {/* Project Filters */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center mb-16">
            <div className="flex flex-wrap gap-4 p-2 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
                    activeFilter === filter.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Project */}
        {featuredProject && (activeFilter === 'all' || featuredProject.category.includes(activeFilter)) && (
          <ScrollReveal delay={0.4}>
            <FloatingCard className="mb-16 overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Project Visual */}
                <div className={cn(
                  'relative aspect-video lg:aspect-auto bg-gradient-to-br p-8 flex items-center justify-center',
                  featuredProject.gradient
                )}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  {featuredProject.status === 'live' && (
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Live Demo
                    </div>
                  )}

                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Featured
                  </div>

                  {/* Project Mockup */}
                  <div className="relative z-10 max-w-md mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="space-y-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <Monitor className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-semibold">OnboardIQ Platform</div>
                            <div className="text-xs opacity-70">Enterprise B2B Solution</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="text-xs">$2.1M</div>
                            <div className="text-xs opacity-70">Revenue</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="text-xs">65%</div>
                            <div className="text-xs opacity-70">Faster</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="text-xs">15+</div>
                            <div className="text-xs opacity-70">Interviews</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {featuredProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold font-display mb-4">
                        {featuredProject.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {featuredProject.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    {featuredProject.metrics && (
                      <div className="grid grid-cols-3 gap-4">
                        {featuredProject.metrics.map((metric) => (
                          <div key={metric.label} className="text-center p-4 rounded-xl bg-accent/50 border border-border/50">
                            <div className="w-8 h-8 mx-auto mb-2 text-primary">
                              <metric.icon className="w-full h-full" />
                            </div>
                            <div className="font-bold text-lg">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Development Story */}
                    {featuredProject.story && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg">Development Journey</h4>
                        {featuredProject.story.map((phase, index) => (
                          <div key={phase.phase} className="flex gap-3 p-3 rounded-lg bg-accent/30 border border-border/50">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <phase.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm mb-1">{phase.phase}</div>
                              <div className="text-xs text-muted-foreground leading-relaxed">
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
                        onClick={() => {
                          // Call demo function if available
                          if (featuredProject.demoAction && window[featuredProject.demoAction as any]) {
                            (window as any)[featuredProject.demoAction]()
                          }
                        }}
                        className="flex-1 justify-center group"
                      >
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Experience Live Demo
                      </MagneticButton>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="flex-1 bg-background/50"
                        onClick={() => openCaseStudy(featuredProject.id)}
                      >
                        <FileText className="w-4 h-4" />
                        Case Study
                      </Button>
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects
              .filter(p => !p.featured)
              .map((project, index) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                layout
                className="group"
              >
                <FloatingCard 
                  className="h-full overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 cursor-pointer transition-all duration-300"
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
                      <div className="relative w-full h-full bg-white flex items-center justify-center p-6">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain"
                        />
                      </div>
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
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform"
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
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold font-display mb-4">
                Ready to work together?
              </h3>
              <p className="text-muted-foreground mb-8">
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