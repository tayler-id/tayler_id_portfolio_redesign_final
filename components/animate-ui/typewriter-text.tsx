'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [textArrayIndex, setTextArrayIndex] = useState(0)

  const textArray = Array.isArray(text) ? text : [text]
  const currentText = textArray[textArrayIndex]

  useEffect(() => {
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
  }, [currentIndex, isDeleting, currentText, textArray, textArrayIndex, speed, delay, loop, onComplete])

  return (
    <motion.span
      className={cn("relative", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
        />
      )}
    </motion.span>
  )
}