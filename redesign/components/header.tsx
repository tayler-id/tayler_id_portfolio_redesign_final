"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Cal's easing - typed for Framer Motion
const calFade: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "https://linkedin.com/in/taylerramsay", label: "LinkedIn", external: true },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      )}
      initial={prefersReducedMotion ? {} : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: calFade }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: calFade }}
        >
          <Link
            href="/"
            className="relative block w-10 h-10 hover:opacity-70 transition-opacity duration-300"
          >
            <Image
              src="/assets/images/logo.png"
              alt="Tayler Ramsay"
              fill
              className="object-contain dark:invert"
              priority
            />
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: calFade }}
            >
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Actions */}
        <motion.div
          className="flex items-center gap-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: calFade }}
        >
          <motion.a
            href="/resume.pdf"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-full transition-all duration-300"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          >
            <FileText className="w-4 h-4" />
            Resume
          </motion.a>

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-300"
              aria-label="Toggle theme"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 15 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
}
