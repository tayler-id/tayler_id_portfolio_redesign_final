'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
  const getFloatAnimation = () => {
    switch (direction) {
      case 'up':
        return {
          y: [0, -distance, 0],
        }
      case 'down':
        return {
          y: [0, distance, 0],
        }
      case 'left':
        return {
          x: [0, -distance, 0],
        }
      case 'right':
        return {
          x: [0, distance, 0],
        }
      default:
        return {
          y: [0, -distance, 0],
        }
    }
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl backdrop-blur-md bg-card/80 border border-border shadow-xl",
        tilt && "transform-gpu",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      whileHover={
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
      }
      style={tilt ? { transformStyle: 'preserve-3d' } : {}}
    >
      {children}
    </motion.div>
  )
}