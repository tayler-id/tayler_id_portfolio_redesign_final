'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({ 
  children, 
  className, 
  strength = 0.3,
  onClick,
  disabled = false,
  type = 'button'
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return
    
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    
    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength
    
    setPosition({ x, y })
  }

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200",
        "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
        "hover:shadow-lg hover:shadow-blue-500/25",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      whileHover={!disabled ? {
        scale: 1.02,
      } : {}}
      whileTap={!disabled ? {
        scale: 0.98,
      } : {}}
    >
      {children}
    </motion.button>
  )
}