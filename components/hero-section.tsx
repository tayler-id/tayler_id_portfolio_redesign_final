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

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/90 to-primary/5 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GradientBlob
          className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
          size="xl"
          colors={['from-blue-400/20', 'via-purple-500/20', 'to-cyan-400/20']}
        />
        <GradientBlob
          className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
          size="lg"
          colors={['from-purple-400/20', 'via-pink-500/20', 'to-orange-400/20']}
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4">
                ✨ Available for new projects
              </span>
              <div className="space-y-2">
                <TypewriterText
                  text="Hello, I'm Tayler"
                  className="text-xl text-muted-foreground font-medium"
                  speed={80}
                  delay={500}
                />
                <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
                  <span className="block text-foreground">Senior UX Designer &</span>
                  <span className="block gradient-text mt-2">Frontend Developer</span>
                </h1>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              With 25+ years of experience, I create human-centered digital experiences 
              that combine beautiful design with powerful functionality. Specializing in 
              AI-driven interfaces and scalable design systems.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <MagneticButton className="group">
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </MagneticButton>
              
              <Button variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm">
                <MessageCircle className="w-4 h-4" />
                Get in Touch
              </Button>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: Calendar, number: "25+", label: "Years Experience" },
                { icon: Rocket, number: "100+", label: "Projects Delivered" },
                { icon: Zap, number: "AI", label: "Powered Solutions" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={statVariants}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
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
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">TR</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">Tayler Ramsay</h3>
                      <p className="text-white/70">Senior UX Designer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-white/90 text-sm">Available for projects</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {['UX', 'Frontend', 'AI/ML'].map((skill, index) => (
                        <div key={skill} className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                            <span className="text-xs font-medium text-white">{skill}</span>
                          </div>
                          <div className="text-xs text-white/70">Expert</div>
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
                <div className="flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
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
                <div className="text-white text-center">
                  <div className="font-bold text-lg">$2.1M</div>
                  <div className="text-xs opacity-70">Revenue Impact</div>
                </div>
              </FloatingCard>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}