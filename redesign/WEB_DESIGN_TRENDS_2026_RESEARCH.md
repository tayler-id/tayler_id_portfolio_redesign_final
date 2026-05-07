# Web Design Trends 2026 -- Research Reference Guide

> Compiled: March 2026
> Purpose: Comprehensive technical reference for implementing modern web design trends

---

## Table of Contents

1. [Trend 1: Modular Design (CSS Grids)](#trend-1-modular-design-css-grids)
2. [Trend 2: Playful Design (Interactive)](#trend-2-playful-design-interactive)
3. [Trend 3: 3D Web Design](#trend-3-3d-web-design)
4. [Cross-Cutting Concerns](#cross-cutting-concerns)

---

# Trend 1: Modular Design (CSS Grids)

**Reference Site:** [ChainGPT Labs](https://labs.chaingpt.org/)

## 1.1 Overview

Modular design in 2025-2026 centers on CSS Grid as the primary layout engine, enhanced by Subgrid, Container Queries, and modern CSS features like `:has()`, CSS Nesting, and scroll-driven animations. The "bento grid" aesthetic -- asymmetric, card-based layouts with varying cell sizes -- has become the dominant visual pattern for dashboards, portfolios, and marketing sites.

The ChainGPT Labs reference site demonstrates this with a 6-column grid system using variable column widths:
```css
grid-template: ". . . . . Area" / 2.75rem 1fr 1fr 1fr 1fr 2.75rem;
```
This creates a layout with fixed gutters on the edges and flexible content columns in the center.

## 1.2 CSS/JS Techniques

### CSS Grid -- Core Properties

```css
/* Basic grid setup */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, minmax(100px, auto));
  gap: 20px;
}

/* Named grid areas for semantic layouts */
.layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

### Key Grid Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `repeat()` | Repeat track patterns | `repeat(3, 1fr)` |
| `minmax()` | Set min/max track size | `minmax(200px, 1fr)` |
| `auto-fit` | Collapse empty tracks, items expand | `repeat(auto-fit, minmax(250px, 1fr))` |
| `auto-fill` | Keep empty tracks, maintain sizing | `repeat(auto-fill, minmax(150px, 1fr))` |
| `fit-content()` | Fit content up to a limit | `fit-content(200px)` |
| `fr` | Fraction of available space | `1fr 2fr 1fr` |

### Responsive Grid Without Media Queries

```css
/* Auto-adapting column count */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

### Named Grid Lines

```css
.layout {
  display: grid;
  grid-template-columns:
    [sidebar-start] 200px
    [sidebar-end content-start] 1fr
    [content-end];
}
.sidebar { grid-column: sidebar-start / sidebar-end; }
.main    { grid-column: content-start / content-end; }
```

### Dense Auto-Placement (Bento Effect)

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px;
  grid-auto-flow: dense;  /* Fill gaps by reordering items */
  gap: 16px;
}
.bento-grid .large {
  grid-column: span 2;
  grid-row: span 2;
}
.bento-grid .wide {
  grid-column: span 2;
}
.bento-grid .tall {
  grid-row: span 2;
}
```

### CSS Subgrid

Subgrid allows nested grid items to inherit parent grid tracks, solving the long-standing alignment problem for card components.

```css
/* Parent grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Card that aligns internal elements to parent grid rows */
.card {
  display: grid;
  grid-row: span 3;  /* Card spans 3 parent rows */
  grid-template-rows: subgrid;  /* Internal rows align with parent */
  gap: 0;  /* Override parent gap if needed */
}
.card .title   { /* Aligns to parent row 1 */ }
.card .content { /* Aligns to parent row 2 */ }
.card .footer  { /* Aligns to parent row 3 */ }
```

**Subgrid with named lines:**
```css
.card {
  display: grid;
  grid-template-columns: subgrid [card-start] [card-mid] [card-end];
}
```

**Key subgrid behaviors:**
- Line numbering restarts inside the subgrid (1, 2, 3...)
- Gap values are inherited from parent but can be overridden
- Parent line names pass through to subgrid children
- No implicit tracks in subgridded dimensions -- extra items stack in last track

**Browser support:** Baseline since September 2023

### CSS Container Queries

Container queries enable component-level responsive design -- the component adapts to its container, not the viewport.

```css
/* Declare containment context */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Shorthand */
.card-container {
  container: card / inline-size;
}

/* Apply styles based on container width */
@container card (width > 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  .card h2 {
    font-size: max(1.5em, 1.23em + 2cqi);
  }
}

@container card (width <= 400px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

**Container query length units:**

| Unit | Description |
|------|-------------|
| `cqw` | 1% of container width |
| `cqh` | 1% of container height |
| `cqi` | 1% of container inline size |
| `cqb` | 1% of container block size |
| `cqmin` | Smaller of `cqi` or `cqb` |
| `cqmax` | Larger of `cqi` or `cqb` |

**container-type values:**
- `inline-size` -- Query based on inline dimension only (most common)
- `size` -- Query based on both inline and block dimensions
- `normal` -- Not a size query container (still a style query container)

### CSS :has() Selector (Parent Selector)

The `:has()` selector enables selecting elements based on their descendants -- previously impossible without JavaScript.

```css
/* Style parent based on child state */
.card:has(.featured-badge) {
  border: 2px solid gold;
}

/* Conditional grid layout */
.grid:has(> :nth-child(4)) {
  grid-template-columns: repeat(2, 1fr);
}
.grid:has(> :nth-child(7)) {
  grid-template-columns: repeat(3, 1fr);
}

/* Adjacent sibling awareness */
h1:has(+ h2) {
  margin-bottom: 0.25rem;
}

/* AND logic (chained) */
.page:has(video):has(audio) {
  /* Has both video AND audio */
}

/* OR logic (comma-separated) */
.page:has(video, audio) {
  /* Has video OR audio */
}
```

**Performance tip:** Constrain `:has()` with specific combinators (`>`, `+`) to limit subtree traversal:
```css
/* More efficient */
.ancestor:has(> .foo) { }
/* Less efficient */
.ancestor:has(.foo) { }
```

### CSS Nesting (Native)

```css
.card {
  padding: 1rem;
  border-radius: 8px;

  & .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &.featured {
    border: 2px solid gold;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
}
```

### Fluid Typography (From ChainGPT Labs Pattern)

```css
/* Clamp-based fluid type */
html {
  font-size: clamp(14px, 0.875rem + 0.25vw, 22px);
}

/* Range-based fluid type (as used on ChainGPT Labs) */
@media (min-width: 1440px) {
  html { font-size: calc(16px + 6 * ((100vw - 1440px) / 720)); }
}
@media (min-width: 320px) and (max-width: 1439px) {
  html { font-size: calc(14px + 2 * ((100vw - 320px) / 1000)); }
}
```

## 1.3 Key Libraries & Tools

| Library/Tool | Purpose | Notes |
|-------------|---------|-------|
| **None required** | CSS Grid is native | No polyfills needed for modern browsers |
| **PostCSS** | CSS processing | Autoprefixer for older browser support |
| **Open Props** | Design tokens as CSS custom properties | Pre-built responsive scales |
| **Utopia** | Fluid type/space calculator | Generates clamp() values |
| **Every Layout** | Layout primitives | Composable CSS layout patterns |
| **Tailwind CSS** | Utility framework | Has grid utilities built in |
| **CSS Grid Generator** | Visual tool | Generate grid code visually |

## 1.4 Implementation Patterns

### Bento Grid Layout

```css
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 16px;
  grid-template-areas:
    "hero hero  stats  stats"
    "hero hero  chart  news"
    "cta  about chart  news";
}

.bento-hero   { grid-area: hero; }
.bento-stats  { grid-area: stats; }
.bento-chart  { grid-area: chart; }
.bento-news   { grid-area: news; }
.bento-cta    { grid-area: cta; }
.bento-about  { grid-area: about; }

/* Responsive collapse */
@media (max-width: 768px) {
  .bento {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "hero"
      "stats"
      "chart"
      "news"
      "cta"
      "about";
  }
}
```

### 12-Column Flexible System

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}
.item-full    { grid-column: span 12; }
.item-half    { grid-column: span 6; }
.item-third   { grid-column: span 4; }
.item-quarter { grid-column: span 3; }
```

### Component-Level Responsive Card (Container Queries + Subgrid)

```css
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.card-wrapper {
  container: card / inline-size;
}

.card {
  display: grid;
  gap: 12px;
}

@container card (width > 500px) {
  .card {
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto auto;
  }
  .card-image {
    grid-row: span 2;
  }
}

@container card (width <= 500px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

## 1.5 Accessibility Considerations

- **Source order matters:** CSS Grid allows visual reordering (`order`, grid placement) but screen readers follow DOM order. Ensure logical source order.
- **`grid-auto-flow: dense`** can reorder items visually, breaking tab order. Test keyboard navigation when using dense packing.
- **Container queries** improve accessibility by ensuring components are always appropriately sized regardless of placement context -- no more broken layouts in narrow sidebars.
- **Subgrid alignment** ensures consistent visual hierarchy, which benefits users relying on visual patterns to parse content.
- **Avoid layout shifts:** Use explicit grid sizing (`minmax()`, fixed aspect ratios) to prevent Cumulative Layout Shift (CLS).
- **Focus indicators:** Ensure grid items have visible focus states for keyboard navigation, especially in bento layouts where visual hierarchy varies.

## 1.6 Performance Implications

- **CSS Grid is highly performant:** Layout calculations are handled natively by the browser's layout engine -- no JavaScript overhead.
- **Container queries** require the browser to establish containment contexts, but the performance cost is negligible in practice.
- **Subgrid** has minimal additional cost since it reuses parent track calculations.
- **`auto-fit`/`auto-fill` with `minmax()`** eliminates the need for JavaScript-based responsive logic entirely.
- **Avoid excessive nesting:** Deep subgrid nesting (3+ levels) can increase layout complexity. Keep hierarchies shallow.
- **`will-change: transform`** on animated grid items prevents layout recalculation during animation.
- **`content-visibility: auto`** on off-screen grid items skips rendering until they enter the viewport, dramatically improving initial load for large grids.

---

# Trend 2: Playful Design (Interactive)

**Reference Site:** [Patrick Heng](https://patrickheng.com/about)

## 2.1 Overview

Playful design in 2025-2026 emphasizes delight through interactive elements: custom cursors that respond to content, mouse-tracking effects, scroll-triggered animations, micro-interactions, and personality-driven UI. The Patrick Heng reference site uses Nuxt.js as its framework, with sophisticated interactive elements loaded dynamically.

The ChainGPT Labs site also demonstrates playful animation with GSAP-powered text scramble effects, animated bubble particles with CSS variables, and Lenis smooth scrolling -- demonstrating how modular and playful design overlap in practice.

## 2.2 CSS/JS Techniques

### GSAP (GreenSock Animation Platform) -- Core

GSAP is the industry-standard animation library, used on over 12 million sites.

**Basic Tweens:**
```javascript
// Animate TO destination values
gsap.to(".box", {
  x: 100,
  rotation: 360,
  duration: 1,
  ease: "power2.out"
});

// Animate FROM starting values
gsap.from(".box", {
  opacity: 0,
  y: -50,
  duration: 0.8
});

// Animate FROM...TO
gsap.fromTo(".box",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1 }
);

// Set values instantly (no animation)
gsap.set(".box", { x: 100, opacity: 0.5 });
```

**Special Properties:**

| Property | Purpose | Example |
|----------|---------|---------|
| `duration` | Length in seconds | `duration: 1` |
| `ease` | Rate of change | `ease: "elastic.out(1, 0.3)"` |
| `delay` | Seconds before start | `delay: 0.5` |
| `stagger` | Offset between multiple targets | `stagger: 0.1` |
| `repeat` | Iteration count (-1 = infinite) | `repeat: 3` |
| `yoyo` | Reverse on alternate repeats | `yoyo: true` |
| `onComplete` | Callback when done | `onComplete: () => {}` |
| `paused` | Start paused | `paused: true` |

**Function-based values (per-target customization):**
```javascript
gsap.to(".box", {
  y: (index, target, targets) => index * 50,
  rotation: "random(-180, 180)",
  duration: 1,
  stagger: 0.1
});
```

**Relative and random values:**
```javascript
gsap.to(".box", {
  x: "+=200",              // Add 200 to current x
  y: "random(-100, 100)",  // Random value per target
  rotation: "random([0, 90, 180, 270])"  // Random from array
});
```

### GSAP Timelines

```javascript
const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2.out" }
});

tl.from(".hero-title", { opacity: 0, y: 30 })
  .from(".hero-subtitle", { opacity: 0, y: 20 }, "-=0.3")  // Overlap by 0.3s
  .from(".hero-cta", { opacity: 0, scale: 0.8 }, "-=0.2")
  .from(".hero-image", { opacity: 0, x: 50 }, "<");         // Same start as previous
```

**Timeline position parameters:**
- `"+=0.5"` -- 0.5s after previous ends
- `"-=0.3"` -- 0.3s before previous ends (overlap)
- `"<"` -- Same start time as previous
- `"<0.2"` -- 0.2s after the start of the previous
- `2` -- Absolute time of 2 seconds

### GSAP ScrollTrigger

```javascript
gsap.registerPlugin(ScrollTrigger);

// Basic scroll-triggered animation
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",     // When top of .box hits 80% of viewport
    end: "bottom 20%",    // When bottom of .box hits 20% of viewport
    scrub: true,          // Link animation progress to scroll position
    markers: true,        // Debug markers (remove in production)
  },
  x: 300,
  rotation: 360
});

// Pinned section with scrub
gsap.to(".panel", {
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=2000",          // Pin for 2000px of scroll
    pin: true,
    scrub: 1,               // 1 second smoothing
    snap: {
      snapTo: 1 / 4,        // Snap to quarter points
      duration: { min: 0.2, max: 0.6 },
      ease: "power1.inOut"
    }
  },
  x: "100vw"
});

// Standalone ScrollTrigger (no animation)
ScrollTrigger.create({
  trigger: "#section",
  start: "top center",
  onEnter: () => console.log("entered"),
  onLeave: () => console.log("left"),
  onEnterBack: () => console.log("entered back"),
  onLeaveBack: () => console.log("left back")
});

// Batch processing (staggered reveals)
ScrollTrigger.batch(".card", {
  onEnter: (batch) => {
    gsap.from(batch, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6
    });
  }
});
```

**toggleActions format:** `"onEnter onLeave onEnterBack onLeaveBack"`
- Values: `play`, `pause`, `resume`, `reset`, `restart`, `complete`, `reverse`, `none`
```javascript
scrollTrigger: {
  toggleActions: "play none none reverse"
}
```

### GSAP SplitText

```javascript
gsap.registerPlugin(SplitText);

const split = new SplitText(".hero-text", {
  type: "chars, words, lines"
});

gsap.from(split.chars, {
  opacity: 0,
  y: 20,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.5,
  ease: "back.out(1.7)"
});

// Text scramble effect (as on ChainGPT Labs)
gsap.to(".scramble-text", {
  duration: 1,
  scrambleText: {
    text: "Final Text Here",
    chars: "!<>-_\\/[]{}=+*^?#",
    speed: 0.3
  }
});
```

### GSAP Easing -- Playful Eases

```javascript
// Bouncy / elastic effects
ease: "elastic.out(1, 0.3)"     // Springy overshoot
ease: "bounce.out"               // Ball bounce
ease: "back.out(1.7)"           // Overshoot and settle

// Organic / rough effects (from ChainGPT Labs)
ease: "rough({ template: circ.easeOut, strength: 4, points: 50, taper: 'out', randomize: true, clamp: true })"

// Smooth
ease: "power2.inOut"
ease: "expo.out"
ease: "circ.out"

// Custom ease
ease: "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"
```

### Motion (formerly Framer Motion)

Motion is the leading React animation library, offering 120fps GPU-accelerated animations.

```jsx
import { motion } from "motion/react"

// Basic animation
<motion.div animate={{ x: 100, opacity: 1 }} />

// Variants for coordinated animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  <motion.li variants={item}>Item 1</motion.li>
  <motion.li variants={item}>Item 2</motion.li>
</motion.ul>

// Gesture handling
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  drag
  dragConstraints={{ left: 0, right: 300 }}
/>

// Layout animations
<motion.div layout>
  {items.map(item => (
    <motion.div key={item.id} layout />
  ))}
</motion.div>

// Exit animations
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    />
  )}
</AnimatePresence>
```

**Vanilla JS usage:**
```javascript
import { animate } from "motion"
animate("#box", { x: 100, rotate: 180 }, { duration: 0.8 })
```

### Custom Cursor Effects

```javascript
// Basic custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: "power2.out"
  });
});

// Cursor state changes on hover
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 2, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, duration: 0.3 });
  });
});
```

```css
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent-color);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}
```

### Mouse Tracking / Parallax

```javascript
// Magnetic button effect
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  });
});

// Mouse-tracked parallax
document.addEventListener('mousemove', (e) => {
  const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
  const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

  gsap.to('.layer-1', { x: xPercent * 20, y: yPercent * 20, duration: 0.8 });
  gsap.to('.layer-2', { x: xPercent * 40, y: yPercent * 40, duration: 0.8 });
  gsap.to('.layer-3', { x: xPercent * 60, y: yPercent * 60, duration: 0.8 });
});
```

### CSS Scroll-Driven Animations (Native, No JS)

```css
/* Scroll progress bar -- pure CSS */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--accent);
  transform-origin: left;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* View-based fade-in (element enters viewport) */
.reveal {
  animation: fade-in auto linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Named scroll timeline */
.scroller {
  overflow-y: scroll;
  scroll-timeline-name: --my-scroller;
  scroll-timeline-axis: block;
}

.animated-child {
  animation: slide-in 1ms linear;
  animation-timeline: --my-scroller;
}
```

### Lenis Smooth Scrolling

Lenis is a lightweight (<4KB) smooth scroll library used by Rockstar Games, Microsoft, and Shopify.

```javascript
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 2
});

// Animation loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integration with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

**Lenis advantages over alternatives:**
- Preserves `position: sticky` (unlike transform-based solutions)
- Maintains native scrollbar behavior
- Works with Intersection Observer
- Supports both horizontal and vertical scrolling
- Any DOM element can be a scroller
- Touch-screen compatible

### Animated Bubble Particles (from ChainGPT Labs pattern)

```css
.bubble {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,113,32,0.3), transparent);
  animation: float var(--animation-duration) ease-in-out infinite;
  transform: translateY(var(--translateY)) scale(var(--scale));
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(var(--translateY)) scale(var(--scale)); }
}
```

```javascript
// Generate 50 bubble particles with individual CSS variables
for (let i = 0; i < 50; i++) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.style.setProperty('--translateY', `${Math.random() * -200}px`);
  bubble.style.setProperty('--scale', `${0.5 + Math.random() * 1.5}`);
  bubble.style.setProperty('--animation-duration', `${3 + Math.random() * 5}s`);
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.width = `${10 + Math.random() * 40}px`;
  bubble.style.height = bubble.style.width;
  container.appendChild(bubble);
}
```

## 2.3 Key Libraries & Tools

| Library | Purpose | Size | License |
|---------|---------|------|---------|
| **GSAP** | Animation engine | ~28KB core | Free (standard), paid (Business) |
| **GSAP ScrollTrigger** | Scroll-based animations | ~15KB | Free |
| **GSAP SplitText** | Text animation | ~8KB | Club GreenSock (paid) |
| **GSAP Flip** | Layout animations | ~10KB | Free |
| **GSAP Draggable** | Drag interactions | ~12KB | Free |
| **Motion** (Framer Motion) | React animation | ~30KB | MIT |
| **Lenis** | Smooth scrolling | <4KB | MIT |
| **use-gesture** | Mouse/touch gestures | ~10KB | MIT |
| **Locomotive Scroll** | Smooth scroll + parallax | ~15KB | MIT |
| **Splitting.js** | Text/element splitting (free GSAP SplitText alternative) | ~3KB | MIT |

### GSAP Plugin Ecosystem

| Plugin | Purpose |
|--------|---------|
| **ScrollTrigger** | Scroll-based animation triggers |
| **SplitText** | Character/word/line text animation |
| **Draggable** | Drag-and-drop interactions |
| **Flip** | Layout change animations |
| **MotionPath** | Animate along SVG/custom paths |
| **MorphSVG** | SVG shape morphing |
| **DrawSVG** | SVG path drawing animation |
| **ScrollSmoother** | GSAP-native smooth scrolling |
| **Observer** | Normalized input detection (scroll, touch, pointer) |

## 2.4 Implementation Patterns

### Scroll-Triggered Staggered Reveal

```javascript
// Cards fade in with stagger as they enter viewport
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch(".card", {
  onEnter: (batch) => {
    gsap.from(batch, {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    });
  },
  start: "top 85%"
});
```

### Text Reveal on Scroll

```javascript
gsap.registerPlugin(ScrollTrigger, SplitText);

document.querySelectorAll('.reveal-text').forEach(el => {
  const split = new SplitText(el, { type: "lines, words" });

  gsap.from(split.words, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    stagger: 0.03,
    duration: 0.6,
    ease: "power2.out"
  });
});
```

### Horizontal Scroll Section

```javascript
const sections = gsap.utils.toArray('.horizontal-panel');
const scrollContainer = document.querySelector('.horizontal-container');

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: scrollContainer,
    pin: true,
    scrub: 1,
    end: () => "+=" + scrollContainer.offsetWidth,
    snap: 1 / (sections.length - 1)
  }
});
```

### Interactive Tilt Card

```javascript
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;

    gsap.to(card, {
      rotateY: x,
      rotateX: y,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
  });
});
```

### Keyboard-Driven Navigation

```javascript
// Keyboard navigation for sections
let currentSection = 0;
const sections = document.querySelectorAll('.section');

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'j') {
    currentSection = Math.min(currentSection + 1, sections.length - 1);
    lenis.scrollTo(sections[currentSection]);
  }
  if (e.key === 'ArrowUp' || e.key === 'k') {
    currentSection = Math.max(currentSection - 1, 0);
    lenis.scrollTo(sections[currentSection]);
  }
});
```

## 2.5 Accessibility Considerations

### Reduced Motion Support

```javascript
// GSAP: Check user preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable all ScrollTrigger animations
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.globalTimeline.timeScale(100); // Instant transitions
}

// GSAP matchMedia for responsive + accessible animations
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  // Full animations here
  gsap.from(".hero", { y: 100, opacity: 0, duration: 1 });
});

gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
  // Reduced/no animations
  gsap.set(".hero", { opacity: 1 }); // Just show content
});
```

```css
/* CSS approach */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* More nuanced: replace motion with opacity */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    animation: fade-only 0.3s ease;
  }

  @keyframes fade-only {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
```

### WCAG 2.3.3 Compliance

- **Non-essential animations MUST be disableable** by users
- Provide a site-wide toggle to disable animations
- Use `prefers-reduced-motion` media query as the primary mechanism
- Essential scrolling movement is permitted; decorative scroll animations should be optional
- Avoid scaling, panning, or rotating large areas -- these trigger vestibular disorders
- Replace motion with opacity or color changes when reduced motion is active

### Custom Cursor Accessibility

```javascript
// Ensure custom cursor doesn't hide system cursor for assistive tech
const cursor = document.querySelector('.custom-cursor');

// Hide custom cursor when keyboard navigation detected
document.addEventListener('keydown', () => {
  cursor.style.display = 'none';
});
document.addEventListener('mousemove', () => {
  cursor.style.display = 'block';
});

// Don't interfere with native cursor for interactive elements
// Custom cursor should enhance, not replace
```

### Focus Management

```css
/* Ensure animated elements maintain focus visibility */
.animated-element:focus-visible {
  outline: 3px solid var(--focus-color);
  outline-offset: 4px;
  /* Override any animation that might hide focus */
}
```

## 2.6 Performance Implications

### Animation Performance Rules

1. **Stick to compositor-only properties:** `transform` and `opacity` are GPU-accelerated and never trigger layout/paint.
2. **Avoid animating:** `width`, `height`, `top`, `left`, `margin`, `padding`, `border`, `font-size` -- all trigger expensive layout recalculations.
3. **Use `will-change` sparingly:**
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```
   Only apply to elements about to animate. Remove after animation completes. Overuse creates excessive GPU layers.

4. **requestAnimationFrame:** GSAP and Lenis both use rAF internally. Never use `setInterval` for animations.

5. **ScrollTrigger performance:** Calculates positions upfront rather than continuously monitoring. Debounces scroll events and syncs with rAF.

6. **Stagger carefully:** Animating 100+ elements simultaneously will drop frames. Use `ScrollTrigger.batch()` to only animate visible elements.

7. **`content-visibility: auto`** on off-screen sections prevents the browser from rendering them until needed.

### Performance Debugging

```javascript
// Check renderer info
console.log('Active ScrollTriggers:', ScrollTrigger.getAll().length);

// GSAP's built-in FPS meter
gsap.ticker.fps(60); // Cap at 60fps

// Monitor with DevTools
// Performance panel > Enable paint flashing to see repaints
// Layers panel > See GPU layer count
```

---

# Trend 3: 3D Web Design

**Reference Site:** [Concept Capers](https://conceptcapers.com/)

## 3.1 Overview

3D web design in 2025-2026 ranges from full WebGL scenes (Three.js, React Three Fiber) to lightweight CSS 3D transforms and Spline embeds. The Concept Capers reference site takes a notably minimal approach -- using a variable typeface ("Hughie" with 16 styles) and semantic HTML rather than GPU-intensive 3D rendering, demonstrating that sophisticated visual design can succeed without heavy 3D libraries.

The spectrum of 3D web design includes:
- **Full 3D scenes:** Three.js / React Three Fiber with models, lighting, and cameras
- **Spline embeds:** Visual 3D design tool with drag-and-drop web integration
- **CSS 3D transforms:** Lightweight perspective and rotation effects
- **Glass morphism:** CSS backdrop-filter for depth and layering effects
- **Hybrid approaches:** 3D elements composited with 2D content

## 3.2 CSS/JS Techniques

### Three.js -- Complete Scene Setup

```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,                                    // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                                   // Near plane
  1000                                   // Far plane
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,       // Transparent background
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2; // Prevent looking under

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// Geometry + Material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6b35,
  metalness: 0.3,
  roughness: 0.4
});
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
scene.add(mesh);

// Animation loop
const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  mesh.rotation.y += delta * 0.5;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

### Three.js -- Materials Reference

```javascript
// Basic (no lighting needed, flat color)
new THREE.MeshBasicMaterial({ color: 0xff0000 })

// Lambert (matte, diffuse lighting)
new THREE.MeshLambertMaterial({ color: 0xff0000 })

// Phong (glossy, specular highlights)
new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 })

// Standard PBR (physically based rendering -- RECOMMENDED)
new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5,
  map: colorTexture,
  normalMap: normalTexture,
  roughnessMap: roughnessTexture
})

// Physical PBR (advanced -- clearcoat, transmission, sheen)
new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 0.0,
  roughness: 0.0,
  transmission: 1,        // Glass-like transparency
  thickness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  ior: 1.5                // Index of refraction
})

// Toon (cartoon/cel-shaded)
new THREE.MeshToonMaterial({ color: 0xff0000 })
```

### Three.js -- Loading 3D Models

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Draco compression for smaller file sizes
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('model.glb', (gltf) => {
  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(model);

  // Play animations
  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
});
```

### Three.js -- Post-Processing

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Bloom / glow
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,    // strength
  0.4,    // radius
  0.85    // threshold
);
composer.addPass(bloomPass);

// Ambient occlusion
const ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
ssaoPass.kernelRadius = 16;
composer.addPass(ssaoPass);

// In animation loop, replace renderer.render() with:
function animate() {
  composer.render();
  requestAnimationFrame(animate);
}
```

**Common post-processing effects:**

| Pass | Effect |
|------|--------|
| `UnrealBloomPass` | Bloom / glow |
| `SSAOPass` | Ambient occlusion (depth shadows) |
| `SSRPass` | Screen-space reflections |
| `OutlinePass` | Object outlines |
| `GlitchPass` | Digital glitch |
| `FilmPass` | Film grain / scan lines |
| `FXAAPass` | Anti-aliasing |
| `BokehPass` | Depth of field |

### Three.js -- Mouse Interaction in 3D

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

function checkIntersection() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    // Hover effect
    gsap.to(object.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
  }
}

// Call in animation loop
function animate() {
  checkIntersection();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

### React Three Fiber

```jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Float } from '@react-three/drei'
import { useRef, useState } from 'react'

function InteractiveBox(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? 'hotpink' : '#ff6b35'}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      shadows
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <InteractiveBox position={[0, 0, 0]} />
      </Float>
      <Environment preset="city" />
      <OrbitControls enableDamping />
    </Canvas>
  )
}
```

### React Three Fiber -- Ecosystem (@react-three/drei)

Key drei components for common 3D web patterns:

```jsx
import {
  OrbitControls,    // Camera controls
  Environment,      // HDR environment lighting
  Text, Text3D,     // Text rendering
  Float,            // Floating animation
  Html,             // HTML overlay in 3D space
  useGLTF,          // GLTF model loading hook
  useTexture,       // Texture loading hook
  MeshWobbleMaterial,     // Wobbly material
  MeshDistortMaterial,    // Distorted material
  MeshTransmissionMaterial, // Glass material
  MeshReflectorMaterial,    // Mirror/reflector
  ScrollControls,   // Scroll-driven 3D scenes
  PresentationControls,   // Drag-to-rotate
  KeyboardControls, // WASD/arrow key navigation
  Preload,          // Asset preloading
  Sparkles,         // Particle sparkles
  Stars,            // Star field
  Cloud,            // Volumetric clouds
  Sky,              // Procedural sky
  ContactShadows,   // Soft contact shadows
  Outlines          // Object outlines
} from '@react-three/drei'
```

### Spline -- Web Embedding

Spline is a browser-based 3D design tool with direct web export capabilities.

**Vanilla HTML:**
```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/your-scene-id/scene.splinecode"></spline-viewer>
```

**React/Next.js:**
```jsx
import Spline from '@splinetool/react-spline';

function Scene() {
  function onLoad(spline) {
    // Access Spline runtime API
    const obj = spline.findObjectByName('Button');
    // Manipulate objects programmatically
  }

  return (
    <Spline
      scene="https://prod.spline.design/your-scene-id/scene.splinecode"
      onLoad={onLoad}
    />
  );
}
```

**Spline capabilities:**
- Real-time rendering with materials library
- Event system for interactive elements (click, hover, scroll, keyboard)
- Timeline animation support
- Physics simulation
- Particle effects
- Variables and webhooks for dynamic data
- Export to web, iOS, Android
- Glass morphism, shadows, blurs built in

### CSS 3D Transforms

For lightweight 3D effects without WebGL overhead:

```css
/* 3D card flip */
.card-container {
  perspective: 800px;
  width: 300px;
  height: 400px;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.card-container:hover .card {
  transform: rotateY(180deg);
}

.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
}

.card .back {
  transform: rotateY(180deg);
}

/* 3D CSS Cube */
.cube-container {
  perspective: 800px;
  perspective-origin: 50% 50%;
}

.cube {
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  animation: rotate-cube 10s linear infinite;
}

.cube .face {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cube .front  { transform: translateZ(100px); }
.cube .back   { transform: rotateY(180deg) translateZ(100px); }
.cube .right  { transform: rotateY(90deg) translateZ(100px); }
.cube .left   { transform: rotateY(-90deg) translateZ(100px); }
.cube .top    { transform: rotateX(90deg) translateZ(100px); }
.cube .bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotate-cube {
  from { transform: rotateX(0deg) rotateY(0deg); }
  to   { transform: rotateX(360deg) rotateY(360deg); }
}
```

**Key CSS 3D properties:**

| Property | Purpose |
|----------|---------|
| `perspective` | Distance from viewer to z=0 plane |
| `perspective-origin` | Vanishing point position |
| `transform-style: preserve-3d` | Enable 3D space for children |
| `backface-visibility: hidden` | Hide element when rotated away |
| `transform: rotateX/Y/Z()` | 3D rotation |
| `transform: translate3d()` | 3D positioning |
| `transform: scale3d()` | 3D scaling |

**Important:** These CSS properties force `transform-style: flat` (breaking 3D):
- `overflow` (any value except `visible` or `clip`)
- `opacity` (< 1) on the 3D container
- `filter` (any value except `none`)
- `clip-path` (any value except `none`)
- `mix-blend-mode` (any value except `normal`)

### Glass Morphism (CSS backdrop-filter)

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark glass variant */
.glass-dark {
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px) brightness(0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Frosted glass with gradient border */
.glass-frosted {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.glass-frosted::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1)
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
}
```

**backdrop-filter functions:**

| Function | Effect |
|----------|--------|
| `blur(<length>)` | Frosted glass blur |
| `brightness(<percentage>)` | Darken/lighten behind |
| `contrast(<percentage>)` | Increase/decrease contrast |
| `saturate(<percentage>)` | Color saturation |
| `grayscale(<percentage>)` | Desaturate behind |
| `hue-rotate(<angle>)` | Shift colors |
| `invert(<percentage>)` | Invert colors |
| `sepia(<percentage>)` | Sepia tone |
| `opacity(<percentage>)` | Transparency of filter |

**Browser support:** Baseline since September 2024

## 3.3 Key Libraries & Tools

| Library/Tool | Purpose | Notes |
|-------------|---------|-------|
| **Three.js** | WebGL rendering engine | Industry standard, huge ecosystem |
| **React Three Fiber** | React renderer for Three.js | Declarative 3D, React ecosystem |
| **@react-three/drei** | R3F helper components | 200+ ready-made abstractions |
| **@react-three/postprocessing** | Post-processing effects | Bloom, SSAO, DOF, etc. |
| **@react-three/rapier** | Physics engine for R3F | Rigid/soft body physics |
| **Spline** | Visual 3D design tool | No-code 3D with web export |
| **GLTF/GLB** | 3D model format | Standard web-optimized 3D format |
| **Draco** | Mesh compression | 90%+ geometry size reduction |
| **KTX2** | Texture compression | GPU-optimized textures |
| **Leva** | GUI debug controls for R3F | Tweak values at runtime |
| **Theatre.js** | Visual animation editor | Keyframe 3D animations visually |
| **react-spring** | Spring physics for R3F | `@react-spring/three` |
| **framer-motion-3d** | Motion for 3D | 3D variant of Motion library |
| **lamina** | Shader material layers | Composable shader materials |

### R3F Ecosystem Map

```
@react-three/fiber (core renderer)
  |
  +-- @react-three/drei (helpers: controls, materials, loaders)
  +-- @react-three/postprocessing (visual effects)
  +-- @react-three/rapier (physics)
  +-- @react-three/xr (VR/AR)
  +-- @react-three/cannon (alternative physics)
  +-- @react-three/test-renderer (testing)
  +-- @react-three/gltfjsx (GLTF to JSX converter)
  |
  State: zustand | jotai | valtio
  Animation: react-spring | framer-motion-3d
  Debug: leva | Theatre.js
```

## 3.4 Implementation Patterns

### Hero Scene with Floating 3D Object

```jsx
import { Canvas } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'

function HeroModel() {
  const { scene } = useGLTF('/model.glb')
  return <primitive object={scene} scale={0.5} />
}

function Hero3D() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <HeroModel />
          </Float>
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            blur={2}
          />
        </Suspense>
      </Canvas>

      {/* HTML overlay */}
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem' }}>
        <h1>Hero Title</h1>
        <p>Subtitle text overlaying 3D scene</p>
      </div>
    </div>
  )
}
```

### Scroll-Driven 3D Scene

```jsx
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function AnimatedModel() {
  const scroll = useScroll()
  const ref = useRef()

  useFrame(() => {
    const offset = scroll.offset // 0 to 1
    ref.current.rotation.y = offset * Math.PI * 2
    ref.current.position.y = offset * -5
  })

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial color="#ff6b35" />
    </mesh>
  )
}

function ScrollScene() {
  return (
    <Canvas>
      <ScrollControls pages={5} damping={0.25}>
        <AnimatedModel />
        <Scroll html>
          <section style={{ height: '100vh' }}>
            <h1>Section 1</h1>
          </section>
          <section style={{ height: '100vh' }}>
            <h2>Section 2</h2>
          </section>
        </Scroll>
      </ScrollControls>
    </Canvas>
  )
}
```

### Glass Morphism Card Grid (CSS Only)

```html
<div class="glass-grid">
  <div class="glass-card">
    <h3>Feature 1</h3>
    <p>Description</p>
  </div>
  <div class="glass-card large">
    <h3>Feature 2</h3>
    <p>Description</p>
  </div>
  <div class="glass-card">
    <h3>Feature 3</h3>
    <p>Description</p>
  </div>
</div>
```

```css
.glass-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.glass-card.large {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .glass-card.large {
    grid-column: span 1;
  }
}
```

### Combining Three.js with GSAP

```javascript
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// After scene setup...
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animate 3D objects with GSAP ScrollTrigger
gsap.to(mesh.rotation, {
  y: Math.PI * 2,
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1
  }
});

gsap.to(mesh.position, {
  x: 3,
  z: -2,
  scrollTrigger: {
    trigger: '.section-2',
    start: 'top center',
    end: 'bottom center',
    scrub: true
  }
});

gsap.to(material, {
  opacity: 0,
  scrollTrigger: {
    trigger: '.section-3',
    start: 'top center',
    end: 'center center',
    scrub: true
  }
});
```

## 3.5 Accessibility Considerations

### 3D Content Accessibility

- **Always provide 2D fallback content:** Screen readers cannot interpret WebGL canvas. Place descriptive text outside the canvas or use `aria-label` on the canvas container.
  ```html
  <div role="img" aria-label="Interactive 3D model of the product rotating in space">
    <canvas id="three-canvas"></canvas>
  </div>
  ```
- **Keyboard navigation for 3D:** If 3D objects are interactive, provide keyboard equivalents (tab to focus, Enter/Space to activate).
- **Reduced motion:** Disable 3D animations and auto-rotation when `prefers-reduced-motion: reduce` is active.
  ```javascript
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    controls.autoRotate = false;
    // Show static screenshot instead of 3D scene
  }
  ```
- **Alternative content:** For complex 3D scenes, provide a static image or description for users who cannot interact with WebGL.
- **Focus trapping:** Ensure 3D canvases do not trap keyboard focus. Users must be able to tab past the canvas element.
- **Color contrast:** Glass morphism effects can reduce text readability. Ensure sufficient contrast ratios even with blur effects active.
  ```css
  .glass-card {
    backdrop-filter: blur(16px);
    /* Ensure text remains readable */
    color: white;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  ```

### Glass Morphism Accessibility

- **Text on glass:** Always test contrast with a contrast checker. The underlying content can make text unreadable.
- **High contrast mode:** Provide solid fallback backgrounds when `forced-colors: active` is detected.
  ```css
  @media (forced-colors: active) {
    .glass-card {
      backdrop-filter: none;
      background: Canvas;
      border: 2px solid ButtonText;
    }
  }
  ```

## 3.6 Performance Implications

### WebGL/Three.js Performance

**Geometry optimization:**
```javascript
// Reuse geometries and materials (DON'T create new instances)
const sharedGeo = new THREE.BoxGeometry(1, 1, 1);
const sharedMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });

// For many identical objects, use InstancedMesh
const instancedMesh = new THREE.InstancedMesh(sharedGeo, sharedMat, 1000);
const matrix = new THREE.Matrix4();
for (let i = 0; i < 1000; i++) {
  matrix.setPosition(Math.random() * 100, Math.random() * 100, Math.random() * 100);
  instancedMesh.setMatrixAt(i, matrix);
}
scene.add(instancedMesh); // 1 draw call instead of 1000
```

**Rendering optimization:**
```javascript
// Cap pixel ratio (retina screens are expensive)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// LOD (Level of Detail) for complex models
const lod = new THREE.LOD();
lod.addLevel(highDetailMesh, 0);     // Close
lod.addLevel(mediumDetailMesh, 50);  // Medium distance
lod.addLevel(lowDetailMesh, 200);    // Far
scene.add(lod);

// Selective shadows (expensive!)
directionalLight.shadow.mapSize.width = 1024;  // Not 4096
mesh.castShadow = true;
mesh.receiveShadow = false; // Only enable what's needed
```

**Memory management:**
```javascript
// CRITICAL: Dispose of Three.js resources to prevent memory leaks
function cleanup() {
  geometry.dispose();
  material.dispose();
  texture.dispose();
  renderer.dispose();
  // Remove all event listeners
}

// Monitor GPU memory
console.log(renderer.info);
// { memory: { geometries, textures }, render: { calls, triangles, frame } }
```

**Model optimization:**
- Use **GLTF/GLB** format (web-optimized)
- Apply **Draco compression** (90%+ geometry size reduction)
- Use **KTX2 texture compression** (GPU-native format, 50-75% smaller)
- Keep polygon counts under 100K for hero scenes, under 50K for background elements
- Use texture atlases to reduce draw calls

### Performance Budget for 3D Web

| Metric | Target | Notes |
|--------|--------|-------|
| Initial JS bundle | <200KB (gzipped) | Three.js core is ~150KB |
| 3D model size | <2MB total | Use Draco compression |
| Texture size | <1MB per texture | Use KTX2, max 2048x2048 |
| Draw calls | <100 per frame | Use InstancedMesh, merge geometries |
| Triangle count | <500K total scene | Use LOD for complex models |
| Frame rate | 60fps sustained | 30fps minimum acceptable |
| Time to interactive | <3 seconds | Lazy-load 3D after critical content |
| GPU memory | <256MB | Monitor with renderer.info |

### CSS 3D Transform Performance

- `transform: translate3d()` and `rotate3d()` are GPU-accelerated
- Minimal performance cost compared to WebGL
- Use `will-change: transform` on elements about to be animated
- Avoid `perspective` on large numbers of elements simultaneously
- `backdrop-filter` can be expensive on mobile -- reduce blur radius or disable on low-power devices

### Lazy Loading Strategy

```javascript
// Lazy load 3D scene after page content is interactive
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      import('./three-scene.js').then(module => {
        module.init(entry.target);
      });
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' });

observer.observe(document.querySelector('#canvas-container'));
```

```jsx
// React: Lazy load 3D components
import { lazy, Suspense } from 'react';

const ThreeScene = lazy(() => import('./ThreeScene'));

function Page() {
  return (
    <Suspense fallback={<div className="scene-placeholder">Loading 3D...</div>}>
      <ThreeScene />
    </Suspense>
  );
}
```

---

# Cross-Cutting Concerns

## Modern CSS Features Summary (2024-2026)

| Feature | Status | Use Case |
|---------|--------|----------|
| CSS Grid + Subgrid | Baseline 2023 | Complex aligned layouts |
| Container Queries | Baseline 2023 | Component-level responsive |
| `:has()` selector | Baseline 2023 | Parent/context selection |
| CSS Nesting | Baseline 2023 | Organized stylesheets |
| `backdrop-filter` | Baseline 2024 | Glass morphism effects |
| Scroll-driven animations | Limited (Chrome) | Native scroll animations |
| `color-mix()` | Baseline 2023 | Dynamic color generation |
| View Transitions API | Chrome/Edge | Page transition animations |
| Anchor Positioning | Chrome 125+ | Tooltip/popover positioning |
| `@layer` (Cascade Layers) | Baseline 2022 | Style priority management |
| `@scope` | Chrome 118+ | Scoped CSS rules |
| Masonry layout | Experimental | Pinterest-style grid |

## Web Font Performance

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;       /* Show fallback immediately, swap when loaded */
  font-weight: 100 900;     /* Variable font weight range */
}
```

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin>
```

**`font-display` values:**
- `swap` -- Show fallback immediately; swap when font loads (best for body text)
- `optional` -- Only use custom font if already cached (best for non-critical text)
- `fallback` -- Short block period, then fallback; swap if loaded quickly
- `block` -- Invisible text until font loads (avoid for performance)

## Universal Accessibility Checklist

- [ ] `prefers-reduced-motion` media query implemented
- [ ] Site-wide animation toggle available
- [ ] Keyboard navigation works through all interactive elements
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader descriptions for non-text content (3D, animations)
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Glass morphism text has sufficient contrast even with varied backgrounds
- [ ] 3D canvas has `role="img"` and `aria-label`
- [ ] Custom cursors don't replace system cursor for assistive tech
- [ ] No content is only accessible via hover (mobile users, keyboard users)
- [ ] `forced-colors` media query provides fallbacks for high contrast mode
- [ ] Auto-playing animations have pause controls
- [ ] Page is functional without JavaScript for core content

## Performance Optimization Hierarchy

1. **Use native CSS first:** Grid, transforms, scroll-driven animations, transitions
2. **Add lightweight JS second:** GSAP for complex choreography, Lenis for smooth scroll
3. **Use WebGL sparingly:** Only for hero scenes or interactive experiences that justify the cost
4. **Lazy load everything heavy:** 3D scenes, large animation libraries, off-screen content
5. **Set a performance budget:** Max 200KB JS, 2MB total 3D assets, 60fps sustained
6. **Test on real devices:** What runs at 60fps on a MacBook Pro may crawl on a mid-range Android phone

---

## Sources and Further Reading

- MDN Web Docs -- CSS Grid, Subgrid, Container Queries, :has(), backdrop-filter, CSS Nesting, perspective, transform-style, animation-timeline, prefers-reduced-motion
- GSAP Documentation -- gsap.to(), ScrollTrigger, SplitText, Timelines, Easing
- Three.js Documentation -- Scene creation, materials, loading, post-processing, controls, performance
- React Three Fiber Documentation -- Canvas, hooks, event handling, ecosystem
- @react-three/drei -- Helper components and abstractions
- Motion (Framer Motion) -- React animation, gestures, layout, scroll
- Lenis -- Smooth scroll library documentation
- Spline -- 3D design tool and web integration
- WCAG 2.1 -- Animation from Interactions (Success Criterion 2.3.3)
- web.dev -- Animation performance, scroll-driven animations, font optimization
- ChainGPT Labs -- Reference implementation analysis (modular + playful)
- Patrick Heng Portfolio -- Reference implementation (Nuxt.js, interactive)
- Concept Capers -- Reference implementation (typography-driven design)
