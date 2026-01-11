'use client'

import React from 'react'
import { Target, Users, Lightbulb, Eye, Layers, Zap, Settings, GitBranch, Shield, Clock } from 'lucide-react'
import { DesignCaseStudyTemplate } from './design-case-study-template'

interface OnboardIQDesignCaseStudyProps {
  onBack?: () => void
}

export function OnboardIQDesignCaseStudy({ onBack }: OnboardIQDesignCaseStudyProps) {
  const caseStudyData = {
    // Meta
    title: 'OnboardIQ',
    subtitle: 'Enterprise Workflow Orchestration for FinTech Operations',
    role: 'Lead Product Designer & Full-Stack Engineer',
    timeline: '18 months (2022-2024)',
    team: ['Solo designer', '2 backend engineers', 'Product manager'],
    tools: ['Figma', 'Pebble Templates', 'Kotlin', 'Spring Boot', 'Tailwind CSS', 'PostgreSQL'],

    // Hero
    heroImage: '/assets/iq/login-page.png',
    gradient: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700',
    status: 'live' as const,

    // Problem
    problemStatement: 'Operations teams managing $16B+ in annual financing were drowning in manual workflow tracking—spreadsheets, emails, and tribal knowledge that didn\'t scale.',
    problemContext: [
      'Versatile Credit processes financing for Wells Fargo, Synchrony, and 35+ lending partners',
      'Each partner has unique workflow requirements, SLA tracking, and compliance needs',
      'Operations staff used spreadsheets to track workflow states across 5 deployment environments',
      'No visibility into bottlenecks, SLA violations, or assignment workload distribution'
    ],
    businessGoals: [
      'Replace manual tracking with real-time workflow orchestration',
      'Provide visibility into SLA compliance across all partners',
      'Enable role-based workflow assignment and capacity management',
      'Support cascading configuration from workflow → version → step → instance'
    ],

    // Research
    researchMethods: [
      'Stakeholder Interviews',
      'Workflow Shadowing',
      'Process Mapping',
      'Card Sorting',
      'Usability Testing'
    ],
    personas: [
      {
        name: 'Jennifer Martinez',
        role: 'Operations Manager, 8 years experience',
        quote: 'I spend my mornings in spreadsheets trying to figure out which workflows are stuck and who\'s overloaded. By the time I find problems, we\'ve already missed SLAs.',
        painPoints: [
          'No real-time visibility into workflow states',
          'Can\'t identify bottlenecks until it\'s too late',
          'Manual assignment leads to uneven workload'
        ],
        goals: [
          'See all workflow states at a glance',
          'Get alerted before SLA violations',
          'Distribute work fairly across team'
        ]
      },
      {
        name: 'David Chen',
        role: 'Workflow Specialist, 3 years experience',
        quote: 'Every partner has different requirements. I have to remember which steps apply to which workflow version—it\'s all in my head.',
        painPoints: [
          'Complex configuration varies by partner',
          'Easy to miss required steps',
          'No clear history of what changed and when'
        ],
        goals: [
          'See exactly what\'s required for each workflow',
          'Trust the system to guide the process',
          'Track changes for compliance audits'
        ]
      }
    ],
    researchInsights: [
      {
        stat: '65%',
        label: 'Time on Tracking',
        description: 'of operations time spent on manual status tracking rather than actual work'
      },
      {
        stat: '4',
        label: 'Config Levels',
        description: 'cascading configuration hierarchy needed: Workflow → Version → Step → Instance'
      },
      {
        stat: '$2.1M',
        label: 'Revenue Impact',
        description: 'estimated annual value of improved workflow efficiency and SLA compliance'
      }
    ],
    keyFinding: {
      quote: 'The complexity isn\'t in any single workflow—it\'s in managing hundreds of them simultaneously while every partner has different rules.',
      attribution: 'Operations Manager during discovery research'
    },

    // Design Principles
    designPrinciples: [
      {
        title: 'Progressive Complexity',
        description: 'Show the overview first, reveal details on demand. Operations managers see dashboards; specialists see step-level details.',
        icon: Layers
      },
      {
        title: 'Configuration Inheritance',
        description: 'Visualize how settings cascade from workflow to instance. Make the invisible inheritance visible.',
        icon: GitBranch
      },
      {
        title: 'Proactive Alerting',
        description: 'Surface problems before they become violations. Red/yellow/green states at every level.',
        icon: Eye
      },
      {
        title: 'Audit Everything',
        description: 'Every change logged, every assignment tracked. Compliance isn\'t a feature—it\'s the foundation.',
        icon: Shield
      },
      {
        title: 'Role-Aware Views',
        description: 'Show each role exactly what they need. Managers see capacity; specialists see tasks.',
        icon: Users
      },
      {
        title: 'Time is Money',
        description: 'SLA countdowns visible everywhere. Make time pressure tangible without creating panic.',
        icon: Clock
      }
    ],

    // User Flows
    userFlows: [
      {
        title: 'Launch New Workflow',
        description: 'Creating a new workflow instance with inherited configuration',
        steps: [
          { step: 'Select Workflow', description: 'Choose from catalog' },
          { step: 'Pick Version', description: 'Inherit version config' },
          { step: 'Configure Instance', description: 'Override if needed' },
          { step: 'Assign Owner', description: 'Role-based assignment' },
          { step: 'Launch', description: 'Begin execution' }
        ]
      },
      {
        title: 'Monitor & Intervene',
        description: 'Operations manager tracking workflow health',
        steps: [
          { step: 'Dashboard View', description: 'See all instances' },
          { step: 'Filter by Status', description: 'Focus on at-risk' },
          { step: 'Drill Into Instance', description: 'See step timeline' },
          { step: 'Reassign/Escalate', description: 'Take action' },
          { step: 'Track Resolution', description: 'Verify completion' }
        ]
      }
    ],

    // Wireframes
    wireframes: [
      {
        type: 'wireframe' as const,
        title: 'Workflow Designer',
        description: 'Drag-drop step library with visual step sequencing and cascading defaults',
        image: '/assets/iq/wireframe/wireframe-workflow-designer.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Workflow Instance Detail',
        description: 'Real-time status tracking with SLA indicators, timeline, and audit trail',
        image: '/assets/iq/wireframe/wireframe-instance-detail.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Analytics Dashboard',
        description: 'Workflow volume trends, completion charts, and bottleneck analysis',
        image: '/assets/iq/wireframe/wireframe-analytics-dashboard.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Task Queue / My Tasks',
        description: 'At-a-glance workload with multi-dimensional filtering and priority indicators',
        image: '/assets/iq/wireframe/wireframe-my-tasks.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Platform Features Matrix',
        description: 'Provider × Feature compatibility grid with status indicators',
        image: '/assets/iq/wireframe/wireframe-features-matrix.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Step Configuration Modal',
        description: 'Cascading assignment logic with per-step SLA override and notifications',
        image: '/assets/iq/wireframe/wireframe-step-config-modal.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Activity Log / Audit Trail',
        description: 'Chronological timeline with color-coded event types and filters',
        image: '/assets/iq/wireframe/wireframe-activity-log.png'
      }
    ],

    // Visual Design
    visualDesign: {
      colorPalette: [
        { name: 'Primary Blue', hex: '#3B82F6', usage: 'Primary actions, active states' },
        { name: 'Success Green', hex: '#10B981', usage: 'Completed, on-track SLAs' },
        { name: 'Warning Amber', hex: '#F59E0B', usage: 'At-risk, approaching SLA' },
        { name: 'Critical Red', hex: '#EF4444', usage: 'SLA violation, blocked' },
        { name: 'Neutral Slate', hex: '#64748B', usage: 'Secondary text, borders' },
        { name: 'Background', hex: '#F8FAFC', usage: 'Page backgrounds, cards' }
      ],
      typography: [
        { name: 'Display', usage: 'Dashboard headers, workflow names', sample: 'Workflow Dashboard' },
        { name: 'Body', usage: 'Descriptions, step details', sample: 'Instance #12847 is awaiting review' },
        { name: 'Mono', usage: 'IDs, timestamps, config values', sample: 'WF-2024-001' }
      ],
      designDecisions: [
        {
          decision: 'Card Grid Layout',
          rationale: 'Operations managers think in "batches" of workflows. Card grid allows quick scanning of many instances with key metrics visible without clicking.'
        },
        {
          decision: 'Timeline Visualization',
          rationale: 'Workflow execution is inherently sequential. Horizontal timeline with step cards makes progress and blockers immediately visible.'
        },
        {
          decision: 'Inheritance Indicators',
          rationale: 'Small icons show where each config value comes from (workflow, version, step, or instance override). Solves "why is it set this way?" confusion.'
        },
        {
          decision: 'SLA Countdown Everywhere',
          rationale: 'Time remaining appears on cards, timelines, and detail views. Consistent placement builds muscle memory for finding urgency information.'
        }
      ]
    },

    // Iterations
    iterations: [
      {
        version: 'V1',
        title: 'Linear Step View',
        description: 'First iteration focused on sequential step execution with activity tracking.',
        image: '/assets/iq/workflow-steps-list.png',
        changes: [
          'Vertical step list with status indicators',
          'Collapsible activity and comments per step',
          'Sidebar with timeline and context data',
          'Action buttons for step transitions'
        ]
      },
      {
        version: 'V2',
        title: 'Card Grid + Timeline',
        description: 'User feedback drove shift to visual card-based interface.',
        image: '/assets/iq/workflow-instances-list.png',
        changes: [
          'Card grid replaced tables for overview',
          'Horizontal timeline for execution view',
          'Real-time status updates',
          'SLA countdown timers added'
        ]
      },
      {
        version: 'V3',
        title: 'Config Inheritance',
        description: 'Added visual hierarchy for cascading configuration.',
        image: '/assets/iq/workflow-designer-named.png',
        changes: [
          'Inheritance indicators on all config fields',
          'Side-by-side diff view for overrides',
          'Audit log integration',
          'Bulk actions for operations managers'
        ]
      },
      {
        version: 'V4 (Final)',
        title: 'Role-Based Views',
        description: 'Personalized dashboards based on user role and permissions.',
        image: '/assets/iq/workflow-instance-activity-log.png',
        changes: [
          'Role-aware default views',
          'Capacity management for assignments',
          'Drag-drop workflow builder',
          'Full RBAC with Google SSO'
        ]
      }
    ],

    // Usability Testing
    usabilityTesting: {
      participants: '12 operations staff across 3 roles',
      methodology: 'Task-based testing with think-aloud protocol',
      findings: [
        {
          task: 'Find all workflows at risk of SLA violation',
          successRate: '100%',
          insight: 'Color-coded cards made at-risk workflows instantly visible',
          action: 'Added "At Risk" quick filter as default view for managers'
        },
        {
          task: 'Understand why a config value is set',
          successRate: '83%',
          insight: 'Users didn\'t notice inheritance icons initially',
          action: 'Added tooltip explaining inheritance on hover, larger icons'
        },
        {
          task: 'Launch new workflow with partner-specific config',
          successRate: '92%',
          insight: 'Users appreciated seeing inherited values before overriding',
          action: 'Added "Preview inherited config" step before customization'
        },
        {
          task: 'Reassign workflow to different team member',
          successRate: '100%',
          insight: 'Capacity indicators prevented overloading individuals',
          action: 'Made capacity bar more prominent in assignment dropdown'
        }
      ]
    },

    // Final Design
    finalDesign: {
      screens: [
        {
          type: 'mockup' as const,
          title: 'All Tasks Dashboard',
          description: 'Card grid with 7 tasks, status badges, SLA indicators, and priority filtering',
          image: '/assets/iq/step-detail-view-2.png'
        },
        {
          type: 'mockup' as const,
          title: 'Workflow Management',
          description: 'Published workflows with Templates library and New Workflow creation',
          image: '/assets/iq/workflow-management-2.png'
        },
        {
          type: 'mockup' as const,
          title: 'Platform Features Matrix',
          description: '22 features × 45 providers compatibility grid with status legend',
          image: '/assets/iq/platform-features-matrix.png'
        },
        {
          type: 'mockup' as const,
          title: 'Import Contacts',
          description: 'CSV upload wizard with template download and valid values guide',
          image: '/assets/iq/data-table-view-3.png'
        },
        {
          type: 'mockup' as const,
          title: 'Instance Detail with Activity',
          description: 'Complete workflow view with step timeline, context data, and activity log',
          image: '/assets/iq/workflow-instance-activity-log.png'
        },
        {
          type: 'mockup' as const,
          title: 'Analytics Dashboard',
          description: 'Lender performance comparison with charts, metrics cards, and instance tracking',
          image: '/assets/iq/lender-performance-analytics.png'
        }
      ],
      highlights: [
        'Card grid dashboard enables scanning 50+ workflows at a glance',
        'SLA countdown timers provide consistent urgency visualization',
        'Inheritance indicators solve "why is it configured this way?" questions',
        'Role-based views show each user exactly what they need',
        'Timeline visualization makes workflow progress immediately clear',
        'Capacity indicators prevent workload imbalance'
      ]
    },

    // Component Library
    componentLibrary: {
      stats: [
        { value: '35+', label: 'Pebble Macros' },
        { value: '49', label: 'DB Migrations' },
        { value: '120+', label: 'API Endpoints' },
        { value: '5', label: 'Environments' }
      ],
      components: [
        { name: 'WorkflowCard', description: 'Status card with metrics, SLA timer, and quick actions' },
        { name: 'ExecutionTimeline', description: 'Horizontal step visualization with progress states' },
        { name: 'ConfigEditor', description: 'Cascading configuration with inheritance indicators' },
        { name: 'SLATimer', description: 'Countdown component with color-coded urgency' },
        { name: 'AssignmentPicker', description: 'Role-based selector with capacity visualization' },
        { name: 'AuditLog', description: 'Filterable change history with diff view' }
      ]
    },

    // Results
    results: {
      metrics: [
        { value: '$2.1M', label: 'Revenue Impact', improvement: 'Annual efficiency gains' },
        { value: '65%', label: 'Process Improvement', improvement: 'Reduced tracking time' },
        { value: '49', label: 'DB Migrations', improvement: 'Production deployments' },
        { value: '35+', label: 'Partners Served', improvement: 'Including Wells Fargo' }
      ],
      testimonial: {
        quote: 'For the first time, I can see everything that\'s happening across all our partner workflows. No more spreadsheet hunting.',
        author: 'Jennifer Martinez',
        role: 'Operations Manager'
      },
      achievements: [
        'Designed and built enterprise workflow platform serving $16B+ in annual financing',
        'Reduced operations tracking time by 65% through real-time dashboards',
        'Created cascading configuration system supporting 4 inheritance levels',
        'Built role-based views for managers, specialists, and administrators',
        'Deployed across 5 environments with zero-downtime releases',
        'Integrated Google SSO and comprehensive RBAC for enterprise security'
      ]
    },

    // Reflection
    reflection: {
      learnings: [
        'Enterprise software doesn\'t have to feel enterprise—clarity beats density',
        'Configuration inheritance is a UX problem, not just a technical one',
        'SLA visualization changes behavior more than SLA alerts',
        'Role-based views aren\'t just about permissions—they\'re about focus'
      ],
      whatWorked: [
        'Card grid dashboard was universally preferred over tables',
        'Timeline visualization made complex workflows understandable',
        'Inheritance indicators eliminated "why is it set this way?" support tickets',
        'Capacity visualization naturally distributed workload'
      ],
      challenges: [
        'Balancing flexibility with guardrails in configuration',
        'Designing for power users while keeping it approachable',
        'Visualizing 4 levels of cascading configuration clearly',
        'Maintaining performance with real-time updates across 50+ workflows'
      ]
    },

    onBack
  }

  return <DesignCaseStudyTemplate {...caseStudyData} />
}
