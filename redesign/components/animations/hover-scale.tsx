"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

// Cal's smooth easing - typed for Framer Motion
const calSmooth: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HoverScale({
  children,
  className,
  scale = 1.02,
  duration = 0.4,
}: HoverScaleProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{
        scale,
        transition: { duration, ease: calSmooth }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: calSmooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
