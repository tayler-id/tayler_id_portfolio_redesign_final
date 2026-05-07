"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { TextReveal } from "./animations/fade-in";
import { BlurImage } from "./animations/blur-image";
import { ExperienceBadge } from "./experience-badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing curves - typed for Framer Motion
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];
const calSlide: [number, number, number, number] = [0.83, 0, 0.17, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: calFade,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: calFade,
    },
  },
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section className="min-h-screen flex items-center pt-16 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium">Available for work</span>
              </div>
              <div className="space-y-4">
                <h1 className="font-display font-bold text-hero leading-[1.1] tracking-tight">
                  Hey, I'm Tayler
                </h1>
                <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
                  Senior Full-Stack UX Engineer
                </p>
              </div>
              <p className="text-lg text-muted-foreground max-w-md">
                Building experiences that bridge design and engineering. I turn
                complex problems into intuitive interfaces.
              </p>
              <a href="#work" className="inline-flex items-center gap-2 text-sm font-medium">
                View My Work
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-8">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-muted relative">
                <BlurImage
                  src="/assets/images/tayler-headshot.jpg"
                  alt="Tayler Ramsay"
                  fill
                  priority
                />
              </div>
              <div className="space-y-3 text-sm">
                <ExperienceBadge label="Currently" company="Synchrony" />
                <ExperienceBadge label="Recently" company="Rayni AI" />
                <ExperienceBadge label="Previously" company="Versatile Credit" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center pt-16 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Available Badge */}
            <motion.div variants={badgeVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium">Available for work</span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display font-bold text-hero leading-[1.1] tracking-tight"
                  initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: calSlide }}
                >
                  Hey, I'm Tayler
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  className="text-2xl md:text-3xl text-muted-foreground font-medium"
                  initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.35, ease: calSlide }}
                >
                  Senior Full-Stack UX Engineer
                </motion.p>
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              className="text-lg text-muted-foreground max-w-md"
              variants={itemVariants}
            >
              Building experiences that bridge design and engineering. I turn
              complex problems into intuitive interfaces.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="#work"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                View My Work
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4" />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Photo + Experience */}
          <motion.div
            className="flex flex-col items-center lg:items-end gap-8"
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.3, ease: calFade }}
          >
            {/* Professional Photo */}
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-muted"
              initial={{ scale: 1.05, filter: "blur(15px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: calFade }}
            >
              <BlurImage
                src="/assets/images/tayler-headshot.jpg"
                alt="Tayler Ramsay"
                fill
                priority
              />
            </motion.div>

            {/* Experience Badges */}
            <motion.div
              className="space-y-3 text-sm"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.7,
                  },
                },
              }}
            >
              {[
                { label: "Currently", company: "Synchrony" },
                { label: "Recently", company: "Rayni AI" },
                { label: "Previously", company: "Versatile Credit" },
              ].map((exp, i) => (
                <motion.div
                  key={exp.label}
                  variants={{
                    hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: calFade },
                    },
                  }}
                >
                  <ExperienceBadge label={exp.label} company={exp.company} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
