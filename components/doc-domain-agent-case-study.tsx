'use client'

import React from 'react'
import {
  Clock,
  Search,
  Code,
  Monitor,
  Database,
  Zap,
  Brain,
  Shield,
  FileText,
  Target,
  AlertTriangle,
  Eye,
  GitBranch,
  Activity,
  Bug
} from 'lucide-react'
import { ProjectDetailTemplate } from './project-detail-template'

interface DocDomainAgentCaseStudyProps {
  onBack?: () => void
}

export function DocDomainAgentCaseStudy({ onBack }: DocDomainAgentCaseStudyProps) {
  const projectData = {
    title: 'Doc Domain Agent',
    subtitle: 'Zero-Hallucination Knowledge Framework',
    description: 'Domain-agnostic RAG framework for high-stakes knowledge retrieval. Neo4j GraphRAG with LangGraph stateful agents, human-in-the-loop gap detection, Metabase observability dashboards, and end-to-end request tracing. Architected for any domain where AI accuracy is non-negotiable—deployed for scientific instrumentation where errors risk $80K+ equipment.',
    category: 'AI/ML Platform',
    status: 'live' as const,
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    heroIcon: Shield,
    metrics: [
      { icon: Clock, value: '<30s', label: 'Time to Answer' },
      { icon: Shield, value: '<0.1%', label: 'Hallucination Rate' },
      { icon: Activity, value: '4', label: 'Metabase Dashboards' },
      { icon: Target, value: '758', label: 'Test Functions' }
    ],
    challenge: {
      title: 'The Challenge',
      description: 'Organizations across domains face critical documentation chaos—technical manuals, SOPs, compliance docs, and troubleshooting guides scattered across hundreds of PDFs. Standard RAG systems prioritize semantic similarity over accuracy, causing hallucinations that can damage equipment, violate compliance, or create safety hazards. The first deployment targets scientific labs where an $80K centrifuge error at 2am needs verified answers in minutes, not hours of manual searching.',
      quote: {
        text: 'Every citation is clickable. When the AI says "check fuse F1 on page 56," I click and see the exact highlighted text with a bounding box. No more guessing if the answer is right.',
        author: 'Lab Technician User Persona'
      }
    },
    process: {
      title: 'Development Journey',
      description: 'Full-stack FastAPI + React/Vite implementation with Neo4j GraphRAG, LangGraph orchestration, and Metabase observability.',
      phases: [
        {
          icon: FileText,
          phase: 'Layout-Aware Document Ingestion',
          description: 'Built pipeline using Docling for PDF parsing that preserves tables as DataFrames, extracts figures as PNGs, and captures bounding box coordinates. Celery workers handle async processing (12GB memory limit for OCR). Coordinate normalization transforms Docling points to CSS percentages for UI overlays.'
        },
        {
          icon: Database,
          phase: 'Neo4j GraphRAG Architecture',
          description: 'Implemented unified knowledge graph with native vector search. Domain → Document → Chunk hierarchy with 1536-dim embeddings and cosine similarity index. Graph traversal scopes vector searches to relevant context only. Cross-encoder reranking (ms-marco-MiniLM) for precision retrieval.'
        },
        {
          icon: Brain,
          phase: 'LangGraph Stateful Agent',
          description: 'Built 7-node agent workflow: Intent Classification → Entity Extraction → Router (70% confidence threshold) → Hybrid Retrieval → Gap Detection → Response Generation → Citation Formatting. PostgreSQL checkpoint persistence enables resume after interruptions.'
        },
        {
          icon: AlertTriangle,
          phase: 'Zero-Hallucination Design',
          description: '3-layer gap detection: Confidence gap (max score < 55%), Semantic gap (LLM evaluates relevance), Structural gap (Neo4j checks missing doc types). Triggers HITL interrupt requesting specific uploads rather than hallucinating. Safety interception logging for compliance audits.'
        },
        {
          icon: Activity,
          phase: 'Production Observability & Debugging',
          description: 'End-to-end request tracing with 8-char IDs flowing from HTTP middleware through agent graph to database. Metabase dashboards for RAG health (answer rates, gap distribution), performance (P50/P95 latency, component breakdown), request exploration (failed queries, low confidence), and domain analysis. QA logging enables weekly improvement cycles—trace any user complaint from frontend to exact database row.'
        }
      ]
    },
    technical: {
      title: 'Technical Architecture',
      description: 'Production-grade distributed system with 8-service Docker Compose orchestration.',
      cards: [
        {
          title: 'Hybrid Search Pipeline',
          description: 'Vector embeddings (OpenAI 1536-dim) combined with graph traversal filtering. Only retrieves chunks from entities relevant to query context. Cross-encoder reranking ensures precision over similarity. Top-K results with full source metadata for citations.',
          tags: ['Neo4j Vector Index', 'Cross-Encoder', 'Graph Filtering', 'Hybrid Search']
        },
        {
          title: 'LangGraph State Machine',
          description: 'Stateful workflow with conditional routing by intent (manuals/protocols/troubleshooting/training/maintenance). 70% confidence threshold gates routing decisions. Interrupt/resume pattern for human-in-the-loop gap uploads.',
          tags: ['LangGraph 0.1.0+', 'Conditional Routing', 'HITL Interrupts', 'Checkpointing']
        },
        {
          title: 'Deep-Linking Verification UI',
          description: 'Every citation clickable with split-screen PDF viewer. Automatic scroll to correct page with bounding box highlighting (CSS percentage overlays). Users can instantly verify specs, error codes, voltage limits against source document.',
          tags: ['react-pdf', 'Bounding Box Overlays', 'Citation Deep-Links', 'Split-Screen']
        },
        {
          title: 'Document Processing Pipeline',
          description: 'Docling extracts layout-aware content (text, tables, figures). Celery async workers with Redis queue. RecursiveCharacterTextSplitter (1000 chars, 200 overlap). Batched OpenAI embeddings (500/batch, 3 concurrent workers).',
          tags: ['Docling 2.0+', 'Celery Workers', 'Redis Queue', 'Batch Embeddings']
        },
        {
          title: 'Streaming Chat Architecture',
          description: 'SSE streaming with Vercel AI SDK useChat hook. BLUF response format (Verdict → Evidence → Fix). Real-time token rendering with optimistic UI. Safety warnings injected for critical operations.',
          tags: ['SSE Streaming', 'Vercel AI SDK', 'BLUF Format', 'Safety Warnings']
        },
        {
          title: 'End-to-End Observability Stack',
          description: 'Request ID middleware generates 8-char trace IDs (e.g., "a3f8b2c1") that flow through every layer—HTTP → Agent Graph → QA Logging → Database. Metabase dashboards: RAG Overview (daily answer rate, gap distribution), Performance (P50/P95 latency breakdown by embed/search/rerank), Request Explorer (debug failing queries), Domain Analysis (per-entity metrics). Debug any user complaint: grep logs by ID, query database, identify root cause.',
          tags: ['Request Tracing', 'Metabase', 'QA Analytics', 'Latency Monitoring']
        },
        {
          title: 'Production Infrastructure',
          description: '8-service Docker Compose: FastAPI, React/Vite, Neo4j, PostgreSQL, Redis, Celery, MinIO, Metabase. Traefik reverse proxy with auto HTTPS. Continuous improvement workflow with gap type analysis (confidence/semantic/structural) drives vocabulary expansions and document uploads.',
          tags: ['Docker Compose', 'Traefik', 'CI/CD', 'Gap Analysis']
        }
      ]
    },
    results: {
      title: 'Technical Achievements',
      description: 'Domain-agnostic RAG framework with production observability, optimized for zero-tolerance environments.',
      cards: [
        { value: '<30s', label: 'Time to Answer', description: 'SSE streaming' },
        { value: '<0.1%', label: 'Hallucination', description: '55% threshold gate' },
        { value: '4', label: 'Dashboards', description: 'Metabase analytics' },
        { value: '8', label: 'Services', description: 'Docker orchestrated' }
      ],
      achievements: [
        'Zero-Hallucination: 55% confidence threshold + semantic gap detection + structural gap analysis prevents false answers',
        'End-to-End Tracing: Request IDs flow HTTP → Agent → Database, enabling "grep logs + query DB" debugging for any user complaint',
        'Metabase Observability: 4 dashboards (RAG health, performance P50/P95, request explorer, domain analysis) with weekly improvement cycles',
        'Graph-Augmented RAG: Neo4j combines vector search with relationship traversal for domain-scoped retrieval',
        'Human-in-the-Loop: Agent detects knowledge gaps and requests specific documents rather than guessing',
        'Continuous Improvement: Gap type analysis (confidence/semantic/structural) drives vocabulary expansions and document uploads'
      ]
    },
    nextSteps: {
      title: 'Need Zero-Hallucination AI for Your Domain?',
      description: 'Doc Domain Agent is a domain-agnostic framework—deploy it for legal compliance, medical protocols, manufacturing SOPs, or any knowledge domain where AI accuracy is non-negotiable. GraphRAG, stateful agents, human-in-the-loop patterns, full observability. Let\'s discuss your use case.',
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
