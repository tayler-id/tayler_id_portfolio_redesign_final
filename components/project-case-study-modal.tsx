'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, Home } from 'lucide-react'
import { Button } from './ui/button'
import { OnboardIQCaseStudy } from './onboard-iq-case-study'
import { RayniCaseStudy } from './rayni-case-study'
import { BlueMoonCaseStudy } from './blue-moon-case-study'
import { AshleyCaseStudy } from './ashley-case-study'
import { AspenCaseStudy } from './aspen-case-study'
import { DellCaseStudy } from './dell-case-study'
import { HelzbergCaseStudy } from './helzberg-case-study'
import { IfitCaseStudy } from './ifit-case-study'

interface ProjectCaseStudyModalProps {
  projectId: string | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectCaseStudyModal({
  projectId,
  isOpen,
  onClose
}: ProjectCaseStudyModalProps) {
  // Close modal when navigation links are clicked
  useEffect(() => {
    if (!isOpen) return

    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        e.preventDefault()
        const href = anchor.getAttribute('href')
        onClose()
        // Small delay to allow modal to close, then scroll to section
        setTimeout(() => {
          if (href) {
            const element = document.querySelector(href)
            element?.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }

    document.addEventListener('click', handleNavClick)
    return () => document.removeEventListener('click', handleNavClick)
  }, [isOpen, onClose])

  if (!isOpen || !projectId) return null

  const renderCaseStudy = () => {
    switch (projectId) {
      case 'onboard-iq':
        return <OnboardIQCaseStudy onBack={onClose} />

      case 'rayni-platform':
        return <RayniCaseStudy onBack={onClose} />

      case 'blue-moon-telehealth':
        return <BlueMoonCaseStudy onBack={onClose} />

      case 'ashley-furniture':
        return <AshleyCaseStudy onBack={onClose} />

      case 'aspen-dental':
        return <AspenCaseStudy onBack={onClose} />

      case 'dell-technologies':
        return <DellCaseStudy onBack={onClose} />

      case 'helzberg-diamonds':
        return <HelzbergCaseStudy onBack={onClose} />

      case 'ifit-health':
        return <IfitCaseStudy onBack={onClose} />

      default:
        return <ComingSoonCaseStudy
          title="Case Study Coming Soon"
          description="This detailed case study is currently being prepared"
          tags={['Portfolio']}
          onBack={onClose}
        />
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background z-[200] overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Fixed header with close button - high z-index to stay above everything */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border z-[210] shadow-lg">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  onClose()
                  window.location.hash = ''
                }}
                className="flex items-center gap-2 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Button>
              <Button
                variant="default"
                size="default"
                onClick={onClose}
                className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
          </div>
        </div>

        {/* Case study content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {renderCaseStudy()}
        </motion.div>

        {/* Floating Back Button - Always visible */}
        <motion.div
          className="fixed bottom-6 left-6 z-[220]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <Button
            onClick={onClose}
            size="lg"
            className="rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Temporary component for case studies that haven't been built yet
function ComingSoonCaseStudy({ 
  title, 
  description, 
  tags, 
  onBack 
}: { 
  title: string
  description: string
  tags: string[]
  onBack: () => void
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-muted/50 to-muted/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold font-display mb-6">
                {title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                {description}
              </p>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-8 max-w-2xl mx-auto">
                <div className="text-amber-800 dark:text-amber-200 text-center">
                  <div className="text-4xl mb-4">🚧</div>
                  <h3 className="text-lg font-semibold mb-2">Case Study In Development</h3>
                  <p className="text-sm mb-4">
                    This detailed case study is currently being prepared and will showcase 
                    the complete design and development process for this project.
                  </p>
                  <div className="text-xs text-amber-700 dark:text-amber-300">
                    Check back soon for the full story!
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onBack} variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
                <Button 
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                    onBack()
                  }}
                  size="lg"
                >
                  Discuss This Project
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display mb-4">
              What This Case Study Will Include
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive breakdown of the design and development process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-muted/30 rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Challenge & Research</h3>
              <p className="text-sm text-muted-foreground">
                Problem definition, user research, and business requirements
              </p>
            </div>

            <div className="text-center p-6 bg-muted/30 rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Design Process</h3>
              <p className="text-sm text-muted-foreground">
                Wireframes, prototypes, and design system development
              </p>
            </div>

            <div className="text-center p-6 bg-muted/30 rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Results & Impact</h3>
              <p className="text-sm text-muted-foreground">
                Technical implementation and measurable business outcomes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}