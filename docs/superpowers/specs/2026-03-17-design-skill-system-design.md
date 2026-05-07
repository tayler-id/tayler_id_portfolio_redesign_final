# Design Skill System — Spec

## Problem

The current `web-design-trends-2026` skill is a shallow catalog of 14 trends with generic code snippets and broken headless screenshots. It can't actually guide building a distinctive website. It reads like a listicle, not a design director.

## Solution

A layered system of 3 skills that separate concerns:

1. **`design-foundation`** — shared design philosophy, anti-patterns, and systems (typography, color, motion, spatial, interaction) plus a token generator script
2. **`design-trends`** — 14 deep, opinionated trend references with production React components, reference site analysis, and composition rules
3. **`design-orchestrator`** — interviews the user about brand/audience/personality, recommends trends, loads the right references, and merges design tokens

## Conventions

**Skill location:** All 3 skills live under `~/.claude/skills/`:
- `~/.claude/skills/design-foundation/`
- `~/.claude/skills/design-trends/`
- `~/.claude/skills/design-orchestrator/`

**Frontmatter format:** Each SKILL.md uses standard YAML frontmatter:
```yaml
---
name: design-foundation
description: [trigger description]
---
```

**Trigger phrases:**
- `design-foundation`: Triggered by `design-trends` and `design-orchestrator` internally — not user-facing
- `design-trends`: "apply [trend name]", "use modular grids", "make it playful", "add 3D", or when building any web interface and a trend would improve it
- `design-orchestrator`: "redesign my site", "build me a website", "I want a new design", "help me pick a style", "what should my site look like"

**Skill interop:** Skills reference each other by file path. The orchestrator tells Claude to read specific trend references (e.g., "Read `~/.claude/skills/design-trends/references/modular-grids.md`"). No special invocation mechanism — just file reads. The orchestrator's handoff invokes the `superpowers:writing-plans` skill (already installed) for implementation planning.

**Trend count:** 13 trends. `trend-mixing` is a meta-concept documented in the composition rules, not its own trend. The composition matrix is 13x13.

**Validator:** `quick_validate.py` exists at `~/.claude/skills/skill-creator/scripts/quick_validate.py`.

## Architecture

```
design-foundation/
├── SKILL.md                          # Design philosophy, anti-pattern library, alive test
├── references/
│   ├── typography-systems.md         # Variable fonts, fluid type, pairing, personality
│   ├── color-systems.md              # OKLCH, mood mapping, tinted neutrals, gradients
│   ├── motion-systems.md             # Easing philosophy, scroll-driven, GSAP vs FM
│   ├── spatial-systems.md            # Grids that breathe, rhythm, container queries
│   └── interaction-systems.md        # Mouse, keyboard, scroll, touch, reduced-motion
└── scripts/
    └── generate-tokens.ts            # Brand input → CSS vars + Tailwind config

design-trends/
├── SKILL.md                          # Trend selection guide, composition matrix
├── references/
│   ├── modular-grids.md
│   ├── playful-design.md
│   ├── 3d-web.md
│   ├── gradients.md
│   ├── illustrations.md
│   ├── brutalism.md
│   ├── gamification.md
│   ├── gen-z.md
│   ├── anti-design.md
│   ├── minimalism.md
│   ├── variable-fonts.md
│   ├── 2d3d-mixing.md
│   ├── composition-rules.md          # Trend pairing matrix + conflict resolution
│   └── no-code-design.md
├── components/
│   └── react/                        # Production React/Next.js components
│       ├── BentoGrid.tsx
│       ├── AsymmetricLayout.tsx
│       ├── DynamicColumns.tsx
│       ├── MagneticElement.tsx
│       ├── CursorFollower.tsx
│       ├── ScrollReveal.tsx
│       ├── ParallaxLayer.tsx
│       ├── FluidType.tsx
│       ├── WeightShift.tsx
│       ├── AnimatedHeading.tsx
│       ├── DepthLayer.tsx
│       ├── ThreeCanvas.tsx
│       ├── HTMLOverlay.tsx
│       ├── GradientBackground.tsx
│       ├── GlitchText.tsx
│       ├── HandDrawnBorder.tsx
│       └── index.ts                  # Barrel export
└── assets/
    └── screenshots/                  # Reference screenshots (kept from v1)

design-orchestrator/
├── SKILL.md                          # Interview flow, brand discovery, trend matching
└── references/
    └── mood-to-trend-mapping.md      # Mood profiles → trend recommendations
```

## Skill 1: `design-foundation`

### SKILL.md Content

**Philosophy section:**
- Every element earns its place. If it doesn't serve the story, it goes.
- The "alive" test: a site feels alive when interactions respond to the user's intent, not just their input. A hover isn't just "scale up" — it's a response that says something.
- Design is decision-making: the skill should teach Claude to make opinionated choices, not safe ones.

**Anti-pattern library (the 20+ things that make AI sites look like AI):**
- Symmetric card grids repeated endlessly
- Gradient text on every heading
- Glassmorphism as decoration without purpose
- Cyan-on-dark "tech" palette
- Everything centered, same padding everywhere
- Generic hero with big number + small label + sparkline
- Cards inside cards
- Rounded rectangles with drop shadows
- Purple-to-blue gradients
- Dark mode with glowing accents as default
- Monospace font = "developer vibes"
- Icons with rounded corners above every heading
- Gray text on colored backgrounds
- Pure black/white without tinting
- Identical spacing everywhere (no rhythm)
- Modals for everything
- Decorative sparklines that mean nothing
- Thick colored border on one side of a rounded rect

**System references (each ~200-400 lines, loaded on demand):**

`typography-systems.md`:
- Variable font axis strategy (wght, wdth, opsz, slnt, custom)
- Fluid type scales using clamp() with specific formulas
- Font pairing: contrast of form (geometric + humanist), not just weight
- How type creates personality: tight tracking = precision, loose = openness
- Loading strategy: font-display, preload, subset
- Anti-patterns: Inter/Roboto/system defaults, monospace-as-lazy-tech

`color-systems.md`:
- OKLCH color space: why it beats HSL (perceptual uniformity)
- Palette generation: mood → hue range → chroma curve → lightness steps
- Tinted neutrals: shift neutrals toward brand hue for subconscious cohesion
- Gradient craft: oklch interpolation avoids muddy midpoints
- Wide-gamut: color(display-p3) with fallbacks
- Dark mode: not just invert — redesign the palette for emissive context

`motion-systems.md`:
- Easing philosophy: exponential-out for entrances, spring for playful, linear for progress
- Scroll-driven animation API: animation-timeline, view(), scroll()
- GSAP vs Framer Motion decision tree (GSAP for complex orchestration, FM for React component state)
- Orchestration: stagger follows reading order, not random; delays communicate hierarchy
- ScrollTrigger patterns: pin, scrub, batch, snap
- Reduced motion: not just disable — provide meaningful alternatives

`spatial-systems.md`:
- Grids that breathe: varied column widths, asymmetric layouts
- Negative space as design element, not leftover
- Rhythm through alternating tight/generous spacing
- Container queries for component-level responsiveness
- CSS Subgrid for alignment across nested components
- Breakpoint strategy: fluid-first with intentional layout shifts

`interaction-systems.md`:
- Mouse tracking: lerped following, magnetic snapping, cursor morphing
- Keyboard: focus management, skip links, arrow-key navigation
- Scroll: Lenis smooth scroll, parallax layers, horizontal sections
- Touch: gesture recognition, swipe carousels, pull-to-refresh
- Reduced motion alternatives for every interaction pattern

### Token Generator Script

`scripts/generate-tokens.ts` (TypeScript to match project runtime):

**Input schema:**
```typescript
interface TokenInput {
  mood: {
    temperature: 'warm' | 'cold' | 'neutral';
    energy: 'calm' | 'moderate' | 'bold';
    personality: 'playful' | 'refined' | 'raw' | 'minimal';
  };
  trends: string[];          // e.g., ['modular-grids', 'playful-design', 'variable-fonts']
  brandColors?: string[];    // optional oklch/hex anchors — generator builds complementary palette around them
  outputDir: string;         // where to write files, relative to project root
}
```

**Output:** Two files written to `outputDir`:
- `design-tokens.css` — CSS custom properties
- `design-tokens.ts` — Tailwind config partial (export default)

**Generates:** color palette (8-10 shades), type scale (6 sizes), spacing scale (8 steps), easing functions (3-4 named), border radii, shadow system, animation durations

**Trend-to-token mapping** (each trend reference file has a `## Token Adjustments` section defining its overrides):
- brutalism → `--radius: 0`, `--shadow: 4px 4px 0 var(--border)`, `--easing: steps()`
- minimalism → `--spacing-scale: 1.5` (generous), `--palette-chroma: 0.02` (restrained)
- playful → `--easing: cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy), `--radius: 1rem+`
- gradients → adds `--gradient-start/mid/end` tokens
- 3d-web → adds `--perspective`, `--depth-*` tokens
- When trends conflict (e.g., brutalism radii=0 + playful radii=1rem), last-listed trend wins with a warning

**Brand color behavior:** If provided, brand colors anchor the palette. The generator builds complementary/split-complementary shades around them using oklch. If not provided, the mood profile determines the hue range.

## Skill 2: `design-trends`

### SKILL.md Content

Trend selection guide with composition matrix showing which trends amplify each other vs. conflict:

```
            Grids  Play  3D   Grad  Illus  Brut  Gami  GenZ  Anti  Mini  VFont  2D3D  Mix
Grids        —     ++    +    +     +      +     -     +     -     ++    ++     +     ++
Playful     ++      —   ++    ++    +      -     ++    ++    +     +     ++    ++     ++
3D           +     ++    —    ++    -      -     ++    +     +     -     +     ++     ++
Gradients    +     ++   ++     —    -      -     +     +     +     +     +     ++     ++
...
```

`++` = amplifies, `+` = works, `-` = conflicts (explain why in composition-rules)

### Each Trend Reference Structure

Every trend reference file follows this exact structure:

```markdown
# [Trend Name]

## Philosophy
What this trend is REALLY about. Not the technique — the WHY.
(~100 words)

## The Spectrum
Where this trend ranges from subtle → extreme.
- Subtle: [example and when to use]
- Moderate: [example and when to use]
- Full: [example and when to use]
Guidance on where to land based on project type.

## What Makes It Sing vs. Look Generic
### DO
- [Specific, opinionated guidance with reasoning]
### DON'T
- [Anti-patterns specific to this trend with reasoning]

## Reference Site Analysis
For each of the reference sites associated with this trend:
- Site URL and what they do
- Layout structure (measured grid, spacing values)
- Color palette (extracted hex/oklch values)
- Typography (fonts identified, scale observed)
- Motion (timing, easing, triggers observed)
- What makes it memorable (the "steal this" insight)
- What's unique to their brand (don't copy this part)

## Composition Patterns
How this trend works with each of the other 13 trends.
Which combinations amplify, which conflict, and why.

## Production Components
List of React components this trend provides, with:
- Component name and purpose
- Key props
- Usage example
- Where in the components/react/ directory
```

### Production Components

Each component in `components/react/` is a full production file:
- TypeScript with proper types/interfaces
- Props for customization (not config objects — direct props)
- `prefers-reduced-motion` built in via `useReducedMotion()` hook
- Tailwind CSS for styling (configurable via design tokens)
- Framer Motion for animation (where applicable)
- Works standalone or composed with other trend components
- JSDoc comments explaining design decisions

**Priority components (4 chosen trends):**

Modular Grids:
- `BentoGrid` — responsive bento layout with span controls
- `AsymmetricLayout` — 2-panel layout with fixed/scrolling tension
- `DynamicColumns` — container-query-driven column count

Playful Design:
- `MagneticElement` — elements that pull toward cursor on proximity
- `CursorFollower` — custom cursor with context-aware morphing
- `ScrollReveal` — intersection-observer reveal with configurable motion
- `ParallaxLayer` — scroll-driven parallax with depth control

Variable Fonts:
- `FluidType` — clamp-based responsive type with optical size
- `WeightShift` — hover/scroll-driven weight animation
- `AnimatedHeading` — per-character weight wave animation

2D/3D Mixing:
- `DepthLayer` — CSS 3D parallax layer system
- `ThreeCanvas` — minimal Three.js/R3F canvas with perf monitoring
- `HTMLOverlay` — DOM elements positioned in 3D space
- `GradientBackground` — mouse-reactive gradient canvas

**Additional components (other trends):**
- `GlitchText` — brutalism text glitch effect
- `HandDrawnBorder` — SVG rough-style borders
- Plus more as each trend is fleshed out

### Reference Site Analysis

No consolidated `reference-sites.md` file. Each site analysis lives inside its trend's reference file under the `## Reference Site Analysis` section. This keeps analysis co-located with the trend that uses it. If a site spans multiple trends, reference the other trend file by name.

**Site-to-trend mapping for agents:**

| Site | Primary trend file |
|------|-------------------|
| labs.chaingpt.org | modular-grids.md |
| patrickheng.com | playful-design.md |
| conceptcapers.com | 3d-web.md |
| alche.studio | gradients.md |
| flyingpapers.com | illustrations.md |
| gm-meme.com | illustrations.md |
| samsy.ninja | brutalism.md |
| karocrafts.com | gamification.md |
| portalone.studio | gen-z.md |
| olhalazarieva.com | minimalism.md |
| figma.com/typography/variable-fonts | variable-fonts.md |
| dversostudio.io | 2d3d-mixing.md |

## Skill 3: `design-orchestrator`

### SKILL.md Content

**Interview flow (triggered when user says "redesign my site" or "build me a website"):**

**Branching:** The flow is not strictly linear. Handle these common deviations:
- **User already knows trends** → skip to step 3 (token generation). Ask "which trends?" and proceed.
- **User rejects recommendations** → show the full 13-trend list with one-line descriptions, let them browse and pick.
- **User wants to change tokens after seeing composition** → loop back to step 3, regenerate.
- **User returns mid-build wanting to add/change trends** → re-enter at step 2 with existing choices pre-loaded.

1. **Brand discovery** (~3 questions):
   - "What do you want people to FEEL when they land on your site?" (not what it looks like — what it feels like)
   - "Who's your audience and what matters to them?" (recruiters scanning fast vs. creatives exploring slowly)
   - "Show me 1-2 sites you admire — not to copy, but so I understand your taste"

2. **Personality mapping** → maps answers to trend recommendations:
   - Answers map to a mood profile (temperature + energy + personality)
   - Mood profile maps to 2-4 recommended trends with reasoning (see `references/mood-to-trend-mapping.md`)
   - User confirms or adjusts. If they reject, show full trend list.

3. **Token generation**:
   - Runs `generate-tokens.ts` with the mood profile + chosen trends
   - Presents the token set for approval
   - User tweaks colors/fonts if needed. Can loop here.

4. **Composition plan**:
   - Reads `design-trends/references/composition-rules.md` to check for conflicts
   - Proposes how the chosen trends work together on specific pages (hero uses X, projects use Y, about uses Z)
   - User approves the plan. If they want to change tokens, loop back to step 3.

5. **Handoff to implementation**:
   - Tells Claude to read the relevant trend references from `design-trends`
   - Tells Claude to read the relevant foundation references from `design-foundation`
   - Components in `design-trends/components/react/` are available to import
   - Invokes `superpowers:writing-plans` skill for implementation planning

### Composition Rules

Composition rules live in `design-trends/references/composition-rules.md` (NOT in the orchestrator — the orchestrator reads from design-trends to avoid duplication). That file contains:
- The 13x13 composition matrix with `++`/`+`/`-` ratings
- Detailed explanation for each conflict and how to resolve it
- Which trends pair well and why (with examples)
- Page-level guidance: how to vary trends across pages (hero can be bold/3D, inner pages should calm down)
- The "2-3 trend rule": more than 3 trends feels chaotic, fewer than 2 feels generic
- Transition patterns: how to move between trend-zones on a page without it feeling disjointed
- The "trend-mixing" meta-concept: not a trend itself, but the art of combining trends cohesively

## Implementation Plan

### Research-to-Trend Source Material Mapping

Agents writing trend references use these existing research files as source material:

| Trend file | Source research file | Path |
|------------|---------------------|------|
| modular-grids.md | Trends 1-3 research | `redesign/WEB_DESIGN_TRENDS_2026_RESEARCH.md` (Trend 1 section) |
| playful-design.md | Trends 1-3 research | `redesign/WEB_DESIGN_TRENDS_2026_RESEARCH.md` (Trend 2 section) |
| 3d-web.md | Trends 1-3 research | `redesign/WEB_DESIGN_TRENDS_2026_RESEARCH.md` (Trend 3 section) |
| gradients.md | Trends 4-6 research | `redesign/research/trends-4-5-6-gradients-illustrations-brutalism.md` (Trend 4) |
| illustrations.md | Trends 4-6 research | `redesign/research/trends-4-5-6-gradients-illustrations-brutalism.md` (Trend 5) |
| brutalism.md | Trends 4-6 research | `redesign/research/trends-4-5-6-gradients-illustrations-brutalism.md` (Trend 6) |
| gamification.md | Trends 7-9 research | `redesign/research/2026-trends-7-8-9.md` (Trend 7) |
| gen-z.md | Trends 7-9 research | `redesign/research/2026-trends-7-8-9.md` (Trend 8) |
| anti-design.md | Trends 7-9 research | `redesign/research/2026-trends-7-8-9.md` (Trend 9) |
| minimalism.md | Trends 10-13 research | `redesign/research/web-design-trends-2026-part3.md` (Trend 10) |
| variable-fonts.md | Trends 10-13 research | `redesign/research/web-design-trends-2026-part3.md` (Trend 11) |
| 2d3d-mixing.md | Trends 10-13 research | `redesign/research/web-design-trends-2026-part3.md` (Trend 12) |
| no-code-design.md | Trends 10-13 research | `redesign/research/web-design-trends-2026-part3.md` (No Code section) |

All research files live under `/Users/taylerramsay/Projects/tayler_id_portfolio_redesign_final/`.

### Phase 1: Build the 3 skills

1. Delete current `web-design-trends-2026` skill
2. Initialize `design-foundation`, `design-trends`, `design-orchestrator` using `init_skill.py`
3. Dispatch parallel agents:
   - Agent team A (4 agents): Write the 13 trend reference files — each agent gets 3-4 trends with their source research file paths. Each file follows the exact template (Philosophy → Spectrum → DO/DON'T → Reference Site Analysis → Token Adjustments → Composition Patterns → Production Components).
   - Agent team B (1 agent): Write the 5 foundation reference files (typography, color, motion, spatial, interaction systems)
   - Agent team C (1 agent): Write the orchestrator SKILL.md + mood-to-trend-mapping.md + composition-rules.md (lives in design-trends)
   - Agent team D (4 agents): Build the production React components (all trends, ~20+ components)
   - Agent team E (1 agent): Build the token generator script (TypeScript)

### Phase 2: Validate

- Run `quick_validate.py` on all 3 skills
- Test the orchestrator flow manually
- Test token generator with different mood inputs
- Verify components render correctly

### What We Keep From V1

- The 7,200 lines of research — used as SOURCE MATERIAL for the new trend references, not copied verbatim
- The reference site list — used for the deep analysis section
- The screenshots that actually rendered well (ConceptCapers, GM Meme, PortalOne, Figma, KaroCrafts)

### What We Throw Away

- The shallow SKILL.md with its generic code snippets
- The broken screenshots (Alche, Samsy Ninja, Dverso — all WebGL/black)
- The "When to Apply Which Trend" section (replaced by orchestrator interview)
- The performance/accessibility sections (moved to foundation where they belong)
