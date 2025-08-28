'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Send, ArrowRight, CheckCircle, AlertCircle, Linkedin, Github } from 'lucide-react'
import { ScrollReveal } from './animate-ui/scroll-reveal'
import { MagneticButton } from './animate-ui/magnetic-button'
import { Button } from './ui/button'

export function ContactSection() {
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
          'name': formData.name,
          'email': formData.email,
          'subject': formData.subject,
          'message': formData.message,
        }).toString()
      })
      
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
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-4 h-4" />
              Contact
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold font-display mb-4">
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
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{method.title}</h4>
                      <p className="text-primary font-medium">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium text-green-700 dark:text-green-400">
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
              >
                {/* Hidden Netlify form field */}
                <input type="hidden" name="form-name" value="contact" />
                {/* Honeypot field for spam protection */}
                <p style={{ display: 'none' }}>
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name *
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject *
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-vertical"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-700 dark:text-green-400"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-700 dark:text-red-400"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}