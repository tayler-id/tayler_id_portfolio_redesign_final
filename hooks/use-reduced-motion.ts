'use client'

import { useState, useEffect } from 'react'

export type MotionPreference = 'regular' | 'reduced' | 'off'

/**
 * Hook to detect user's motion preference
 * Returns: 'regular' | 'reduced' | 'off'
 * Checks manual toggle classes AND system preference
 */
export function useMotionPreference(): MotionPreference {
  const [motionPref, setMotionPref] = useState<MotionPreference>('regular')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Check manual toggle (class on html element)
    const checkMotionPref = () => {
      const html = document.documentElement

      // Manual toggles take priority
      if (html.classList.contains('motion-off')) {
        setMotionPref('off')
      } else if (html.classList.contains('reduce-motion')) {
        setMotionPref('reduced')
      } else if (mediaQuery.matches) {
        // Fall back to system preference
        setMotionPref('reduced')
      } else {
        setMotionPref('regular')
      }
    }

    // Initial check
    checkMotionPref()

    // Listen for system preference changes
    const handleMediaChange = () => checkMotionPref()
    mediaQuery.addEventListener('change', handleMediaChange)

    // Listen for class changes on html element (for manual toggle)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkMotionPref()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      observer.disconnect()
    }
  }, [])

  return motionPref
}

/**
 * Hook to detect if user prefers reduced motion (backward compatible)
 * Returns true if motion is 'reduced' or 'off'
 */
export function useReducedMotion(): boolean {
  const motionPref = useMotionPreference()
  return motionPref !== 'regular'
}

/**
 * Hook to detect if motion is completely off
 * Returns true only if motion is 'off'
 */
export function useMotionOff(): boolean {
  const motionPref = useMotionPreference()
  return motionPref === 'off'
}

/**
 * Returns animation props that respect motion preferences
 * Use this with framer-motion components
 */
export function useMotionSafe() {
  const motionPref = useMotionPreference()
  const prefersReducedMotion = motionPref !== 'regular'
  const motionOff = motionPref === 'off'

  return {
    motionPref,
    prefersReducedMotion,
    motionOff,
    // Helper to conditionally apply animations
    animate: prefersReducedMotion ? {} : undefined,
    transition: prefersReducedMotion ? { duration: 0 } : undefined,
    // For scroll-triggered animations
    whileInView: prefersReducedMotion ? {} : undefined,
  }
}
