'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface GradientBlobProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  colors?: string[]
  animated?: boolean
  blur?: boolean
}

export function GradientBlob({
  className,
  size = 'md',
  colors = ['from-primary/10', 'via-primary/5', 'to-transparent'],
  animated = true,
  blur = true,
}: GradientBlobProps) {
  const motionPref = useMotionPreference()

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[32rem] h-[32rem]',
  }

  const baseClassName = cn(
    "absolute rounded-full opacity-70",
    sizeClasses[size],
    blur && "blur-3xl",
    `bg-gradient-to-r ${colors.join(' ')}`,
    className
  )

  // Motion off or reduced: render static div
  if (motionPref !== 'regular' || !animated) {
    return <div className={baseClassName} />
  }

  // Regular motion: animate
  return (
    <motion.div
      className={baseClassName}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
        borderRadius: ["50%", "40%", "50%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  )
}
