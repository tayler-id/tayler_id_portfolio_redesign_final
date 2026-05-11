# Demos — Mini Design System

Interactive HTML representations of each case-study product, cleaner and sharper than the source Figma. Built so we can swap merchants, lenders, themes, and tenants per project without rewriting.

## Why a system

Each anchor case study needs *several* interactive views (Apply across 6 lenders × 5 merchants; Transact across 4 tenants; OnboardIQ across workflow states). Hardcoding inline styles per view doesn't scale. One token layer + one primitive layer = every demo composes from the same vocabulary.

## Structure

```
components/demos/
├── _system/
│   ├── tokens.ts             # per-project token sets (apply | transact | onboardiq)
│   ├── theme-provider.tsx    # sets CSS vars on a scoped wrapper
│   ├── primitives/           # generic UI atoms — consume CSS vars
│   │   ├── card.tsx
│   │   ├── show-input.tsx
│   │   ├── stepper.tsx
│   │   ├── pill.tsx
│   │   ├── button.tsx
│   │   ├── brand-header.tsx
│   │   └── status-badge.tsx
│   └── data/
│       ├── lenders.ts        # 6 Apply lenders — brand color, logo, copy
│       └── merchants.ts      # 5 Apply merchants — Layers, Ashley, City Furniture, WSH, Western Dental
├── apply/
│   ├── apply-demo.tsx        # root composition with state
│   ├── merchant-chrome.tsx
│   ├── decline-card.tsx
│   └── form-pane.tsx
├── transact/                 # later
└── onboardiq/                # later
```

## Component audit

### Apply
- `MerchantChrome` (left rail: logo + 3-step stepper)
- `LenderHeader` (logo + divider + flow title)
- `DeclineCard` (compact, sits above the active form)
- `FormPane` (the lender's application form)
- `LenderSwitcher` (pill row to swap lenders)
- `MerchantSwitcher` (pill row to swap merchants — Layers → Ashley → City → WSH → Western Dental)

### Transact + Insight (future)
- `AppShell` (top nav + side rail + content)
- `StatTile`, `DataTable`, `FilterChips`, `StatusBadge`, `Dropdown`, `Avatar`
- `ApplicationDetailPanel` with `CascadeAuditRow`
- `ApprovalsChart` (bar/area)

### OnboardIQ (future)
- `WorkflowGraph` (canvas nodes + edges)
- `WorkflowInstanceCard`, `StepConfigModal`, `ActivityTimeline`, `TaskInboxRow`
- `TabNav`, `StatusPill`, `Tag`

### Shared across all 3
`Card`, `Button`, `ShowInput`, `Pill`, `BrandHeader`, `StatusBadge` — these go in `_system/primitives/`.

## Tokens

Each project defines a token set: `pad`, `card-bg`, `border`, `text-primary/secondary/tertiary`, `cta`, `cta-text`, radii, shadows, font family, accent.

The `ThemeProvider` wrapper sets these as CSS variables on a scoped element so primitives just use `bg-[var(--card-bg)]`, `text-[var(--text-primary)]`, etc. No prop-drilling.

## Typography

- Demos override the site's Inter font with the *actual product font* (Poppins for Apply). The product is what we're demoing — the demo should be faithful to that visual language. Site chrome around the demo stays in site fonts.

## Open questions

- Should `MerchantSwitcher` ship in v1 or only `LenderSwitcher`? Decide after first Apply demo lands.
- Do we co-locate lender SVG logos here, or under `/public/assets/.../lender-logos/`? Currently `/public`.
