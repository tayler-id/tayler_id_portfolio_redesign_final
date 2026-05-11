'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Send, ArrowRight, CheckCircle, AlertCircle, Linkedin, Github } from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { MagneticButton } from './animate-ui/magnetic-button'
import { Button } from './ui/button'
import { useMotionPreference } from '@/hooks/use-reduced-motion'

export function ContactSection() {
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          'bot-field': '',
          'name': formData.name,
          'email': formData.email,
          'subject': formData.subject,
          'message': formData.message,
        }).toString()
      })

      if (!response.ok) {
        const text = await response.text().catch(() => '')
        console.error('Netlify Forms responded', response.status, response.statusText, text)
      }

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'ramsay.tayler@gmail.com',
      href: 'mailto:ramsay.tayler@gmail.com',
      description: 'Drop me a line anytime'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/tayler-ramsay/',
      description: 'Professional network'
    }
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/8 to-primary/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4"
              whileHover={noAnimation ? {} : { scale: 1.05 }}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Contact
            </motion.div>
            <h2 id="contact-heading" className="text-4xl lg:text-6xl font-bold font-display mb-4">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold font-display mb-4">Get in Touch</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Interested in working together? I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const isExternal = method.href.startsWith('http')
                  return (
                    <a
                      key={method.title}
                      href={method.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={`${method.title}: ${method.value}`}
                      className="block"
                    >
                      <motion.div
                        initial={noAnimation ? {} : { opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={noAnimation ? {} : { delay: index * 0.1, duration: 0.6 }}
                        whileHover={noAnimation ? {} : { x: 8, transition: { duration: 0.2 } }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                          <method.icon className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{method.title}</h4>
                          <p className="text-primary font-medium">{method.value}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                      </motion.div>
                    </a>
                  )
                })}
              </div>

              {/* Availability Status */}
              <motion.div
                initial={noAnimation ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={noAnimation ? {} : { delay: 0.4, duration: 0.6 }}
                className="p-4 rounded-xl bg-primary/10 border border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" aria-hidden="true" />
                  <span className="font-medium text-primary">
                    Available for new projects
                  </span>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                aria-label="Contact form"
              >
                {/* Hidden Netlify form field */}
                <input type="hidden" name="form-name" value="contact" />
                {/* Honeypot field for spam protection */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Don't fill this out: <input name="bot-field" tabIndex={-1} />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                      autoComplete="name"
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                      autoComplete="email"
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    rows={5}
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-vertical"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={noAnimation ? {} : { rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          aria-hidden="true"
                        />
                        <span aria-live="polite">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </div>

                {/* Status Messages - Accessible live region */}
                <div aria-live="polite" aria-atomic="true">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={noAnimation ? {} : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary"
                      role="status"
                    >
                      <CheckCircle className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={noAnimation ? {} : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-700 dark:text-red-400"
                      role="alert"
                    >
                      <AlertCircle className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium">Failed to send message. Please try again or email me directly.</span>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
