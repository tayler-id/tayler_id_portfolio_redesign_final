import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedBackground } from '@/components/animated-background'
import { ScrollProgress } from '@/components/scroll-progress'
import { AccessibilityPanel } from '@/components/accessibility-panel'
import { VersatileApplyCaseStudy } from '@/components/case-studies/versatile-apply-case-study'

export const metadata: Metadata = {
  title: 'Versatile Apply · Case Study | Tayler.id',
  description:
    'The fastest path to a "yes." 6M annual applications, 35+ lenders, themed for every merchant. Lead designer on the consumer-financing surface of a $16B+ fintech platform acquired by Synchrony (NYSE: SYF) in 2025.',
  openGraph: {
    title: 'Versatile Apply · Case Study | Tayler.id',
    description:
      'Consumer-financing platform across 4 channels and 35+ lenders. +157% near-prime approvals at Ashley Furniture.',
    url: 'https://tayler.id/work/versatile-apply',
    type: 'article',
  },
}

export default function VersatileApplyPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="relative z-10" role="main">
        <VersatileApplyCaseStudy />
      </main>
      <Footer />
      <AccessibilityPanel />
    </div>
  )
}
