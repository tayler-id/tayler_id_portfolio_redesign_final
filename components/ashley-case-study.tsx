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
  Store,
  CreditCard
} from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface AshleyCaseStudyProps {
  onBack?: () => void
}

export function AshleyCaseStudy({ onBack }: AshleyCaseStudyProps) {
  const projectData = {
    title: 'Ashley Furniture Financing Console',
    subtitle: 'In-Store Financing Experience',
    description: 'Redesigned the in-store financing console for Ashley Furniture sales associates, increasing approval rates by 12% across an 18-store pilot through UX research and streamlined workflows.',
    category: 'Retail FinTech',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    heroIcon: Store,
    metrics: [
      { icon: TrendingUp, value: '+12%', label: 'Approval Rate' },
      { icon: Users, value: '18', label: 'Store Pilot' },
      { icon: Clock, value: '-40%', label: 'Application Time' },
      { icon: CreditCard, value: 'Real-time', label: 'Decisioning' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Ashley Furniture sales associates struggled with a complex financing application process that led to customer abandonment and missed sales opportunities. The existing system required associates to navigate multiple screens and enter redundant information, creating friction during high-pressure sales moments.',
      quote: {
        text: 'By the time we finish the financing application, customers have lost interest or decided to think about it.',
        author: 'Ashley Furniture Store Manager'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'User-centered design process focused on the unique retail environment.',
      phases: [
        {
          icon: Search,
          phase: 'Contextual Research',
          description: 'Conducted contextual inquiry at 5 retail locations, shadowing sales associates through complete financing workflows to identify pain points.'
        },
        {
          icon: Palette,
          phase: 'Progressive Disclosure UI',
          description: 'Designed progressive disclosure interface showing only relevant fields per customer segment, reducing cognitive load during high-pressure sales.'
        },
        {
          icon: Code,
          phase: 'Vue.js Development',
          description: 'Built Vue.js components with real-time Synchrony Bank API integration enabling instant credit decisioning within the sales flow.'
        },
        {
          icon: Monitor,
          phase: 'Pilot & Iteration',
          description: 'Deployed to 18-store pilot with rapid iteration based on associate feedback, achieving 12% approval rate increase.'
        }
      ]
    },
    technical: {
      title: 'Technical Implementation',
      description: 'Modern frontend integrated with enterprise banking systems.',
      cards: [
        {
          title: 'Progressive Disclosure',
          description: 'Smart form system that adapts displayed fields based on customer segment and financing product, reducing form fatigue.',
          tags: ['UX Pattern', 'Smart Forms', 'Conditional Logic']
        },
        {
          title: 'Real-time API Integration',
          description: 'Direct integration with Synchrony Bank APIs for instant credit decisioning without page refreshes or delays.',
          tags: ['Synchrony API', 'Real-time', 'Credit Decisioning']
        },
        {
          title: 'Vue.js Architecture',
          description: 'Component-based Vue.js application with Vuex state management optimized for tablet use in retail environment.',
          tags: ['Vue.js', 'Vuex', 'Tablet Optimization']
        },
        {
          title: 'Offline Resilience',
          description: 'Application queues submissions during network issues, ensuring no lost applications in spotty retail WiFi environments.',
          tags: ['Offline Support', 'Queue System', 'Error Recovery']
        }
      ]
    },
    results: {
      title: 'Measurable Impact',
      description: 'Significant improvements across the 18-store pilot program.',
      cards: [
        { value: '+12%', label: 'Approval Rate', description: 'Incremental increase' },
        { value: '-40%', label: 'Application Time', description: 'Faster completion' },
        { value: '18', label: 'Stores', description: 'Pilot deployment' },
        { value: '5', label: 'Locations', description: 'Research sites' }
      ],
      achievements: [
        'Approval Rate: 12% incremental increase through streamlined application flow',
        'Speed: 40% reduction in application completion time',
        'Research: Contextual inquiry at 5 retail locations with sales associates',
        'UX: Progressive disclosure reducing cognitive load during sales pressure',
        'Integration: Real-time Synchrony Bank API for instant decisioning'
      ]
    },
    nextSteps: {
      title: 'Need Retail FinTech Solutions?',
      description: 'This project shows my ability to improve conversion in retail financing through user research and thoughtful UX design. Let\'s discuss your retail technology challenges.',
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
