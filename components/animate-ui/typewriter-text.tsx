'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface TypewriterTextProps {
  text: string | string[]
  className?: string
  speed?: number
  delay?: number
  loop?: boolean
  cursor?: boolean
  onComplete?: () => void
}

export function TypewriterText({
  text,
  className,
  speed = 100,
  delay = 0,
  loop = false,
  cursor = true,
  onComplete,
}: TypewriterTextProps) {
  const motionPref = useMotionPreference()
  const textArray = Array.isArray(text) ? text : [text]
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [textArrayIndex, setTextArrayIndex] = useState(0)
  const [initialized, setInitialized] = useState(false)

  const currentText = textArray[textArrayIndex]
  const noAnimation = motionPref !== 'regular'

  // Handle reduced/off motion - show full text immediately
  useEffect(() => {
    if (noAnimation && !initialized) {
      setDisplayText(currentText)
      setCurrentIndex(currentText.length)
      setInitialized(true)
      onComplete?.()
    }
  }, [noAnimation, currentText, initialized, onComplete])

  useEffect(() => {
    // Skip animation if not regular motion
    if (noAnimation) {
      setDisplayText(currentText)
      return
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (currentIndex > 0) {
          setDisplayText(currentText.substring(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        } else {
          setIsDeleting(false)
          if (textArray.length > 1) {
            setTextArrayIndex((textArrayIndex + 1) % textArray.length)
          }
        }
      } else {
        if (currentIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          if (loop && textArray.length > 1) {
            setTimeout(() => setIsDeleting(true), 1000)
          } else {
            onComplete?.()
          }
        }
      }
    }, delay + (isDeleting ? speed / 2 : speed))

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, currentText, textArray, textArrayIndex, speed, delay, loop, onComplete, noAnimation])

  // Motion off: render plain span
  if (motionPref === 'off') {
    return (
      <span className={cn("relative", className)}>
        {displayText}
      </span>
    )
  }

  // Motion reduced: show text without cursor animation
  if (motionPref === 'reduced') {
    return (
      <span className={cn("relative", className)}>
        {displayText}
        {cursor && <span className="inline-block w-0.5 h-[1em] bg-current ml-1" aria-hidden="true" />}
      </span>
    )
  }

  // Regular motion: full typewriter effect
  return (
    <motion.span
      className={cn("relative", className)}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
      {cursor && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          aria-hidden="true"
        />
      )}
    </motion.span>
  )
}
