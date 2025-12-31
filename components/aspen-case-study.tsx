'use client'

import React from 'react'
import {
  TrendingUp,
  Clock,
  Users,
  Search,
  Palette,
  Code,
  Monitor,
  Heart,
  Shield,
  Smartphone
} from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface AspenCaseStudyProps {
  onBack?: () => void
}

export function AspenCaseStudy({ onBack }: AspenCaseStudyProps) {
  const projectData = {
    title: 'Aspen Dental Patient Financing Portal',
    subtitle: 'Healthcare Point-of-Care Financing',
    description: 'Patient-facing financing portal deployed across 1,100+ dental clinics. Designed for anxious patients needing unexpected treatment financing with focus on clarity, trust, and instant decisioning.',
    category: 'Healthcare FinTech',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    heroIcon: Heart,
    metrics: [
      { icon: Users, value: '1,100+', label: 'Clinics' },
      { icon: Clock, value: '<30s', label: 'Decision Time' },
      { icon: TrendingUp, value: '+15%', label: 'Conversion' },
      { icon: Shield, value: 'HIPAA', label: 'Compliant' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Patients at Aspen Dental clinics often face unexpected treatment costs that create anxiety and decision paralysis. The existing financing process added friction at the worst possible moment—when patients are already stressed about dental procedures. We needed to create a calm, trustworthy experience that helped patients understand their options instantly.',
      quote: {
        text: 'Patients are already anxious about dental work. Adding financing stress on top makes them walk away from treatment they need.',
        author: 'Aspen Dental Office Manager'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'Patient-centered design for a high-anxiety healthcare environment.',
      phases: [
        {
          icon: Search,
          phase: 'UX Research',
          description: 'Interviewed dental office managers and observed patient interactions to understand anxiety triggers and decision points.'
        },
        {
          icon: Palette,
          phase: 'Calming UI Design',
          description: 'Designed calming color palette, clear cost breakdowns, and trust badges. Mobile-first for tablet use at chairside consultations.'
        },
        {
          icon: Code,
          phase: 'React Development',
          description: 'Built React application with HIPAA-compliant form handling, real-time validation, and multi-lender waterfall integration.'
        },
        {
          icon: Monitor,
          phase: 'Clinic Deployment',
          description: 'Rolled out to 1,100+ clinics with training materials and ongoing performance monitoring.'
        }
      ]
    },
    technical: {
      title: 'Technical Implementation',
      description: 'Healthcare-grade financing platform with emphasis on compliance and user experience.',
      cards: [
        {
          title: 'HIPAA-Compliant Forms',
          description: 'Secure form handling with field-level encryption, audit logging, and automatic data retention policies.',
          tags: ['HIPAA', 'Encryption', 'Compliance', 'Audit Logs']
        },
        {
          title: 'Multi-Lender Waterfall',
          description: 'Intelligent routing to multiple financing partners maximizing approval rates while minimizing patient wait time.',
          tags: ['API Integration', 'Waterfall Logic', 'Approval Optimization']
        },
        {
          title: 'Mobile-First Design',
          description: 'Optimized for tablet use at chairside, with large touch targets and readable typography for all ages.',
          tags: ['Responsive', 'Tablet', 'Accessibility', 'Touch-First']
        },
        {
          title: 'Real-Time Validation',
          description: 'Instant field validation with helpful error messages reducing form abandonment and submission errors.',
          tags: ['UX', 'Validation', 'Error Prevention', 'Guidance']
        }
      ]
    },
    results: {
      title: 'Measurable Impact',
      description: 'Improved patient financing experience across the Aspen Dental network.',
      cards: [
        { value: '1,100+', label: 'Clinics', description: 'Nationwide deployment' },
        { value: '<30s', label: 'Decision Time', description: 'Instant approvals' },
        { value: '+15%', label: 'Conversion', description: 'Treatment acceptance' },
        { value: 'HIPAA', label: 'Compliant', description: 'Healthcare-grade' }
      ],
      achievements: [
        'Scale: Deployed to 1,100+ Aspen Dental clinics nationwide',
        'Speed: Sub-30-second credit decisions reduce patient anxiety',
        'Conversion: 15% increase in treatment acceptance through better UX',
        'Compliance: Full HIPAA compliance with encrypted data handling',
        'Mobile: Optimized for chairside tablet use during consultations'
      ]
    },
    nextSteps: {
      title: 'Building Healthcare FinTech?',
      description: 'This project demonstrates my ability to create compliant, patient-friendly healthcare financing experiences. Let\'s discuss your healthcare technology needs.',
      primaryAction: {
        text: 'Discuss Your Project',
        action: () => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }
      },
      secondaryAction: {
        text: 'View More Projects',
        action: () => {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <ProjectDetailTemplate
      {...projectData}
      onBack={onBack}
    />
  )
}
