'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export function MagneticButton({
  children,
  className,
  strength = 0.06,
  onClick,
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const motionPref = useMotionPreference()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const baseClassName = cn(
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium",
    "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
    disabled && "opacity-50 cursor-not-allowed",
    className
  )

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled || motionPref !== 'regular') return

    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength

    setPosition({ x, y })
  }

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  // Motion off: render plain button
  if (motionPref === 'off') {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={baseClassName}
      >
        {children}
      </button>
    )
  }

  // Motion reduced: minimal hover effect, no magnetic
  if (motionPref === 'reduced') {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={baseClassName}
      >
        {children}
      </motion.button>
    )
  }

  // Regular motion: full magnetic effect
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(baseClassName, "hover:shadow-lg hover:shadow-blue-500/25")}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.1,
      }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  )
}
