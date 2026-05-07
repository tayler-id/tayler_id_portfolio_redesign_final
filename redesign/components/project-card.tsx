"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlurImage } from "./animations/blur-image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing curves - typed for Framer Motion
const calSmooth: [number, number, number, number] = [0.16, 1, 0.3, 1];
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link href={`/work/${project.slug}`} className="block h-full group">
      <motion.article
        className="h-full rounded-2xl overflow-hidden bg-muted/50 border border-border/50 transition-colors"
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                scale: 1.02,
                y: -5,
                transition: { duration: 0.4, ease: calSmooth },
              }
        }
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        {/* Project Image */}
        <div
          className={cn(
            "relative aspect-[16/10] bg-gradient-to-br overflow-hidden",
            project.gradient
          )}
        >
          {project.image && (
            <motion.div
              className="absolute inset-0"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.05,
                      transition: { duration: 0.6, ease: calFade },
                    }
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
          {/* Status Badge */}
          {project.status === "live" && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium z-10">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Live
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.category.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title + Arrow */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display font-semibold text-lg group-hover:text-foreground/80 transition-colors line-clamp-2">
              {project.title}
            </h3>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
