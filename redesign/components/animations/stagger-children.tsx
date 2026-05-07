"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing curves - typed for Framer Motion
const calSlide: [number, number, number, number] = [0.83, 0, 0.17, 1];
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.15,
  delayChildren = 0,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      custom={{ staggerDelay, delayChildren }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  blur?: boolean;
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.7,
      ease: calFade,
    },
  },
};

const itemVariantsNoBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: calFade,
    },
  },
};

export function StaggerItem({ children, className, blur = true }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={blur ? itemVariants : itemVariantsNoBlur}
      className={className}
    >
      {children}
    </motion.div>
  );
}
