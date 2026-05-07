"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, FileText } from "lucide-react";
import { ScrollReveal } from "./animations/scroll-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing - typed for Framer Motion
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];
const calSmooth: [number, number, number, number] = [0.16, 1, 0.3, 1];

const socialLinks = [
  {
    href: "mailto:tayler@example.com",
    icon: Mail,
    label: "Email Me",
    primary: true,
  },
  {
    href: "https://linkedin.com/in/taylerramsay",
    icon: Linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: "/resume.pdf",
    icon: FileText,
    label: "Resume",
    external: true,
  },
];

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <ScrollReveal className="text-center mb-16" blur>
          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl mb-4"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: calFade }}
          >
            Like what you see? Let's work together.
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: calFade }}
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </motion.p>

          {/* Contact Links */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center gap-2 px-5 py-2.5 font-medium rounded-full transition-all duration-300 ${
                  link.primary
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border border-border hover:bg-muted"
                }`}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: calFade },
                  },
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2, ease: calSmooth },
                      }
                }
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </ScrollReveal>

        {/* Divider */}
        <motion.div
          className="border-t border-border pt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: calFade }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              © {new Date().getFullYear()} Tayler Ramsay
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Built with Next.js & Framer Motion
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
