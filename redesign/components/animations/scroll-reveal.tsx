"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  blur?: boolean;
  scale?: boolean;
}

const getDirectionOffset = (
  direction: "up" | "down" | "left" | "right",
  distance: number
) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return { y: distance };
  }
};

// Cal's easing curves - typed for Framer Motion
const calSlide: [number, number, number, number] = [0.83, 0, 0.17, 1];
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.8,
  blur = true,
  scale = false,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getDirectionOffset(direction, distance);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: blur ? "blur(10px)" : "blur(0px)",
      scale: scale ? 0.95 : 1,
      ...offset,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      x: 0,
      y: 0,
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
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
