'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Briefcase, Code, CheckCircle } from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { FloatingCard } from './animate-ui/floating-card'
import Image from 'next/image'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

export function AboutSection() {
  const motionPref = useMotionPreference()
  const motionOff = motionPref === 'off'
  const noAnimation = motionPref !== 'regular'
  const [isPhotoSticky, setIsPhotoSticky] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !skillsRef.current || !photoRef.current) return

      const timelineRect = timelineRef.current.getBoundingClientRect()
      const skillsRect = skillsRef.current.getBoundingClientRect()

      // Make photo sticky when timeline is in view and before skills section
      const timelineInView = timelineRect.top < window.innerHeight && timelineRect.bottom > 0
      const skillsAboveViewport = skillsRect.top > window.innerHeight * 0.3

      setIsPhotoSticky(timelineInView && skillsAboveViewport)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const timelineItems = [
    {
      year: '2024 - Present',
      role: 'Consulting Senior Product Designer · Rayni',
      company: 'Three 0-to-1 products: Rayni (scientific lab RAG), Document Domain Agents framework, Qualified financing sidecar',
      icon: Code,
      color: 'bg-primary'
    },
    {
      year: '2019 - Present',
      role: 'Senior UX Engineer · Versatile Credit → Synchrony Bank',
      company: '$16B+ fintech platform. 12% conversion lift on 6M annual applications. OnboardIQ: 30,000+ merchants across 3 verticals.',
      icon: Briefcase,
      color: 'bg-primary'
    },
    {
      year: '2017 - 2019',
      role: 'Frontend Developer · Pavone Marketing Group',
      company: 'Interactive web components and CI/CD workflows for regulated industries',
      icon: Code,
      color: 'bg-primary'
    },
    {
      year: '2010 - 2017',
      role: 'Designer / Developer · Agency + Brand work',
      company: 'Quad Graphics, Menasha, Lebo Skin Care — print, digital, and web systems',
      icon: Briefcase,
      color: 'bg-primary'
    }
  ]

  const skills = [
    { name: 'Product Design (0-to-1)', level: 95 },
    { name: 'Design Systems', level: 95 },
    { name: 'Agent-Orchestrated Engineering', level: 92 },
    { name: 'React / Next.js', level: 92 },
    { name: 'Vue.js', level: 92 },
    { name: 'TypeScript', level: 90 },
    { name: 'Kotlin / Spring Boot', level: 85 },
    { name: 'Python (RAG, LangGraph, MCP)', level: 85 },
    { name: 'PostgreSQL / pgvector / Neo4j', level: 85 },
    { name: 'Figma', level: 98 },
    { name: 'Accessibility (WCAG)', level: 92 }
  ]

  const achievements = [
    '$16B+ annual financing platform (Synchrony Bank)',
    '12% conversion lift on 6M annual applications',
    '30,000+ merchants onboarded across 3 verticals',
    'Three 0-to-1 products shipped in the past 24 months',
    'Two RAG architectures in production (pgvector + Neo4j GraphRAG)'
  ]

  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4"
              whileHover={noAnimation ? {} : { scale: 1.05 }}
            >
              <User className="w-4 h-4" />
              About Me
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold font-display mb-4">
              Crafting Digital <span className="gradient-text">Experiences</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Where design meets technology to create meaningful user experiences
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold font-display">Hi, I'm Tayler</h3>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    I'm a Senior Product Designer who codes at production scale. I don't hand off
                    designs to engineers; I orchestrate coding agents to ship them, from stakeholder
                    research through production deployment.
                  </p>
                  <p>
                    Currently at Synchrony Bank (acquired Versatile Credit in 2025), I lead UX
                    design for a $16B+ fintech platform serving 30,000+ merchants across retail,
                    elective medical, and home improvement — and because I'm full-stack, I ship
                    the code myself. I drove a 12% conversion lift on 6M annual applications and
                    built OnboardIQ, the workflow product that reduced merchant onboarding from
                    5 days of cross-team meetings to 2 hours.
                  </p>
                  <p>
                    I run an agent-orchestrated, spec-driven, TDD-first practice. In the past 24 months
                    I shipped three 0-to-1 products: Rayni (a RAG platform in daily use at scientific
                    labs), Document Domain Agents (a domain-agnostic RAG framework), and Qualified
                    (a financing sidecar built on MCP generative UI).
                    LangGraph agents, RAG pipelines with pgvector, and intelligent document processing.
                    I leverage Claude Code and systematic AI workflows to ship enterprise-scale projects
                    that would otherwise require full teams.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Achievements */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold font-display">Key Achievements</h4>
                <div className="grid grid-cols-1 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement}
                      initial={noAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={noAnimation ? { duration: 0 } : { delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal direction="left" delay={0.4}>
              <div ref={timelineRef} className="space-y-6">
                <h4 className="text-xl font-semibold font-display">Experience Timeline</h4>
                <div className="space-y-4">
                  {timelineItems.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={noAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={noAnimation ? { duration: 0 } : { delay: index * 0.2, duration: 0.6 }}
                      className="flex gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-primary font-semibold mb-1">{item.year}</div>
                        <h5 className="font-semibold text-lg mb-1">{item.role}</h5>
                        <p className="text-muted-foreground">{item.company}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Image Card */}
            <motion.div
              ref={photoRef}
              initial={noAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={noAnimation ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
              className="relative overflow-hidden aspect-[4/5] max-w-md mx-auto rounded-2xl border border-border shadow-xl bg-muted"
            >
              <Image
                src="/assets/images/headshot.png"
                alt="Tayler Ramsay - Senior UX Designer"
                fill
                className="object-cover object-top"
              />
            </motion.div>

              {/* Floating Skill Cards */}
              <div className={`absolute inset-0 pointer-events-none ${isPhotoSticky ? 'hidden' : ''}`}>
                {/* Top Right */}
                <FloatingCard
                  className="absolute -top-4 -right-4 p-4 pointer-events-auto"
                  direction="right"
                  distance={15}
                  duration={4}
                  delay={1}
                >
                  <div className="text-center text-foreground">
                    <div className={`w-2 h-2 bg-primary rounded-full mx-auto mb-2 ${!noAnimation ? 'animate-pulse' : ''}`} />
                    <div className="text-xs font-semibold">Available</div>
                  </div>
                </FloatingCard>

                {/* Bottom Left */}
                <FloatingCard
                  className="absolute -bottom-4 -left-4 p-4 pointer-events-auto"
                  direction="left"
                  distance={12}
                  duration={5}
                  delay={1.5}
                >
                  <div className="text-center text-foreground">
                    <div className="font-bold text-lg gradient-text">20+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                </FloatingCard>

                {/* Top Left - Skills Badge */}
                <FloatingCard
                  className="absolute top-1/4 -left-8 p-3 pointer-events-auto"
                  direction="up"
                  distance={10}
                  duration={6}
                  delay={2}
                >
                  <div className="flex items-center gap-2 text-foreground">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Code className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium">Modern Frontend</span>
                  </div>
                </FloatingCard>
              </div>
          </div>
        </div>

        {/* Skills */}
        <ScrollReveal delay={0.6}>
          <div ref={skillsRef} className="mt-20">
            <h4 className="text-2xl font-bold font-display text-center mb-10">
              Core Skills
            </h4>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 rounded-full bg-background/60 backdrop-blur-sm border border-border/60 text-sm font-medium text-foreground/90"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
