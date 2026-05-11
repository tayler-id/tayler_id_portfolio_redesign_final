'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface DeviceFrameProps {
  children: React.ReactNode
  className?: string
}

/**
 * iPad Pro 11" bezel.
 *  - landscape (default): 1194:834 ≈ 1.43:1
 *  - portrait: 834:1194 ≈ 0.70:1 — taller frame for vertical form flows
 */
export function IPadFrame({
  children,
  className,
  orientation = 'landscape',
}: DeviceFrameProps & { orientation?: 'landscape' | 'portrait' }) {
  const ratio = orientation === 'portrait' ? '834 / 1194' : '1194 / 834'
  return (
    <div className={cn('relative w-full', className)}>
      <div
        className="relative w-full overflow-hidden rounded-[28px] bg-[#0b0d12] p-[10px]"
        style={{
          aspectRatio: ratio,
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.06) inset, 0 24px 64px -16px rgba(20,18,30,0.35), 0 8px 24px -8px rgba(20,18,30,0.18)',
        }}
      >
        <div className="absolute inset-[10px] rounded-[20px] overflow-hidden ring-1 ring-black/30">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * iPhone 14-Pro-ish portrait bezel — 393:852 (19.5:9 with a 4px chin/forehead).
 * The screen has a dynamic-island slot. Inner content scrolls.
 */
export function PhoneFrame({ children, className }: DeviceFrameProps) {
  return (
    <div className={cn('relative mx-auto', className)} style={{ width: 'min(100%, 360px)' }}>
      <div
        className="relative w-full overflow-hidden rounded-[44px] bg-[#0b0d12] p-[8px]"
        style={{
          aspectRatio: '393 / 852',
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.06) inset, 0 32px 64px -20px rgba(20,18,30,0.4), 0 8px 20px -6px rgba(20,18,30,0.18)',
        }}
      >
        <div className="absolute inset-[8px] rounded-[36px] overflow-hidden ring-1 ring-black/30">
          {/* Dynamic island */}
          <div
            className="absolute left-1/2 top-2 z-30 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black"
            aria-hidden
          />
          {children}
        </div>
      </div>
    </div>
  )
}
