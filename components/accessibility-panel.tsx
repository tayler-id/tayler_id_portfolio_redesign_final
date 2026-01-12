'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accessibility,
  X,
  Eye,
  Zap,
  Type,
  Focus,
  Moon,
  Sun,
  RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

type MotionPreference = 'regular' | 'reduced' | 'off'

interface A11ySettings {
  motionPreference: MotionPreference
  highContrast: boolean
  largeText: boolean
  enhancedFocus: boolean
}

const defaultSettings: A11ySettings = {
  motionPreference: 'regular',
  highContrast: false,
  largeText: false,
  enhancedFocus: false,
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Load settings from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('a11y-settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings(parsed)
        applySettings(parsed)
      } catch (e) {
        console.error('Failed to parse a11y settings', e)
      }
    }
  }, [])

  // Apply settings to document
  const applySettings = (newSettings: A11ySettings) => {
    const html = document.documentElement

    // Motion preference - clear all motion classes first
    html.classList.remove('reduce-motion', 'motion-off')
    if (newSettings.motionPreference === 'reduced') {
      html.classList.add('reduce-motion')
    } else if (newSettings.motionPreference === 'off') {
      html.classList.add('motion-off')
    }

    // High contrast
    if (newSettings.highContrast) {
      html.classList.add('high-contrast')
    } else {
      html.classList.remove('high-contrast')
    }

    // Large text
    if (newSettings.largeText) {
      html.classList.add('large-text')
    } else {
      html.classList.remove('large-text')
    }

    // Enhanced focus
    if (newSettings.enhancedFocus) {
      html.classList.add('enhanced-focus')
    } else {
      html.classList.remove('enhanced-focus')
    }
  }

  // Update a single setting
  const updateSetting = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem('a11y-settings', JSON.stringify(newSettings))
    applySettings(newSettings)
  }

  // Reset all settings
  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('a11y-settings')
    applySettings(defaultSettings)
  }

  if (!mounted) return null

  const toggles = [
    {
      key: 'highContrast' as const,
      label: 'High Contrast',
      description: 'Increase text and border contrast',
      icon: Eye,
    },
    {
      key: 'largeText' as const,
      label: 'Large Text',
      description: 'Increase base font size',
      icon: Type,
    },
    {
      key: 'enhancedFocus' as const,
      label: 'Enhanced Focus',
      description: 'More visible focus indicators',
      icon: Focus,
    },
  ]

  const motionOptions: { value: MotionPreference; label: string }[] = [
    { value: 'regular', label: 'Regular' },
    { value: 'reduced', label: 'Reduced' },
    { value: 'off', label: 'Off' },
  ]

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "flex items-center justify-center",
          "hover:scale-110 transition-transform",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        aria-label="Open accessibility settings"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* Panel overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                "fixed left-0 top-0 bottom-0 z-50 w-full max-w-sm",
                "bg-background border-r border-border shadow-2xl",
                "flex flex-col"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Accessibility settings"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Accessibility</h2>
                    <p className="text-sm text-muted-foreground">Customize your experience</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
                  aria-label="Close accessibility settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Theme toggle */}
                <div className="p-4 rounded-xl bg-accent/50 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? (
                        <Moon className="w-5 h-5 text-primary" />
                      ) : (
                        <Sun className="w-5 h-5 text-primary" />
                      )}
                      <div>
                        <div className="font-medium">Color Theme</div>
                        <div className="text-sm text-muted-foreground">
                          {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className={cn(
                        "relative w-12 h-7 rounded-full transition-colors flex items-center px-1",
                        theme === 'dark' ? 'bg-primary justify-end' : 'bg-muted justify-start'
                      )}
                      role="switch"
                      aria-checked={theme === 'dark'}
                      aria-label="Toggle dark mode"
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                </div>

                {/* Motion preference */}
                <div className="p-4 rounded-xl bg-accent/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Motion</div>
                      <div className="text-sm text-muted-foreground">
                        Control animation intensity
                      </div>
                    </div>
                  </div>
                  <div className="flex rounded-lg bg-muted p-1" role="radiogroup" aria-label="Motion preference">
                    {motionOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateSetting('motionPreference', option.value)}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                          settings.motionPreference === option.value
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        role="radio"
                        aria-checked={settings.motionPreference === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accessibility toggles */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Display Options
                  </h3>

                  {toggles.map((toggle) => (
                    <div
                      key={toggle.key}
                      className="p-4 rounded-xl bg-accent/50 border border-border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <toggle.icon className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">{toggle.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {toggle.description}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => updateSetting(toggle.key, !settings[toggle.key])}
                          className={cn(
                            "relative w-12 h-7 rounded-full transition-colors flex items-center px-1",
                            settings[toggle.key] ? 'bg-primary justify-end' : 'bg-muted justify-start'
                          )}
                          role="switch"
                          aria-checked={settings[toggle.key]}
                          aria-label={`Toggle ${toggle.label}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reset button */}
                <button
                  onClick={resetSettings}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 p-3 rounded-xl",
                    "border border-border hover:bg-accent transition-colors",
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to defaults
                </button>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Settings are saved automatically and persist across visits.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
