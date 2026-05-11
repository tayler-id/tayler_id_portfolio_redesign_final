'use client'

import React from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/use-reduced-motion'
import { getLender, type LenderKey } from '@/components/demos/_system/data/lenders'

/**
 * The Cascade — annotated flowchart with sticky detail panel.
 *
 * Layout: chart on the left, detail panel on the right (sticky on desktop).
 * Hover any node in the chart, the panel updates. The chart fits in a
 * single viewport, so the panel and the hovered node are always visible
 * at the same time.
 *
 * Story: top zone is what the consumer sees (Apply). Middle zone is the
 * hidden back-end cascade (Gateway + 4 lender decision gates, 3 declined
 * branches falling off to "logged for compliance"). Bottom zone is what
 * the consumer sees again (Approved).
 */

type Step = { key: LenderKey; declined: boolean }

const STEPS: Step[] = [
  { key: 'synchrony', declined: true },
  { key: 'wells-fargo', declined: true },
  { key: 'fortiva', declined: true },
  { key: 'acima', declined: false },
]

type NodeKey = LenderKey | 'apply' | 'gateway' | 'approved' | 'hidden' | null

/* --- Compact layout: 580 wide x 680 tall --- */
const VIEW_W = 580
const CENTER = 200 // center of node column (left of viewBox)
const LOGGED_X = 360 // left edge of inline "→ logged" labels

const APPLY_Y = 16
const APPLY_H = 50
const ZONE1_BOTTOM = 80

const ZONE2_TOP = 90
const GATEWAY_Y = 108
const GATEWAY_H = 52
const DIAMOND_W = 170
const DIAMOND_H = 64
const GATE_START_Y = 196
const GATE_GAP = 96

const lastGateY = GATE_START_Y + (STEPS.length - 1) * GATE_GAP
const ZONE2_BOTTOM = lastGateY + DIAMOND_H + 22

const ZONE3_TOP = ZONE2_BOTTOM + 8
const APPROVED_Y = ZONE3_TOP + 22
const APPROVED_H = 56

const VIEW_H = APPROVED_Y + APPROVED_H + 24

export function CascadeFlowchart() {
  const ref = React.useRef<HTMLDivElement>(null)
  const motionPref = useMotionPreference()
  const noAnimation = motionPref !== 'regular'
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const animate = noAnimation || isInView
  const [hovered, setHovered] = React.useState<NodeKey>(null)

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
        {/* CHART COLUMN */}
        <div>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="block w-full h-auto"
            style={{ maxWidth: VIEW_W, margin: '0 auto' }}
            role="img"
            aria-label="The Cascade flowchart. Consumer-visible Apply terminal at top. Hidden back-end zone in the middle with the Versatile Apply gateway and four lender decision gates, three of which decline and route to a logged-for-compliance side path. Consumer-visible Approved terminal at the bottom."
          >
            <defs>
              <marker
                id="arr"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" className="fill-foreground/60" />
              </marker>
              <marker
                id="arr-primary"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" className="fill-primary" />
              </marker>
              <marker
                id="arr-decline"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground/50" />
              </marker>
            </defs>

            {/* Back-end zone background */}
            <rect
              x={12}
              y={ZONE2_TOP}
              width={VIEW_W - 24}
              height={ZONE2_BOTTOM - ZONE2_TOP}
              rx={10}
              className="fill-muted/20 stroke-border"
              strokeWidth={1}
              strokeDasharray="5 4"
            />

            {/* Zone labels */}
            <text
              x={CENTER}
              y={11}
              textAnchor="middle"
              className="fill-foreground font-mono"
              style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}
            >
              Consumer · sees this
            </text>
            <text
              x={20}
              y={ZONE2_TOP + 14}
              className="fill-muted-foreground font-mono"
              style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' }}
            >
              Back-end · consumer never sees this
            </text>
            <text
              x={CENTER}
              y={ZONE3_TOP + 16}
              textAnchor="middle"
              className="fill-foreground font-mono"
              style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}
            >
              Consumer · sees this
            </text>

            {/* Submit connector (dashed) */}
            <path
              d={`M ${CENTER} ${APPLY_Y + APPLY_H} L ${CENTER} ${GATEWAY_Y}`}
              className="stroke-foreground/40"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              markerEnd="url(#arr)"
            />
            <text
              x={CENTER + 8}
              y={(APPLY_Y + APPLY_H + GATEWAY_Y) / 2 + 4}
              className="fill-muted-foreground font-mono"
              style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              submit
            </text>

            {/* Gateway → first gate */}
            <Edge
              x1={CENTER}
              y1={GATEWAY_Y + GATEWAY_H}
              x2={CENTER}
              y2={GATE_START_Y}
            />

            {/* Cascade gates */}
            {STEPS.map((step, i) => {
              const lender = getLender(step.key)
              const gateTop = GATE_START_Y + i * GATE_GAP
              const cy = gateTop + DIAMOND_H / 2
              const isLast = i === STEPS.length - 1
              const nextGateTop = !isLast ? GATE_START_Y + (i + 1) * GATE_GAP : null
              const isApproved = !step.declined

              return (
                <g key={step.key}>
                  {/* No-branch vertical to next gate */}
                  {!isApproved && nextGateTop !== null && (
                    <>
                      <Edge
                        x1={CENTER}
                        y1={gateTop + DIAMOND_H}
                        x2={CENTER}
                        y2={nextGateTop}
                      />
                      <text
                        x={CENTER + 6}
                        y={gateTop + DIAMOND_H + (nextGateTop - gateTop - DIAMOND_H) / 2 + 4}
                        className="fill-muted-foreground font-mono"
                        style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}
                      >
                        no
                      </text>
                    </>
                  )}

                  {/* No-branch right-side: inline "→ logged" label */}
                  {!isApproved && (
                    <g
                      onMouseEnter={() => setHovered('hidden')}
                      onMouseLeave={() => setHovered((p) => (p === 'hidden' ? null : p))}
                      style={{ cursor: 'help' }}
                    >
                      <path
                        d={`M ${CENTER + DIAMOND_W / 2} ${cy} L ${LOGGED_X - 4} ${cy}`}
                        className="stroke-muted-foreground/50"
                        strokeWidth={1.25}
                        strokeDasharray="4 4"
                        fill="none"
                        markerEnd="url(#arr-decline)"
                      />
                      <text
                        x={CENTER + DIAMOND_W / 2 + 10}
                        y={cy - 5}
                        className="fill-muted-foreground font-mono"
                        style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}
                      >
                        no
                      </text>
                      <text
                        x={LOGGED_X}
                        y={cy + 4}
                        className="fill-muted-foreground font-mono"
                        style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}
                      >
                        logged · hidden
                      </text>
                    </g>
                  )}

                  {/* Yes-branch (approval): drops through bottom of zone to Approved pill */}
                  {isApproved && (
                    <>
                      <path
                        d={`M ${CENTER} ${gateTop + DIAMOND_H} L ${CENTER} ${APPROVED_Y}`}
                        className="stroke-primary"
                        strokeWidth={2.5}
                        fill="none"
                        markerEnd="url(#arr-primary)"
                      />
                      <text
                        x={CENTER + 8}
                        y={gateTop + DIAMOND_H + 16}
                        className="fill-primary font-mono"
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        yes
                      </text>
                    </>
                  )}

                  {/* The diamond gate */}
                  <DiamondGate
                    cx={CENTER}
                    cy={cy}
                    w={DIAMOND_W}
                    h={DIAMOND_H}
                    lenderKey={step.key}
                    lenderName={lender.shortName}
                    declined={step.declined}
                    hovered={hovered}
                    setHovered={setHovered}
                  />
                </g>
              )
            })}

            {/* APPLY pill */}
            <Pill
              x={CENTER - 100}
              y={APPLY_Y}
              w={200}
              h={APPLY_H}
              label="Apply"
              sub="1 form · 1 device"
              nodeKey="apply"
              hovered={hovered}
              setHovered={setHovered}
            />

            {/* GATEWAY rect */}
            <ProcessNode
              x={CENTER - 110}
              y={GATEWAY_Y}
              w={220}
              h={GATEWAY_H}
              label="Versatile Apply gateway"
              sub="1 contract · 35+ lenders"
              nodeKey="gateway"
              hovered={hovered}
              setHovered={setHovered}
            />

            {/* APPROVED pill */}
            <Pill
              x={CENTER - 120}
              y={APPROVED_Y}
              w={240}
              h={APPROVED_H}
              label="Approved"
              sub="single screen · ~3 min"
              nodeKey="approved"
              primary
              hovered={hovered}
              setHovered={setHovered}
            />
          </svg>

          {/* Legend beneath chart */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <LegendItem>
              <span className="inline-block w-5 h-3 rounded-full border-2 border-foreground/60 bg-card" />
              terminal
            </LegendItem>
            <LegendItem>
              <span className="inline-block w-5 h-3 rounded-sm border-2 border-primary bg-card" />
              process
            </LegendItem>
            <LegendItem>
              <span className="inline-block w-3 h-3 rotate-45 border-2 border-foreground/50 bg-card" />
              decision
            </LegendItem>
            <LegendItem>
              <span className="inline-block w-5 h-3 rounded-sm border border-dashed border-border bg-muted/30" />
              hidden zone
            </LegendItem>
          </div>
        </div>

        {/* DETAIL PANEL (sticky on desktop) */}
        <div className="lg:sticky lg:top-24">
          <DetailPanel hovered={hovered} />
        </div>
      </div>
    </div>
  )
}

/* ---------- SVG primitives ---------- */

function Edge({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className="stroke-foreground/60"
      strokeWidth={1.5}
      markerEnd="url(#arr)"
    />
  )
}

interface NodeProps {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub: string
  nodeKey: NodeKey
  hovered: NodeKey
  setHovered: React.Dispatch<React.SetStateAction<NodeKey>>
}

function Pill({
  x,
  y,
  w,
  h,
  label,
  sub,
  nodeKey,
  primary = false,
  hovered,
  setHovered,
}: NodeProps & { primary?: boolean }) {
  const isHovered = hovered === nodeKey
  return (
    <g
      onMouseEnter={() => setHovered(nodeKey)}
      onMouseLeave={() => setHovered((p) => (p === nodeKey ? null : p))}
      style={{ cursor: 'help' }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h / 2}
        className={cn(
          'transition-colors',
          primary
            ? cn('fill-primary stroke-primary', isHovered && 'fill-primary/90')
            : cn('fill-card stroke-foreground/60', isHovered && 'stroke-foreground')
        )}
        strokeWidth={2}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 1}
        textAnchor="middle"
        className={cn('font-display', primary ? 'fill-primary-foreground' : 'fill-foreground')}
        style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 14}
        textAnchor="middle"
        className={cn('font-mono', primary ? 'fill-primary-foreground/85' : 'fill-muted-foreground')}
        style={{ fontSize: 10, letterSpacing: '0.1em' }}
      >
        {sub}
      </text>
    </g>
  )
}

function ProcessNode({
  x,
  y,
  w,
  h,
  label,
  sub,
  nodeKey,
  hovered,
  setHovered,
}: NodeProps) {
  const isHovered = hovered === nodeKey
  return (
    <g
      onMouseEnter={() => setHovered(nodeKey)}
      onMouseLeave={() => setHovered((p) => (p === nodeKey ? null : p))}
      style={{ cursor: 'help' }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={cn(
          'fill-card stroke-primary transition-colors',
          isHovered && 'fill-primary/5'
        )}
        strokeWidth={2}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 1}
        textAnchor="middle"
        className="fill-foreground font-display"
        style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 14}
        textAnchor="middle"
        className="fill-muted-foreground font-mono"
        style={{ fontSize: 10, letterSpacing: '0.05em' }}
      >
        {sub}
      </text>
    </g>
  )
}

function DiamondGate({
  cx,
  cy,
  w,
  h,
  lenderKey,
  lenderName,
  declined,
  hovered,
  setHovered,
}: {
  cx: number
  cy: number
  w: number
  h: number
  lenderKey: LenderKey
  lenderName: string
  declined: boolean
  hovered: NodeKey
  setHovered: React.Dispatch<React.SetStateAction<NodeKey>>
}) {
  const isHovered = hovered === lenderKey
  const isApproved = !declined
  const path = `M ${cx},${cy - h / 2} L ${cx + w / 2},${cy} L ${cx},${cy + h / 2} L ${cx - w / 2},${cy} Z`
  return (
    <g
      onMouseEnter={() => setHovered(lenderKey)}
      onMouseLeave={() => setHovered((p) => (p === lenderKey ? null : p))}
      style={{ cursor: 'help' }}
    >
      <path
        d={path}
        className={cn(
          'fill-card transition-all',
          isApproved ? 'stroke-primary' : 'stroke-foreground/50',
          declined && !isHovered && 'opacity-80',
          isHovered && (isApproved ? 'fill-primary/5' : 'fill-muted/30')
        )}
        strokeWidth={isApproved ? 2.5 : 1.75}
      />
      <text
        x={cx}
        y={cy - 3}
        textAnchor="middle"
        className={cn('font-display', isApproved ? 'fill-primary' : 'fill-foreground')}
        style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}
      >
        {lenderName}
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="fill-muted-foreground font-mono"
        style={{ fontSize: 10, letterSpacing: '0.05em' }}
      >
        approves?
      </text>
    </g>
  )
}

function LegendItem({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-2">{children}</span>
}

/* ---------- Sticky detail panel ---------- */

function DetailPanel({ hovered }: { hovered: NodeKey }) {
  const content = describe(hovered)
  const dim = hovered === null
  return (
    <aside
      className={cn(
        'border rounded-lg p-5 sm:p-6 transition-colors',
        dim
          ? 'border-dashed border-border bg-card/40'
          : 'border-border bg-card shadow-sm'
      )}
    >
      <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-muted-foreground mb-3">
        {dim ? 'Hover any node →' : content.eyebrow}
      </div>
      <div className="text-lg sm:text-xl font-display font-bold tracking-tight text-foreground mb-3 leading-tight">
        {content.title}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{content.body}</p>
    </aside>
  )
}

function describe(k: NodeKey): { eyebrow: string; title: string; body: string } {
  if (k === null) {
    return {
      eyebrow: 'The cascade · UX magic trick',
      title: 'One form in. One outcome out.',
      body:
        'The consumer experiences a simple linear flow. Behind the scenes, the gateway attempts four lenders in priority order, logs three declines for compliance, and surfaces only the winning approval. Hover any node in the chart for detail.',
    }
  }
  if (k === 'apply') {
    return {
      eyebrow: 'Step 01 · what the consumer does',
      title: 'Apply',
      body:
        'One form, one device. Whether it is a kiosk, an in-home sales tablet, an in-chair tablet, or a phone, the application is captured once and submitted once.',
    }
  }
  if (k === 'gateway') {
    return {
      eyebrow: 'Step 02 · back-end · the platform',
      title: 'Versatile Apply gateway',
      body:
        'One contract for 35+ lenders. The gateway normalizes fields, owns compliance language, and routes the application to the cascade in priority order. Adding a new lender is a contract mapping, not a new flow.',
    }
  }
  if (k === 'hidden') {
    const declineCount = STEPS.filter((s) => s.declined).length
    return {
      eyebrow: 'Compliance trail · never rendered',
      title: `${declineCount} declines logged`,
      body:
        'Each declining lender returns a written-notification obligation. Those records live in the audit trail; none of the decline screens are shown to the consumer. The cascade peels them off, one by one, until an approval lands.',
    }
  }
  if (k === 'approved') {
    return {
      eyebrow: 'Outcome · ~3 minutes total',
      title: 'Approved · single screen',
      body:
        'One outcome reaches the consumer: the winning lender, its terms, its brand. Traditional flows take 10 to 15 minutes and surface every decline along the way. The cascade collapses that into one screen.',
    }
  }
  const lender = getLender(k)
  const stepIndex = STEPS.findIndex((s) => s.key === k)
  const step = STEPS[stepIndex]
  const declined = step?.declined ?? false
  const attempt = `Gate ${stepIndex + 1} of ${STEPS.length}`
  return {
    eyebrow: declined ? `${attempt} · declines` : `${attempt} · approves`,
    title: lender.name,
    body: declined
      ? lender.declineCopy
      : `${lender.name} approves. The cascade stops here. Downstream lenders are skipped: their integrations are never called for this application.`,
  }
}
