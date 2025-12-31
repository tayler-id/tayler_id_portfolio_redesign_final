'use client'

import React from 'react'
import { TrendingUp, Clock, Users, Search, Palette, Code, Monitor, Gem } from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface HelzbergCaseStudyProps {
  onBack?: () => void
}

export function HelzbergCaseStudy({ onBack }: HelzbergCaseStudyProps) {
  const projectData = {
    title: 'Helzberg Diamonds Digital Flex-Pay Kiosk',
    subtitle: 'Self-Service Retail Financing',
    description: 'In-store kiosk enabling customers to self-serve financing applications. Achieved +28% lease approvals and -57% application time through privacy-focused, luxury-appropriate design.',
    category: 'Retail FinTech / Kiosk',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    heroIcon: Gem,
    metrics: [
      { icon: TrendingUp, value: '+28%', label: 'Lease Approvals' },
      { icon: Clock, value: '-57%', label: 'App Time' },
      { icon: Users, value: '200+', label: 'Stores' },
      { icon: Monitor, value: 'Touch', label: 'Optimized' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Jewelry store associates struggled to explain lease-to-own financing options, and customers felt embarrassed discussing financing in the open store environment. Many abandoned due to complexity and perceived stigma. Helzberg needed a private, self-service option that matched their luxury brand positioning.',
      quote: {
        text: 'Customers don\'t want to discuss financing in front of other shoppers. They need a private way to explore their options.',
        author: 'Helzberg Store Manager'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'Luxury-appropriate self-service kiosk design for sensitive financial decisions.',
      phases: [
        {
          icon: Search,
          phase: 'Problem Discovery',
          description: 'Identified that associates struggled explaining lease-to-own options and customers abandoned due to complexity and stigma in public store environment.'
        },
        {
          icon: Palette,
          phase: 'Luxury Kiosk Design',
          description: 'Created self-service kiosk with jewelry-appropriate luxury aesthetic enabling private, judgment-free financing exploration.'
        },
        {
          icon: Code,
          phase: 'Vue.js Implementation',
          description: 'Built touch-optimized Vue.js application with large tap targets, clear progress indicators, and instant pre-qualification results.'
        },
        {
          icon: Monitor,
          phase: 'Store Rollout',
          description: 'Deployed across 200+ Helzberg locations with staff training materials and ongoing performance optimization.'
        }
      ]
    },
    technical: {
      title: 'Technical Implementation',
      description: 'Touch-first kiosk application designed for retail environment.',
      cards: [
        {
          title: 'Touch-Optimized UI',
          description: 'Large tap targets (minimum 48px), generous spacing, and swipe-friendly interactions designed for standing kiosk use.',
          tags: ['Touch UI', 'Kiosk', 'Accessibility', 'Ergonomics']
        },
        {
          title: 'Instant Pre-Qualification',
          description: 'Soft credit check integration providing instant feedback without affecting customer credit scores.',
          tags: ['Soft Pull', 'Instant Results', 'Credit API']
        },
        {
          title: 'Privacy-First Design',
          description: 'Auto-timeout, screen dimming for idle states, and clear data when sessions end protecting customer information.',
          tags: ['Privacy', 'Auto-Timeout', 'Data Protection']
        },
        {
          title: 'Offline Resilience',
          description: 'Application queues submissions during network outages, ensuring no lost applications in retail WiFi environments.',
          tags: ['Offline Support', 'Queue System', 'Reliability']
        }
      ]
    },
    results: {
      title: 'Measurable Impact',
      description: 'Significant improvements in financing conversion across the Helzberg network.',
      cards: [
        { value: '+28%', label: 'Lease Approvals', description: 'Conversion increase' },
        { value: '-57%', label: 'Application Time', description: 'Faster completion' },
        { value: '200+', label: 'Stores', description: 'Nationwide rollout' },
        { value: 'Private', label: 'Experience', description: 'Customer comfort' }
      ],
      achievements: [
        'Conversion: 28% increase in lease-to-own approvals through self-service option',
        'Speed: 57% reduction in application completion time',
        'Privacy: Eliminated stigma with private, self-directed financing exploration',
        'Scale: Deployed to 200+ Helzberg Diamonds locations nationwide',
        'Brand: Luxury-appropriate design matching Helzberg premium positioning'
      ]
    },
    nextSteps: {
      title: 'Building Retail Kiosk Solutions?',
      description: 'This project shows my ability to solve complex retail UX challenges with self-service technology. Let\'s discuss your retail technology needs.',
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

  return <ProjectDetailTemplate {...projectData} onBack={onBack} />
}
