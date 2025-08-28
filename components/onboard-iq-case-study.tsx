'use client'

import React, { useState } from 'react'
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Search, 
  Palette, 
  Code, 
  Monitor,
  MessageSquare,
  Target,
  Layers,
  Database,
  Zap,
  CheckCircle,
  ExternalLink,
  Play
} from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'
import { UXUIShowcaseTemplate } from './ux-ui-showcase-template'
import { ReactAppDemoTemplate } from './react-app-demo-template'

interface OnboardIQCaseStudyProps {
  onBack?: () => void
}

export function OnboardIQCaseStudy({ onBack }: OnboardIQCaseStudyProps) {
  const [showDemo, setShowDemo] = useState(false)

  // Project data
  const projectData = {
    title: 'OnboardIQ',
    subtitle: 'Complete UX→UI→Frontend→Backend Process',
    description: 'How I transformed Versatile Credit\'s 6-month manual merchant onboarding into a 2-3 month automated platform through comprehensive user research, enterprise UI design, and full-stack implementation.',
    category: 'Enterprise B2B Platform',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
    heroIcon: Monitor,
    metrics: [
      { icon: TrendingUp, value: '$2.1M', label: 'Revenue Impact' },
      { icon: Clock, value: '65%', label: 'Process Improvement' },
      { icon: Users, value: '15+', label: 'Stakeholder Interviews' },
      { icon: Zap, value: '300%', label: 'Capacity Scaling' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'OnboardIQ is a comprehensive B2B automation platform that transforms Versatile Credit\'s manual merchant onboarding process from a 6-month ordeal into a streamlined 2-3 month digital experience. As UX/UI Engineer, I led the complete product development lifecycle—from stakeholder interviews and user journey mapping through full-stack implementation—to solve critical scalability and visibility challenges affecting revenue generation.',
      quote: {
        text: 'Manual merchant onboarding processes created a 6-month average timeline, preventing scaling beyond current capacity and causing unpredictable revenue forecasting.',
        author: 'Research Finding - 15+ Stakeholder Interviews'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'A comprehensive approach covering every aspect from user research to technical implementation.',
      phases: [
        {
          icon: Search,
          phase: 'UX Research',
          description: '15+ stakeholder interviews revealed 6-month onboarding bottlenecks affecting $70/location SaaS revenue across 600+ merchant locations.'
        },
        {
          icon: Palette,
          phase: 'UI Design',
          description: 'Enterprise design system with performance-optimized animations targeting 60fps for complex data interactions.'
        },
        {
          icon: Code,
          phase: 'Frontend Development',
          description: 'JavaScript filtering system with Set-based O(1) performance, hardware-accelerated CSS animations, responsive architecture.'
        },
        {
          icon: Monitor,
          phase: 'Backend Integration',
          description: 'Node.js/Express API with PostgreSQL, authentication, and RESTful endpoints supporting real-time data operations.'
        }
      ]
    },
    technical: {
      title: 'Technical Architecture & Implementation',
      description: 'Sophisticated brownfield enhancement within enterprise constraints, demonstrating advanced full-stack development skills.',
      cards: [
        {
          title: 'Custom Animation Framework',
          description: 'Hardware-accelerated CSS animations with 60fps performance targets and comprehensive accessibility support',
          tags: ['Performance Optimization', 'Accessibility', 'Hardware Acceleration']
        },
        {
          title: 'Enterprise Component Library',
          description: '30+ enhanced Pebble macro components with backward compatibility and theme management',
          tags: ['Design System', 'Backward Compatibility', 'Theme Support']
        },
        {
          title: 'Database Strategy',
          description: 'PostgreSQL 17+ with minimal schema changes, preserving existing provider/contact relationships',
          tags: ['PostgreSQL', 'Schema Preservation', 'Flyway Migrations']
        }
      ]
    },
    results: {
      title: 'Measurable Business Impact',
      description: 'Quantified improvements across efficiency, capacity, and revenue generation.',
      cards: [
        { value: '65%', label: 'Process Time Reduction', description: '6 months → 2-3 months' },
        { value: '300%', label: 'Capacity Scaling', description: 'Without Staff Increases' },
        { value: '90%', label: 'Error Reduction', description: 'Through Automation' },
        { value: '$2.1M', label: 'Revenue Acceleration', description: 'Annual Impact' }
      ],
      achievements: [
        'Revenue Acceleration: Faster merchant-to-revenue conversion for $70/location SaaS fee structure across enterprise clients (600+ locations)',
        'Operational Scalability: Platform handles volume increases (like Heartland\'s 800 locations) through automated workflows',
        'Process Efficiency: Elimination of 8-hour manual promotional plan configurations through automated bulk import capabilities',
        'Knowledge Preservation: Captured tribal knowledge from domain experts into documented workflows, reducing single-point-of-failure dependencies by 90%',
        'Communication Consolidation: Replaced fragmented multi-channel communications with centralized platform, reducing coordination overhead by 60%'
      ]
    },
    demoConfig: {
      available: true,
      title: '🎯 Experience OnboardIQ Live',
      description: 'See how I transformed complex manual processes into an elegant automated platform. Choose your perspective and explore the complete solution.',
      features: [
        'Real merchant onboarding flow',
        'Multi-stakeholder dashboards',
        'Custom animation framework',
        'Enterprise constraint navigation'
      ],
      action: () => setShowDemo(true),
      buttonText: '💻 Launch Interactive Demo'
    },
    nextSteps: {
      title: 'Interested in Similar Results?',
      description: 'This project demonstrates my complete UX→UI→Frontend→Backend process for enterprise B2B platforms. Let\'s discuss how I can apply this approach to your complex business challenges.',
      primaryAction: {
        text: 'Start a Conversation',
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

  // UX Research data
  const uxResearchData = {
    title: 'UX Research Foundation',
    subtitle: 'Comprehensive Stakeholder Research',
    description: 'Deep user research across 15+ participants, revealing critical business processes and user pain points that informed every design decision.',
    research: {
      title: 'Research & Discovery',
      description: 'Comprehensive stakeholder research across 15+ participants, revealing critical business processes and user pain points.',
      methods: [
        {
          icon: MessageSquare,
          title: 'Structured Interviews',
          description: '60-minute sessions with role-specific question sets tailored to each stakeholder\'s domain expertise',
          insights: [
            'Maxwell Rieck (CFO) - Financial metrics and ROI requirements',
            'Chris Herndon (Sales) - Customer relationship challenges',
            'Amanda/Melissa (Operations) - Daily workflow pain points'
          ]
        },
        {
          icon: Target,
          title: 'Workflow Mapping',
          description: 'Current-state process documentation identifying bottlenecks and dependencies',
          insights: [
            'Identified 6-month average onboarding timeline',
            'Documented 8-hour manual configuration processes',
            'Mapped cross-departmental coordination issues'
          ]
        },
        {
          icon: Layers,
          title: 'Card Sorting',
          description: 'Pain point prioritization and feature importance ranking across stakeholder groups',
          insights: [
            'Revenue impact ranked as highest priority',
            'Process visibility crucial for planning',
            'Automation needed for scalability'
          ]
        }
      ],
      personas: [
        {
          name: 'Amanda',
          role: 'Internal Operations Coordinator',
          age: '28-35',
          goals: [
            'Reduce 8-hour manual configurations',
            'Increase process visibility',
            'Scale beyond current capacity'
          ],
          painPoints: [
            'Manual lender configuration complexity',
            'No visibility into bottlenecks',
            'Unpredictable timeline commitments'
          ],
          quote: 'I spend entire days just configuring promotional plans manually. There has to be a better way.'
        },
        {
          name: 'Snap',
          role: 'Lender Partner Representative',
          age: '35-45',
          goals: [
            'Clear status visibility',
            'Streamlined credential exchange',
            'Predictable integration timelines'
          ],
          painPoints: [
            'Manual credential exchange processes',
            'Unclear status updates',
            'Unpredictable go-live dates'
          ],
          quote: 'We need better visibility into where we are in the process and what\'s needed from us.'
        },
        {
          name: 'Ashel',
          role: 'Merchant Business Owner',
          age: '40-55',
          goals: [
            'Predictable launch timelines',
            'Clear process expectations',
            'Minimal business disruption'
          ],
          painPoints: [
            '6-month unpredictable timelines',
            '40+ field application complexity',
            'Business planning uncertainty'
          ],
          quote: 'Six months is too long to wait. I need to plan my business around predictable timelines.'
        }
      ]
    },
    process: {
      title: 'Research to Design Process',
      description: 'From insights to actionable design requirements.',
      phases: [
        {
          phase: 'Discovery',
          icon: Search,
          description: 'Stakeholder interviews and process mapping',
          deliverables: ['Interview transcripts', 'Process maps', 'Pain point analysis'],
          duration: '2 weeks'
        },
        {
          phase: 'Synthesis',
          icon: Target,
          description: 'Pattern identification and persona development',
          deliverables: ['User personas', 'Journey maps', 'Requirements matrix'],
          duration: '1 week'
        },
        {
          phase: 'Ideation',
          icon: Palette,
          description: 'Solution concepts and wireframing',
          deliverables: ['Wireframes', 'User flows', 'Feature specifications'],
          duration: '2 weeks'
        },
        {
          phase: 'Validation',
          icon: CheckCircle,
          description: 'Concept testing and refinement',
          deliverables: ['Validated designs', 'Technical requirements', 'Implementation plan'],
          duration: '1 week'
        }
      ]
    },
    designs: {
      title: 'Design Assets & Wireframes',
      description: 'Key screens and user flows that solved the core business challenges.',
      assets: [
        // Note: These would be real design files in production
        {
          id: 'onboarding-dashboard',
          title: 'Merchant Onboarding Dashboard',
          type: 'mockup' as const,
          device: 'desktop' as const,
          image: '/assets/images/onboard-iq-dashboard-mockup.png',
          description: 'Main dashboard showing onboarding progress with real-time status updates'
        },
        {
          id: 'lender-config',
          title: 'Automated Lender Configuration',
          type: 'wireframe' as const,
          device: 'desktop' as const,
          image: '/assets/images/onboard-iq-config-wireframe.png',
          description: 'Wireframe of the automated configuration system that replaced 8-hour manual processes'
        },
        {
          id: 'mobile-status',
          title: 'Mobile Status Tracking',
          type: 'mockup' as const,
          device: 'mobile' as const,
          image: '/assets/images/onboard-iq-mobile-mockup.png',
          description: 'Mobile interface for stakeholders to track progress on-the-go'
        }
      ]
    }
  }

  // Demo configuration
  const demoConfig = {
    title: 'OnboardIQ Platform Demo',
    subtitle: 'Interactive Enterprise B2B Solution',
    description: 'Experience the complete OnboardIQ platform with working contact management, platform features matrix, and real-time filtering.',
    demoUrl: 'http://localhost:3333',
    defaultDevice: 'desktop' as const,
    requiresServer: true,
    serverStatus: 'online' as const,
    features: [
      {
        icon: Users,
        title: 'Contact Management',
        description: 'Advanced filtering with 10 provider contacts'
      },
      {
        icon: Database,
        title: 'Features Matrix',
        description: '33+ features across 4 categories'
      },
      {
        icon: Zap,
        title: 'Real-time Updates',
        description: 'Live data synchronization and filtering'
      },
      {
        icon: Monitor,
        title: 'Multi-stakeholder Views',
        description: 'Customized interfaces for different user types'
      }
    ],
    techStack: [
      {
        category: 'Frontend',
        technologies: [
          { name: 'JavaScript', purpose: 'Interactive filtering and animations' },
          { name: 'CSS3', purpose: 'Hardware-accelerated animations' },
          { name: 'HTML5', purpose: 'Semantic structure' }
        ]
      },
      {
        category: 'Backend',
        technologies: [
          { name: 'Node.js', purpose: 'Server runtime' },
          { name: 'Express', purpose: 'API framework' },
          { name: 'PostgreSQL', purpose: 'Data persistence' }
        ]
      }
    ],
    credentials: {
      title: 'Demo Access',
      credentials: [
        { label: 'Username', value: 'demo', type: 'username' as const },
        { label: 'Password', value: 'demo', type: 'password' as const }
      ],
      instructions: [
        'Use any username/password combination to access the demo',
        'Explore the contact filtering and features matrix',
        'Try different search terms and filters',
        'Note the real-time performance optimizations'
      ]
    }
  }

  return (
    <div>
      {/* Main Project Overview */}
      <ProjectDetailTemplate
        {...projectData}
        onBack={onBack}
      />

      {/* UX/UI Research Showcase - This would be a separate section */}
      <div className="border-t border-border/20">
        <UXUIShowcaseTemplate {...uxResearchData} />
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <ReactAppDemoTemplate
          {...demoConfig}
          onClose={() => setShowDemo(false)}
          onOpenExternal={() => {
            window.open('http://localhost:3333', '_blank')
            setShowDemo(false)
          }}
          onShowSource={() => {
            window.open('https://github.com/tayler-ramsay/onboard-iq', '_blank')
          }}
        />
      )}
    </div>
  )
}