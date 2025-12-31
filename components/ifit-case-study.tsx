'use client'

import React from 'react'
import { TrendingUp, Clock, Users, Search, Palette, Code, Heart, CreditCard, Zap } from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface IfitCaseStudyProps {
  onBack?: () => void
}

export function IfitCaseStudy({ onBack }: IfitCaseStudyProps) {
  const projectData = {
    title: 'iFit Health Spend Checkout',
    subtitle: 'HSA/FSA Payment Integration',
    description: 'Added HSA/FSA payment option to iFit\'s direct-to-consumer checkout, positioning fitness equipment as a health expense and opening a new customer segment driving 8% of DTC revenue.',
    category: 'Health & Wellness / E-commerce',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    heroIcon: Heart,
    metrics: [
      { icon: TrendingUp, value: '8%', label: 'DTC Revenue' },
      { icon: Users, value: 'New', label: 'Customer Segment' },
      { icon: Clock, value: 'Instant', label: 'Card Validation' },
      { icon: CreditCard, value: 'HSA/FSA', label: 'Accepted' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'iFit\'s premium fitness equipment (treadmills, bikes, rowers) qualifies for HSA/FSA health spending, but customers didn\'t know this. By not offering HSA/FSA payment, iFit was missing an entire customer segment who could use their health savings for fitness equipment purchases.',
      quote: {
        text: 'Our customers don\'t realize they can use their HSA to buy a treadmill. We\'re leaving money on the table.',
        author: 'iFit E-commerce Director'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'Strategic integration positioning fitness equipment as qualifying health expense.',
      phases: [
        {
          icon: Search,
          phase: 'Opportunity Research',
          description: 'Identified that fitness equipment qualifies for HSA/FSA spending—an untapped market for iFit\'s premium products.'
        },
        {
          icon: Palette,
          phase: 'UX Design',
          description: 'Designed clear eligibility messaging, HSA/FSA card detection, and itemized receipts formatted for reimbursement claims.'
        },
        {
          icon: Code,
          phase: 'Integration Development',
          description: 'Built Health Spend API integration with real-time card BIN validation and automatic compliant receipt generation.'
        },
        {
          icon: Zap,
          phase: 'Launch & Optimize',
          description: 'Deployed with A/B testing, optimizing messaging and placement to maximize HSA/FSA payment adoption.'
        }
      ]
    },
    technical: {
      title: 'Technical Implementation',
      description: 'Specialized payment integration for health spending accounts.',
      cards: [
        {
          title: 'BIN Validation',
          description: 'Real-time card BIN detection identifying HSA/FSA cards at entry, enabling appropriate messaging and processing.',
          tags: ['BIN Detection', 'Card Validation', 'Real-time']
        },
        {
          title: 'Health Spend API',
          description: 'Integration with health spending payment processor handling HSA/FSA-specific transaction requirements.',
          tags: ['API Integration', 'HSA/FSA', 'Payment Processing']
        },
        {
          title: 'Compliant Receipts',
          description: 'Automatic generation of IRS-compliant itemized receipts formatted for FSA reimbursement submissions.',
          tags: ['Receipt Generation', 'IRS Compliance', 'Auto-format']
        },
        {
          title: 'Eligibility Messaging',
          description: 'Dynamic UI messaging educating customers about HSA/FSA eligibility at key decision points in checkout.',
          tags: ['UX Messaging', 'Education', 'Conversion Optimization']
        }
      ]
    },
    results: {
      title: 'Measurable Impact',
      description: 'Opened new customer segment through strategic payment integration.',
      cards: [
        { value: '8%', label: 'DTC Revenue', description: 'From HSA/FSA payments' },
        { value: 'New', label: 'Segment', description: 'Health-conscious buyers' },
        { value: 'Instant', label: 'Validation', description: 'Card detection' },
        { value: 'IRS', label: 'Compliant', description: 'Receipt format' }
      ],
      achievements: [
        'Revenue: 8% of direct-to-consumer sales now through HSA/FSA payments',
        'Positioning: Fitness equipment as qualifying health expense',
        'Education: Clear messaging helping customers understand eligibility',
        'Compliance: IRS-compliant receipts for reimbursement claims',
        'Segment: Opened new customer demographic using health savings'
      ]
    },
    nextSteps: {
      title: 'Expanding Payment Options?',
      description: 'This project shows my ability to identify market opportunities and build specialized payment integrations. Let\'s discuss your e-commerce payment needs.',
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
