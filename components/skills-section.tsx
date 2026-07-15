'use client'

import React from 'react'

const skillGroups = [
  {
    title: 'UX Design',
    skills: [
      'User research & testing',
      'Information architecture',
      'Interaction design',
      'Prototyping (Figma)',
      'Usability analysis',
      'Accessibility (WCAG)',
      'Design systems',
      'User journey mapping'
    ],
    proof: 'Three design systems in production across the Versatile platform — consumer, operator, and internal.'
  },
  {
    title: 'Front-end engineering',
    skills: [
      'React / Next.js',
      'TypeScript',
      'Vue.js',
      'CSS / Tailwind',
      'Responsive & progressive web apps',
      'Performance optimization',
      'A/B testing',
      'CI/CD workflows'
    ],
    proof: 'I ship the code for the flows I design — 12% conversion lift on 6M annual applications.'
  },
  {
    title: 'AI integration',
    skills: [
      'LangGraph agents',
      'RAG pipelines (pgvector, Neo4j)',
      'MCP generative UI',
      'Conversational interfaces',
      'Trust & verification UX',
      'Agent-orchestrated development',
      'Intelligent document processing'
    ],
    proof: 'Two RAG architectures in production; three 0-to-1 AI products shipped in the past 24 months.'
  }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-4 tracking-tight leading-[1.05]">
            What I work in
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The tools change per project. The constant is one person carrying research,
            design, and the front-end build.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-12">
          {skillGroups.map((group) => (
            <div key={group.title} className="border-t-2 border-primary pt-6">
              <h3 className="text-xl font-bold font-display text-foreground mb-5">
                {group.title}
              </h3>
              <ul className="space-y-2 mb-6">
                {group.skills.map((skill) => (
                  <li key={skill} className="text-foreground/80 leading-relaxed">
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                {group.proof}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
