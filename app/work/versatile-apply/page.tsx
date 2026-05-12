import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedBackground } from '@/components/animated-background'
import { ScrollProgress } from '@/components/scroll-progress'
import { AccessibilityPanel } from '@/components/accessibility-panel'
import { VersatileApplyCaseStudy } from '@/components/case-studies/versatile-apply-case-study'
import { PasswordGate } from '@/components/password-gate'

export const metadata: Metadata = {
  title: 'Versatile Apply · Case Study | Tayler.id',
  description:
    'Private case study. Request access to read.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Versatile Apply · Case Study | Tayler.id',
    description: 'Private case study. Request access to read.',
    url: 'https://tayler.id/work/versatile-apply',
    type: 'article',
  },
}

const CASESTUDY_PASSWORD =
  process.env.NEXT_PUBLIC_CASESTUDY_PASSWORD || 'portfolio2026'

export default function VersatileApplyPage() {
  return (
    <PasswordGate
      storageKey="versatile-apply"
      caseStudyName="Versatile Apply"
      formspreeEndpoint="https://formspree.io/f/xbdwqbaw"
      password={CASESTUDY_PASSWORD}
    >
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
    </PasswordGate>
  )
}
