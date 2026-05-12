'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { getLender, type LenderKey } from '@/components/demos/_system/data/lenders'

/**
 * The Cascade — annotated flowchart.
 *
 * Two matching bordered cards side-by-side. Chart on the left, detail aside
 * on the right (sticky on desktop). Click any node to activate it; the aside
 * updates. The chart is austere; the aside does the storytelling.
 */

type Step = { key: LenderKey; declined: boolean }

const STEPS: Step[] = [
  { key: 'synchrony', declined: true },
  { key: 'wells-fargo', declined: true },
  { key: 'fortiva', declined: true },
  { key: 'acima', declined: false },
]

type NodeKey = LenderKey | 'apply' | 'gateway' | 'approved' | 'logged' | null

/* --- Compact layout --- */
const VIEW_W = 560
const CENTER = 210

const APPLY_Y = 16
const APPLY_H = 48

const GATEWAY_Y = 92
const GATEWAY_H = 52

const DIAMOND_W = 170
const DIAMOND_H = 60
const GATE_START_Y = 188
const GATE_GAP = 92

const LOGGED_X = 380
const LOGGED_W = 150
const LOGGED_H = 42

const lastGateY = GATE_START_Y + (STEPS.length - 1) * GATE_GAP
const APPROVED_Y = lastGateY + DIAMOND_H + 56
const APPROVED_H = 56

const VIEW_H = APPROVED_Y + APPROVED_H + 16

export function CascadeFlowchart() {
  const [active, setActive] = React.useState<NodeKey>(null)

  const select = (k: NodeKey) => (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    setActive(k)
  }

  return (
    <div className="w-full" onClick={() => setActive(null)}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-8 items-start">
        {/* CHART CARD */}
        <div className="border border-border rounded-lg bg-card p-5 sm:p-7">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="block w-full h-auto"
            style={{ maxWidth: VIEW_W, margin: '0 auto' }}
            role="img"
            aria-label="The Cascade flowchart. Click any node to read its detail."
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

            {/* Apply → Gateway */}
            <Edge x1={CENTER} y1={APPLY_Y + APPLY_H} x2={CENTER} y2={GATEWAY_Y} />

            {/* Gateway → first gate */}
            <Edge
              x1={CENTER}
              y1={GATEWAY_Y + GATEWAY_H}
              x2={CENTER}
              y2={GATE_START_Y}
            />

            {/* Cascade gates + branches */}
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
                    <Edge
                      x1={CENTER}
                      y1={gateTop + DIAMOND_H}
                      x2={CENTER}
                      y2={nextGateTop}
                    />
                  )}

                  {/* Side branch: declined → Logged box (only draw box for first instance) */}
                  {!isApproved && (
                    <path
                      d={`M ${CENTER + DIAMOND_W / 2} ${cy} L ${LOGGED_X - 4} ${cy}`}
                      className="stroke-muted-foreground/45"
                      strokeWidth={1.25}
                      strokeDasharray="4 4"
                      fill="none"
                      markerEnd="url(#arr-decline)"
                    />
                  )}

                  {/* Yes-branch (approval) */}
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
                          fontSize: 10,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        yes
                      </text>
                    </>
                  )}

                  {/* Diamond gate */}
                  <DiamondGate
                    cx={CENTER}
                    cy={cy}
                    w={DIAMOND_W}
                    h={DIAMOND_H}
                    lenderKey={step.key}
                    lenderName={lender.shortName}
                    declined={step.declined}
                    active={active}
                    onSelect={select}
                  />
                </g>
              )
            })}

            {/* Single "no" label on the first decline edge (label by example, not on every arrow) */}
            <text
              x={LOGGED_X - 20}
              y={GATE_START_Y + DIAMOND_H / 2 - 6}
              textAnchor="end"
              className="fill-muted-foreground font-mono"
              style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              no
            </text>

            {/* Logged box — covers all four declines (single shared terminal) */}
            <LoggedBox
              x={LOGGED_X}
              y={GATE_START_Y + DIAMOND_H / 2 - LOGGED_H / 2}
              w={LOGGED_W}
              h={(STEPS.length - 1) * GATE_GAP + LOGGED_H}
              active={active}
              onSelect={select}
            />

            {/* Top connector lines from each decline arrow into the shared logged box — already drawn above */}

            {/* APPLY pill */}
            <Pill
              x={CENTER - 90}
              y={APPLY_Y}
              w={180}
              h={APPLY_H}
              label="Apply"
              sub="1 form · 1 device"
              nodeKey="apply"
              active={active}
              onSelect={select}
            />

            {/* GATEWAY rect */}
            <ProcessNode
              x={CENTER - 100}
              y={GATEWAY_Y}
              w={200}
              h={GATEWAY_H}
              label="Versatile Apply gateway"
              sub="1 contract · 35+ lenders"
              nodeKey="gateway"
              active={active}
              onSelect={select}
            />

            {/* APPROVED pill */}
            <Pill
              x={CENTER - 110}
              y={APPROVED_Y}
              w={220}
              h={APPROVED_H}
              label="Approved"
              sub="single screen · ~3 min"
              nodeKey="approved"
              primary
              active={active}
              onSelect={select}
            />
          </svg>
        </div>

        {/* ASIDE — sticky on desktop */}
        <aside className="lg:sticky lg:top-24" onClick={(e) => e.stopPropagation()}>
          <DetailCard active={active} setActive={setActive} />
        </aside>
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
      className="stroke-foreground/55"
      strokeWidth={1.5}
      markerEnd="url(#arr)"
    />
  )
}

type SelectFn = (k: NodeKey) => (e: React.MouseEvent | React.KeyboardEvent) => void

interface NodeProps {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub: string
  nodeKey: NodeKey
  active: NodeKey
  onSelect: SelectFn
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
  active,
  onSelect,
}: NodeProps & { primary?: boolean }) {
  const isActive = active === nodeKey
  return (
    <g
      onClick={onSelect(nodeKey)}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${label} — ${sub}`}
      style={{ cursor: 'pointer' }}
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
            ? 'fill-primary stroke-primary'
            : cn('fill-card stroke-foreground/55', isActive && 'stroke-primary')
        )}
        strokeWidth={isActive ? 2.5 : 1.75}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 1}
        textAnchor="middle"
        className={cn('font-display', primary ? 'fill-primary-foreground' : 'fill-foreground')}
        style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 13}
        textAnchor="middle"
        className={cn(
          'font-mono',
          primary ? 'fill-primary-foreground/85' : 'fill-muted-foreground'
        )}
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
  active,
  onSelect,
}: NodeProps) {
  const isActive = active === nodeKey
  return (
    <g
      onClick={onSelect(nodeKey)}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${label} — ${sub}`}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={cn(
          'fill-card transition-colors',
          isActive ? 'stroke-primary' : 'stroke-foreground/55'
        )}
        strokeWidth={isActive ? 2.5 : 1.75}
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
  active,
  onSelect,
}: {
  cx: number
  cy: number
  w: number
  h: number
  lenderKey: LenderKey
  lenderName: string
  declined: boolean
  active: NodeKey
  onSelect: SelectFn
}) {
  const isActive = active === lenderKey
  const path = `M ${cx},${cy - h / 2} L ${cx + w / 2},${cy} L ${cx},${cy + h / 2} L ${cx - w / 2},${cy} Z`
  return (
    <g
      onClick={onSelect(lenderKey)}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${lenderName} approves?`}
      style={{ cursor: 'pointer' }}
    >
      <path
        d={path}
        className={cn(
          'fill-card transition-all',
          isActive ? 'stroke-primary' : 'stroke-foreground/55'
        )}
        strokeWidth={isActive ? 2.5 : 1.75}
      />
      <text
        x={cx}
        y={cy - 2}
        textAnchor="middle"
        className="fill-foreground font-display"
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

function LoggedBox({
  x,
  y,
  w,
  h,
  active,
  onSelect,
}: {
  x: number
  y: number
  w: number
  h: number
  active: NodeKey
  onSelect: SelectFn
}) {
  const isActive = active === 'logged'
  return (
    <g
      onClick={onSelect('logged')}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label="Decline logged: 4 declines kept for compliance, never rendered to the consumer."
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={cn(
          'fill-muted/30 transition-colors',
          isActive ? 'stroke-primary' : 'stroke-border'
        )}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray="4 4"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 4}
        textAnchor="middle"
        className="fill-muted-foreground font-display"
        style={{ fontSize: 12, fontWeight: 700 }}
      >
        Logged
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 12}
        textAnchor="middle"
        className="fill-muted-foreground font-mono"
        style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}
      >
        hidden from consumer
      </text>
    </g>
  )
}

/* ---------- Detail aside ---------- */

function DetailCard({
  active,
  setActive,
}: {
  active: NodeKey
  setActive: React.Dispatch<React.SetStateAction<NodeKey>>
}) {
  const content = describe(active)
  return (
    <div className="border border-border rounded-lg bg-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
          {active === null ? 'Click a node →' : content.eyebrow}
        </div>
        {active !== null && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActive(null)
            }}
            className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear selection"
          >
            Clear
          </button>
        )}
      </div>
      <div className="text-lg sm:text-xl font-display font-bold tracking-tight text-foreground mb-3 leading-tight">
        {content.title}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{content.body}</p>
    </div>
  )
}

function describe(k: NodeKey): { eyebrow: string; title: string; body: string } {
  if (k === null) {
    return {
      eyebrow: 'The cascade · UX magic trick',
      title: 'One form in. One outcome out.',
      body:
        'Click any node in the chart. The consumer experiences a linear flow. Behind the scenes the gateway attempts four lenders in priority order, logs three declines for compliance, and surfaces only the approval.',
    }
  }
  if (k === 'apply') {
    return {
      eyebrow: 'Step 01 · what the consumer does',
      title: 'Apply',
      body:
        'One form, one device. Kiosk, in-home sales tablet, in-chair tablet, or phone. The application is captured once and submitted once.',
    }
  }
  if (k === 'gateway') {
    return {
      eyebrow: 'Step 02 · back-end · platform',
      title: 'Versatile Apply gateway',
      body:
        'One contract for 35+ lenders. The gateway normalizes fields, owns compliance language, and routes the application to the cascade in priority order. Adding a new lender is a contract mapping, not a new flow.',
    }
  }
  if (k === 'logged') {
    const declineCount = STEPS.filter((s) => s.declined).length
    return {
      eyebrow: 'Compliance trail · never rendered',
      title: `${declineCount} declines logged`,
      body:
        'Each declining lender returns a written-notification obligation. Those records live in the audit trail; none of the decline screens are shown to the consumer.',
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
      : `${lender.name} approves. The cascade stops here. Downstream lenders are skipped.`,
  }
}
