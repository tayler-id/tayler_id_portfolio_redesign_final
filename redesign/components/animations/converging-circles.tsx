"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ConvergingCirclesProps {
  className?: string;
}

// Three circles that converge to center on scroll
export function ConvergingCircles({ className }: ConvergingCirclesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Circle positions - start spread out, converge to center
  const circle1X = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const circle1Y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const circle1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 1]);
  const circle1Opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1]);

  const circle2X = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const circle2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 1]);
  const circle2Opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 1]);

  const circle3X = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const circle3Y = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const circle3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.9, 1]);
  const circle3Opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.7, 1]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl"
        style={{
          x: circle1X,
          y: circle1Y,
          scale: circle1Scale,
          opacity: circle1Opacity,
        }}
      />
      <motion.div
        className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl"
        style={{
          x: circle2X,
          y: circle2Y,
          scale: circle2Scale,
          opacity: circle2Opacity,
        }}
      />
      <motion.div
        className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 blur-3xl"
        style={{
          x: circle3X,
          y: circle3Y,
          scale: circle3Scale,
          opacity: circle3Opacity,
        }}
      />
    </div>
  );
}

// Animated gradient orbs that float
export function FloatingOrbs({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, -30, 0, 30, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl"
        animate={{
          x: [0, -40, 0, 40, 0],
          y: [0, 40, 0, -40, 0],
          scale: [1, 0.9, 1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: "50%", right: "10%" }}
      />
      <motion.div
        className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl"
        animate={{
          x: [0, 30, 0, -30, 0],
          y: [0, -50, 0, 50, 0],
          scale: [1, 1.05, 1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ bottom: "10%", left: "30%" }}
      />
    </div>
  );
}
