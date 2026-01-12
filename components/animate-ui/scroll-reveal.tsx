'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef(null)
  const motionPref = useMotionPreference()
  const isInView = useInView(ref, {
    once,
    amount: threshold
  })

  // Always visible and in final position when motion is reduced or off
  const finalState = { opacity: 1, x: 0, y: 0 }

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance }
      case 'down':
        return { opacity: 0, y: -distance }
      case 'left':
        return { opacity: 0, x: distance }
      case 'right':
        return { opacity: 0, x: -distance }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  // Track if element has been in view (persistent across preference changes)
  const [hasBeenInView, setHasBeenInView] = React.useState(false)

  React.useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true)
    }
  }, [isInView, hasBeenInView])

  const shouldShow = isInView || hasBeenInView
  const motionOff = motionPref === 'off'
  const noAnimation = motionPref !== 'regular'

  // Use a single component to avoid remount issues when switching preferences
  // When motion is off or reduced, start and stay at finalState
  // When regular motion, animate based on viewport
  const currentInitial = noAnimation || shouldShow ? finalState : getInitialState()
  const currentAnimate = noAnimation || shouldShow ? finalState : getInitialState()
  const currentTransition = noAnimation ? { duration: 0 } : {
    duration: shouldShow && !noAnimation ? duration : 0,
    delay: shouldShow && !noAnimation ? delay : 0,
    ease: "easeOut"
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={currentInitial}
      animate={currentAnimate}
      transition={currentTransition}
      style={motionOff ? { transform: 'none' } : undefined}
    >
      {children}
    </motion.div>
  )
}
