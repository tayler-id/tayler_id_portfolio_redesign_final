# Web Design Trends Research: Gradients, Hand-Drawn Illustrations, and Brutalism

> Research compiled March 2026. This document covers Trends 4, 5, and 6 for the portfolio redesign.

---

## Table of Contents

1. [Trend 4: Beautiful Gradients](#trend-4-beautiful-gradients)
2. [Trend 5: Hand-Drawn Illustrations](#trend-5-hand-drawn-illustrations)
3. [Trend 6: Brutalism](#trend-6-brutalism)

---

# Trend 4: Beautiful Gradients

**Reference Site:** [Alche Studio](https://alche.studio/) — a creative studio crafting high-concept digital experiences, recognized by CSS Design Awards and Awwwards. Uses smooth transitions, Lenis scroll, and cubic-bezier easing to create a polished dark-themed gradient experience.

## 1. CSS/JS Techniques

### CSS Gradient Types

**Linear Gradients** — smooth color transitions along a straight line:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Radial Gradients** — color emanates from a center point:
```css
background: radial-gradient(circle at 50% 50%, #ee7752, transparent 70%);
```

**Conic Gradients** — color sweeps around a center like a pie chart:
```css
background: conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #ff0000);
```

### OKLCH Color Space for Vivid Gradients

OKLCH avoids the "muddy middle" problem of sRGB gradients. In sRGB, a straight line between two colors passes through desaturated grays. OKLCH uses an arc through the hue space, keeping chroma consistent.

```css
/* sRGB — muddy middle tones */
background: linear-gradient(to right, #de72c6, #2dcde4);

/* OKLCH — vibrant, perceptually uniform */
background: linear-gradient(in oklch to right, #de72c6, #2dcde4);

/* Direct OKLCH color function */
background: linear-gradient(
  to right,
  oklch(70% 0.15 240),   /* Light blue */
  oklch(50% 0.15 240)    /* Darker blue */
);

/* Hue interpolation control — longer arc for rainbow effect */
background: linear-gradient(in oklch longer hue, oklch(70% 0.2 30), oklch(70% 0.2 330));
```

Hue interpolation methods: `shorter` (default), `longer`, `increasing`, `decreasing`.

Browser support: Chrome 111+, Safari 15.4+, Firefox 113+. Global support exceeded 92% in Q2 2025.

### CSS `color-mix()` Function

Blend two colors directly in CSS without preprocessors:
```css
/* Tint a color 30% toward white */
background: color-mix(in oklch, var(--brand) 70%, white);

/* Create hover states */
.btn:hover {
  background: color-mix(in oklch, var(--primary) 80%, black);
}

/* Dynamic palette generation */
--surface-1: color-mix(in oklch, var(--accent) 10%, var(--bg));
--surface-2: color-mix(in oklch, var(--accent) 20%, var(--bg));
--surface-3: color-mix(in oklch, var(--accent) 30%, var(--bg));
```

### Mesh Gradients (CSS Technique)

No native CSS mesh gradient exists yet (CSS WG issue #7648 is open). The current approach layers multiple radial gradients with blur:

```css
.mesh-gradient {
  background-color: #1a1a2e;
  background-image:
    radial-gradient(at 20% 30%, rgba(131, 58, 180, 0.6) 0%, transparent 50%),
    radial-gradient(at 80% 20%, rgba(253, 29, 29, 0.5) 0%, transparent 50%),
    radial-gradient(at 50% 80%, rgba(69, 162, 252, 0.5) 0%, transparent 50%),
    radial-gradient(at 10% 70%, rgba(34, 193, 195, 0.4) 0%, transparent 50%);
  filter: blur(40px);
}
```

Each radial-gradient acts as a colored "spotlight" fading to transparent. A high-radius `filter: blur()` makes the blobs blend organically — the "Aurora" look used by Stripe and Apple.

### Animated Gradients — 4 Methods

**Method 1: Background Position Shift** (99%+ browser support)
```css
.gradient-shift {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Method 2: Pseudo-Element Crossfade**
```css
.crossfade::before {
  background: linear-gradient(135deg, #667eea, #764ba2);
  animation: fade-a 4s ease-in-out infinite;
}
.crossfade::after {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  animation: fade-b 4s ease-in-out infinite;
}

@keyframes fade-a {
  0%, 45% { opacity: 1; }
  50%, 95% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes fade-b {
  0%, 45% { opacity: 0; }
  50%, 95% { opacity: 1; }
  100% { opacity: 0; }
}
```

**Method 3: CSS Houdini `@property`** (True color interpolation — no Firefox support)
```css
@property --grad-start {
  syntax: "<color>";
  initial-value: #ee7752;
  inherits: false;
}
@property --grad-end {
  syntax: "<color>";
  initial-value: #e73c7e;
  inherits: false;
}

.houdini-gradient {
  background: linear-gradient(135deg, var(--grad-start), var(--grad-end));
  animation: houdini-shift 4s ease infinite;
}

@keyframes houdini-shift {
  0%, 100% { --grad-start: #ee7752; --grad-end: #e73c7e; }
  33%      { --grad-start: #23a6d5; --grad-end: #23d5ab; }
  66%      { --grad-start: #667eea; --grad-end: #764ba2; }
}
```

**Method 4: Rotating Conic Gradient** (95%+ browser support — great for spinners)
```css
.conic-spin {
  background: conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00,
    #00ff00, #0000ff, #ff00ff, #ff0000);
  animation: rotate 3s linear infinite;
  border-radius: 50%;
}
@keyframes rotate {
  to { transform: rotate(360deg); }
}
```

### Mouse-Reactive Gradients

Use CSS custom properties updated by JavaScript to track cursor position:

```css
.reactive-gradient {
  --x: 50%;
  --y: 50%;
  --size: 200px;
  background: radial-gradient(
    circle var(--size) at var(--x) var(--y),
    rgba(255, 100, 200, 0.6),
    transparent
  );
}
```

```javascript
const el = document.querySelector('.reactive-gradient');
el.addEventListener('mousemove', (e) => {
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--x', `${x}%`);
  el.style.setProperty('--y', `${y}%`);
});
```

For advanced effects, convert cursor position into RGB values using sine/cosine functions and generate multi-point radial gradients in real time.

### WebGL Shader Gradients (GPU-Powered)

The Stripe-style approach: a ~10kb WebGL file (~800 lines) creates GPU-accelerated gradient animation.

**Architecture:**
- MiniGl class handles WebGL initialization and shader compilation
- Vertex shader positions geometry
- Fragment shader calculates `pixelColor(x, y, time)` per pixel
- Simplex noise (2D/3D) creates natural wave patterns
- Multiple noise layers stacked at different scales (Fractal Brownian Motion)
- Dynamic blur via signed-distance fields, not neighbor sampling
- Color mapped through gradient texture sampled by noise output

**Why it performs well:**
- GPU invokes the color function thousands of times in parallel
- No branching (if-statements) — pure mathematical operations
- Built-in GLSL functions: `sin`, `clamp`, `pow`, `smoothstep`
- Single-pass rendering; no multi-pass blur

### SVG Gradients + GSAP

GSAP can animate SVG gradient stop colors with staggered timelines:
```javascript
gsap.to('#gradient stop', {
  stopColor: '#ff6b6b',
  stagger: 0.2,
  duration: 2,
  ease: 'power2.inOut',
  yoyo: true,
  repeat: -1
});
```

For page transitions, use SVG masks with GSAP ScrollTrigger to create gradient-based scene transitions synchronized with scroll position.

### Gradient Page Transitions with Barba.js

Barba.js handles AJAX page loading; GSAP animates the transition overlay:
```javascript
barba.init({
  transitions: [{
    leave(data) {
      return gsap.to('.transition-overlay', {
        scaleY: 1,
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        duration: 0.6,
        ease: 'power2.inOut'
      });
    },
    enter(data) {
      return gsap.to('.transition-overlay', {
        scaleY: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.inOut'
      });
    }
  }]
});
```

## 2. Key Libraries and Tools

| Library | Purpose | Size | Notes |
|---------|---------|------|-------|
| **GSAP** | Animation engine for SVG gradients, page transitions, scroll-triggered effects | ~30kb | Industry standard; works with SVG, Canvas, CSS |
| **Barba.js** | AJAX page transitions (pairs with GSAP for gradient transitions) | ~7kb | Handles page lifecycle; animation library agnostic |
| **Lenis** | Smooth scrolling (used by Alche.studio) | ~5kb | Inertial physics-based scrolling |
| **Three.js** | 3D WebGL gradient scenes | ~150kb | Full 3D engine; overkill for simple gradients |
| **OGL** | Minimal WebGL gradient rendering | ~30kb | Lighter Three.js alternative |
| **Stripe Gradient (MiniGl)** | Standalone WebGL gradient animation | ~10kb | Self-contained; no dependencies |
| **MSHR** | Mesh gradient generator tool | Web app | Exports CSS mesh gradient code |
| **Mesher by CSS Hero** | Mesh gradient CSS generator | Web app | Layered radial gradient output |
| **Colorffy** | Mesh gradient generator | Web app | Visual editor with CSS export |
| **gradient.style** | CSS HDR gradient playground | Web app | Test oklch gradients in browser |

## 3. Implementation Patterns

### Pattern A: Ambient Hero Gradient (Pure CSS)
Best for: landing pages, hero sections. Zero JavaScript required.
```css
.hero {
  background: linear-gradient(in oklch -45deg,
    oklch(65% 0.25 30),  /* warm coral */
    oklch(70% 0.2 280),  /* violet */
    oklch(75% 0.2 200),  /* teal */
    oklch(65% 0.22 140)  /* green */
  );
  background-size: 400% 400%;
  animation: ambient 20s ease infinite;
}
```

### Pattern B: Scroll-Reactive Gradient
Best for: storytelling pages that shift mood as user scrolls.
```javascript
// GSAP ScrollTrigger changes gradient colors on scroll
gsap.to('.gradient-bg', {
  '--grad-start': '#764ba2',
  '--grad-end': '#23d5ab',
  scrollTrigger: {
    trigger: '.section-2',
    start: 'top center',
    end: 'bottom center',
    scrub: true
  }
});
```

### Pattern C: Interactive Cursor Gradient
Best for: hero backgrounds, hover states on cards.

### Pattern D: WebGL Background (Stripe-Style)
Best for: high-end marketing pages where performance budget allows canvas rendering.

### Pattern E: Gradient Page Transitions
Best for: multi-page sites wanting seamless, branded transitions via Barba.js + GSAP.

## 4. Accessibility Considerations

**Gradient backgrounds are the #1 accessibility failure on the web.** 90% of gradient backgrounds fail WCAG contrast tests.

### WCAG Requirements
- **Text on gradients:** 4.5:1 contrast ratio minimum (AA) for normal text; 3:1 for large text
- **Non-text UI:** 3:1 contrast ratio for interactive components (WCAG 2.1 SC 1.4.11)
- **Testing point:** Always check contrast at the *lightest* point of the gradient behind text

### Mitigation Strategies
1. **Overlay technique (Stripe method):** Place a semi-transparent dark/light overlay between gradient and text
   ```css
   .gradient-text-safe::before {
     content: '';
     position: absolute;
     inset: 0;
     background: rgba(0, 0, 0, 0.4);
   }
   ```
2. **Solid backing panel:** Text sits in a solid-color container on top of the gradient
3. **Text shadow for emergency contrast:**
   ```css
   .gradient-text {
     text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
   }
   ```
4. **Test at all breakpoints** — gradient positions shift on resize

### Animated Gradient Accessibility
- Respect `prefers-reduced-motion`: provide static fallback gradient
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animated-gradient {
      animation: none;
      background-position: 0% 50%;
    }
  }
  ```
- Keep animation durations 8-20 seconds for ambient effects (slow = calming, not distracting)
- Avoid multiple simultaneous gradient animations on mobile

## 5. Performance Implications

### CSS Gradients
- **Background-position animation:** Triggers repaint every frame but no layout recalculation. Acceptable for single gradients.
- **@property animation:** ~0.3ms per repaint frame (~2% of 60fps budget). Best performing CSS method for true color interpolation.
- Use `will-change: background-position` sparingly — increases memory.
- **Avoid on mobile:** Multiple simultaneous gradient animations cause frame drops.

### WebGL Gradients
- **GPU-accelerated:** All rendering happens on the graphics card.
- Fragment shader runs in parallel across thousands of pixels simultaneously.
- Stripe's implementation: optimized for 60fps on both mobile and desktop.
- ~10kb payload — minimal impact on load time.
- **Trade-off:** Canvas elements are not accessible to screen readers; need fallback content.

### Mesh Gradients (Stacked Radials + Blur)
- `filter: blur()` is expensive — triggers compositing layer.
- Acceptable for a single background element; avoid on multiple cards.
- Consider pre-rendering to an image at build time if the gradient is static.

### Recommendations
1. Use CSS background-position animation for simple ambient gradients
2. Use @property for color-interpolated gradients (with sRGB fallback for Firefox)
3. Use WebGL only for hero-level interactive gradients where the performance budget exists
4. Never animate gradients on elements that also contain animated children (paint storm)
5. Lazy-load WebGL gradient canvases below the fold with Intersection Observer

---

# Trend 5: Hand-Drawn Illustrations

**Reference Sites:**
- [Flying Papers](https://www.flyingpapers.com/) — design studio using bold dotted borders, radial-gradient dot patterns, variable fonts (ObviouslyVariable, DegularVariable, Bergen Mono), styled-components (React), and 3px solid geometric border layouts with a vibrant hand-crafted palette (#8584BD, #F4ED36, #375027). Implements `prefers-reduced-motion` with `animation-play-state: paused`.
- [GM Meme](https://www.gm-meme.com/) — crypto/meme site using custom SVG character illustrations, Swiper.js carousels, GSAP ScrollTrigger, Lenis smooth scrolling, jQuery, and hover-triggered transform animations on cards. Heavy use of custom illustrated mascots as branding elements.

## 1. CSS/JS Techniques

### SVG Line Drawing Animation (stroke-dasharray / stroke-dashoffset)

The foundational hand-drawn effect — making paths appear to be drawn by an invisible pen:

```css
/* The core technique */
.draw-path {
  stroke-dasharray: 1000;     /* total dash length (>= path length) */
  stroke-dashoffset: 1000;    /* offset = hidden */
  animation: draw 2s ease forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }  /* reveal the full stroke */
}
```

To calculate the exact path length in JavaScript:
```javascript
const path = document.querySelector('path');
const length = path.getTotalLength();
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;
```

### SVG Filter "Boiling" / Line-Boil Effect

Simulates traditional animation's "boiling" technique (redrawing the same frame with slight variation) using SVG filters — no JavaScript required for the base effect:

```html
<svg>
  <defs>
    <filter id="hand-drawn">
      <feTurbulence
        type="turbulence"
        baseFrequency="0.02"
        numOctaves="3"
        seed="1"
        result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="4"
        xChannelSelector="R"
        yChannelSelector="G" />
    </filter>
  </defs>
</svg>

<style>
  .hand-drawn { filter: url(#hand-drawn); }
</style>
```

To animate the boil, cycle through different `seed` values in JavaScript:
```javascript
const turbulence = document.querySelector('feTurbulence');
let seed = 0;
setInterval(() => {
  seed = (seed + 1) % 5;
  turbulence.setAttribute('seed', seed);
}, 150); // ~6-7fps for classic boiling look
```

**Key parameters:**
- `baseFrequency`: lower = larger distortion waves; higher = finer wobble
- `numOctaves`: complexity of the noise pattern (1-5, higher = more detailed)
- `scale`: displacement intensity (2-8 for subtle hand-drawn; 10+ for exaggerated)
- `seed`: changing this creates the "redraw" effect

### Hand-Drawn CSS Borders

```css
/* Wavy border using border-image with SVG */
.sketch-border {
  border: 3px solid transparent;
  border-image: url("data:image/svg+xml,...") 30 round;
}

/* Rough border with box-shadow stacking */
.rough-box {
  border: 2px solid #333;
  box-shadow:
    1px 0 0 #333,
    0 1px 0 #333,
    -1px 0 0 #333,
    0 -1px 0 #333,
    2px 1px 0 #333,
    1px 2px 0 #333;
}

/* Dotted pattern backgrounds (Flying Papers technique) */
.dot-bg {
  background-image: radial-gradient(circle, #333 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## 2. Key Libraries and Tools

### Rough.js (<9kb gzipped)

The primary library for hand-drawn graphics. Renders to Canvas or SVG.

```javascript
// Canvas rendering
const rc = rough.canvas(document.getElementById('canvas'));
rc.rectangle(10, 10, 200, 200, {
  roughness: 1.5,       // 0 = smooth, 3+ = very rough
  bowing: 2,            // curved distortion on lines
  fill: '#FFD23F',
  fillStyle: 'hachure', // hachure | solid | zigzag | cross-hatch | dots | sunburst | dashed
  fillWeight: 1.5,      // line thickness in fill pattern
  hachureAngle: 60,     // angle of hachure lines
  hachureGap: 8,        // spacing between hachure lines
  stroke: '#000',
  strokeWidth: 2
});

// SVG rendering
const rc = rough.svg(svgElement);
const node = rc.circle(100, 100, 80, {
  roughness: 2.8,
  fill: 'coral',
  fillStyle: 'cross-hatch'
});
svgElement.appendChild(node);
```

**Supported shapes:** line, rectangle, ellipse, circle, arc, curve, polygon, path (SVG path strings)

**Fill styles available:** hachure (default), solid, zigzag, cross-hatch, dots, sunburst, dashed, zigzag-line

**How it works:** The fundamental concept is randomness. Every spatial point is adjusted by a random offset controlled by the `roughness` parameter. Core algorithms derived from the "handy" Processing library.

### SVG2Rough.js

Converts existing SVGs to hand-drawn style:
```javascript
import { Svg2Rough } from 'svg2roughjs';
const converter = new Svg2Rough('#my-svg');
converter.sketch();
```

### Vivus.js (No dependencies)

Animates SVGs to appear hand-drawn (line drawing effect):
```javascript
new Vivus('my-svg', {
  type: 'delayed',        // delayed | sync | oneByOne
  duration: 200,          // frames
  animTimingFunction: Vivus.EASE
});
```

**Animation types:**
- `delayed` — paths drawn simultaneously with staggered start (default)
- `sync` — all paths drawn at the same time
- `oneByOne` — paths drawn sequentially (best "live drawing" feel)

**Requirement:** All SVG elements must have a stroke and cannot be filled. Vivus auto-converts non-path elements (circle, rect, line, polyline) to path elements.

### Lottie (airbnb/lottie-web)

JSON-based animation format from After Effects:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
<script>
  lottie.loadAnimation({
    container: document.getElementById('lottie-target'),
    renderer: 'svg',    // svg | canvas | html
    loop: true,
    autoplay: true,
    path: '/animations/hand-drawn-loader.json'
  });
</script>
```

**Performance:** Reduces load time up to 70% compared to traditional animated formats (GIF, video). JSON is much smaller than SVG for complex animations. Captures complex After Effects motion faithfully.

**Lottie vs SVG animation:**
- Lottie: better for complex multi-element choreography designed in After Effects
- SVG animation: better for simple path drawings, morphs, and interactive effects
- Lottie files are JSON; SVG animations are markup — different toolchains

### Wired Elements (Web Components)

Pre-built UI components with hand-drawn appearance, powered by Rough.js:

```bash
npm install wired-elements
```

```javascript
import { WiredButton, WiredInput, WiredCard } from 'wired-elements';
```

```html
<wired-button>Click Me</wired-button>
<wired-input placeholder="Enter name"></wired-input>
<wired-card elevation="3">
  <p>Card content here</p>
</wired-card>
<wired-checkbox>Agree to terms</wired-checkbox>
<wired-slider min="0" max="100"></wired-slider>
```

**Framework support:** Web Components (native), React (via @lit-labs/react wrappers), Vue, Svelte.

No two renderings look exactly the same — intentional randomness in every render.

### DoodleCSS

Lightweight CSS-only hand-drawn borders:
```html
<link rel="stylesheet" href="doodle.css" />
<div class="doodle border">Content with doodle border</div>
```

### Additional Libraries

| Library | Purpose | Notes |
|---------|---------|-------|
| **GSAP + ScrollTrigger** | Scroll-triggered SVG drawing animations | Used by GM Meme |
| **Swiper.js** | Hand-drawn style carousels | Used by GM Meme |
| **Lenis** | Smooth scroll for illustration-heavy pages | Used by both reference sites |
| **SVGO / SVGOMG** | SVG optimization (remove unnecessary code) | Essential for performance |
| **react-sketch-canvas** | React freehand drawing component | For interactive sketch features |

## 3. Implementation Patterns

### Pattern A: Progressive SVG Line Draw on Scroll

```javascript
// Draw illustration as user scrolls into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.draw-on-scroll').forEach(el => {
  observer.observe(el);
});
```

```css
.draw-on-scroll path {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  transition: stroke-dashoffset 2s ease;
}
.draw-on-scroll.animate path {
  stroke-dashoffset: 0;
}
```

### Pattern B: Rough.js Interactive Elements

Replace standard borders and backgrounds with Rough.js-rendered shapes that re-render on hover/interaction for a "living sketch" feel.

### Pattern C: Lottie Hero Illustration

Load a complex After Effects illustration as a lightweight Lottie JSON file in the hero section, with fallback static SVG for `prefers-reduced-motion`.

### Pattern D: Boiling Filter on Typography

Apply the SVG feTurbulence filter to headings for a subtle hand-drawn wobble effect. Cycle seeds at ~6fps for classic animation boil.

### Pattern E: Hybrid Approach (Flying Papers Style)

Combine dotted background patterns, bold geometric borders, variable fonts, and selective SVG animation on key elements. Keep most of the page static with illustration accents.

## 4. Accessibility Considerations

### Reduced Motion (Critical)

Animated illustrations are classified as "unessential animations" under WCAG 2.3.3:

```css
@media (prefers-reduced-motion: reduce) {
  /* Stop all SVG line animations */
  .draw-path { animation: none; stroke-dashoffset: 0; }

  /* Pause Lottie and boiling effects */
  .animated-illustration { animation-play-state: paused; }

  /* Show static illustration instead */
  .lottie-container { display: none; }
  .static-fallback { display: block; }
}
```

Flying Papers already implements this: `@media (prefers-reduced-motion) { animation-play-state: paused; }`

### WCAG Duration Rules
- Animations that loop infinitely and last >5 seconds **must** provide pause/stop controls
- When offering a reduced-motion version, if it still loops >5 seconds, it fails WCAG
- Solution: stop animation after completion or provide explicit pause button

### SVG Accessibility

```html
<!-- Decorative illustration: hide from screen readers -->
<svg aria-hidden="true" focusable="false" role="img">...</svg>

<!-- Meaningful illustration: describe it -->
<svg role="img" aria-labelledby="illustration-title illustration-desc">
  <title id="illustration-title">Hand-drawn map of the design process</title>
  <desc id="illustration-desc">A sketchy flowchart showing research, wireframing, prototyping, and testing stages connected by arrows.</desc>
  ...
</svg>
```

### Cognitive Considerations
- Moving/blinking content distracts users with ADHD and attention deficit disorders
- Vestibular-triggered motion (scaling, panning, parallax) causes nausea/dizziness
- Hand-drawn "boiling" effects are a vestibular trigger — always gate behind `prefers-reduced-motion`

## 5. Performance Implications

### SVG Optimization

- **SVGO/SVGOMG:** Remove unnecessary metadata, comments, editor data. Can reduce file size 50-80%.
- **Simplify paths:** Reduce point count where possible without losing visual quality.
- **Lazy load:** Use Intersection Observer to defer loading/animating SVGs below the fold.

### GPU-Friendly Animation

```css
/* Prefer these (GPU-composited) */
.good { transform: translateX(10px); opacity: 0.5; }

/* Avoid these (trigger repaint) */
.bad { fill: red; stroke: blue; }
```

- Add `will-change: transform, opacity` to animated elements (sparingly — increases memory).
- Animating `fill` and `stroke` triggers repaints. Prefer `opacity` and `transform` where possible.

### Rough.js Performance

- <9kb gzipped — minimal bundle impact.
- Canvas rendering is faster than SVG for many simultaneous shapes.
- SVG rendering is better for interactive/accessible individual elements.
- Re-rendering on every frame is expensive — only re-render on interaction, not continuously.

### Lottie Performance

- JSON format: 70% smaller than equivalent GIF/video.
- SVG renderer: best quality, accessible, but slower for complex animations.
- Canvas renderer: faster for complex animations, but not accessible to screen readers.
- HTML renderer: limited feature support but lightweight.

### SVG Filter Performance (Boiling Effect)

- `feTurbulence` + `feDisplacementMap` is computationally expensive.
- Limit to small elements or headings, not full-page backgrounds.
- Use `setInterval` at 100-200ms (6-10fps) — classic animation boil doesn't need 60fps.
- CPU-bound: browsers use a single thread per tab for SVG filters.

### Recommendations
1. Optimize all SVGs with SVGO before deployment
2. Use Intersection Observer to animate only visible elements
3. Choose Canvas renderer for Lottie when accessibility isn't needed for that element
4. Limit feTurbulence boiling to 1-2 small elements per page
5. Inline critical SVGs; lazy-load decorative ones
6. Set explicit `width` and `height` on SVG elements to prevent layout shift

---

# Trend 6: Brutalism

**Reference Site:** [Samsy (SMSY-Gen02)](https://samsy.ninja/) — award-winning Creative Graphics Engineer Samuel Honigstein's portfolio. An immersive 3D cyberpunk world built with Vue.js + Three.js (TSL) + custom WebGPU, GSAP animations, achieving 120+ FPS. Won Awwwards Site of the Day and Developer Award (October 2025). While technically a WebGL showcase, the raw, industrial aesthetic and experimental navigation embody brutalist principles applied to cutting-edge technology.

**Additional Reference:** [Eloy Benoffi's Portfolio](https://tympanus.net/codrops/2025/10/15/from-blank-canvas-to-mayhem-eloy-benoffis-brutalist-glitchy-portfolio-built-with-webflow-and-gsap/) — brutalist, glitchy portfolio built with Webflow and GSAP, demonstrating micro-interactions, complex timelines, and experimental freedom.

## 1. CSS/JS Techniques

### Neo-Brutalism CSS Foundation

The signature aesthetic: thick borders, hard shadows with zero blur, square corners, flat colors, and bold type.

**CSS Custom Properties (Design Tokens):**
```css
:root {
  /* Borders */
  --border: 3px solid #000;
  --border-lg: 4px solid #000;

  /* Hard shadows — ZERO blur is the signature */
  --shadow-sm: 3px 3px 0 0 #000;
  --shadow: 5px 5px 0 0 #000;
  --shadow-lg: 8px 8px 0 0 #000;
  --shadow-xl: 12px 12px 0 0 #000;

  /* Always square */
  --radius: 0;
}
```

### The Neo-Brutalist Button

```css
.nb-btn {
  border: 3px solid #000;
  border-radius: 0;
  background: #FFD23F;          /* Bold, flat color */
  color: #000;
  box-shadow: 5px 5px 0 0 #000; /* Hard offset, zero blur */
  font-weight: 700;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.1s ease;     /* Snappy, not smooth */
}

/* Hover: lift up and grow shadow */
.nb-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 0 #000;
}

/* Active: press down, shadow disappears */
.nb-btn:active {
  transform: translate(3px, 3px);
  box-shadow: none;
}

/* Focus: visible keyboard indicator */
.nb-btn:focus-visible {
  outline: 3px solid #74B9FF;
  outline-offset: 3px;
}
```

**Tailwind CSS equivalent:**
```html
<button class="border-[3px] border-black bg-yellow-400 px-6 py-3 font-bold
  shadow-[5px_5px_0_0_#000] transition-all duration-100
  hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000]
  active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
  Click Me
</button>
```

### Neo-Brutalist Card

```css
.nb-card {
  background: #fff;
  border: 3px solid #000;
  box-shadow: 5px 5px 0 0 #000;
  padding: 1.5rem;
  transition: transform 0.15s, box-shadow 0.15s;
}

.nb-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 0 #000;
}
```

### Neo-Brutalist Form Input

```css
.nb-input {
  padding: 0.75rem 1rem;
  border: 3px solid #000;
  border-radius: 0;
  background: #fff;
  box-shadow: 3px 3px 0 0 #000;
  font-family: 'Space Mono', monospace;
  transition: box-shadow 0.15s, transform 0.15s;
}

.nb-input:focus {
  outline: 3px solid #74B9FF;
  outline-offset: 2px;
  box-shadow: 5px 5px 0 0 #000;
  transform: translate(-1px, -1px);
}
```

### Industrial Clip-Path Framing

Used in brutalist developer portfolios to create angular, industrial frames without images:
```css
.industrial-frame {
  clip-path: polygon(
    0 0, 95% 0, 100% 5%, 100% 100%,
    5% 100%, 0 95%
  );
  background: linear-gradient(135deg, #1a1a1a, #333);
  border: 2px solid #444;
}
```

### Interactive Grid Background

Calculate grid blocks to fill the viewport, then apply distance-based cursor highlighting:
```javascript
// Brutalist grid with cursor proximity highlighting
const blockSize = 60; // px
const cols = Math.ceil(window.innerWidth / blockSize);
const rows = Math.ceil(window.innerHeight / blockSize);

document.addEventListener('mousemove', (e) => {
  blocks.forEach(block => {
    const dist = Math.sqrt(
      Math.pow(e.clientX - block.centerX, 2) +
      Math.pow(e.clientY - block.centerY, 2)
    );
    const intensity = Math.max(0, 1 - dist / 200);
    block.el.style.opacity = intensity;
  });
});
```

### Oversized Typography with Fluid Scaling

```css
/* Brutalist typography: massive, unapologetic */
.nb-display {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(3rem, 8vw + 1rem, 10rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

/* Character-by-character reveals with GSAP SplitText */
.nb-heading {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 5vw, 6rem);
  border-bottom: 4px solid #000;
  padding-bottom: 0.5rem;
}
```

### Creative Navigation Patterns

**Open Navigation (No hamburger):**
```css
.nb-nav {
  display: flex;
  gap: 0;
  border: 3px solid #000;
}

.nb-nav a {
  padding: 1rem 2rem;
  border-right: 3px solid #000;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  color: #000;
  transition: all 0.1s;
}

.nb-nav a:hover {
  background: #FFD23F;
}

.nb-nav a:last-child {
  border-right: none;
}
```

**Full-Screen Overlay Nav:**
```css
.nb-overlay-nav {
  position: fixed;
  inset: 0;
  background: #FFD23F;
  display: grid;
  place-items: center;
  z-index: 999;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.nb-overlay-nav.open {
  transform: translateY(0);
}

.nb-overlay-nav a {
  font-size: clamp(3rem, 10vw, 8rem);
  font-family: 'Archivo Black', sans-serif;
  text-decoration: none;
  color: #000;
  border-bottom: 4px solid #000;
}
```

**Dropdown with Brutalist Style:**
```css
.nb-dropdown {
  position: absolute;
  background: #fff;
  border: 3px solid #000;
  box-shadow: 5px 5px 0 0 #000;
  padding: 0;
  list-style: none;
}

.nb-dropdown li {
  padding: 0.75rem 1.5rem;
  border-bottom: 2px solid #000;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
}

.nb-dropdown li:last-child {
  border-bottom: none;
}

.nb-dropdown li:hover {
  background: #FFD23F;
}
```

## 2. Key Libraries and Tools

| Library | Purpose | Notes |
|---------|---------|-------|
| **Neo-Brutalism CSS** | Drop-in CSS library with brutalist tokens | GitHub: Walikuperek/Neo-brutalism-CSS |
| **Neobrutalism Components** | React + Tailwind component library (MIT) | shadcn-compatible; bold colors, hard shadows |
| **neobrutalism.dev** | Tailwind component collection | Pre-built buttons, cards, forms, layouts |
| **Brutal (CSS Framework)** | Minimal brutalist CSS framework | Classless or utility-based |
| **Tiny Brutalism CSS** | Ultra-minimal brutalist styles | `.box { border: 2px solid #000; box-shadow: 4px 4px 0 #000; }` |
| **Brutalist Framework** | Full brutalist CSS framework | HTML-first, minimal CSS approach |
| **GSAP + SplitText** | Character-level typography animation | Industry standard for brutalist motion |
| **Lenis** | Smooth scroll with inertial physics | "Buttery smooth scrolling" |
| **OGL** | Minimal WebGL for effects (metaballs, etc.) | Lighter than Three.js |
| **Astro** | Island architecture for brutalist portfolios | SSR + selective hydration |
| **Framer Motion** | "Bouncy" neobrutalist animations in React | Spring physics feel |

## 3. Implementation Patterns

### Color Palette (from Neubrutalism Definitive Guide)

| Color | Hex | Purpose |
|-------|-----|---------|
| Black | `#000000` | Borders, shadows, text |
| Off-White | `#FFFDF5` | Base background |
| Bold Yellow | `#FFD23F` | Primary accent |
| Coral Pink | `#FF6B6B` | Secondary accent |
| Sky Blue | `#74B9FF` | Focus indicators, links |
| Soft Green | `#88D498` | Success states |
| Orange | `#FFA552` | Warnings, highlights |
| Lavender | `#B8A9FA` | Tertiary accent |

**Shadow Hierarchy:**

| Size | CSS | Use Case |
|------|-----|----------|
| Small | `3px 3px 0 0 #000` | Badges, chips, inline |
| Medium | `5px 5px 0 0 #000` | Cards, buttons (default) |
| Large | `8px 8px 0 0 #000` | Overlays, hero elements |
| Extra Large | `12px 12px 0 0 #000` | Dialogs, max emphasis |

### Typography System

**Recommended Font Pairings:**

**Pairing 1 — Balanced:**
- Display: Syne 800 (quirky grotesque, weights 400-800)
- Headings: Space Grotesk 700 (geometric with personality, weights 300-700)
- Body: Inter 400 (screen-optimized, weights 100-900)
- Mono: Space Mono (geometric brutalist, weights 400/700)

**Pairing 2 — Warm:**
- Display: Bebas Neue 400 (condensed poster energy)
- Headings: Plus Jakarta Sans 700 (modern geometric, weights 200-800)
- Body: DM Sans 400 (warmer geometric)
- Mono: JetBrains Mono (developer-focused, weights 100-800)

**Pairing 3 — Maximum Contrast:**
- Display: Archivo Black 400 (pure grotesque)
- Headings: Outfit 700 (round geometric, weights 100-900)
- Body: Inter 400
- Mono: Space Mono

### Pattern A: Marketing Hero (Pure Brutalist)

Asymmetric layout with offset cards, massive type, hard shadows. CSS Grid with intentional overlap:
```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 4px solid #000;
}

.hero-text {
  padding: 4rem;
  background: #FFD23F;
  border-right: 4px solid #000;
}

.hero-image {
  position: relative;
  overflow: hidden;
}

/* Offset card overlapping grid boundary */
.floating-card {
  position: absolute;
  bottom: -2rem;
  right: -2rem;
  background: #fff;
  border: 3px solid #000;
  box-shadow: 8px 8px 0 0 #000;
  padding: 1.5rem;
  z-index: 10;
}
```

### Pattern B: Brutalist Dashboard

Apply neo-brutalism to functional interfaces. Use aggressive styles for headers and navigation; dial down intensity for data-dense areas:
```css
/* Aggressive header */
.dashboard-header {
  background: #000;
  color: #FFD23F;
  border-bottom: 4px solid #FFD23F;
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  padding: 1rem 2rem;
}

/* Functional data area — reduced intensity */
.data-card {
  border: 2px solid #000;
  box-shadow: 3px 3px 0 0 #000;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
}
```

### Pattern C: Brutalist + WebGL Hybrid (Samsy Style)

Use Astro island architecture for the page shell; embed WebGL canvas for immersive hero or background. OGL instead of Three.js for lighter footprint. GSAP handles scroll-triggered reveals. Mobile fallback replaces WebGL with touch-friendly slide transitions.

### Pattern D: Glitch Brutalism

CSS-only glitch effect for headings:
```css
.glitch {
  position: relative;
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(3rem, 8vw, 8rem);
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
}

.glitch::before {
  color: #FF6B6B;
  clip-path: inset(0 0 65% 0);
  animation: glitch-top 2s infinite;
}

.glitch::after {
  color: #74B9FF;
  clip-path: inset(35% 0 0 0);
  animation: glitch-bottom 2s infinite;
}

@keyframes glitch-top {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(3px, -3px); }
  60% { transform: translate(-2px, 2px); }
}
```

## 4. Accessibility Considerations

### The Brutalist Accessibility Paradox

Brutalism's high-contrast, bold typography can *improve* accessibility — but its unconventional patterns can also harm it. The key is intentionality.

**Natural Advantages:**
- Black (#000) on Off-White (#FFFDF5) achieves 18.5:1 contrast ratio (far exceeds WCAG AAA 7:1)
- Oversized typography improves readability for users with visual impairments
- Bold borders create clear visual boundaries and containment
- Flat colors with no gradient overlays simplify contrast testing

**Risks and Mitigations:**

| Risk | Mitigation |
|------|------------|
| Loud color accents may fail contrast | Test every accent: Yellow (#FFD23F) on white fails (2.1:1). Use on black backgrounds or as decoration only. |
| Decorative shadows obscure focus indicators | Use `outline-offset: 3px` to push focus ring outside shadow |
| Unconventional navigation confuses users | Keep nav patterns unconventional in *style*, predictable in *behavior* |
| Color-only meaning (violates 1.4.1) | Add icons, underlines, or text labels alongside color |
| Small click targets hidden by large text | Minimum 24x24px interactive areas (WCAG 2.5.8) |

### WCAG Compliance Checklist for Brutalism

```css
/* Focus must ALWAYS be visible — shadows cannot hide it */
*:focus-visible {
  outline: 3px solid #74B9FF;
  outline-offset: 3px;   /* Push outside the hard shadow */
}

/* Large text threshold: 18pt+ or 14pt+ bold */
/* Needs 3:1 minimum contrast */
.nb-display {
  /* Syne 800 at clamp(3rem,...) exceeds large text threshold */
  /* #000 on #FFFDF5 = 18.5:1 — passes easily */
}
```

### Semantic HTML Under Brutalist Styling

Brutalism often reduces CSS/JS in favor of HTML structure. This aligns well with accessibility:
```html
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/work">Work</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Project Title</h1>
    <!-- Content with proper heading hierarchy -->
  </article>
</main>
```

### Screen Reader Considerations

- ARIA landmarks (`nav`, `main`, `aside`, `footer`) remain essential
- Alt text for all images — brutalist sites often use decorative images that should be `aria-hidden="true"`
- If using WebGL canvas backgrounds (like Samsy), provide text alternatives
- Announce dropdown state changes: `aria-expanded="true/false"`

## 5. Performance Implications

### The Brutalist Performance Advantage

Brutalism naturally aligns with performance best practices:
- **Minimal CSS:** Fewer gradients, shadows use zero blur (no compositing layer), flat colors
- **Reduced JavaScript:** Philosophy favors HTML structure over JS-powered interactions
- **Simple layouts:** Grid/Flexbox, no complex scroll-jacking or parallax
- **System fonts as fallback:** Mono and sans-serif stacks load fast

### Shadow Performance

Zero-blur `box-shadow` is **cheaper** than blurred shadows:
```css
/* Cheap — no blur calculation needed */
box-shadow: 5px 5px 0 0 #000;

/* Expensive — blur requires compositing */
box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
```

### Typography Loading

Large display fonts are the biggest performance cost in brutalist design:
```html
<!-- Preload critical display font -->
<link rel="preload" href="/fonts/syne-800.woff2" as="font" type="font/woff2" crossorigin>

<!-- Variable font reduces total downloads -->
<link rel="preload" href="/fonts/syne-variable.woff2" as="font" type="font/woff2" crossorigin>
```

- Use `font-display: swap` to avoid FOIT (Flash of Invisible Text)
- Subset fonts to used characters if possible
- Variable fonts (single file for all weights) are ideal for brutalist design where you use multiple weights of the same family

### When Brutalism Gets Heavy

**WebGL hybrid (Samsy-style):** 120+ FPS is achievable with WebGPU but requires careful mobile optimization. Disable complex scroll triggers on mobile; replace with simple slide transitions.

**GSAP SplitText animations:** Character-level DOM nodes multiply rapidly. Use `revert()` after animation completes to clean up.

**Interactive grid backgrounds:** Distance calculations for every block on every mousemove can be expensive. Use `requestAnimationFrame` and throttle to 30fps.

### Recommendations
1. Start with HTML + minimal CSS — add complexity only where needed
2. Zero-blur shadows are essentially free; use them liberally
3. Preload 1-2 display fonts; lazy-load body/mono fonts
4. If using WebGL, provide lightweight CSS fallback for mobile
5. Brutalist animation should be *snappy* (0.1-0.15s transitions) not *smooth* (0.3-0.5s) — faster transitions = fewer frames to render
6. Use `content-visibility: auto` on off-screen brutalist sections for rendering savings

---

## Cross-Trend Summary: Choosing the Right Approach

| Consideration | Gradients | Hand-Drawn | Brutalism |
|--------------|-----------|------------|-----------|
| **JS Required** | Optional (CSS-only possible) | Usually yes (Rough.js, Vivus, Lottie) | Minimal (CSS-first) |
| **Performance** | Medium-Heavy (WebGL) to Light (CSS) | Medium (SVG filters expensive) | Light (zero-blur, flat colors) |
| **Accessibility** | Hardest (contrast on gradients) | Medium (motion sensitivity) | Easiest (high contrast natural) |
| **Mobile** | WebGL needs fallback | SVG filters are CPU-heavy | Naturally responsive |
| **Bundle Size** | 0kb (CSS) to 10kb (WebGL) | 9kb (Rough.js) to 30kb+ (Lottie) | 0kb (pure CSS) to 30kb (GSAP) |
| **Best For** | Premium feel, brand identity | Personality, warmth, playfulness | Bold statements, dev portfolios |

---

## Sources

### Trend 4: Gradients
- [CSS Gradient Animation: 5 Methods with Live Examples (2026)](https://frontend-hero.com/how-to-animate-gradients-css)
- [A flowing WebGL gradient, deconstructed](https://alexharri.com/blog/webgl-gradients)
- [OKLCH in CSS: Why We Moved from RGB and HSL — Evil Martians](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [CSS color-mix() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix)
- [OKLCH — The Ultimate Guide](https://oklch.org/posts/ultimate-oklch-guide)
- [Moving Mesh Gradient with Stripe WebGL Package](https://medium.com/design-bootcamp/moving-mesh-gradient-background-with-stripe-mesh-gradient-webgl-package-6dc1c69c4fa2)
- [Magical Rainbow Gradients with CSS Houdini — Josh W. Comeau](https://www.joshwcomeau.com/react/rainbow-button/)
- [CSS @property — web.dev](https://web.dev/articles/at-property)
- [Cursor-Reactive Gradients — DEV Community](https://dev.to/sammiihk/cursor-reactive-gradients-making-css-respond-to-mouse-position-5ga3)
- [Stripe Gradient WebGL Implementation](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/)
- [Barba.js Documentation](https://barba.js.org/docs/getstarted/basic-transition/)
- [Animating SVG Gradients with GSAP](https://gsap.com/community/forums/topic/34433-animating-svg-gradients-dynamically-using-gsap/)
- [Gradient Accessibility Guide — Instant Gradient](https://instantgradient.com/blog/accessible_gradient_guide)
- [CSS Gradient Complete Guide 2026 — Toolypet](https://www.toolypet.com/blog/css-gradient-complete-guide)
- [CSS HDR Gradients Playground](https://gradient.style/)
- [Mesh Gradient CSS — Design-A11y](https://www.design-a11y.com/mesh-gradient-css)
- [MSHR Mesh Gradient Generator](https://www.mshr.app/)
- [Trendy Gradients in Web Design — Awwwards](https://www.awwwards.com/gradients-in-web-design-elements.html)

### Trend 5: Hand-Drawn Illustrations
- [Rough.js Official](https://roughjs.com/)
- [Rough.js Algorithms Explained — shihn.ca](https://shihn.ca/posts/2020/roughjs-algorithms/)
- [SVG2Rough.js — Convert SVG to Hand-Drawn](https://fskpf.github.io/)
- [Vivus.js — SVG Animation](https://maxwellito.github.io/vivus/)
- [Simulating Hand-Drawn Motion with SVG Filters — Camillo Visini](https://camillovisini.com/coding/simulating-hand-drawn-motion-with-svg-filters)
- [SVG Hand-Drawing Without JS](https://kirgroup.net/blog/2025/07/21-SVG-Hand-Drawing-without-js.html)
- [Wired Elements — Hand-Drawn Web Components](https://wiredjs.com/)
- [DoodleCSS — GitHub](https://github.com/chr15m/DoodleCSS)
- [Lottie Web — GitHub (airbnb)](https://github.com/airbnb/lottie-web)
- [LottieFiles](https://lottiefiles.com/)
- [Lottie vs SVG Animation — Creattie](https://creattie.com/blog/svg-vs-lottie)
- [Leveraging Lottie for Performance — New Target](https://www.newtarget.com/web-insights-blog/animation-in-website-design/)
- [Accessible Web Animation: WCAG Explained — CSS-Tricks](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/)
- [Accessible SVGs — Smashing Magazine](https://www.smashingmagazine.com/2020/03/accessible-svgs-inclusiveness-beyond-patterns/)
- [SVG Animation Performance Optimization — SVGator](https://www.svgator.com/blog/svg-optimizations-improve-page-speed/)
- [feTurbulence — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence)
- [feDisplacementMap — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap)
- [Hand-Drawn CSS Elements — Speckyboy](https://speckyboy.com/css-javascript-snippets-hand-drawn-elements/)
- [prefers-reduced-motion — web.dev](https://web.dev/articles/prefers-reduced-motion)

### Trend 6: Brutalism
- [Neubrutalism — The Definitive Guide](https://neubrutalism.com/)
- [Neubrutalism: Definition and Best Practices — NN/g](https://www.nngroup.com/articles/neobrutalism/)
- [Neubrutalism Web Design Trend — Bejamas](https://bejamas.com/blog/neubrutalism-web-design-trend)
- [Neo-Brutalism CSS Library — GitHub](https://github.com/Walikuperek/Neo-brutalism-CSS)
- [Neobrutalism Components — GitHub](https://github.com/ekmas/neobrutalism-components)
- [Neobrutalism.dev — Tailwind Components](https://www.neobrutalism.dev/)
- [Brutalist / Industrial Portfolio — DEV Community](https://dev.to/quodline/brutalist-industrial-creative-developer-portfolio-2fbl)
- [Eloy Benoffi's Brutalist Portfolio — Codrops](https://tympanus.net/codrops/2025/10/15/from-blank-canvas-to-mayhem-eloy-benoffis-brutalist-glitchy-portfolio-built-with-webflow-and-gsap/)
- [Neo-Brutalism Button with Tailwind — Medium](https://medium.com/@dewamadewira25/how-to-make-a-neo-brutalism-button-using-tailwindcss-91d3faf2b269)
- [Samsy Ninja — Awwwards](https://www.awwwards.com/inspiration/samsy-ninja-portfolio)
- [Gen-02 Portfolio — WebGPU Community](https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world/)
- [Brutalism vs Neubrutalism — CCCreative](https://www.cccreative.design/blogs/brutalism-vs-neubrutalism-in-ui-design)
- [Web Brutalism — LogRocket](https://blog.logrocket.com/ux-design/web-brutalism/)
- [Brutalist Web Design Principles — nat.io](https://nat.io/blog/brutalist-design-principles)
- [How to Implement Brutalism — Pixel Free Studio](https://blog.pixelfreestudio.com/how-to-implement-brutalism-in-web-design/)
- [CSS Neobrutalism Examples — Free Frontend](https://freefrontend.com/css-neobrutalism/)
- [Web Design Trends 2026 — Devolfs](https://www.devolfs.com/blog/web-design-trends-2026)
