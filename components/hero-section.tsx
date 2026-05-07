'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MessageCircle, Calendar, Rocket, Zap } from 'lucide-react'
import { MagneticButton } from './animate-ui/magnetic-button'
import { TypewriterText } from './animate-ui/typewriter-text'
import { FloatingCard } from './animate-ui/floating-card'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { GradientBlob } from './animate-ui/gradient-blob'
import { Button } from './ui/button'
import Image from 'next/image'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

export function HeroSection() {
  const motionPref = useMotionPreference()
  const motionOff = motionPref === 'off'
  const noAnimation = motionPref !== 'regular'

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    element?.scrollIntoView({ behavior: noAnimation ? 'auto' : 'smooth' })
  }

  const containerVariants = noAnimation ? {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  }

  const itemVariants = noAnimation ? {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const statVariants = noAnimation ? {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 1, scale: 1 }
  } : {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const stats = [
    { icon: Calendar, number: "20+", label: "Years Experience" },
    { icon: Rocket, number: "$16B+", label: "Platform Scale" },
    { icon: Zap, number: "AI", label: "Native Developer" }
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/90 to-primary/5 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GradientBlob
          className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
          size="xl"
          colors={['from-primary/8', 'via-primary/4', 'to-transparent']}
        />
        <GradientBlob
          className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
          size="lg"
          colors={['from-primary/5', 'via-primary/3', 'to-transparent']}
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text - Single rendering path */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
                ✨ Available for new projects
              </span>
              <div className="space-y-4">
                <TypewriterText
                  text="Hello, I'm Tayler"
                  className="text-2xl text-foreground/80 font-medium"
                  speed={80}
                  delay={500}
                />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight pb-2">
                  <motion.span
                    className="block text-foreground"
                    initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={noAnimation ? { duration: 0 } : { duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Senior Full-Stack
                  </motion.span>
                  <motion.span
                    className="block gradient-text"
                    initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={noAnimation ? { duration: 0 } : { duration: 0.8, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    UX Engineer
                  </motion.span>
                </h1>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/70 leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0"
            >
              Rare combination: trained designer who codes at production scale. I ship
              enterprise systems from research through deployment—currently building the platform
              processing $16B+ in annual financing at Synchrony Bank (acquired 2025).
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <MagneticButton
                className="group"
                onClick={() => handleScrollToSection('#projects')}
              >
                <span>View My Work</span>
                <ArrowDown className={`w-4 h-4 ${!noAnimation ? 'group-hover:translate-y-1 transition-transform' : ''}`} />
              </MagneticButton>

              <Button
                variant="outline"
                size="lg"
                className="bg-background/50 backdrop-blur-sm"
                onClick={() => handleScrollToSection('#contact')}
              >
                <MessageCircle className="w-4 h-4" />
                Get in Touch
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statVariants}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl font-display text-foreground">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <ScrollReveal direction="right" delay={0.8}>
            <div className="relative">
              <FloatingCard tilt className="p-8 max-w-md mx-auto">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                      <Image
                        src="/assets/images/logo.png"
                        alt="Tayler Ramsay Logo"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">Tayler Ramsay</h3>
                      <p className="text-foreground/70 font-medium">Full-Stack UX Engineer</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-primary ${!noAnimation ? 'animate-pulse' : ''}`}></div>
                      <span className="text-foreground/90 text-sm">Available for projects</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { skill: 'Design', label: 'UX/UI' },
                        { skill: 'Code', label: 'Full-Stack' },
                        { skill: 'AI/ML', label: 'LangGraph' }
                      ].map((item) => (
                        <div key={item.skill} className="text-center">
                          <div className="w-14 h-14 mx-auto mb-2 rounded-lg bg-foreground/10 flex items-center justify-center border border-foreground/20">
                            <span className="text-sm font-semibold text-foreground">{item.skill}</span>
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FloatingCard>

              {/* Floating Badges */}
              <FloatingCard
                className="absolute -top-4 -left-4 p-3"
                delay={1.2}
                direction="left"
                distance={15}
                duration={4}
              >
                <div className="flex items-center gap-2 text-foreground">
                  <div className={`w-2 h-2 rounded-full bg-primary ${!noAnimation ? 'animate-pulse' : ''}`}></div>
                  <span className="text-xs font-medium">Online</span>
                </div>
              </FloatingCard>

              <FloatingCard
                className="absolute -bottom-4 -right-4 p-3"
                delay={1.6}
                direction="right"
                distance={12}
                duration={5}
              >
                <div className="text-foreground text-center">
                  <div className="font-bold text-lg">$2.1M</div>
                  <div className="text-xs text-muted-foreground">Revenue Impact</div>
                </div>
              </FloatingCard>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={noAnimation ? { duration: 0 } : { delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={noAnimation ? {} : { y: [0, 8, 0] }}
          transition={noAnimation ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
