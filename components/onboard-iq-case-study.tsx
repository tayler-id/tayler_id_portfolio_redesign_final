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
  Database,
  Zap
} from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'
import { ReactAppDemoTemplate } from './react-app-demo-template'

interface OnboardIQCaseStudyProps {
  onBack?: () => void
}

export function OnboardIQCaseStudy({ onBack }: OnboardIQCaseStudyProps) {
  const [showDemo, setShowDemo] = useState(false)

  // Project data
  const projectData = {
    title: 'OnboardIQ',
    subtitle: 'Workflow Instance Management Platform',
    description: 'Enterprise workflow orchestration platform built on Kotlin/Spring Boot with ServiceKit. Enables teams to launch, configure, monitor, and manage live workflow instances with cascading configuration, SLA tracking, and role-based assignments across 5 deployment environments.',
    category: 'Enterprise B2B Platform',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
    heroIcon: Monitor,
    metrics: [
      { icon: TrendingUp, value: '$2.1M', label: 'Revenue Impact' },
      { icon: Clock, value: '65%', label: 'Process Improvement' },
      { icon: Database, value: '49', label: 'Flyway Migrations' },
      { icon: Zap, value: '5', label: 'Environments' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Operations teams could design workflows in OnboardIQ but lacked the ability to operationalize them. No launch capability from workflow designs, no instance-specific configuration for merchants, zero visibility into running instances, and no control to pause, resume, or reassign work. The PM spent entire days tracking onboardings in spreadsheets—with merchants like Heartland bringing 800+ locations, scaling was impossible without a complete workflow instance management system.',
      quote: {
        text: 'I can see all my active onboardings at a glance and know exactly what needs attention. No more spreadsheet hunting or status inquiry emails.',
        author: 'PM - Process Manager'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'Full-stack implementation on Kotlin/Spring Boot with ServiceKit enterprise framework.',
      phases: [
        {
          icon: Search,
          phase: 'Workflow Instance Architecture',
          description: 'Designed 4 core capabilities: Launch Workflow (select, configure, override), Instance List (filter by status/workflow/date/assignee), Instance View (progress bar, step timeline, real-time status), and Instance Edit (modify NOT_STARTED instances). Implemented cascading configuration: Policies flow from workflow → version → step → instance with each level able to override.'
        },
        {
          icon: Palette,
          phase: 'Enterprise UI System',
          description: 'Built 35+ Pebble macro components with Tailwind CSS 3.4.16. Created layouts matching existing patterns: new.peb (drag-drop builder), list.peb (card grid with filters), preview.peb (animated execution timeline). Maintained strict backward compatibility with ServiceKit brownfield constraints.'
        },
        {
          icon: Code,
          phase: 'Backend Architecture',
          description: 'Kotlin/Spring Boot layered architecture: 25+ Controllers (Web + REST dual API), 12 Services (business logic with transactions), 20+ DAOs (JDBC Template with named parameters). Implemented role-based access control, Google SSO + password auth, and comprehensive audit logging.'
        },
        {
          icon: Monitor,
          phase: 'Database & Deployment',
          description: 'PostgreSQL with UUID primary keys and 49 Flyway migrations. Multi-tenant schema with soft-delete support. CI/CD via GitLab Auto-DevOps deploying to 5 environments: Test, UAT, Pentest, Demo, and Production on AWS East.'
        }
      ]
    },
    technical: {
      title: 'Workflow Engine & UI Implementation',
      description: 'Complete workflow execution system with visual designer, instance management, and real-time step tracking.',
      cards: [
        {
          title: 'Workflow Designer UI',
          description: 'Drag-and-drop workflow builder (workflows/new.peb) with step configuration panels. Add steps, configure role assignments, set SLA days, and define notification policies. Version management with automatic unpublishing of previous versions on publish.',
          tags: ['Drag-Drop Builder', 'Step Config', 'Version Control']
        },
        {
          title: 'Instance Management UI',
          description: 'Launch page (select workflow, configure overrides), Instance List (filter by status/workflow/date/assignee with summary stats), Instance View (progress bar, step timeline with real-time status). My Tasks dashboard for assignee workload.',
          tags: ['Launch Flow', 'Filter System', 'Progress Tracking']
        },
        {
          title: 'Step Action System',
          description: '7 instance APIs (launch, start, pause, resume, cancel, refresh) + 7 step APIs (start, complete, skip, block, unblock, escalate, deescalate). Button visibility based on step status state machine.',
          tags: ['14 REST APIs', 'Status State Machine', 'Action Buttons']
        },
        {
          title: 'Workflow Domain Model',
          description: 'workflow → workflow_version → workflow_step template hierarchy. workflow_instance → workflow_instance_step execution tracking with metrics tables for status changes and assignment history.',
          tags: ['53 Migrations', 'Entity Hierarchy', 'Audit Trail']
        },
        {
          title: 'Assignment & SLA System',
          description: 'Role-based assignment with cascading defaults: Step → Role → Instance override. SLA days with breach notifications. Status progression: not-ready → ready → active → completed with block/escalate support.',
          tags: ['Role Cascade', 'SLA Tracking', 'Escalation Flow']
        },
        {
          title: 'Animated Preview',
          description: 'workflows/preview.peb with animated execution timeline showing step progression. Real-time step updates via AJAX. ToastManager notifications for API feedback. GSAP-style animations for state transitions.',
          tags: ['Animated Timeline', 'Real-time Updates', 'Toast Feedback']
        }
      ]
    },
    results: {
      title: 'Workflow Engine Delivery',
      description: 'Complete workflow orchestration system from design to production.',
      cards: [
        { value: '14', label: 'REST APIs', description: 'Instance + Step actions' },
        { value: '53', label: 'Migrations', description: 'Schema evolution' },
        { value: '6', label: 'UI Pages', description: 'Designer → Instance' },
        { value: '5', label: 'Environments', description: 'Test → Production' }
      ],
      achievements: [
        'Workflow Designer: Drag-drop builder with step configuration, role assignments, SLA settings, and notification policies',
        'Instance Lifecycle: Launch → Start → Pause/Resume → Cancel with full status state machine and prior_status tracking',
        'Step Actions: Start, Complete, Skip, Block/Unblock, Escalate/Deescalate with visibility rules based on status',
        'My Tasks Dashboard: User-centric view of assigned steps with escalation modals and real-time status updates',
        'Animated Preview: Step-by-step execution timeline with GSAP animations and ToastManager feedback'
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