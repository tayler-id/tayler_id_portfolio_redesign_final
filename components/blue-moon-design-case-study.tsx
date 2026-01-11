'use client'

import React from 'react'
import { Target, Users, Heart, Eye, Volume2, Accessibility, Clock, Shield, Zap, Video } from 'lucide-react'
import { DesignCaseStudyTemplate } from './design-case-study-template'

interface BlueMoonDesignCaseStudyProps {
  onBack?: () => void
}

export function BlueMoonDesignCaseStudy({ onBack }: BlueMoonDesignCaseStudyProps) {
  const caseStudyData = {
    // Meta
    title: 'Blue Moon Senior Counseling',
    subtitle: 'Accessible Telehealth Design for Geriatric Therapy',
    role: 'Lead Product Designer & Engineer',
    timeline: '5 months (2024)',
    team: ['Solo designer/developer', 'Clinical advisor'],
    tools: ['Figma', 'React', 'Next.js', 'Three.js', 'WebRTC', 'Tailwind CSS'],

    // Hero
    gradient: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600',
    status: 'live' as const,
    liveUrl: 'https://bluemoonseniorcounseling.com',

    // Problem
    problemStatement: 'Medicare patients over 65 need mental health support, but most telehealth platforms are designed for younger, tech-savvy users—leaving seniors frustrated and disconnected.',
    problemContext: [
      '25% of seniors experience loneliness and depression, exacerbated by mobility limitations',
      'Standard video call interfaces assume familiarity with technology many seniors lack',
      'Small text, low contrast, and complex navigation create accessibility barriers',
      'HIPAA compliance requirements add friction to already challenging user journeys'
    ],
    businessGoals: [
      'Enable Medicare-covered geriatric therapy via accessible telehealth',
      'Achieve WCAG 2.1 AA compliance across all patient-facing interfaces',
      'Automate CPT billing code detection to reduce administrative burden',
      'Create a premium experience that builds trust with a cautious audience'
    ],

    // Research
    researchMethods: [
      'Stakeholder Interviews',
      'Accessibility Audit',
      'WCAG 2.1 Analysis',
      'Senior User Testing',
      'Competitive Landscape'
    ],
    personas: [
      {
        name: 'Margaret, 78',
        role: 'Medicare patient, mild cognitive decline',
        quote: 'My grandkids set up the computer, but I still can\'t figure out how to join the call. It makes me feel foolish.',
        painPoints: [
          'Small text is difficult to read even with glasses',
          'Too many buttons and options cause confusion',
          'Forgets which button starts the video call'
        ],
        goals: [
          'Talk to her therapist without needing help',
          'Feel capable and independent',
          'Access mental health support from home'
        ]
      },
      {
        name: 'Dr. Patricia Wells',
        role: 'Licensed Clinical Counselor',
        quote: 'I spend 15 minutes per session on billing codes instead of patient care. The technology should handle that.',
        painPoints: [
          'Manual CPT code tracking is error-prone',
          'Session duration impacts billing but is hard to track',
          'Patients struggle with technology, delaying sessions'
        ],
        goals: [
          'Spend more time on therapy, less on admin',
          'Trust that billing is accurate and compliant',
          'Help patients feel comfortable with video visits'
        ]
      }
    ],
    researchInsights: [
      {
        stat: '65%',
        label: 'Tech Anxiety',
        description: 'of seniors report anxiety about using video call technology'
      },
      {
        stat: '6 Levels',
        label: 'Font Sizing',
        description: 'range needed to accommodate vision differences in target demographic'
      },
      {
        stat: '15min',
        label: 'Billing Time',
        description: 'saved per session through automatic CPT code detection'
      }
    ],
    keyFinding: {
      quote: 'Accessibility isn\'t a feature list—it\'s a commitment to ensuring nobody is left behind.',
      attribution: 'Core design principle from accessibility audit'
    },

    // Design Principles
    designPrinciples: [
      {
        title: 'One Clear Action',
        description: 'Every screen has one primary action. Reduce cognitive load by eliminating unnecessary choices.',
        icon: Target
      },
      {
        title: 'Generous Touch Targets',
        description: 'Minimum 48x48px touch targets, with most interactive elements larger. Accommodate tremors and reduced motor control.',
        icon: Accessibility
      },
      {
        title: 'High Contrast by Default',
        description: 'Gold on dark backgrounds exceeds WCAG AAA contrast ratios. Clarity comes first, aesthetics adapt.',
        icon: Eye
      },
      {
        title: 'Audio Descriptions',
        description: 'Key interface states are described aloud. Users hear "You\'re now connected to Dr. Wells."',
        icon: Volume2
      },
      {
        title: 'Forgiveness by Design',
        description: 'No permanent actions without confirmation. Easy undo. Never make users feel like they broke something.',
        icon: Heart
      },
      {
        title: 'Patience in Animation',
        description: 'Slower transitions, subtle movements. Reduced motion option available. Never rush the experience.',
        icon: Clock
      }
    ],

    // User Flows
    userFlows: [
      {
        title: 'Join Session Flow',
        description: 'Streamlined path from appointment reminder to active video session',
        steps: [
          { step: 'Email Reminder', description: 'One big "Join" button' },
          { step: 'Waiting Room', description: 'Calming animation' },
          { step: 'Audio/Video Check', description: 'Simple test screen' },
          { step: 'Therapist Joins', description: 'Clear announcement' },
          { step: 'Session Active', description: 'Minimal UI, big faces' }
        ]
      },
      {
        title: 'Accessibility Settings',
        description: 'User-controlled preferences that persist across sessions',
        steps: [
          { step: 'Settings Gear', description: 'Always visible, always large' },
          { step: 'Choose Preference', description: 'Visual sliders' },
          { step: 'Live Preview', description: 'See changes immediately' },
          { step: 'Auto-Save', description: 'No "save" button needed' },
          { step: 'Sync Cross-Device', description: 'Settings follow user' }
        ]
      }
    ],

    // Wireframes
    wireframes: [
      {
        type: 'wireframe' as const,
        title: 'Video Session',
        description: 'Large faces, minimal chrome, essential controls only'
      },
      {
        type: 'wireframe' as const,
        title: 'Waiting Room',
        description: 'Calming particle animation with clear status message'
      },
      {
        type: 'wireframe' as const,
        title: 'Accessibility Panel',
        description: 'Large visual sliders for font size, contrast, motion'
      },
      {
        type: 'flow' as const,
        title: 'Captions Overlay',
        description: 'Live speech-to-text positioned for readability'
      },
      {
        type: 'flow' as const,
        title: 'CPT Timer',
        description: 'Therapist-facing session duration tracking'
      },
      {
        type: 'component' as const,
        title: 'Join Button',
        description: 'Oversized primary action with confirmation state'
      }
    ],

    // Visual Design
    visualDesign: {
      colorPalette: [
        { name: 'Moonlight Gold', hex: '#F6C94A', usage: 'Primary actions, focus indicators' },
        { name: 'Deep Navy', hex: '#0F1629', usage: 'Backgrounds, high contrast base' },
        { name: 'Trust Blue', hex: '#3B82F6', usage: 'Secondary actions, links' },
        { name: 'Calm Teal', hex: '#14B8A6', usage: 'Success states, connected' },
        { name: 'Warm White', hex: '#FFFBF0', usage: 'Text, high contrast mode' },
        { name: 'Safety Red', hex: '#EF4444', usage: 'Disconnect, critical alerts' }
      ],
      typography: [
        { name: 'Display', usage: 'Welcome messages, headlines (24-48px)', sample: 'Welcome, Margaret' },
        { name: 'Body', usage: 'Instructions, UI text (16-24px base)', sample: 'Your therapist will join shortly' },
        { name: 'Button', usage: 'Action labels (18-28px)', sample: 'Join Session' }
      ],
      designDecisions: [
        {
          decision: 'Gold on Dark as Default',
          rationale: 'Testing with seniors showed dark backgrounds with gold text reduced eye strain compared to traditional light themes. Premium aesthetic also builds trust.'
        },
        {
          decision: 'Three.js Particle Animation',
          rationale: 'Calming 1000-particle morph animation in waiting room reduces pre-session anxiety. Particles morph between moon phases, reinforcing brand.'
        },
        {
          decision: 'Picture-in-Picture Video',
          rationale: 'Self-view in corner keeps focus on therapist while allowing self-monitoring. Seniors appreciated seeing themselves to ensure camera was working.'
        },
        {
          decision: '6-Level Font Scaling',
          rationale: 'Range from 14px to 28px base size accommodates wide variation in vision capability. Each level scales all text proportionally.'
        }
      ]
    },

    // Iterations
    iterations: [
      {
        version: 'V1',
        title: 'Standard Video UI',
        description: 'Initial concept followed conventional video call patterns with white background.',
        changes: [
          'Traditional light theme',
          'Standard button sizes',
          'Complex navigation',
          'Manual CPT tracking'
        ]
      },
      {
        version: 'V2',
        title: 'Accessibility Pass',
        description: 'After senior testing revealed barriers, redesigned for WCAG 2.1 AA compliance.',
        changes: [
          'Introduced dark theme with gold accents',
          'Enlarged all touch targets to 48px+',
          'Simplified navigation to essential actions',
          'Added live captions via Web Speech API'
        ]
      },
      {
        version: 'V3 (Final)',
        title: 'Premium Accessible',
        description: 'Final iteration balancing accessibility requirements with premium visual design.',
        changes: [
          'Three.js particle waiting room animation',
          'MediaPipe background blur option',
          'Automatic CPT code detection',
          'Full accessibility suite with 6 control axes',
          'Reduced motion mode',
          'Enhanced focus indicators'
        ]
      }
    ],

    // Usability Testing
    usabilityTesting: {
      participants: '8 participants aged 68-84',
      methodology: 'Remote moderated sessions with caregiver backup',
      findings: [
        {
          task: 'Join a video session from email link',
          successRate: '100%',
          insight: 'Large single button eliminated confusion about where to click',
          action: 'Made join button even larger (120px height)'
        },
        {
          task: 'Increase font size during session',
          successRate: '87.5%',
          insight: 'Users found settings but expected slider to have immediate effect',
          action: 'Added real-time preview as slider moves'
        },
        {
          task: 'Enable live captions',
          successRate: '100%',
          insight: '"CC" icon wasn\'t recognized; users looked for "Captions" text',
          action: 'Changed to text label "Live Captions" with icon'
        },
        {
          task: 'End session gracefully',
          successRate: '75%',
          insight: 'Users worried about disconnecting therapist accidentally',
          action: 'Added confirmation dialog: "Ready to end the session?"'
        }
      ]
    },

    // Final Design
    finalDesign: {
      screens: [
        {
          type: 'mockup' as const,
          title: 'Video Session',
          description: 'Full-screen video with PIP self-view and minimal controls'
        },
        {
          type: 'mockup' as const,
          title: 'Waiting Room',
          description: 'Three.js particle animation with calming countdown'
        },
        {
          type: 'mockup' as const,
          title: 'Accessibility Panel',
          description: 'Large visual controls for font, contrast, motion, captions'
        },
        {
          type: 'mockup' as const,
          title: 'Live Captions',
          description: 'Real-time speech-to-text overlay with positioning options'
        },
        {
          type: 'mockup' as const,
          title: 'CPT Timer',
          description: 'Therapist view with automatic billing code detection'
        },
        {
          type: 'mockup' as const,
          title: 'High Contrast Mode',
          description: 'Maximum visibility option for severe vision impairment'
        }
      ],
      highlights: [
        'WCAG 2.1 AA compliant across all patient-facing interfaces',
        'Six-axis accessibility control: font size, contrast, motion, captions, blur, focus',
        'Automatic CPT code detection saves 15 minutes per session',
        'Three.js particle animation reduces pre-session anxiety',
        'WebRTC video with adaptive layouts for 1-on-1 and group therapy',
        'Live captions via Web Speech API for hearing impairment'
      ]
    },

    // Component Library
    componentLibrary: {
      stats: [
        { value: '40+', label: 'Components' },
        { value: 'AAA', label: 'Contrast Ratio' },
        { value: '6', label: 'A11y Axes' },
        { value: 'HIPAA', label: 'Compliant' }
      ],
      components: [
        { name: 'VideoGrid', description: 'Adaptive WebRTC layout for 1-on-1, PIP, and multi-participant views' },
        { name: 'AccessibilityPanel', description: 'Unified controls for all accessibility preferences with live preview' },
        { name: 'LiveCaptions', description: 'Web Speech API integration with positioning and styling options' },
        { name: 'ParticleLoader', description: 'Three.js moon phase morphing animation for waiting states' },
        { name: 'CPTTimer', description: 'Session duration tracker with automatic billing code detection' },
        { name: 'JoinButton', description: 'Oversized primary action with hover confirmation state' }
      ]
    },

    // Results
    results: {
      metrics: [
        { value: 'WCAG 2.1', label: 'Accessibility', improvement: 'AA Compliant' },
        { value: '100%', label: 'Join Success', improvement: 'Unassisted seniors' },
        { value: '15min', label: 'Time Saved', improvement: 'Per session billing' },
        { value: '6', label: 'A11y Controls', improvement: 'User preferences' }
      ],
      testimonial: {
        quote: 'For the first time, I joined my therapy session all by myself. I actually felt proud of myself.',
        author: 'Margaret, 78',
        role: 'Patient'
      },
      achievements: [
        'Designed fully accessible telehealth platform for Medicare geriatric patients',
        'Achieved 100% unassisted session join rate in senior user testing',
        'Created comprehensive accessibility suite with 6 user-controlled preferences',
        'Implemented automatic CPT billing code detection (90832/90834/90837)',
        'Built Three.js particle animation that reduces pre-session anxiety',
        'Delivered WebRTC video conferencing with adaptive multi-participant layouts'
      ]
    },

    // Reflection
    reflection: {
      learnings: [
        'Accessibility isn\'t just guidelines compliance—it\'s empathy made concrete',
        'Seniors appreciate premium design as much as anyone; don\'t patronize',
        'Animation can be calming when it\'s purposeful and patient',
        'The best accessibility feature is the one users don\'t notice'
      ],
      whatWorked: [
        'Gold on dark theme was universally preferred over traditional light mode',
        'Single primary action per screen eliminated decision paralysis',
        'Live preview of accessibility settings built confidence',
        'Particle animation genuinely reduced reported pre-session anxiety'
      ],
      challenges: [
        'Balancing aesthetic ambition with strict accessibility requirements',
        'Designing for wide variation in cognitive and motor ability',
        'Creating calming animation that doesn\'t trigger vestibular issues',
        'Building HIPAA-compliant features without adding friction'
      ]
    },

    onBack
  }

  return <DesignCaseStudyTemplate {...caseStudyData} />
}
