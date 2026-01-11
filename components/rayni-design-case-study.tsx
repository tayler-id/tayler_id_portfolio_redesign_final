'use client'

import React from 'react'
import { Target, Users, Lightbulb, Eye, Shield, Zap, Layers } from 'lucide-react'
import { DesignCaseStudyTemplate } from './design-case-study-template'

interface RayniDesignCaseStudyProps {
  onBack?: () => void
}

export function RayniDesignCaseStudy({ onBack }: RayniDesignCaseStudyProps) {
  const caseStudyData = {
    // Meta
    title: 'Rayni AI',
    subtitle: 'Designing Trust in AI-Powered Scientific Research',
    role: 'Lead Product Designer & Engineer',
    timeline: '6 months (2024)',
    team: ['Solo designer/developer'],
    tools: ['Figma', 'FigJam', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],

    // Hero
    heroImage: '/assets/rayni_ai/login-screen.png',
    gradient: 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700',
    status: 'live' as const,
    liveUrl: 'https://rayni.ai',

    // Problem
    problemStatement: 'Scientific researchers waste hours searching through instrument manuals and SOPs when equipment fails—time that should be spent on actual research.',
    problemContext: [
      'Lab technicians manage 50+ instruments, each with dense technical documentation',
      'When a mass spectrometer throws an error at 2am, there\'s no expert available',
      'Critical information is buried in 500+ page PDFs across multiple filing systems',
      'Institutional knowledge leaves when senior technicians retire'
    ],
    businessGoals: [
      'Reduce instrument downtime from hours to minutes',
      'Preserve institutional knowledge in searchable format',
      'Enable junior technicians to troubleshoot independently',
      'Support compliance with audit-ready documentation access'
    ],

    // Research
    researchMethods: [
      'Contextual Inquiry',
      'User Interviews (12 participants)',
      'Journey Mapping',
      'Competitive Analysis',
      'Card Sorting'
    ],
    personas: [
      {
        name: 'Dr. Sarah Chen',
        role: 'Lab Manager, 15 years experience',
        quote: 'I know exactly where everything is in my head. But I can\'t transfer 15 years of mental filing to the new hires.',
        painPoints: [
          'Constantly interrupted to answer questions',
          'Worried about knowledge loss when she retires',
          'Spends weekends organizing documentation'
        ],
        goals: [
          'Train junior staff faster',
          'Reduce repetitive questions',
          'Document tribal knowledge'
        ]
      },
      {
        name: 'Marcus Williams',
        role: 'Research Technician, 2 years experience',
        quote: 'When something breaks, I don\'t even know what I don\'t know. The manual assumes you already understand the system.',
        painPoints: [
          'Afraid to touch equipment without supervision',
          'Can\'t find answers in dense technical manuals',
          'Feels like a burden asking senior staff'
        ],
        goals: [
          'Solve problems independently',
          'Build confidence with equipment',
          'Learn without feeling judged'
        ]
      }
    ],
    researchInsights: [
      {
        stat: '73%',
        label: 'Search Before Ask',
        description: 'of technicians search documentation before asking colleagues, but only 12% find what they need'
      },
      {
        stat: '45min',
        label: 'Average Search Time',
        description: 'spent searching for information per equipment issue before escalating to senior staff'
      },
      {
        stat: '8.2',
        label: 'Trust Score Required',
        description: 'minimum confidence level (out of 10) users need before acting on AI-provided answers'
      }
    ],
    keyFinding: {
      quote: 'Users don\'t need AI to be right 100% of the time—they need to know exactly when to trust it and when not to.',
      attribution: 'Key insight from user research synthesis'
    },

    // Design Principles
    designPrinciples: [
      {
        title: 'Verifiable by Default',
        description: 'Every AI response links directly to source material. Users should never wonder "where did this come from?"',
        icon: Eye
      },
      {
        title: 'Confidence is Information',
        description: 'Show users when the AI is certain vs uncertain. Ambiguity erodes trust faster than admitting limitations.',
        icon: Target
      },
      {
        title: 'Progressive Disclosure',
        description: 'Surface the answer first, then let users drill into supporting evidence at their own pace.',
        icon: Layers
      },
      {
        title: 'Fail Gracefully',
        description: 'When the AI can\'t answer confidently, guide users to the next best action rather than guessing.',
        icon: Shield
      },
      {
        title: 'Respect the Expert',
        description: 'Design for experienced users first. Novices will grow into experts; condescension alienates everyone.',
        icon: Users
      },
      {
        title: 'Speed Builds Trust',
        description: 'In high-stakes environments, perceived performance directly affects confidence in accuracy.',
        icon: Zap
      }
    ],

    // User Flows
    userFlows: [
      {
        title: 'Question → Verified Answer',
        description: 'The core interaction loop for getting trusted answers from documentation',
        steps: [
          { step: 'Ask Question', description: 'Natural language query' },
          { step: 'View Response', description: 'BLUF format answer' },
          { step: 'Check Confidence', description: 'See certainty level' },
          { step: 'Verify Source', description: 'Click citation link' },
          { step: 'View in PDF', description: 'Exact page/section' }
        ]
      },
      {
        title: 'Gap Detection Flow',
        description: 'When AI lacks confidence, guide users to resolution',
        steps: [
          { step: 'Ask Question', description: 'Query with gaps' },
          { step: 'Gap Detected', description: 'Low confidence alert' },
          { step: 'Show Options', description: 'Upload docs or escalate' },
          { step: 'Upload Doc', description: 'Add missing source' },
          { step: 'Retry Query', description: 'Get confident answer' }
        ]
      }
    ],

    // Wireframes
    wireframes: [
      {
        type: 'wireframe' as const,
        title: 'Chat Interface',
        description: 'Reasoning display with inline citations and sources badge',
        image: '/assets/rayni_ai/wireframe-1-chat-interface.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Knowledge Store',
        description: 'Folder tree navigation with document grid and processing status',
        image: '/assets/rayni_ai/wireframe-2-knowledge-store.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Citation Verification',
        description: 'Split-screen AI response with highlighted PDF source',
        image: '/assets/rayni_ai/wireframe-3-citation-verification.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Confidence Indicator',
        description: 'Traffic-light confidence pills with gap detection alerts',
        image: '/assets/rayni_ai/wireframe-4-confidence-indicator.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Document Upload',
        description: 'New instrument form with drag-drop zone and step indicators',
        image: '/assets/rayni_ai/wireframe-5-document-upload.png'
      },
      {
        type: 'wireframe' as const,
        title: 'Instrument Combinations',
        description: 'Combination cards with Open Canvas for knowledge graphs',
        image: '/assets/rayni_ai/wireframe-6-instrument-combinations.png'
      }
    ],

    // Visual Design
    visualDesign: {
      colorPalette: [
        { name: 'Deep Purple', hex: '#7C3AED', usage: 'Primary actions, AI responses' },
        { name: 'Soft Violet', hex: '#A78BFA', usage: 'Hover states, secondary elements' },
        { name: 'Confidence Green', hex: '#10B981', usage: 'High confidence indicators' },
        { name: 'Caution Amber', hex: '#F59E0B', usage: 'Medium confidence, warnings' },
        { name: 'Alert Red', hex: '#EF4444', usage: 'Low confidence, errors' },
        { name: 'Neutral Gray', hex: '#6B7280', usage: 'Secondary text, borders' }
      ],
      typography: [
        { name: 'Display', usage: 'Headlines and page titles', sample: 'Aa Bb Cc' },
        { name: 'Body', usage: 'AI responses and documentation', sample: 'The quick brown fox' },
        { name: 'Mono', usage: 'Code, technical specs, citations', sample: '0123456789' }
      ],
      designDecisions: [
        {
          decision: '"No Borders Needed" Design System',
          rationale: 'Used color layering and elevation hierarchy instead of hard borders. Creates visual breathing room while maintaining clear content separation. Reduces visual noise in already information-dense interfaces.'
        },
        {
          decision: 'Confidence Color Gradient',
          rationale: 'Green → Amber → Red mapping aligns with universal mental models for traffic signals. Users intuitively understand confidence levels without reading labels.'
        },
        {
          decision: 'Split-Screen Citation View',
          rationale: 'Showing AI answer and source document side-by-side eliminates context switching. Users verify information without losing their place in the conversation.'
        },
        {
          decision: 'SSE Streaming with Citation Injection',
          rationale: 'Citations appear inline as the response streams, building trust incrementally. Users see sources being referenced in real-time rather than all at once at the end.'
        }
      ]
    },

    // Iterations
    iterations: [
      {
        version: 'V1',
        title: 'Initial Concept',
        description: 'Standard chatbot interface with citations as footnotes at the bottom of responses.',
        image: '/assets/rayni_ai/chat-processing.png',
        changes: [
          'Basic chat interface',
          'Citations as numbered footnotes',
          'Confidence shown as percentage',
          'Document library in separate page'
        ]
      },
      {
        version: 'V2',
        title: 'Inline Citations',
        description: 'After testing showed users ignored footnotes, moved citations inline with clickable links.',
        image: '/assets/rayni_ai/ai-response-with-citations.png',
        changes: [
          'Citations became clickable inline links',
          'Added confidence pill to each response',
          'Introduced gap detection prompts',
          'Unified navigation with document browser'
        ]
      },
      {
        version: 'V3',
        title: 'Split-Screen Verification',
        description: 'User testing revealed 80% wanted to see the source immediately. Added side-by-side view.',
        image: '/assets/rayni_ai/split-screen-pdf-verification.png',
        changes: [
          'Split-screen PDF viewer on citation click',
          'Highlight exact text in source document',
          'Added deep-linking to page coordinates',
          'Introduced BLUF response format'
        ]
      },
      {
        version: 'V4 (Final)',
        title: 'Trust-First Design',
        description: 'Final iteration with streaming responses, proactive gap detection, and knowledge graphs.',
        image: '/assets/rayni_ai/ai-reasoning-start.png',
        changes: [
          'SSE streaming with live citation injection',
          'Proactive "Ask for more documents" prompts',
          'Knowledge graph visualization',
          'Human-in-the-loop escalation flows'
        ]
      }
    ],

    // Usability Testing
    usabilityTesting: {
      participants: '8 lab technicians (mix of junior and senior)',
      methodology: 'Moderated remote sessions with think-aloud protocol',
      findings: [
        {
          task: 'Find troubleshooting steps for Error E-503',
          successRate: '100%',
          insight: 'All users found the answer, but 3/8 wanted to verify before acting',
          action: 'Made citation links more prominent with "Verify in source" label'
        },
        {
          task: 'Assess confidence level of AI response',
          successRate: '87.5%',
          insight: 'Users understood color coding but wanted numeric confidence too',
          action: 'Added percentage alongside visual confidence indicator'
        },
        {
          task: 'Upload new document to knowledge base',
          successRate: '75%',
          insight: 'Users expected drag-drop but started looking for "Add" button',
          action: 'Added both drag-drop zone AND explicit upload button'
        },
        {
          task: 'Navigate from answer to source document',
          successRate: '100%',
          insight: 'Split-screen view was "exactly what I needed" - direct quote from 5/8 users',
          action: 'Made split-screen the default on citation click'
        }
      ]
    },

    // Final Design
    finalDesign: {
      screens: [
        {
          type: 'mockup' as const,
          title: 'Chain of Thought Reasoning',
          description: 'Transparent AI reasoning with step-by-step progress indicators',
          image: '/assets/rayni_ai/ai-reasoning-new.png'
        },
        {
          type: 'mockup' as const,
          title: 'Citation Verification',
          description: 'Split-screen view with AI answer and highlighted source PDF',
          image: '/assets/rayni_ai/citation-verification-new.png'
        },
        {
          type: 'mockup' as const,
          title: 'Knowledge Store',
          description: '5-layer filtering with hierarchical document navigation',
          image: '/assets/rayni_ai/knowledge-store-new.png'
        },
        {
          type: 'mockup' as const,
          title: 'Instruments Dashboard',
          description: 'Card-based overview of all instruments with quick chat access',
          image: '/assets/rayni_ai/instruments-dashboard-clean.png'
        },
        {
          type: 'mockup' as const,
          title: 'Knowledge Graph Builder',
          description: 'Visual canvas for connecting related instruments and documentation',
          image: '/assets/rayni_ai/knowledge-graph-populated.png'
        },
        {
          type: 'mockup' as const,
          title: 'Users & Roles',
          description: 'Team management with granular permission controls',
          image: '/assets/rayni_ai/users-roles-management.png'
        }
      ],
      highlights: [
        'Streaming responses with real-time citation injection build trust incrementally',
        'Split-screen PDF verification eliminates "trust but verify" friction',
        'Confidence indicators use traffic-light color mapping for instant comprehension',
        'Gap detection turns AI limitations into actionable next steps',
        '"No borders" design system reduces visual noise in dense technical interfaces',
        'Deep-linking citations scroll to exact paragraph in source documents'
      ]
    },

    // Component Library
    componentLibrary: {
      stats: [
        { value: '50+', label: 'Components' },
        { value: '24', label: 'Design Tokens' },
        { value: '100%', label: 'Dark Mode' },
        { value: '0', label: 'Hard Borders' }
      ],
      components: [
        { name: 'ChatMessage', description: 'AI and user message bubbles with citation slots and confidence badges' },
        { name: 'ConfidenceIndicator', description: 'Visual confidence display with color gradient and percentage' },
        { name: 'CitationLink', description: 'Inline clickable citation that triggers split-screen view' },
        { name: 'DocumentCard', description: 'Preview card for knowledge store with type icon and metadata' },
        { name: 'UploadZone', description: 'Drag-drop area with progress states and extraction preview' },
        { name: 'GapDetectionBanner', description: 'Contextual prompt when AI confidence falls below threshold' }
      ]
    },

    // Results
    results: {
      metrics: [
        { value: '360K+', label: 'Lines of Code', improvement: 'Solo development' },
        { value: '87.5%', label: 'Usability Score', improvement: 'Task completion rate' },
        { value: '<30s', label: 'Time to Answer', improvement: 'vs 45min average' },
        { value: '100%', label: 'Citation Rate', improvement: 'Every answer sourced' }
      ],
      testimonial: {
        quote: 'For the first time, I can actually verify where the AI got its information. That changes everything about how much I trust it.',
        author: 'Dr. Sarah Chen',
        role: 'Lab Manager'
      },
      achievements: [
        'Designed and built complete AI platform from concept to production as sole designer/developer',
        'Created "no borders needed" design system with 50+ reusable components',
        'Reduced information retrieval time from 45 minutes to under 30 seconds',
        'Achieved 87.5% usability score in first moderated testing round',
        'Built trust-first UX patterns: split-screen verification, streaming citations, gap detection',
        'Implemented hybrid RAG architecture with two retrieval strategies (tree + vector)'
      ]
    },

    // Reflection
    reflection: {
      learnings: [
        'Trust in AI isn\'t binary—it\'s built through consistent, verifiable interactions',
        'Power users don\'t need hand-holding, but they appreciate transparency',
        'Streaming interfaces feel faster AND more trustworthy than batch responses',
        'Admitting limitations ("I don\'t know") builds more trust than guessing'
      ],
      whatWorked: [
        'Split-screen verification eliminated the "trust gap" in AI responses',
        'Color-coded confidence aligned with users\' intuitive mental models',
        'Progressive disclosure prevented information overload while enabling depth',
        'BLUF (Bottom Line Up Front) format respected busy researchers\' time'
      ],
      challenges: [
        'Balancing technical depth with approachable design for mixed skill levels',
        'Designing for AI uncertainty without eroding confidence in the product',
        'Creating visual hierarchy in interfaces with dense technical information',
        'Building a complete platform solo required ruthless prioritization'
      ]
    },

    onBack
  }

  return <DesignCaseStudyTemplate {...caseStudyData} />
}
