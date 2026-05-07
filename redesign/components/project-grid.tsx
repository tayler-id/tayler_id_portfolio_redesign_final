"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlurImage } from "./animations/blur-image";
import { AnimatedHeading } from "./animations/text-animate";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { projects } from "@/lib/projects";

// Cal's easing curves
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];
const calSmooth: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Large project card - Cal style
function LargeProjectCard({
  project,
  index,
  reversed = false,
}: {
  project: (typeof projects)[0];
  index: number;
  reversed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? {} : { y, opacity, scale }}
      className="group"
    >
      <Link href={`/work/${project.slug}`}>
        <motion.article
          className={cn(
            "grid gap-8 lg:gap-16 items-center py-16 lg:py-24 border-b border-border/30",
            reversed ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"
          )}
          whileHover={prefersReducedMotion ? {} : { x: 10 }}
          transition={{ duration: 0.3, ease: calSmooth }}
        >
          {/* Image */}
          <div
            className={cn(
              "relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br",
              project.gradient,
              reversed && "lg:order-2"
            )}
          >
            {project.image && (
              <motion.div
                className="absolute inset-0"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { scale: 1.05, transition: { duration: 0.6, ease: calFade } }
                }
              >
                <BlurImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
            {project.status === "live" && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium z-10">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Live
              </div>
            )}
          </div>

          {/* Content */}
          <div className={cn("space-y-6", reversed && "lg:order-1")}>
            {/* Category */}
            <div className="flex flex-wrap gap-2">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="text-sm text-muted-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl group-hover:text-muted-foreground transition-colors duration-300">
                {project.title}
              </h3>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="mt-2"
              >
                <ArrowUpRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted/50 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export function ProjectGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" className="py-32 lg:py-40">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 lg:mb-32">
          <AnimatedHeading
            as="h2"
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6"
          >
            Selected Work
          </AnimatedHeading>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: calFade }}
          >
            Crafting digital experiences that bridge design and engineering
          </motion.p>
        </div>

        {/* Projects - Large alternating cards */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <LargeProjectCard
              key={project.id}
              project={project}
              index={i}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
