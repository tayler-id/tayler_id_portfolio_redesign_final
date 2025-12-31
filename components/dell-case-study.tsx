'use client'

import React from 'react'
import { TrendingUp, Clock, Layers, Code, Monitor, Zap, Server } from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface DellCaseStudyProps {
  onBack?: () => void
}

export function DellCaseStudy({ onBack }: DellCaseStudyProps) {
  const projectData = {
    title: 'Dell Technologies Dell Pay Waterfall',
    subtitle: 'Multi-Lender E-commerce Integration',
    description: 'Integrated Bread Pay into Dell\'s checkout as a waterfall financing option. Built the frontend integration layer connecting Dell\'s e-commerce platform to 4 lender APIs with sub-2-second response times.',
    category: 'E-commerce / API',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    heroIcon: Server,
    metrics: [
      { icon: Layers, value: '4', label: 'Lender APIs' },
      { icon: Clock, value: '99.9%', label: 'Uptime' },
      { icon: TrendingUp, value: '+$2M', label: 'Monthly Volume' },
      { icon: Zap, value: '<2s', label: 'Response Time' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Dell Technologies needed to add Bread Pay as a financing option while maintaining their existing checkout experience. The integration required connecting to multiple lender APIs in a waterfall pattern—trying each lender sequentially until approval—while keeping the checkout experience fast and seamless.',
      quote: {
        text: 'We can\'t add friction to checkout. The financing option needs to feel instant, even if we\'re querying multiple lenders.',
        author: 'Dell E-commerce Product Manager'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'High-performance API integration with robust error handling.',
      phases: [
        {
          icon: Code,
          phase: 'Waterfall Architecture',
          description: 'Designed waterfall logic: primary lender → secondary → tertiary, with graceful degradation and intelligent retry handling.'
        },
        {
          icon: Monitor,
          phase: 'Adapter Layer',
          description: 'Built adapter layer translating Dell checkout data to each lender\'s unique API schema requirements.'
        },
        {
          icon: Zap,
          phase: 'Performance Optimization',
          description: 'Implemented response caching and parallel API calls where possible to maintain sub-2-second checkout experience.'
        },
        {
          icon: Server,
          phase: 'Monitoring & Reliability',
          description: 'Built comprehensive monitoring with automatic failover and alerting for API health across all lender connections.'
        }
      ]
    },
    technical: {
      title: 'Technical Architecture',
      description: 'Enterprise-scale API integration with multiple financial partners.',
      cards: [
        {
          title: 'Waterfall Logic Engine',
          description: 'Intelligent routing through multiple lenders with configurable priorities, timeouts, and fallback strategies.',
          tags: ['Routing', 'Priority Queue', 'Failover', 'Timeout Handling']
        },
        {
          title: 'Schema Translation',
          description: 'Adapter pattern translating Dell checkout data to each lender\'s unique API requirements without code duplication.',
          tags: ['Adapter Pattern', 'API Translation', 'DRY Architecture']
        },
        {
          title: 'Performance Layer',
          description: 'Response caching, connection pooling, and parallel requests where lender APIs allow simultaneous queries.',
          tags: ['Caching', 'Connection Pooling', 'Parallel Processing']
        },
        {
          title: 'Observability',
          description: 'Full request tracing, latency monitoring, and automatic alerting for degraded lender API performance.',
          tags: ['Tracing', 'Monitoring', 'Alerting', 'SLA Tracking']
        }
      ]
    },
    results: {
      title: 'Measurable Impact',
      description: 'High-volume financing integration meeting enterprise SLAs.',
      cards: [
        { value: '4', label: 'Lender APIs', description: 'Integrated partners' },
        { value: '99.9%', label: 'Uptime', description: 'System reliability' },
        { value: '+$2M', label: 'Monthly Volume', description: 'Financing processed' },
        { value: '<2s', label: 'Response Time', description: 'End-to-end latency' }
      ],
      achievements: [
        'Scale: Processing $2M+ monthly financing volume through waterfall system',
        'Performance: Sub-2-second response times across 4 lender API integrations',
        'Reliability: 99.9% uptime with automatic failover between lenders',
        'Architecture: Clean adapter pattern enabling easy addition of new lenders',
        'Monitoring: Full observability with proactive alerting on degradation'
      ]
    },
    nextSteps: {
      title: 'Need API Integration Expertise?',
      description: 'This project demonstrates my ability to build high-performance, reliable API integrations at enterprise scale. Let\'s discuss your integration challenges.',
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
