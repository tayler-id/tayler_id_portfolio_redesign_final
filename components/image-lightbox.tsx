'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export interface LightboxItem {
  src: string
  label: string
  caption?: string
}

interface ImageLightboxProps {
  items: LightboxItem[]
  index: number
  open: boolean
  onIndexChange: (i: number) => void
  onOpenChange: (open: boolean) => void
}

export function ImageLightbox({
  items,
  index,
  open,
  onIndexChange,
  onOpenChange,
}: ImageLightboxProps) {
  const total = items.length
  const safeIndex = Math.max(0, Math.min(index, total - 1))
  const item = items[safeIndex]

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange])
  const prev = React.useCallback(() => {
    onIndexChange((safeIndex - 1 + total) % total)
  }, [onIndexChange, safeIndex, total])
  const next = React.useCallback(() => {
    onIndexChange((safeIndex + 1) % total)
  }, [onIndexChange, safeIndex, total])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, prev, next])

  if (!item) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view: ${item.label}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm"
          onClick={close}
        >
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 gap-4">
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full flex-1 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  close()
                }}
                aria-label="Close"
                className="absolute top-2 right-2 z-10 rounded-full p-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-foreground/10 border border-border/60 shadow-md transition-colors"
              >
                <X className="size-5" />
              </button>
            </motion.div>
            <div
              className="max-w-3xl text-center space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-mono uppercase tracking-[0.18em] text-xs text-foreground">
                {item.label}
                {total > 1 && (
                  <span className="ml-3 text-muted-foreground">
                    {safeIndex + 1} / {total}
                  </span>
                )}
              </div>
              {item.caption && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
