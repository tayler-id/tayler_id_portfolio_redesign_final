'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, User, Code, Briefcase, Mail } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'

  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: 'About', icon: User },
    { href: '#skills', label: 'Skills', icon: Code },
    { href: '#projects', label: 'Projects', icon: Briefcase },
    { href: '#contact', label: 'Contact', icon: Mail },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: noAnimation ? 'auto' : 'smooth' })
  }

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-2" : "py-4"
        )}
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        role="banner"
      >
        <motion.div
          className="absolute inset-0 bg-background/80 border-b border-border/50"
          style={{ opacity: headerOpacity }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#hero')
              }}
              className="flex items-center gap-3 group"
              whileHover={noAnimation ? {} : { scale: 1.05 }}
              whileTap={noAnimation ? {} : { scale: 0.95 }}
              aria-label="Tayler.id - Go to top"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/images/logo.png"
                  alt=""
                  className="w-8 h-8 object-contain mix-blend-multiply"
                  aria-hidden="true"
                />
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                tayler.id
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors relative group"
                  initial={noAnimation ? {} : { opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={noAnimation ? {} : { delay: index * 0.1 }}
                  whileHover={noAnimation ? {} : { y: -2 }}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium">{item.label}</span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={noAnimation ? {} : { scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative overflow-hidden"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <motion.div
                  className="relative grid place-items-center"
                  animate={noAnimation ? {} : { rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <Sun className="col-start-1 row-start-1 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
                  <Moon className="col-start-1 row-start-1 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
                </motion.div>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden relative"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={noAnimation ? {} : { rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <X className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
                  ) : (
                    <Menu className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>

      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-menu"
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -100,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        transition={noAnimation ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-16 left-0 right-0 z-40 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
          <div className="container mx-auto px-6 py-6">
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-3 rounded-lg hover:bg-accent/50"
                  initial={noAnimation ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                  transition={noAnimation ? { duration: 0 } : { delay: index * 0.1, duration: 0.3 }}
                  whileTap={noAnimation ? {} : { scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium text-lg">{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={noAnimation ? { duration: 0 } : { duration: 0.3 }}
        className={cn(
          "fixed inset-0 bg-black/20 z-30 md:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  )
}
