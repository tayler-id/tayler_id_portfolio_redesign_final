'use client'

import React, { CSSProperties } from 'react'
import { THEMES, type ProjectKey, type ProjectTheme } from './tokens'

interface ThemeProviderProps {
  project: ProjectKey
  children: React.ReactNode
  className?: string
}

/**
 * Scoped theme wrapper. Emits CSS custom properties on a single element so
 * primitives can consume them via `bg-[var(--card-bg)]` etc. Does NOT use
 * React context — pure CSS scoping is cheaper and SSR-safe.
 */
export function ThemeProvider({ project, children, className }: ThemeProviderProps) {
  const theme = THEMES[project]
  const style = themeToCssVars(theme)

  return (
    <div
      className={className}
      style={style}
      data-demo-theme={project}
    >
      {children}
    </div>
  )
}

function themeToCssVars(theme: ProjectTheme): CSSProperties {
  // Type-cast: CSS custom properties aren't in CSSProperties type, but valid at runtime.
  return {
    '--pad': theme.pad,
    '--card-bg': theme.cardBg,
    '--card-bg-raised': theme.cardBgRaised,
    '--border': theme.border,
    '--border-strong': theme.borderStrong,

    '--text-primary': theme.textPrimary,
    '--text-secondary': theme.textSecondary,
    '--text-tertiary': theme.textTertiary,
    '--text-inverse': theme.textInverse,

    '--cta': theme.cta,
    '--cta-hover': theme.ctaHover,
    '--cta-text': theme.ctaText,
    '--accent': theme.accent,

    '--positive': theme.positive,
    '--positive-bg': theme.positiveBg,
    '--negative': theme.negative,
    '--negative-bg': theme.negativeBg,
    '--warning': theme.warning,
    '--warning-bg': theme.warningBg,
    '--neutral': theme.neutral,
    '--neutral-bg': theme.neutralBg,

    '--radius-sm': theme.radiusSm,
    '--radius-md': theme.radiusMd,
    '--radius-lg': theme.radiusLg,
    '--radius-xl': theme.radiusXl,
    '--radius-full': theme.radiusFull,

    '--shadow-xs': theme.shadowXs,
    '--shadow-sm': theme.shadowSm,
    '--shadow-md': theme.shadowMd,
    '--shadow-lg': theme.shadowLg,

    '--font-family': theme.fontFamily,
    '--font-mono': theme.fontMono,

    fontFamily: theme.fontFamily,
    color: theme.textPrimary,
  } as CSSProperties
}
