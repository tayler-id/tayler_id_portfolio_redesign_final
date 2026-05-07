"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ScrollStackCardProps {
  children: ReactNode;
  index: number;
  total: number;
  className?: string;
}

// Cards fan out from stacked position as you scroll
export function ScrollStackCard({
  children,
  index,
  total,
  className,
}: ScrollStackCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate the spread - cards start stacked and fan out
  const baseOffset = (index - total / 2) * 60; // Final position offset
  const initialStack = -baseOffset * 0.8; // Starting stacked position

  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [initialStack, 0, 0, baseOffset * 0.3]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [(index - total / 2) * -8, 0, 0, (index - total / 2) * 3]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.85 + index * 0.02, 1, 1, 0.95]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.8]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, rotate, scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStackContainerProps {
  children: ReactNode;
  className?: string;
}

// Container that keeps cards centered while they fan
export function ScrollStackContainer({
  children,
  className,
}: ScrollStackContainerProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}

interface StickyStackItemProps {
  children: ReactNode;
  index: number;
  className?: string;
}

// Sticky stacking effect for experience items
export function StickyStackItem({
  children,
  index,
  className,
}: StickyStackItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = index * 20; // Stack offset

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`sticky ${className}`}
      style={{ top: `${80 + offset}px`, zIndex: 10 + index }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
