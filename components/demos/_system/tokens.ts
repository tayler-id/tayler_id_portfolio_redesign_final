/**
 * Demo design tokens — per-project theme sets.
 *
 * Each ProjectTheme defines the visual language for one case-study demo.
 * Tokens are emitted as CSS custom properties by <ThemeProvider />, so
 * primitives read them via Tailwind arbitrary values like `bg-[var(--card-bg)]`.
 *
 * Adding a new project: add a key to ProjectKey, fill in tokens below.
 */

export type ProjectKey = 'apply' | 'transact' | 'onboardiq'

export interface ProjectTheme {
  // Surfaces
  pad: string // outer demo pad
  cardBg: string
  cardBgRaised: string
  border: string
  borderStrong: string

  // Text
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textInverse: string

  // Accents
  cta: string
  ctaHover: string
  ctaText: string
  accent: string

  // Status
  positive: string
  positiveBg: string
  negative: string
  negativeBg: string
  warning: string
  warningBg: string
  neutral: string
  neutralBg: string

  // Geometry
  radiusSm: string
  radiusMd: string
  radiusLg: string
  radiusXl: string
  radiusFull: string

  // Shadows
  shadowXs: string
  shadowSm: string
  shadowMd: string
  shadowLg: string

  // Type
  fontFamily: string
  fontMono: string
}

// ─── Apply — lavender pad, Poppins, blue CTA, the consumer financing surface ──
export const APPLY: ProjectTheme = {
  pad: '#eaecf5',
  cardBg: '#ffffff',
  cardBgRaised: '#ffffff',
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',

  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textTertiary: '#94a3b8',
  textInverse: '#ffffff',

  cta: '#116ff2',
  ctaHover: '#0e63d6',
  ctaText: '#ffffff',
  accent: '#116ff2',

  positive: '#15803d',
  positiveBg: '#f0fdf4',
  negative: '#b91c1c',
  negativeBg: '#fef2f2',
  warning: '#b45309',
  warningBg: '#fffbeb',
  neutral: '#475569',
  neutralBg: '#f1f5f9',

  radiusSm: '0.5rem', // 8
  radiusMd: '0.75rem', // 12
  radiusLg: '1rem', // 16
  radiusXl: '1.5rem', // 24
  radiusFull: '9999px',

  shadowXs: '0 1px 2px rgba(16, 24, 40, 0.04)',
  shadowSm: '0 1px 2px rgba(16, 24, 40, 0.04), 0 2px 4px rgba(16, 24, 40, 0.03)',
  shadowMd: '0 4px 8px -2px rgba(16, 24, 40, 0.06), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
  shadowLg: '0 12px 24px -8px rgba(16, 24, 40, 0.10), 0 4px 8px -4px rgba(16, 24, 40, 0.06)',

  fontFamily:
    "var(--font-demo-poppins), 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "var(--font-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
}

// ─── Transact + Insight — operator console, denser, neutral ──
export const TRANSACT: ProjectTheme = {
  ...APPLY,
  pad: '#f8fafc',
  border: '#e5e7eb',
  cta: '#0f172a',
  ctaHover: '#1e293b',
  accent: '#0ea5e9',
}

// ─── OnboardIQ — internal tool, calm, slightly cooler ──
export const ONBOARDIQ: ProjectTheme = {
  ...APPLY,
  pad: '#f1f5f9',
  cta: '#0f172a',
  ctaHover: '#1e293b',
  accent: '#7c3aed',
}

export const THEMES: Record<ProjectKey, ProjectTheme> = {
  apply: APPLY,
  transact: TRANSACT,
  onboardiq: ONBOARDIQ,
}
