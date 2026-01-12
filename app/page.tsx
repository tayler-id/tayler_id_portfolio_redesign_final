'use client'

import { useEffect } from 'react'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
// import { AIAssistant } from '@/components/ai-assistant'
import { AnimatedBackground } from '@/components/animated-background'
import { ScrollProgress } from '@/components/scroll-progress'
import { AccessibilityPanel } from '@/components/accessibility-panel'

export default function HomePage() {
  useEffect(() => {
    // Remove loading class after component mounts
    document.body.classList.remove('loading')
  }, [])

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <ScrollProgress />
      <Header />
      
      <main id="main-content" className="relative z-10" role="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
      {/* <AIAssistant /> */}
      <AccessibilityPanel />
    </div>
  )
}