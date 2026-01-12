'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  tilt?: boolean
}

export function FloatingCard({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 6,
  tilt = false,
}: FloatingCardProps) {
  const motionPref = useMotionPreference()
  const motionOff = motionPref === 'off'
  const noAnimation = motionPref !== 'regular'

  const baseClassName = cn(
    "relative rounded-2xl backdrop-blur-md bg-card/80 border border-border shadow-xl",
    tilt && !noAnimation && "transform-gpu",
    className
  )

  // Use single motion.div to avoid remount issues when switching preferences
  return (
    <motion.div
      className={baseClassName}
      initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={noAnimation ? { duration: 0 } : {
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      whileHover={noAnimation ? {} : (
        tilt
          ? {
              rotateX: 5,
              rotateY: 5,
              scale: 1.02,
              transition: { duration: 0.3 },
            }
          : {
              scale: 1.02,
              transition: { duration: 0.3 },
            }
      )}
      style={tilt && !noAnimation ? { transformStyle: 'preserve-3d' } : {}}
    >
      {children}
    </motion.div>
  )
}
