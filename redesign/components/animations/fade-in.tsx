"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing curves - typed for Framer Motion
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];
const calSlide: [number, number, number, number] = [0.83, 0, 0.17, 1];

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  scale?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 30,
  blur = true,
  scale = false,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: blur ? "blur(10px)" : "blur(0px)",
      scale: scale ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration,
        delay,
        ease: calFade,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal with clip mask effect
interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.7,
          delay,
          ease: calSlide,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
