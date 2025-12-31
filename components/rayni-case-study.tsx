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
  Database,
  Zap,
  Brain,
  FileText,
  Layers
} from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface RayniCaseStudyProps {
  onBack?: () => void
}

export function RayniCaseStudy({ onBack }: RayniCaseStudyProps) {
  const projectData = {
    title: 'Rayni AI',
    subtitle: 'AI Document Intelligence Platform',
    description: 'Built a 360K+ line AI-powered instrument knowledge management platform for scientific research labs. Solo development using AI-augmented workflows with hybrid RAG architecture and LangGraph stateful agents.',
    category: 'AI/ML Platform',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-violet-500 to-indigo-600',
    heroIcon: Brain,
    metrics: [
      { icon: Brain, value: 'Hybrid', label: 'RAG Architecture' },
      { icon: Layers, value: '40+', label: 'Django Models' },
      { icon: Database, value: 'pgvector', label: '1536-dim Embeddings' },
      { icon: Zap, value: 'Solo', label: 'AI-Augmented Dev' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Analytical chemistry and research labs drown in documentation—instrument manuals, SOPs, calibration protocols, troubleshooting guides. When a mass spectrometer throws an error at 2am, technicians waste hours searching PDFs instead of running samples. Rayni needed to transform this tribal knowledge into an intelligent assistant that answers questions with cited sources, detects knowledge gaps proactively, and maintains conversation context across sessions.',
      quote: {
        text: 'No wasted samples. No weeks of downtime. Instant access to instrument knowledge means researchers can focus on science, not manual hunting.',
        author: 'Rayni Product Vision'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'Enterprise-scale solo development using AI-augmented workflows (Claude Code, Cursor, BMAD methodology).',
      phases: [
        {
          icon: Search,
          phase: 'Document Intelligence Pipeline',
          description: 'Built ingestion system using Docling 2.57 for layout-aware PDF parsing. Extract text, tables, figures with positional metadata. Chunk into 512-token segments preserving section hierarchy, generate OpenAI embeddings, store in PostgreSQL pgvector.'
        },
        {
          icon: Brain,
          phase: 'LangGraph Agent Architecture',
          description: 'Implemented stateful agents using LangGraph 0.6.10 with conditional routing, checkpointing, and interruption flows. Agents detect knowledge gaps before answering, route between tree-based and semantic retrieval strategies based on query classification.'
        },
        {
          icon: Code,
          phase: 'Full-Stack Implementation',
          description: 'Django 5.2 + DRF 3.15 backend with Celery workers, Daphne ASGI server. Next.js 14.2 frontend with TypeScript, SSE streaming chat, optimistic UI, and TUS resumable uploads for large PDFs. 100+ centralized API endpoints.'
        },
        {
          icon: Palette,
          phase: 'Knowledge Store UX',
          description: '5-layer filtering system (search, category, folder, type, status), hierarchical navigation, ReactFlow instrument combination builder, in-browser PDF viewer with citation deep-linking to exact page locations.'
        }
      ]
    },
    technical: {
      title: 'Technical Architecture',
      description: 'Production-ready distributed system with clear separation of concerns.',
      cards: [
        {
          title: 'Hybrid RAG with Fusion Scoring',
          description: 'Phase 1: Tree navigation for structural context (document hierarchy). Phase 2: Vector similarity via pgvector (1536-dim). Weighted fusion combining both strategies with automatic context expansion for surrounding chunks.',
          tags: ['LangGraph', 'pgvector', 'Hybrid Search', 'Fusion Scoring']
        },
        {
          title: 'LangGraph State Machine',
          description: 'Query Analysis → Should Retrieve? → Tree Navigation → Chunk Retrieval → Answer Generation. Conditional routing, checkpointing for resume, interruption flows for gap detection.',
          tags: ['LangGraph 0.6.10', 'State Machine', 'Checkpointing', 'Conditional Routing']
        },
        {
          title: 'Multi-Tenant Architecture',
          description: 'Organization → Team → User hierarchy with role-based access (instrument_manager vs trained_user). Row-level security, comprehensive audit logging, soft-delete for compliance.',
          tags: ['Multi-Tenant', 'RBAC', 'Audit Logging', 'Supabase Auth']
        },
        {
          title: 'Document Ingestion Pipeline',
          description: 'Saga pattern with transactional rollback: Parsing → Extraction → Chunking → Embedding → Storage → Tree Building. Celery workers with 60-min timeout for large PDFs.',
          tags: ['Docling 2.57', 'Celery', 'Saga Pattern', 'Transactional']
        },
        {
          title: 'Streaming Chat with Citations',
          description: 'SSE token streaming with optimistic UI. Citation generation with page numbers and fragment IDs. Lazy chat creation on first message. Auto token refresh (15-min expiry).',
          tags: ['SSE Streaming', 'Optimistic UI', 'Citation System', 'JWT Refresh']
        },
        {
          title: 'ReactFlow Knowledge Graphs',
          description: 'Visual instrument combination builder for creating composite knowledge bases. Support for simple chains, DAGs, and isolated nodes. Drag-and-drop canvas with validation.',
          tags: ['ReactFlow', 'Knowledge Graphs', 'Visual Builder', 'DAG Support']
        }
      ]
    },
    results: {
      title: 'Technical Achievements',
      description: 'Enterprise-scale platform built solo with AI-augmented development.',
      cards: [
        { value: 'Hybrid', label: 'RAG Architecture', description: 'Tree + Vector search' },
        { value: '100+', label: 'API Endpoints', description: 'Full REST coverage' },
        { value: '40+', label: 'Django Models', description: 'Multi-tenant schema' },
        { value: 'Solo', label: 'Development', description: 'AI-augmented delivery' }
      ],
      achievements: [
        'Architecture: Distributed microservices (Next.js ↔ Django ↔ Supabase) with clear separation',
        'AI Pipeline: LangGraph agents with saga pattern ingestion, hybrid RAG, and gap detection',
        'Real-time: SSE streaming chat with optimistic UI and automatic citation injection',
        'Production Scale: Full test coverage, 10 OpenAPI specs, multi-tenant architecture',
        'Solo Development: AI-augmented workflows (Claude Code, BMAD) enabling enterprise-scale output'
      ]
    },
    nextSteps: {
      title: 'Want to Build AI-Powered Products?',
      description: 'Rayni demonstrates my ability to architect and ship complex AI systems solo. From RAG pipelines to production deployment, I can help you build intelligent products.',
      primaryAction: {
        text: 'Discuss Your AI Project',
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
