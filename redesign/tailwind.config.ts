import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        hero: "clamp(3rem, 8vw, 5.5rem)",
      },
      transitionTimingFunction: {
        // Cal's easing curves
        "cal-slide": "cubic-bezier(0.83, 0, 0.17, 1)",
        "cal-fade": "cubic-bezier(0.22, 1, 0.36, 1)",
        "cal-smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
            filter: "blur(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            filter: "blur(10px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
          },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "reveal-blur": {
          "0%": {
            filter: "blur(12px)",
            opacity: "0",
            transform: "scale(1.05)",
          },
          "100%": {
            filter: "blur(0)",
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "text-reveal": {
          "0%": {
            opacity: "0",
            transform: "translateY(100%)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.83, 0, 0.17, 1) forwards",
        "reveal-blur": "reveal-blur 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "text-reveal": "text-reveal 0.6s cubic-bezier(0.83, 0, 0.17, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
