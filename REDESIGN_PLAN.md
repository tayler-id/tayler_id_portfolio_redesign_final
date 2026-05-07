# Portfolio Redesign Plan - Cal-Inspired with Animations

> **Build Location:** `redesign/` subdirectory (original project untouched)
> **Goal:** Replicate Cal's design, animations, and feel. Keep case study CONTENT only.

---

## Design Inspiration: calbertfernandes.com

### Animations to Replicate (NOT simplify)

**Page Load:**
- Hero text fades in with staggered timing
- Profile photo fades in slightly delayed
- Elements reveal in sequence (text → photo → supporting content)
- Duration: 400-600ms per element
- Easing: `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`

**Scroll-Triggered:**
- Elements fade in + slide up (~20-30px translateY) as they enter viewport
- Intersection Observer triggers at ~20-30% visibility
- Project cards, section headings, images all use this pattern
- Stagger delay: 100-150ms between elements

**Hover Effects:**
- Project cards scale up 1.02-1.05x on hover
- Smooth 200-300ms transition
- Nav links have subtle opacity/underline changes

**Timing Specs:**
- Entrance animations: 400-500ms
- Hover transitions: 150-300ms
- Stagger delays: 100-150ms

---

## Tech Stack

```
redesign/
├── Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
├── Framer Motion (scroll-triggered reveals, stagger, hover)
├── Remotion (video content generation)
├── next-themes (dark/light mode)
└── lucide-react (icons)
```

---

## Project Structure

```
redesign/
├── app/
│   ├── layout.tsx              # Root layout + fonts
│   ├── page.tsx                # Home (hero + projects + CTA)
│   ├── about/page.tsx          # Bento-box About
│   ├── work/[slug]/page.tsx    # Case study pages
│   └── globals.css             # Design tokens + base styles
├── components/
│   ├── animations/
│   │   ├── scroll-reveal.tsx   # Intersection Observer wrapper
│   │   ├── stagger-children.tsx # Staggered reveal container
│   │   └── hover-scale.tsx     # Card hover effect
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── project-card.tsx
│   ├── project-grid.tsx
│   ├── bento-grid.tsx
│   ├── experience-badge.tsx
│   ├── footer.tsx
│   └── case-study-page.tsx
├── lib/
│   ├── projects.ts             # All 9 project data objects
│   ├── about.ts                # About page content
│   └── utils.ts
├── remotion/                   # Video generation
│   ├── Root.tsx
│   ├── compositions/
│   │   ├── IntroVideo.tsx      # Portfolio intro animation
│   │   └── CaseStudyDemo.tsx   # Project demo videos
│   └── remotion.config.ts
├── hooks/
│   └── use-reduced-motion.ts
├── public/
│   └── assets/ → symlink to ../public/assets
└── package.json
```

---

## Phase 1: Project Setup

### 1.1 Initialize `redesign/` directory
```bash
mkdir redesign && cd redesign
npx create-next-app@14 . --typescript --tailwind --app --src-dir=false
npm install framer-motion lucide-react next-themes clsx tailwind-merge
npm install remotion @remotion/cli @remotion/player @remotion/transitions
```

### 1.2 Symlink Assets
```bash
ln -s ../public/assets public/assets
```

### 1.3 Extract Content Data
Create `lib/projects.ts` with all 9 projects from original `components/projects-section.tsx`

---

## Phase 2: Animation System

### Core Animation Components

**1. ScrollReveal (Framer Motion + Intersection Observer)**
```tsx
// components/animations/scroll-reveal.tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
>
  {children}
</motion.div>
```

**2. StaggerChildren (staggered reveals)**
```tsx
// components/animations/stagger-children.tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}
```

**3. HoverScale (project cards)**
```tsx
// components/animations/hover-scale.tsx
<motion.div
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.25, ease: 'easeInOut' }}
>
  {children}
</motion.div>
```

### Animation Values
| Property | Value |
|----------|-------|
| Fade duration | 400-500ms |
| Slide distance | 20-30px |
| Hover scale | 1.02-1.05 |
| Hover duration | 200-300ms |
| Stagger delay | 100-150ms |
| Easing | `[0.4, 0, 0.2, 1]` (Material ease-out) |

---

## Phase 3: Design System

### Colors (Cal-style minimal)
```css
:root {
  --background: 0 0% 99%;       /* #FCFCFC off-white */
  --foreground: 0 0% 8%;        /* #141414 near-black */
  --muted: 0 0% 96%;            /* #F5F5F5 */
  --muted-foreground: 0 0% 45%; /* #737373 */
  --border: 0 0% 92%;           /* #EBEBEB subtle */
}
.dark {
  --background: 0 0% 6%;        /* #0F0F0F */
  --foreground: 0 0% 95%;       /* #F2F2F2 */
}
```

### Typography
- **Display:** Space Grotesk (bold, clean)
- **Body:** Inter (readable)
- **Mono:** JetBrains Mono (code)
- **Hero size:** `clamp(3rem, 8vw, 5.5rem)`
- **Apply:** `text-wrap: balance` on headings

---

## Phase 4: Components

### Header
```
[Tayler] -------- [About] [Work] [LinkedIn] -------- [Resume CTA] [Theme]
```
- Fixed position with subtle backdrop blur
- Clean text links (no icons)
- Resume as button CTA

### Hero Section
```
[Available for work badge]

Hey, I'm Tayler
Senior Full-Stack UX Engineer       [Professional Photo]

Building experiences that             CURRENTLY  Synchrony
bridge design and engineering         RECENTLY   Rayni AI
                                      PREVIOUSLY Versatile Credit
[View My Work ↓]
```
- Staggered fade-in on load (text → photo → badges)
- Experience badges in vertical stack (Cal-style)

### Project Cards
```
+------------------------------------------+
|                                          |
|          [Large Hero Image]              |  ← scale 1.03 on hover
|                                          |
+------------------------------------------+
| AI/ML · Full-Stack                       |
| Rayni AI Document Intelligence        →  |
| Building trust in AI-powered research    |
+------------------------------------------+
```
- Large image dominates
- Tags as pill badges
- Arrow icon appears on hover
- Entire card clickable

### About Page (Bento Grid)
```
+------------------+  +------------------+
|                  |  |                  |
|   [Headshot]     |  | Hi, I'm Tayler   |
|                  |  | Bio paragraph... |
+------------------+  +------------------+
+----------+  +----------+  +----------+
|Currently |  |  Tools   |  | Based in |
|Synchrony |  | Figma    |  | [City]   |
+----------+  | React    |  +----------+
              | Node.js  |
              +----------+
+------------------------------------------+
| UX Research · Prototyping · React · ...  |
+------------------------------------------+
+------------------+  +------------------+
| Lately I've been |  | Let's connect    |
| [Personal photos]|  | [Social links]   |
+------------------+  +------------------+
```

### Case Study Pages
- Full route: `/work/onboard-iq`, `/work/rayni-platform`, etc.
- Use content from original case study components
- Prev/Next navigation at bottom
- Scroll-reveal sections throughout

### Footer
```
Like what you see? Let's work together.
[Email] [LinkedIn] [Resume]
---
© 2025 Tayler Ramsay
```

---

## Phase 5: Remotion Video Content

### Setup
```bash
cd redesign
npx remotion add @remotion/transitions
```

### IntroVideo Composition
```tsx
// remotion/compositions/IntroVideo.tsx
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const IntroVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance (no bounce) per remotion-best-practices
  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const y = interpolate(titleProgress, [0, 1], [30, 0]);

  return (
    <div style={{ opacity, transform: `translateY(${y}px)` }}>
      <h1>Tayler Ramsay</h1>
      <p>Senior Full-Stack UX Engineer</p>
    </div>
  );
};
```

### CaseStudyDemo Composition
- Animated walkthrough of project screens
- Use `TransitionSeries` for scene transitions
- Spring timing: `{ damping: 200 }` for smooth motion

### Export for Portfolio
```bash
npx remotion render IntroVideo out/intro.mp4
npx remotion render CaseStudyDemo out/rayni-demo.mp4
```

---

## Phase 6: Content Migration

### From Original Site

**Projects (9 total):**
1. OnboardIQ Workflow Instance Platform
2. Rayni AI Document Intelligence
3. Doc Domain Agent
4. Blue Moon Senior Counseling
5. Ashley Furniture
6. Aspen Dental
7. Dell Technologies
8. Helzberg Diamonds
9. iFit Health

**Extract from:**
- `components/projects-section.tsx` → project data objects
- `components/about-section.tsx` → timeline, skills, bio
- `components/*-case-study.tsx` → case study content

**Assets (symlinked):**
- `/public/assets/images/`
- `/public/assets/doc-domain/`
- `/public/assets/Goldlink/`
- `/public/assets/iq/`
- `/public/assets/rayni_ai/`
- `/public/videos/`

---

## Implementation Order

1. **Setup** - Initialize redesign/, install deps, symlink assets
2. **Animation System** - ScrollReveal, StaggerChildren, HoverScale components
3. **Design Tokens** - globals.css, tailwind.config.js
4. **Data Layer** - lib/projects.ts, lib/about.ts
5. **Header + Footer** - Navigation, CTA footer
6. **Hero Section** - Animated intro with experience badges
7. **Project Grid** - Cards with hover effects + scroll reveals
8. **About Page** - Bento grid layout
9. **Case Study Pages** - Route-based `/work/[slug]`
10. **Remotion Videos** - Intro + case study demos
11. **Polish** - Accessibility, performance, testing

---

## Verification

### Development
```bash
cd redesign
npm run dev           # localhost:3000
npm run build         # Build check
```

### Testing with agent-browser
```bash
agent-browser open localhost:3000
agent-browser snapshot -i
agent-browser screenshot --full
agent-browser scroll down
agent-browser screenshot  # Capture scroll animations
```

### Final QA
- [ ] All scroll-reveal animations trigger correctly
- [ ] Project cards scale on hover (1.03x)
- [ ] Stagger timing feels natural (100-150ms)
- [ ] All 9 case studies render with content
- [ ] Dark/light theme works
- [ ] Reduced motion preference respected
- [ ] Lighthouse > 90
- [ ] Mobile responsive (375px, 768px, 1024px)

---

## Running Both Versions

```bash
# Original (untouched)
npm run dev

# Redesign
cd redesign && npm run dev -- -p 3001
```

Compare side-by-side at localhost:3000 vs localhost:3001
