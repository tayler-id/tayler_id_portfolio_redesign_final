"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { BlurImage } from "./animations/blur-image";
import { AnimatedHeading } from "./animations/text-animate";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Project } from "@/lib/projects";

// Cal's easing
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];
const calSlide: [number, number, number, number] = [0.83, 0, 0.17, 1];

interface CaseStudyPageProps {
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
}

// Parallax hero image
function ParallaxHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative h-[70vh] lg:h-[85vh] overflow-hidden"
    >
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          project.gradient
        )}
        style={prefersReducedMotion ? {} : { y, scale }}
      >
        {project.image && (
          <BlurImage
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Hero Content Overlay */}
      <motion.div
        className="absolute inset-0 flex items-end"
        style={prefersReducedMotion ? {} : { opacity }}
      >
        <div className="container mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: calFade }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white max-w-4xl">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Status Badge */}
      {project.status === "live" && (
        <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white font-medium z-10">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Live Project
        </div>
      )}
    </div>
  );
}

// Section with scroll animation
function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: calFade }}
    >
      {children}
    </motion.section>
  );
}

export function CaseStudyPage({
  project,
  prevProject,
  nextProject,
}: CaseStudyPageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <article>
      {/* Back Button - Fixed */}
      <motion.div
        className="fixed top-24 left-6 lg:left-12 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: calFade }}
      >
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-background transition-colors border border-border/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </motion.div>

      {/* Parallax Hero */}
      <ParallaxHero project={project} />

      {/* Content */}
      <div className="bg-background relative z-10">
        {/* Overview Section */}
        <Section className="py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">
              {/* Main Content */}
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">
                  Overview
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Demo Link */}
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Project
                  </motion.a>
                )}
              </div>

              {/* Sidebar - Project Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-muted text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Category
                  </h3>
                  <p>{project.category.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Metrics Section */}
        {project.metrics && project.metrics.length > 0 && (
          <Section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-center">
                Impact & Results
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    className="text-center p-8 rounded-2xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: calFade,
                    }}
                  >
                    <div className="font-display font-bold text-5xl mb-2">
                      {metric.value}
                    </div>
                    <div className="text-muted-foreground">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Process Section */}
        {project.story && project.story.length > 0 && (
          <Section className="py-20 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
                  The Process
                </h2>
                <div className="space-y-12">
                  {project.story.map((phase, i) => (
                    <motion.div
                      key={phase.phase}
                      className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: calFade,
                      }}
                    >
                      <div>
                        <span className="text-sm text-muted-foreground">
                          0{i + 1}
                        </span>
                        <h3 className="font-display font-semibold text-xl">
                          {phase.phase}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {phase.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Navigation */}
        <Section className="py-20 lg:py-32 border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Previous */}
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group p-8 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Previous Project</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl group-hover:text-muted-foreground transition-colors">
                    {prevProject.title}
                  </h3>
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}
              {nextProject ? (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group p-8 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-muted-foreground mb-4">
                    <span className="text-sm">Next Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-display font-semibold text-xl group-hover:text-muted-foreground transition-colors">
                    {nextProject.title}
                  </h3>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </Section>
      </div>
    </article>
  );
}
