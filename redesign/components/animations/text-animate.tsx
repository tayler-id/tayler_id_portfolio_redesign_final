"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing
const calSlide: [number, number, number, number] = [0.83, 0, 0.17, 1];
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
}

// Split text and animate each word with stagger
export function AnimatedHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: delay,
            },
          },
        }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: {
                  y: "100%",
                  opacity: 0,
                  rotateX: 90,
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.6,
                    ease: calSlide,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

interface AnimatedCharactersProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

// Character by character animation
export function AnimatedCharacters({
  children,
  className,
  as: Tag = "span",
}: AnimatedCharactersProps) {
  const prefersReducedMotion = useReducedMotion();
  const chars = children.split("");

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.02,
            },
          },
        }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.4,
                  ease: calFade,
                },
              },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

// Parallax scroll effect for text
export function ParallaxText({
  children,
  className,
  speed = 0.5,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
}

// Scale up as element comes into view
export function ScaleOnScroll({ children, className }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
