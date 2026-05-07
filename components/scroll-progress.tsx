'use client'

import React from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

export function ScrollProgress() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = React.useState(0)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: noAnimation ? 300 : 100,
    damping: noAnimation ? 50 : 30,
    restDelta: 0.001
  })

  // Track progress value for ARIA
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.round(latest * 100))
  })

  return (
    <>
      {/* Top Progress Bar - below header (z-40) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r bg-primary z-40 origin-left"
        style={{ scaleX }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Page scroll progress: ${progress}%`}
      />
    </>
  )
}
