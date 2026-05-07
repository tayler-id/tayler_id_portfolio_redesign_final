"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];
const calSmooth: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface LatelyImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LatelySectionProps {
  images: LatelyImage[];
  title?: string;
}

// Individual image that animates in from a random direction
function AnimatedImage({
  image,
  index,
  total,
}: {
  image: LatelyImage;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Each image comes from a different direction
  const directions = [
    { x: -150, y: 50, rotate: -15 },   // From left
    { x: 150, y: -30, rotate: 12 },    // From right
    { x: -80, y: 100, rotate: -8 },    // From bottom-left
    { x: 100, y: 80, rotate: 10 },     // From bottom-right
    { x: 0, y: -100, rotate: -5 },     // From top
    { x: -120, y: -50, rotate: 8 },    // From top-left
  ];

  const dir = directions[index % directions.length];

  const x = useTransform(scrollYProgress, [0, 0.6, 1], [dir.x, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6, 1], [dir.y, 0, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.6, 1], [dir.rotate, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.8, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  // Stagger delay based on index
  const delay = index * 0.1;

  if (prefersReducedMotion) {
    return (
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted shadow-lg">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
        {image.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-sm">{image.caption}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, rotate, scale, opacity }}
      className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted shadow-lg"
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.3, ease: calSmooth },
      }}
    >
      <Image src={image.src} alt={image.alt} fill className="object-cover" />
      {image.caption && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <p className="text-white text-sm">{image.caption}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function LatelySection({ images, title = "Lately I've been" }: LatelySectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16">
      <motion.h3
        className="font-display font-semibold text-2xl mb-8"
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: calFade }}
      >
        {title}
      </motion.h3>

      {/* Images in a scattered grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image, i) => (
          <AnimatedImage
            key={image.src}
            image={image}
            index={i}
            total={images.length}
          />
        ))}
      </div>
    </section>
  );
}

// Alternative: Scattered/polaroid style layout
export function ScatteredPhotos({ images }: { images: LatelyImage[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Each photo has unique position and animation
  const photoStyles = [
    { left: "5%", top: "10%", rotate: -8, scale: 1 },
    { left: "35%", top: "5%", rotate: 5, scale: 0.9 },
    { left: "65%", top: "15%", rotate: -3, scale: 1.05 },
    { left: "15%", top: "45%", rotate: 7, scale: 0.95 },
    { left: "50%", top: "50%", rotate: -5, scale: 1 },
    { left: "75%", top: "40%", rotate: 10, scale: 0.9 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-[600px] md:h-[700px]"
    >
      {images.slice(0, 6).map((image, i) => {
        const style = photoStyles[i % photoStyles.length];

        if (prefersReducedMotion) {
          return (
            <div
              key={image.src}
              className="absolute w-40 md:w-52 aspect-[4/5] rounded-lg overflow-hidden shadow-xl bg-white p-2"
              style={{
                left: style.left,
                top: style.top,
                transform: `rotate(${style.rotate}deg) scale(${style.scale})`,
              }}
            >
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            </div>
          );
        }

        return (
          <motion.div
            key={image.src}
            className="absolute w-40 md:w-52 aspect-[4/5] rounded-lg overflow-hidden shadow-xl bg-white p-2 dark:bg-muted"
            style={{ left: style.left, top: style.top }}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: style.rotate * 3,
              x: i % 2 === 0 ? -200 : 200,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              scale: style.scale,
              rotate: style.rotate,
              x: 0,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: calFade,
            }}
            whileHover={{
              scale: style.scale * 1.1,
              rotate: 0,
              zIndex: 20,
              transition: { duration: 0.3 },
            }}
          >
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
            {image.caption && (
              <p className="mt-2 text-xs text-center text-muted-foreground truncate">
                {image.caption}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
