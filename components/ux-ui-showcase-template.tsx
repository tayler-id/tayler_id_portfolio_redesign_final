'use client'

import React from 'react'

interface UXUIShowcaseProps {
  title: string
  subtitle: string
  description: string
  research?: any
  process: any
  designs: any
  designSystem?: any
  prototyping?: any
  testing?: any
}

export function UXUIShowcaseTemplate(props: UXUIShowcaseProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{props.title}</h1>
        <p className="text-muted-foreground">UX/UI Showcase Coming Soon</p>
      </div>
    </div>
  )
}