"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

// Cal's easing - typed for Framer Motion
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface BlurImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function BlurImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return fill ? (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        priority={priority}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <motion.div
      initial={{ filter: "blur(12px)", opacity: 0, scale: 1.05 }}
      animate={
        isLoaded
          ? { filter: "blur(0px)", opacity: 1, scale: 1 }
          : { filter: "blur(12px)", opacity: 0, scale: 1.05 }
      }
      transition={{ duration: 0.8, ease: calFade }}
      className={cn("relative", fill && "w-full h-full")}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      )}
    </motion.div>
  );
}
