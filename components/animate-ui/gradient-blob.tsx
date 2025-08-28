'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
  colors = ['from-blue-400', 'via-purple-500', 'to-pink-500'],
  animated = true,
  blur = true,
}: GradientBlobProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[32rem] h-[32rem]',
  }

  return (
    <motion.div
      className={cn(
        "absolute rounded-full opacity-70",
        sizeClasses[size],
        blur && "blur-3xl",
        `bg-gradient-to-r ${colors.join(' ')}`,
        className
      )}
      animate={
        animated
          ? {
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              borderRadius: ["50%", "40%", "50%"],
            }
          : {}
      }
      transition={
        animated
          ? {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }
          : {}
      }
    />
  )
}