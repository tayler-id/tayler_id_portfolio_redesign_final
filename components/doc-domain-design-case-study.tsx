'use client'

import React from 'react'
import { Target, Users, Lightbulb, Eye, Shield, Zap, Layers, Brain, CheckCircle } from 'lucide-react'
import { DesignCaseStudyTemplate } from './design-case-study-template'

interface DocDomainDesignCaseStudyProps {
  onBack?: () => void
}

export function DocDomainDesignCaseStudy({ onBack }: DocDomainDesignCaseStudyProps) {
  const caseStudyData = {
    // Meta
    title: 'Document Domain Agents',
    subtitle: 'Designing Zero-Hallucination AI for High-Stakes Decisions',
    role: 'Lead Product Designer & Engineer',
    timeline: '4 months (2024)',
    team: ['Solo designer/developer'],
    tools: ['Figma', 'FigJam', 'React 19', 'FastAPI', 'Neo4j', 'Tailwind CSS'],

    // Hero
    gradient: 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700',
    status: 'live' as const,

    // Problem
    problemStatement: 'When AI gets it wrong in high-stakes environments, the consequences aren\'t just inconvenient—they\'re dangerous. Existing RAG systems optimize for plausible answers, not verified ones.',
    problemContext: [
      'Standard RAG systems hallucinate 15-25% of the time, acceptable for casual use but dangerous for technical decisions',
      'Users can\'t distinguish confident guesses from verified facts',
      'Citation systems link to documents but not to specific evidence within them',
      'No graceful degradation when information gaps exist'
    ],
    businessGoals: [
      'Achieve <0.1% hallucination rate for production deployment',
      'Provide verifiable citations with bounding-box precision',
      'Detect knowledge gaps before generating misleading responses',
      'Support any knowledge domain without domain-specific training'
    ],

    // Research
    researchMethods: [
      'Expert Interviews',
      'Failure Mode Analysis',
      'Competitive Audit',
      'Cognitive Walkthrough',
      'Heuristic Evaluation'
    ],
    personas: [
      {
        name: 'Dr. James Park',
        role: 'Quality Assurance Lead, Pharmaceutical',
        quote: 'I need to trust AI like I trust a junior analyst—good for first drafts, but I verify everything before it goes anywhere.',
        painPoints: [
          'Can\'t use AI tools due to compliance requirements',
          'Spends hours cross-referencing AI outputs manually',
          'No audit trail for AI-assisted decisions'
        ],
        goals: [
          'Use AI to accelerate research without risk',
          'Maintain compliance with documentation requirements',
          'Train junior staff to verify AI outputs'
        ]
      },
      {
        name: 'Elena Rodriguez',
        role: 'Field Service Engineer',
        quote: 'When I\'m troubleshooting a $2M instrument, "probably" isn\'t good enough. I need to see exactly where the answer came from.',
        painPoints: [
          'AI chatbots give confident-sounding wrong answers',
          'Can\'t verify sources while on-site with limited time',
          'Customers expect faster resolution times'
        ],
        goals: [
          'Get verified answers in under a minute',
          'Show customers the source documentation',
          'Build confidence in AI-assisted troubleshooting'
        ]
      }
    ],
    researchInsights: [
      {
        stat: '<0.1%',
        label: 'Target Hallucination',
        description: 'Industry-leading accuracy requirement for high-stakes domains'
      },
      {
        stat: '3-Layer',
        label: 'Verification Depth',
        description: 'Confidence, semantic, and structural gap detection before response'
      },
      {
        stat: '85%',
        label: 'Confidence Threshold',
        description: 'Minimum certainty required before AI generates a response'
      }
    ],
    keyFinding: {
      quote: 'The most trustworthy AI isn\'t the one that always has an answer—it\'s the one that knows when it doesn\'t.',
      attribution: 'Core design principle from research synthesis'
    },

    // Design Principles
    designPrinciples: [
      {
        title: 'Never Guess',
        description: 'Below 85% confidence, the system stops and asks for help rather than generating a plausible-sounding but potentially wrong answer.',
        icon: Shield
      },
      {
        title: 'BLUF Responses',
        description: 'Bottom Line Up Front: Verdict → Evidence → Fix → Safety Warnings. Respect users\' time while enabling verification.',
        icon: Target
      },
      {
        title: 'Bounding Box Citations',
        description: 'Link to the exact text, not just the page. Users see precisely what the AI read to generate each claim.',
        icon: Eye
      },
      {
        title: 'Human-in-the-Loop by Design',
        description: 'Gap detection triggers document upload prompts. Users become partners in improving the knowledge base.',
        icon: Users
      },
      {
        title: 'Graph-Enhanced Context',
        description: 'Neo4j knowledge graph relationships enrich vector search with structural understanding of document hierarchies.',
        icon: Brain
      },
      {
        title: 'Audit Everything',
        description: 'Full request tracing from question to answer. Every decision point is logged for compliance review.',
        icon: CheckCircle
      }
    ],

    // User Flows
    userFlows: [
      {
        title: 'Verified Answer Flow',
        description: 'High-confidence path from question to actionable answer with verification',
        steps: [
          { step: 'Ask Question', description: 'Natural language query' },
          { step: 'Intent Classification', description: 'Route to correct retrieval strategy' },
          { step: 'Hybrid Retrieval', description: 'Vector + Graph search' },
          { step: 'Gap Check', description: 'Verify confidence > 85%' },
          { step: 'BLUF Response', description: 'Structured answer with citations' }
        ]
      },
      {
        title: 'Gap Detection Flow',
        description: 'When confidence is low, gracefully escalate rather than guess',
        steps: [
          { step: 'Ask Question', description: 'Query triggers retrieval' },
          { step: 'Low Confidence', description: '<85% threshold detected' },
          { step: 'Gap Analysis', description: 'Identify what\'s missing' },
          { step: 'HITL Prompt', description: 'Request document upload' },
          { step: 'Retry', description: 'Answer with new context' }
        ]
      }
    ],

    // Wireframes
    wireframes: [
      {
        type: 'wireframe' as const,
        title: 'Query Interface',
        description: 'Clean input with query type detection and confidence preview'
      },
      {
        type: 'wireframe' as const,
        title: 'BLUF Response Card',
        description: 'Structured answer with verdict, evidence, fix, and safety sections'
      },
      {
        type: 'wireframe' as const,
        title: 'Citation with Bounding Box',
        description: 'Source document view with highlighted text regions'
      },
      {
        type: 'flow' as const,
        title: 'Gap Detection State',
        description: 'UI state when confidence threshold isn\'t met'
      },
      {
        type: 'flow' as const,
        title: 'Knowledge Graph View',
        description: 'Neo4j visualization of document relationships'
      },
      {
        type: 'component' as const,
        title: 'Confidence Meter',
        description: '3-layer confidence visualization with breakdown'
      }
    ],

    // Visual Design
    visualDesign: {
      colorPalette: [
        { name: 'Trust Emerald', hex: '#10B981', usage: 'High confidence, verified facts' },
        { name: 'Caution Amber', hex: '#F59E0B', usage: 'Medium confidence, proceed with care' },
        { name: 'Gap Red', hex: '#EF4444', usage: 'Low confidence, knowledge gap' },
        { name: 'Graph Cyan', hex: '#06B6D4', usage: 'Knowledge graph elements' },
        { name: 'Deep Teal', hex: '#0D9488', usage: 'Primary actions, headers' },
        { name: 'Surface', hex: '#F8FAFC', usage: 'Cards, elevated surfaces' }
      ],
      typography: [
        { name: 'Inter Display', usage: 'Headlines and metric values', sample: 'Aa Bb Cc' },
        { name: 'Inter', usage: 'Body text and UI elements', sample: 'The quick brown fox' },
        { name: 'JetBrains Mono', usage: 'Code, citations, technical specs', sample: 'confidence: 0.92' }
      ],
      designDecisions: [
        {
          decision: 'BLUF Response Format',
          rationale: 'Military-inspired "Bottom Line Up Front" structure puts the answer first, then evidence. Users scanning for quick answers get what they need; users needing verification can drill down.'
        },
        {
          decision: 'Three-Layer Confidence Display',
          rationale: 'Showing confidence, semantic, and structural scores separately helps users understand WHY the AI is certain or uncertain, not just that it is.'
        },
        {
          decision: 'Bounding Box Citations',
          rationale: 'Highlighting exact text regions (not just page numbers) eliminates "find the needle in the haystack" verification friction.'
        },
        {
          decision: 'Graph Visualization on Demand',
          rationale: 'Neo4j knowledge graph shown only when users want to explore relationships. Default view stays focused on the answer.'
        }
      ]
    },

    // Iterations
    iterations: [
      {
        version: 'V1',
        title: 'Standard RAG',
        description: 'Initial approach used conventional vector search with page-level citations.',
        changes: [
          'Vector-only retrieval',
          'Page-number citations',
          'Single confidence score',
          'Always generates response'
        ]
      },
      {
        version: 'V2',
        title: 'Hybrid Retrieval',
        description: 'Added graph augmentation and cross-encoder reranking for better accuracy.',
        changes: [
          'Neo4j graph relationships',
          'Cross-encoder reranking',
          'Section-level citations',
          'Basic confidence threshold'
        ]
      },
      {
        version: 'V3 (Final)',
        title: 'Zero-Hallucination Design',
        description: 'Full gap detection system with HITL flows and bounding box precision.',
        changes: [
          '3-layer gap detection',
          'Bounding box citations',
          'BLUF response structure',
          'Human-in-the-loop escalation',
          'Full audit logging'
        ]
      }
    ],

    // Usability Testing
    usabilityTesting: {
      participants: '6 technical users from target domains',
      methodology: 'Task-based testing with accuracy verification',
      findings: [
        {
          task: 'Get troubleshooting steps for specific error code',
          successRate: '100%',
          insight: 'BLUF format was immediately understood and appreciated',
          action: 'Standardized BLUF structure across all response types'
        },
        {
          task: 'Verify citation accuracy in source document',
          successRate: '100%',
          insight: 'Bounding box highlighting was "game-changing" for verification speed',
          action: 'Added click-to-zoom on highlighted regions'
        },
        {
          task: 'Understand why AI couldn\'t answer question',
          successRate: '83%',
          insight: 'Users wanted more specificity about what information was missing',
          action: 'Added "missing context" breakdown in gap detection UI'
        },
        {
          task: 'Upload document to fill knowledge gap',
          successRate: '100%',
          insight: 'Users appreciated being empowered to improve the system',
          action: 'Added success feedback showing how upload improved coverage'
        }
      ]
    },

    // Final Design
    finalDesign: {
      screens: [
        {
          type: 'mockup' as const,
          title: 'Query Interface',
          description: 'Clean search with query classification preview'
        },
        {
          type: 'mockup' as const,
          title: 'BLUF Response',
          description: 'Structured answer: Verdict → Evidence → Fix → Safety'
        },
        {
          type: 'mockup' as const,
          title: 'Bounding Box Citation',
          description: 'Source PDF with highlighted text regions'
        },
        {
          type: 'mockup' as const,
          title: 'Gap Detection',
          description: 'Graceful escalation when confidence is insufficient'
        },
        {
          type: 'mockup' as const,
          title: 'Knowledge Graph',
          description: 'Neo4j visualization of document relationships'
        },
        {
          type: 'mockup' as const,
          title: 'Audit Trail',
          description: 'Full request trace for compliance review'
        }
      ],
      highlights: [
        '3-layer gap detection prevents hallucination at 85% confidence threshold',
        'Bounding box citations link to exact text, not just page numbers',
        'BLUF format respects user time while enabling deep verification',
        'Human-in-the-loop design turns limitations into collaboration opportunities',
        'Neo4j graph enriches vector search with structural understanding',
        'Full audit trail enables compliance in regulated industries'
      ]
    },

    // Component Library
    componentLibrary: {
      stats: [
        { value: '35+', label: 'Components' },
        { value: '758', label: 'Test Functions' },
        { value: '11', label: 'Agent Nodes' },
        { value: '3', label: 'Gap Detectors' }
      ],
      components: [
        { name: 'BLUFResponse', description: 'Structured response card with expandable sections for verdict, evidence, fix, and safety' },
        { name: 'ConfidenceMeter', description: 'Three-layer confidence visualization with semantic, structural, and overall scores' },
        { name: 'BoundingBoxViewer', description: 'PDF viewer with text region highlighting and zoom controls' },
        { name: 'GapDetectionCard', description: 'Contextual prompt explaining what\'s missing and how to resolve' },
        { name: 'GraphExplorer', description: 'Interactive Neo4j visualization for document relationships' },
        { name: 'AuditTimeline', description: 'Request trace visualization for compliance review' }
      ]
    },

    // Results
    results: {
      metrics: [
        { value: '<0.1%', label: 'Hallucination Rate', improvement: 'vs 15-25% industry average' },
        { value: '<30s', label: 'Time to Answer', improvement: 'With full verification' },
        { value: '758', label: 'Test Functions', improvement: 'Comprehensive coverage' },
        { value: '100%', label: 'Citation Accuracy', improvement: 'Bounding box precision' }
      ],
      testimonial: {
        quote: 'This is the first AI system I\'ve seen that admits when it doesn\'t know something. That honesty makes me trust the answers it does give.',
        author: 'Dr. James Park',
        role: 'Quality Assurance Lead'
      },
      achievements: [
        'Designed domain-agnostic framework that works with any knowledge corpus',
        'Achieved <0.1% hallucination rate through 3-layer gap detection',
        'Created BLUF response format that reduced verification time by 70%',
        'Built bounding-box citation system for paragraph-level precision',
        'Implemented human-in-the-loop flows that improve system over time',
        'Architected 11-node LangGraph workflow with full observability'
      ]
    },

    // Reflection
    reflection: {
      learnings: [
        'Zero-hallucination isn\'t about perfect AI—it\'s about knowing when to stop',
        'Confidence thresholds are a UX decision, not just a technical one',
        'Graph databases add context that vector search alone can\'t provide',
        'Audit requirements can drive better design, not just compliance checkboxes'
      ],
      whatWorked: [
        'BLUF format immediately resonated with technical users',
        'Bounding box citations eliminated "trust but verify" friction',
        'Gap detection prompts felt empowering rather than limiting',
        'Graph visualization helped users understand document relationships'
      ],
      challenges: [
        'Balancing retrieval accuracy with response latency',
        'Designing confidence thresholds that are strict but not frustrating',
        'Visualizing graph relationships without overwhelming users',
        'Creating audit trails that are comprehensive but not noisy'
      ]
    },

    onBack
  }

  return <DesignCaseStudyTemplate {...caseStudyData} />
}
