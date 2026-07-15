'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from './ui/button'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

export function HeroSection() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    element?.scrollIntoView({ behavior: noAnimation ? 'auto' : 'smooth' })
  }

  // One orchestrated entrance on first load; everything after this just is.
  const containerVariants = noAnimation ? {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        duration: 0.6
      }
    }
  }

  const itemVariants = noAnimation ? {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const stats = [
    { number: '20+', label: 'Years shipping' },
    { number: '$16B+', label: 'Annual financing scale' },
    { number: '6M', label: 'Applications a year' }
  ]

  return (
    <section id="hero" className="relative pt-40 pb-24 sm:pt-48 sm:pb-28">
      <div className="container relative px-6 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground mb-8">
            Tayler Ramsay — Senior Product Designer at Synchrony. Available for 2026.
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-foreground mb-10"
          >
            Designs and ships financing flows at $16B scale.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/70 leading-relaxed mb-12 max-w-2xl"
          >
            Leading UX on the platform that processes 6M consumer applications a year
            across 35+ lenders. I design the system, then write the front-end that ships it.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button size="lg" onClick={() => handleScrollToSection('#projects')} className="group">
              <span>See the Versatile Apply case study</span>
              <ArrowDown className={`w-4 h-4 ${!noAnimation ? 'group-hover:translate-y-0.5 transition-transform' : ''}`} aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:ramsay.tayler@gmail.com">Email me</a>
            </Button>
          </motion.div>

          <motion.dl
            variants={itemVariants}
            className="flex flex-wrap gap-x-14 gap-y-6 border-t border-border pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-bold text-3xl font-display text-foreground [font-variant-numeric:tabular-nums]">
                  {stat.number}
                </dd>
                <dd className="text-sm text-muted-foreground mt-1">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
