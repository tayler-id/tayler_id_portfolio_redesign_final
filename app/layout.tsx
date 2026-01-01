import './globals.css'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { PasswordProtection } from '@/components/password-protection'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tayler.id - Senior Full-Stack UX Engineer',
  description: 'With 20+ years bridging design and development. Building production systems for a $16B+ FinTech platform. Expertise in React, Kotlin/Spring, AI/ML integration.',
  keywords: ['Full-Stack Engineer', 'UX Engineer', 'React', 'Kotlin', 'TypeScript', 'AI/ML', 'LangGraph', 'Design Systems'],
  authors: [{ name: 'Tayler Ramsay' }],
  creator: 'Tayler Ramsay',
  openGraph: {
    title: 'Tayler.id - Senior Full-Stack UX Engineer',
    description: '20+ years bridging design and development. Building $16B+ FinTech systems with React, Kotlin, and AI/ML.',
    url: 'https://tayler.id',
    siteName: 'Tayler.id',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {process.env.NEXT_PUBLIC_PASSWORD_PROTECT === 'false' ? (
            children
          ) : (
            <PasswordProtection>
              {children}
            </PasswordProtection>
          )}
        </ThemeProvider>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            function launchOnboardIQDemo() {
              // Check if demo server is running
              fetch('http://localhost:3000/api/health')
                .then(() => {
                  // Server is running, open demo
                  window.open('/src/work/onboard-iq.html', '_blank')
                })
                .catch(() => {
                  // Server not running, show instructions
                  alert('Please start the demo server: node backend/server.js')
                })
            }
            
            // Make it globally available
            if (typeof window !== 'undefined') {
              window.launchOnboardIQDemo = launchOnboardIQDemo
            }
          `
        }} />
      </body>
    </html>
  )
}