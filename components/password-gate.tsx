'use client'

import React from 'react'
import { Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Client-side access gate with instant auto-approve.
 *
 * Primary path: visitor fills name + email → form POSTs to Formspree →
 * Tayler gets an instant notification (route to SMS via Zapier/IFTTT/Make
 * using Formspree as the trigger) → visitor is immediately granted access.
 *
 * Secondary path: if they already have the password (for repeat or known
 * recipients), they can skip the form.
 *
 * Not real security — the password ends up in the JS bundle. The point is
 * lead capture, instant notification, and search-engine privacy.
 */

interface PasswordGateProps {
  children: React.ReactNode
  /** Unique key per gated resource, used for sessionStorage flag. */
  storageKey: string
  /** Display name shown on the gate (e.g., "Versatile Apply"). */
  caseStudyName: string
  /** Formspree endpoint URL. Trigger SMS via Zapier/IFTTT off this. */
  formspreeEndpoint: string
  /** Plaintext password (optional alternate entry). */
  password: string
}

type RequestStatus = 'idle' | 'sending' | 'error'

export function PasswordGate({
  children,
  storageKey,
  caseStudyName,
  formspreeEndpoint,
  password,
}: PasswordGateProps) {
  const [authed, setAuthed] = React.useState<boolean | null>(null)

  // Request form state (primary path)
  const [reqName, setReqName] = React.useState('')
  const [reqEmail, setReqEmail] = React.useState('')
  const [reqContext, setReqContext] = React.useState('')
  const [reqStatus, setReqStatus] = React.useState<RequestStatus>('idle')

  // Password input state (secondary path)
  const [pwInput, setPwInput] = React.useState('')
  const [pwError, setPwError] = React.useState(false)
  const pwInputRef = React.useRef<HTMLInputElement>(null)
  const [showPwField, setShowPwField] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(`casestudy-auth:${storageKey}`)
      setAuthed(stored === 'ok')
    } catch {
      setAuthed(false)
    }
  }, [storageKey])

  const grantAccess = () => {
    try {
      window.sessionStorage.setItem(`casestudy-auth:${storageKey}`, 'ok')
    } catch {
      /* allow access for the session anyway */
    }
    setAuthed(true)
  }

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setReqStatus('sending')
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: reqName,
          email: reqEmail,
          subject: `Case study access: ${caseStudyName} (auto-granted)`,
          message: `${reqName} (${reqEmail}) just opened the ${caseStudyName} case study.\n\nContext:\n${reqContext || '(none provided)'}`,
          _replyto: reqEmail,
          _subject: `Case study access: ${caseStudyName}`,
        }),
      })
      if (response.ok) {
        grantAccess()
      } else {
        throw new Error(`Formspree responded ${response.status}`)
      }
    } catch (err) {
      console.error('Access request failed:', err)
      setReqStatus('error')
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pwInput.trim().toLowerCase() === password.toLowerCase()) {
      grantAccess()
      setPwError(false)
    } else {
      setPwError(true)
      setPwInput('')
      pwInputRef.current?.focus()
    }
  }

  if (authed === null) {
    return <div className="min-h-screen" aria-busy="true" />
  }

  if (authed) {
    return <>{children}</>
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-24 bg-background">
      <div className="w-full max-w-lg">
        {/* Eyebrow */}
        <div className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-6">
          Private case study · 30-second access
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight leading-[1.05] mb-5">
          {caseStudyName}.
        </h1>

        {/* Body */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
          Proprietary product work from Synchrony / Versatile Credit. Tell me who
          you are and you&apos;ll go straight in.
        </p>

        {/* Request form — primary path, instant access */}
        <form onSubmit={handleRequestSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="req-name"
                className="block text-xs text-muted-foreground mb-1.5"
              >
                Your name *
              </label>
              <input
                id="req-name"
                type="text"
                required
                autoFocus
                value={reqName}
                onChange={(e) => setReqName(e.target.value)}
                className="w-full h-11 px-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:border-primary"
                placeholder="Jane Recruiter"
              />
            </div>
            <div>
              <label
                htmlFor="req-email"
                className="block text-xs text-muted-foreground mb-1.5"
              >
                Email *
              </label>
              <input
                id="req-email"
                type="email"
                required
                value={reqEmail}
                onChange={(e) => setReqEmail(e.target.value)}
                className="w-full h-11 px-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:border-primary"
                placeholder="jane@company.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="req-context"
              className="block text-xs text-muted-foreground mb-1.5"
            >
              Quick context (optional)
            </label>
            <textarea
              id="req-context"
              rows={2}
              value={reqContext}
              onChange={(e) => setReqContext(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:border-primary resize-none"
              placeholder="Director of Design at Acme — looking at fintech UX leaders"
            />
          </div>
          <button
            type="submit"
            disabled={reqStatus === 'sending' || !reqName.trim() || !reqEmail.trim()}
            className="w-full h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            <span>
              {reqStatus === 'sending' ? 'Granting access…' : 'Open the case study'}
            </span>
            {reqStatus !== 'sending' && (
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
          {reqStatus === 'error' && (
            <p
              role="alert"
              className="flex items-start gap-2 text-sm text-destructive"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              Couldn&apos;t send the request. Email{' '}
              <span className="font-mono">ramsay.tayler@gmail.com</span> directly.
            </p>
          )}
        </form>

        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          You go in immediately. I get a text the moment you do.
        </p>

        {/* Password path — secondary, hidden by default */}
        <div className="mt-10 pt-6 border-t border-border/60">
          {!showPwField ? (
            <button
              type="button"
              onClick={() => setShowPwField(true)}
              className="text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Have a password? →
            </button>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <label
                htmlFor="case-study-password"
                className="block text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground mb-3"
              >
                Enter password
              </label>
              <div className="flex gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    ref={pwInputRef}
                    id="case-study-password"
                    type="password"
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                    value={pwInput}
                    onChange={(e) => {
                      setPwInput(e.target.value)
                      if (pwError) setPwError(false)
                    }}
                    aria-invalid={pwError}
                    className={cn(
                      'w-full h-11 pl-10 pr-3 rounded-md bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors',
                      pwError
                        ? 'border-destructive focus:ring-destructive'
                        : 'border-border focus:border-primary'
                    )}
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!pwInput.trim()}
                  className="h-11 px-4 rounded-md bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enter
                </button>
              </div>
              {pwError && (
                <p role="alert" className="mt-2 text-sm text-destructive">
                  That password doesn&apos;t match.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-6 border-t border-border/60">
          <a
            href="/"
            className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to tayler.id
          </a>
        </div>
      </div>
    </main>
  )
}
