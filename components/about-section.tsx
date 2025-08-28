'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Briefcase, Code, Play, CheckCircle } from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { FloatingCard } from './animate-ui/floating-card'
import Image from 'next/image'

export function AboutSection() {
  const timelineItems = [
    {
      year: '2020 - Present',
      role: 'Senior UX Designer',
      company: 'Leading design systems and AI interface development',
      icon: Briefcase,
      color: 'from-blue-500 to-purple-600'
    },
    {
      year: '2018 - 2020',
      role: 'Frontend Developer',
      company: 'Building responsive web applications and design systems',
      icon: Code,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Design Systems', level: 98 },
    { name: 'User Research', level: 92 },
    { name: 'Prototyping', level: 88 },
    { name: 'AI/ML Integration', level: 85 }
  ]

  const achievements = [
    '$2.1M+ Revenue Impact Generated',
    '300% Process Improvement Achieved', 
    '15+ Stakeholder Research Sessions',
    '100+ Projects Successfully Delivered'
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
                    I'm a Senior UX Designer and Frontend Developer with over 8 years of experience 
                    creating intuitive, accessible, and engaging digital experiences. My approach 
                    combines user-centered design principles with clean, efficient code.
                  </p>
                  <p>
                    I specialize in designing and developing complex applications, with a particular 
                    focus on AI-driven interfaces, design systems, and health applications. My passion 
                    lies in creating digital experiences that are not just functional, but delightful.
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
              <div className="space-y-6">
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

              {/* Floating Skill Cards */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top Right */}
                <FloatingCard 
                  className="absolute -top-4 -right-4 p-4 pointer-events-auto"
                  direction="right"
                  distance={15}
                  duration={4}
                  delay={1}
                >
                  <div className="text-center text-white">
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
                  <div className="text-center text-white">
                    <div className="font-bold text-lg gradient-text">25+</div>
                    <div className="text-xs opacity-70">Years</div>
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
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Code className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">React Expert</span>
                  </div>
                </FloatingCard>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Skills Grid */}
        <ScrollReveal delay={0.6}>
          <div className="mt-20">
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