'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, Home } from 'lucide-react'
import { Button } from './ui/button'
import { OnboardIQCaseStudy } from './onboard-iq-case-study'

// Import other case study components as they're created
// import { AshleyFurnitureCaseStudy } from './ashley-furniture-case-study'
// import { AspenDentalCaseStudy } from './aspen-dental-case-study'

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
  if (!isOpen || !projectId) return null

  const renderCaseStudy = () => {
    switch (projectId) {
      case 'onboard-iq':
        return <OnboardIQCaseStudy onBack={onClose} />
      
      case 'ashley-furniture':
        return <ComingSoonCaseStudy 
          title="Ashley Furniture Financing Console"
          description="+12% incremental approvals in 18-store pilot"
          tags={['Retail', 'Fintech', 'UI/UX']}
          onBack={onClose}
        />
      
      case 'aspen-dental':
        return <ComingSoonCaseStudy 
          title="Aspen Dental Patient Financing Portal"
          description="Instant approvals at 1,100+ clinics"
          tags={['Healthcare', 'Fintech', 'UI/UX']}
          onBack={onClose}
        />
      
      case 'dell-technologies':
        return <ComingSoonCaseStudy 
          title="Dell Technologies Dell Pay Waterfall"
          description="Bread Pay → Waterfall API integration"
          tags={['E-commerce', 'API', 'Frontend']}
          onBack={onClose}
        />
      
      case 'helzberg-diamonds':
        return <ComingSoonCaseStudy 
          title="Helzberg Diamonds Digital Flex-Pay Kiosk"
          description="Lease approvals +28% • App time -57%"
          tags={['Retail', 'Fintech', 'UI/UX']}
          onBack={onClose}
        />
      
      case 'ifit-health':
        return <ComingSoonCaseStudy 
          title="iFit Health Spend Checkout"
          description="8% of DTC revenue now HSA/FSA"
          tags={['Health & Wellness', 'Fintech', 'UI/UX']}
          onBack={onClose}
        />
      
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
        className="fixed inset-0 bg-background z-[100] overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Fixed header with close button */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/50 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Projects
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onClose()
                    window.location.hash = ''
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="flex items-center gap-2"
                  title="Go to top of portfolio"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
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