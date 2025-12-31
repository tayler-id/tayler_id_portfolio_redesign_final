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
  Video,
  Shield,
  Accessibility,
  Heart
} from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface BlueMoonCaseStudyProps {
  onBack?: () => void
}

export function BlueMoonCaseStudy({ onBack }: BlueMoonCaseStudyProps) {
  const projectData = {
    title: 'Blue Moon Senior Counseling',
    subtitle: 'Telehealth Video Therapy Platform',
    description: 'Premium telehealth platform for Medicare Part B covered geriatric counseling. Built WebRTC mesh topology video (2-8 participants), Three.js particle animations, automatic CPT billing code detection, and comprehensive accessibility suite for elderly users.',
    category: 'Healthcare / Telehealth',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    heroIcon: Heart,
    metrics: [
      { icon: Video, value: '79+', label: 'Components' },
      { icon: Code, value: '3.5K', label: 'CSS Lines' },
      { icon: Shield, value: 'HIPAA', label: 'Compliant' },
      { icon: Accessibility, value: 'WCAG', label: 'AAA Target' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Replace a legacy EJS-based video therapy interface with a modern Next.js platform while maintaining full compatibility with an existing Node.js/Express backend. The new frontend needed HIPAA-grade security, automatic CPT billing code detection for Medicare claims, and exceptional accessibility for elderly patients with vision, hearing, or motor impairments—all wrapped in a premium gold-and-black aesthetic.',
      quote: {
        text: 'Our elderly patients struggle with complicated video platforms. We need something that feels as simple as making a phone call but handles Medicare billing automatically.',
        author: 'Blue Moon Clinical Director'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'Next.js 14 App Router frontend integrating with existing Express/MySQL backend.',
      phases: [
        {
          icon: Video,
          phase: 'WebRTC Mesh Video',
          description: 'Full peer-to-peer mesh topology for 2-8 participants. Automatic PIP (1-on-1) to grid layout (3+) switching. Real-time media quality monitoring with bandwidth, FPS, and packet loss metrics. Socket.io 4.4.1 signaling for SDP offers/answers and ICE candidates.'
        },
        {
          icon: TrendingUp,
          phase: 'CPT Auto-Billing',
          description: 'Smart session timer detecting appropriate Medicare billing codes: 90832 (16-37 min), 90834 (38-52 min), 90837 (53+ min). Automatic reminder alerts at 5 and 2 minutes before thresholds. Interactive 24+ CPT codes reference library with react-pageflip.'
        },
        {
          icon: Palette,
          phase: '3D Premium Experience',
          description: 'Three.js particle morphing loader (1000+ particles) with GSAP animations. 3D bookshelf waiting room with 5 therapeutic resource books. Neon gold styling with 2px borders, glow effects, and frosted glass panels. Orbitron monospace font.'
        },
        {
          icon: Accessibility,
          phase: 'Comprehensive A11y',
          description: 'Web Speech API live captions with speaker identification. MediaPipe background blur for privacy. High contrast mode, reduced motion, 6-level font sizing. Keyboard navigation with enhanced focus indicators. Screen reader optimization.'
        }
      ]
    },
    technical: {
      title: 'Technical Architecture',
      description: 'Next.js 14 + TypeScript frontend with 60+ shadcn/ui components.',
      cards: [
        {
          title: 'WebRTC Mesh Architecture',
          description: 'Full P2P mesh topology for 2-8 participants with automatic layout calculation. Per-participant video track management, connection quality monitoring, and audio/video toggle with visual state indicators.',
          tags: ['WebRTC', 'Mesh Topology', 'Socket.io 4.4.1', 'MediaStream API']
        },
        {
          title: 'Session Management',
          description: 'Draggable floating notes panel with real-time persistence. Pre/post-session mood assessment with emoji/color indicators. Therapist-only vs all-participants timer visibility modes.',
          tags: ['Session State', 'Mood Tracking', 'Notes API', 'Real-time Sync']
        },
        {
          title: 'Three.js + GSAP Animations',
          description: '5-second cinematic loading sequence with 1000+ particle ring formation. Procedural geometry with buffer attributes. Custom typeface rendering (Droid Sans Bold). 3D bookshelf with flip-book resource viewer.',
          tags: ['Three.js r75', 'GSAP/TweenMax', 'Procedural Geometry', 'WebGL']
        },
        {
          title: 'Multi-Source Authentication',
          description: 'Checksum-based auth matching backend pattern. Priority detection from sessionStorage → localStorage → cookies → URL params. Dual-role support: Therapist (authenticated) vs Client (UUID-based).',
          tags: ['Auth Flow', 'Session Persistence', 'Role-Based', 'Backend Compat']
        },
        {
          title: 'Video Processing Pipeline',
          description: 'MediaPipe Selfie Segmentation for real-time background blur. Video effects processing with canvas manipulation. Connection quality metrics displayed in real-time.',
          tags: ['MediaPipe', 'Canvas Processing', 'Background Blur', 'Quality Metrics']
        },
        {
          title: 'HIPAA-Ready Design',
          description: 'Secure session handling, consent-aware recording options, audit-ready architecture. Static site generation for production with Apache .htaccess routing.',
          tags: ['HIPAA Design', 'Consent Flow', 'SSG Export', 'Apache Routing']
        }
      ]
    },
    results: {
      title: 'Platform Capabilities',
      description: 'Production-ready telehealth platform for Medicare-covered therapy.',
      cards: [
        { value: '79+', label: 'Components', description: 'React/TypeScript' },
        { value: '3.5K', label: 'CSS Lines', description: 'Custom styling' },
        { value: '24+', label: 'CPT Codes', description: 'Reference library' },
        { value: '35+', label: 'Doc Pages', description: 'Technical guides' }
      ],
      achievements: [
        'Video Platform: WebRTC mesh for 2-8 participants with automatic PIP/grid switching',
        'Medicare Billing: Auto CPT detection with smart timer and 24+ code reference library',
        'Premium Experience: Three.js loader, 3D bookshelf, gold-on-black luxury design system',
        'Full Accessibility: Live captions, MediaPipe blur, 6-level fonts, high contrast, reduced motion',
        'Production Ready: Static export, Apache routing, tested and approved for deployment'
      ]
    },
    videoDemo: {
      src: '/videos/goldlink-demo.mp4?v=2',
      title: 'Blue Moon Telehealth Platform Demo'
    },
    nextSteps: {
      title: 'Building Healthcare Products?',
      description: 'Blue Moon demonstrates my ability to build HIPAA-compliant, accessibility-first healthcare platforms. Let\'s discuss how I can help with your healthcare technology needs.',
      primaryAction: {
        text: 'Discuss Healthcare Projects',
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
