'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Palette, 
  Zap, 
  Monitor, 
  Figma, 
  Globe,
  Brain,
  Users,
  Search,
  Layers,
  Smartphone,
  BarChart
} from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { FloatingCard } from './animate-ui/floating-card'
import { cn } from '@/lib/utils'

export function SkillsSection() {
  const skillCategories = [
    {
      title: 'UX Design',
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      skills: [
        { name: 'User Research & Testing', level: 95, icon: Search },
        { name: 'Information Architecture', level: 90, icon: Layers },
        { name: 'Interaction Design', level: 92, icon: Users },
        { name: 'Prototyping', level: 88, icon: Figma },
        { name: 'Usability Analysis', level: 85, icon: BarChart },
        { name: 'Accessibility (WCAG)', level: 90, icon: Globe }
      ]
    },
    {
      title: 'Frontend Development',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-600',
      skills: [
        { name: 'React/Next.js', level: 92, icon: Code },
        { name: 'TypeScript', level: 88, icon: Code },
        { name: 'Responsive Design', level: 95, icon: Smartphone },
        { name: 'CSS/Tailwind', level: 93, icon: Palette },
        { name: 'Performance Optimization', level: 85, icon: Zap },
        { name: 'Progressive Web Apps', level: 80, icon: Globe }
      ]
    },
    {
      title: 'AI Integration',
      icon: Zap,
      color: 'from-purple-500 to-indigo-600',
      skills: [
        { name: 'AI-Driven UI/UX', level: 87, icon: Brain },
        { name: 'Conversational Interfaces', level: 82, icon: Users },
        { name: 'Recommendation Systems', level: 78, icon: BarChart },
        { name: 'User Behavior Analysis', level: 85, icon: Search },
        { name: 'Adaptive Interfaces', level: 80, icon: Layers },
        { name: 'Personalization Engines', level: 75, icon: Zap }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Code className="w-4 h-4" />
              Skills
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold font-display mb-4">
              Core <span className="gradient-text">Competencies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies and methodologies I excel in to deliver exceptional results
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              custom={categoryIndex}
            >
              <FloatingCard 
                className="h-full p-8 bg-background/50 backdrop-blur-sm border border-border/50"
                delay={categoryIndex * 0.2}
                distance={20}
                duration={6 + categoryIndex}
              >
                {/* Category Header */}
                <div className="text-center mb-8">
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r flex items-center justify-center',
                    category.color
                  )}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: categoryIndex * 0.3 + skillIndex * 0.1,
                        duration: 0.6
                      }}
                      className="space-y-3"
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                            <skill.icon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium text-sm text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className={cn(
                            'absolute left-0 top-0 h-full rounded-full bg-gradient-to-r',
                            category.color
                          )}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            delay: categoryIndex * 0.3 + skillIndex * 0.1 + 0.5,
                            duration: 1.5,
                            ease: 'easeOut'
                          }}
                        />
                        
                        {/* Animated Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{
                            delay: categoryIndex * 0.3 + skillIndex * 0.1 + 2,
                            duration: 1.5,
                            ease: 'easeInOut'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: categoryIndex * 0.3 + 1,
                    duration: 0.8
                  }}
                  className="mt-8 pt-6 border-t border-border/50"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Average Proficiency</span>
                    <span className="font-semibold text-foreground">
                      {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                    </span>
                  </div>
                </motion.div>
              </FloatingCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Overview */}
        <ScrollReveal delay={0.8}>
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold font-display mb-8">
              Additional Expertise
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                'Design Systems',
                'Agile Methodology',
                'Team Leadership',
                'Client Communication',
                'Cross-platform Design',
                'Performance Metrics',
                'A/B Testing',
                'User Journey Mapping',
                'Wireframing',
                'Style Guides'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                    ease: 'easeOut'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)'
                  }}
                  className="px-4 py-2 rounded-full bg-background border border-border/50 text-sm font-medium text-foreground hover:border-primary/30 transition-all cursor-pointer"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}