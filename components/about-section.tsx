'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Briefcase, Code, Play, CheckCircle } from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { FloatingCard } from './animate-ui/floating-card'
import Image from 'next/image'

export function AboutSection() {
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
      year: '2019 - Present',
      role: 'Senior UX Research & Designer',
      company: 'Versatile Credit - Financial Tech Solutions for Wells Fargo & Synchrony Bank',
      icon: Briefcase,
      color: 'from-blue-500 to-purple-600'
    },
    {
      year: '2017 - 2019',
      role: 'Frontend Developer',
      company: 'Pavone Marketing Group - Interactive web components & CI/CD workflows',
      icon: Code,
      color: 'from-purple-500 to-pink-600'
    },
    {
      year: '2016 - 2017',
      role: 'Contract Senior Designer / Developer',
      company: 'Lebo Skin Care - Full brand refresh & WordPress CMS development',
      icon: User,
      color: 'from-green-500 to-blue-600'
    },
    {
      year: '2010 - 2016',
      role: 'Web / Graphic Designer',
      company: 'Quad Graphics & Menasha Packaging - Print & digital design systems',
      icon: Briefcase,
      color: 'from-orange-500 to-red-600'
    }
  ]

  const skills = [
    { name: 'Vue.js', level: 95 },
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'Figma', level: 98 },
    { name: 'Adobe Creative Suite', level: 95 },
    { name: 'UX Research', level: 92 },
    { name: 'Financial Tech UI', level: 95 },
    { name: 'AI/ML Integration', level: 85 },
    { name: 'Design Systems', level: 90 },
    { name: 'HTML/CSS/JS', level: 98 }
  ]

  const achievements = [
    '6+ Years at Versatile Credit',
    'Wells Fargo & Synchrony Bank Solutions',
    'Waterfall Financing UI/UX Design',
    '25+ Years Design & Development Experience',
    'WCAG Accessibility Standards Expert'
  ]

  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4"
              whileHover={{ scale: 1.05 }}
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
                    I'm a Senior UI/UX Designer and Frontend Developer with 25+ years of experience 
                    creating intuitive, user-friendly interfaces that align with company objectives. 
                    Specializing in Financial Tech Solutions, I've designed UI for Versatile Credit's 
                    products and waterfall financing solutions for major lenders like Wells Fargo and Synchrony Bank.
                  </p>
                  <p>
                    My technical skillset includes proficiency in HTML, CSS, JavaScript, and I'm particularly 
                    experienced in all modern frontend technologies including React, Vue.js, and TypeScript. 
                    I'm highly skilled in Figma, Adobe Creative Suite, and adept with Git and VS Code for seamless 
                    collaboration. I'm committed to accessibility and adhere to WCAG guidelines, ensuring designs 
                    are universally enjoyable regardless of abilities.
                  </p>
                  <p>
                    My design philosophy focuses on creating flexible, theme-able UI designs that provide 
                    excellent user experiences while simplifying complex functionalities through intuitive interfaces. 
                    I also work extensively with AI/ML integration projects, creating interfaces for LLM-powered 
                    applications and building intelligent automation tools that enhance user workflows.
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
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
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
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className="flex gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
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
          <ScrollReveal direction="right" delay={0.3}>
            <div className="relative">
              {/* Main Image Card */}
              <div 
                ref={photoRef}
                className={`transition-all duration-300 ${
                  isPhotoSticky 
                    ? 'fixed top-20 right-8 z-30 max-w-sm' 
                    : 'relative'
                }`}
              >
                <FloatingCard tilt className="relative overflow-hidden aspect-[4/5] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <Image
                  src="/assets/images/headshout.jpg"
                  alt="Tayler Ramsay - Senior UX Designer"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    className="text-center text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <span className="font-semibold text-lg">Watch My Story</span>
                  </motion.div>
                </div>
                </FloatingCard>
              </div>

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
                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-2 animate-pulse" />
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
                    <div className="font-bold text-lg gradient-text">25+</div>
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Code className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Modern Frontend</span>
                  </div>
                </FloatingCard>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Skills Grid */}
        <ScrollReveal delay={0.6}>
          <div ref={skillsRef} className="mt-20">
            <h4 className="text-2xl font-bold font-display text-center mb-12">
              Core Skills & Expertise
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-lg">{skill.name}</h5>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}