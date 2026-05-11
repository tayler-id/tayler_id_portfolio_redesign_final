'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { ScrollReveal } from '@/components/animate-ui/scroll-reveal'
import { CascadeDiagram } from '@/components/diagrams/cascade-diagram'
import { ApplyDemo } from '@/components/demos/apply'
import { ApplyCongratsHero } from '@/components/case-studies/apply-congrats-hero'

const ASSET_BASE = '/assets/versatile/apply'

const verticals = [
  {
    label: 'Home Improvement',
    sublabel: 'West Shore Home · TD Bank',
    image: `${ASSET_BASE}/home-improvement/wsh-02-pre-qualified.png`,
    note: 'Consumer pre-qualified mid-visit. The decision moment lives inside the in-home appointment, not after it.',
  },
  {
    label: 'Retail',
    sublabel: 'City Furniture · Synchrony',
    image: `${ASSET_BASE}/heroes/apply-hero-01-synchrony-decision-city-furniture.png`,
    note: 'In-store kiosk decision — Synchrony approves the consumer at the cashwrap before they leave.',
  },
  {
    label: 'Elective Medical',
    sublabel: 'Western Dental · CareCredit / Sonrava',
    image: `${ASSET_BASE}/elective-medical/wd-03-multi-lender-choice.png`,
    note: 'Multi-lender choice on tablet and mobile. Patients pick the best offer in-chair.',
  },
] as const

const lenderTiles = [
  { file: 'retail-desktop/lender-td-disclosures.png', label: 'TD Bank · Disclosures' },
  { file: 'retail-desktop/lender-acima.png', label: 'Acima' },
  { file: 'retail-desktop/lender-progressive.png', label: 'Progressive' },
  { file: 'retail-desktop/lender-snap.png', label: 'Snap Finance' },
  { file: 'retail-desktop/lender-genesis.png', label: 'Genesis' },
  { file: 'retail-desktop/lender-gaf.png', label: 'Great American Finance' },
]

// Phone screens for Panel 5b — single CITY Furniture / Synchrony progression
// for a coherent flow story. Uniform light background, full-image fit.
const mobilePhones = [
  { file: 'retail-mobile/mobile-synchrony-welcome.png', caption: 'Step 01 · Welcome on consumer phone' },
  { file: 'retail-mobile/mobile-synchrony-step.png', caption: 'Step 02 · Application form' },
  { file: 'retail-mobile/mobile-synchrony-decision.png', caption: 'Step 03 · Disclosures + submit' },
]

const tdComplete = [
  {
    file: 'td-complete/td-01-info-prior.png',
    caption: 'Important Information Prior to Applying — TD-branded with Versatile vendor disclosure',
  },
  {
    file: 'td-complete/td-02-business-info.png',
    caption: 'Business Information — credit purpose, NAICS, ownership, gross annual revenue',
  },
  {
    file: 'td-complete/td-03-personal-guarantor.png',
    caption: 'Personal Guarantor step — partner-aware legal disclosure',
  },
  {
    file: 'td-complete/td-04-acknowledge-submit.png',
    caption: 'Acknowledge and Submit — closing certifications + e-signature',
  },
]

export function VersatileApplyCaseStudy() {
  return (
    <article className="relative">
      {/* Back affordance */}
      <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to portfolio</span>
        </Link>
      </div>

      {/* PANEL 1 — Title + Cascade diagram */}
      <section className="py-16 sm:py-20" aria-labelledby="apply-title">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-10 sm:mb-14">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
                01 / Versatile Apply · Consumer Financing
              </div>
              <h1
                id="apply-title"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.02] mb-6"
              >
                The fastest path to a &ldquo;yes.&rdquo;
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                6M annual applications. 35+ lenders. 4 channels. Themed for every merchant we ship.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 border-y border-border/50 mb-16">
              <StatBlock
                value="12%"
                label="conversion lift on 6M annual applications. Cited as material data in the Synchrony acquisition thesis."
              />
              <StatBlock
                value="3 min"
                label="to a financing decision, vs. 10–15 minutes traditional."
              />
              <StatBlock
                value="35+"
                label="lender integrations. Synchrony · Wells Fargo · TD Bank · GreenSky · Fortiva · Acima · Bread Pay · …"
              />
            </div>
          </ScrollReveal>

          {/* Cascade — no card wrapper, editorial */}
          <ScrollReveal delay={0.15}>
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8 font-mono">
                The Cascade
              </div>
              <CascadeDiagram />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PANEL 2 — Live congrats hero, cycles through 4 lenders */}
      <section className="py-16 sm:py-20" aria-labelledby="apply-hero">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 id="apply-hero" className="sr-only">
              Approval hero — one template, every lender
            </h2>
            <ApplyCongratsHero merchant="ashley" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <figure className="mt-10 sm:mt-14 max-w-3xl border-l-2 border-primary pl-6 py-2">
              <blockquote className="text-2xl sm:text-3xl font-display font-medium leading-snug tracking-tight text-foreground">
                &ldquo;Congratulations, you&apos;re approved &mdash; that anxiety meter goes down,
                and now you&apos;re in the green.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground font-mono">
                Shawn Roberts · VP Retail Financing, Ashley Furniture &nbsp;·&nbsp;{' '}
                <a
                  href="https://www.versatilecredit.com/blog/the-engagement-gap-why-your-credit-strategy-is-only-as-strong-as-your-consumer-connection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  source <ExternalLink className="w-3 h-3" />
                </a>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* PANEL 3 — Problem & approach */}
      <section className="py-16 sm:py-20" aria-labelledby="apply-problem">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
              03 / Problem &amp; approach
            </div>
            <h2
              id="apply-problem"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-8"
            >
              The problem &mdash; and how I approached it
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="text-lg leading-relaxed text-foreground/90 mb-6">
              A consumer applies for financing once. The merchant wants that one application to reach
              35+ lenders &mdash; without 35 forms, 35 redirects, or 35 different compliance gauntlets.
              Every lender has a different gateway, different required fields, different regulatory language.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg leading-relaxed text-foreground/90 mb-10">
              The gateway exposed a single API, but every front-end flow had to absorb that lender&apos;s
              compliance copy, language, and field requirements. The wrong move was to treat compliance text
              as content. The right move was to treat it as a design-system token &mdash; owned by the
              lender&apos;s contract, surfaced at the right moment in the flow, replaced when a regulation
              changed. <strong className="text-foreground">I owned that translation from the gateway contract
              to the user-visible experience &mdash; across 35+ integrations.</strong> That decision &mdash;
              compliance-as-token, not compliance-as-content &mdash; is why we ship lender variants in days
              instead of weeks.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <aside className="border-l-2 border-primary pl-6 py-2 italic text-foreground/80">
              The cascade isn&apos;t a back-end pattern. It&apos;s a UX pattern. The customer should never
              see they got declined by three lenders before being approved.
            </aside>
          </ScrollReveal>
        </div>
      </section>

      {/* PANEL 4 — One product, three verticals */}
      <section className="py-16 sm:py-20" aria-labelledby="apply-verticals">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
                04 / Verticals
              </div>
              <h2
                id="apply-verticals"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4"
              >
                One product. Three verticals.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Versatile Apply is the same product across home improvement, retail, and elective medical.
                The lenders, compliance, and field requirements shift per vertical &mdash; the flow doesn&apos;t.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
            {verticals.map((v, i) => (
              <ScrollReveal key={v.label} delay={0.05 + i * 0.05}>
                <VerticalTile vertical={v} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="mt-12 text-sm text-muted-foreground italic max-w-3xl leading-relaxed">
              Vertical changes mean different lender stacks (home improvement leans Service Finance + Acima;
              elective medical leans CareCredit + Sonrava + Bread Pay), different compliance language, different field
              requirements. The flow architecture absorbs all of it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PANEL 5 — One template, every lender */}
      <section className="py-16 sm:py-20" aria-labelledby="apply-lenders">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
                05 / Lender theming
              </div>
              <h2
                id="apply-lenders"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4"
              >
                One template, every lender
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Inside any vertical, the platform ships brand-correct experiences from one source of truth
                &mdash; 35+ partner brand channels. Switch lenders below to see the same flow re-theme in
                real time, and how the cascade falls forward when a primary declines.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ApplyDemo defaultLender="fortiva" merchant="layers" />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-10 text-sm text-muted-foreground italic max-w-2xl leading-relaxed">
              Adding a lender wasn&apos;t just an API call. Compliance text, language, and field requirements
              vary per partner. One template absorbs all 35+ variations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PANEL 5b — Mobile peer surface */}
      <section className="py-16 sm:py-20" aria-labelledby="apply-mobile">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
                05b / Mobile peer surface
              </div>
              <h2
                id="apply-mobile"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4"
              >
                Same flow, native on mobile
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Snap Sign sends the application from kiosk &rarr; consumer&apos;s own phone via QR or SMS.
                The mobile experience isn&apos;t a port of the desktop &mdash; it&apos;s a peer surface.
              </p>
            </div>
          </ScrollReveal>

          {/* Mobile strip — single CITY Furniture / Synchrony progression, all uniform */}
          <ScrollReveal delay={0.05}>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
              {mobilePhones.map((shot) => (
                <PhoneTile
                  key={shot.file}
                  src={`${ASSET_BASE}/${shot.file}`}
                  caption={shot.caption}
                />
              ))}
            </div>
          </ScrollReveal>

          {/* Patent — left-border note, no card box */}
          <ScrollReveal delay={0.2}>
            <aside className="mt-10 max-w-2xl border-l-2 border-primary pl-6 py-1">
              <div className="text-[11px] uppercase tracking-[0.25em] font-mono text-primary mb-2">
                Patent
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                Snap Sign&trade; is patented (US 11,089,031) &mdash; the kiosk-to-mobile handoff lets a sales
                associate pass an application to the customer&apos;s own device by QR or SMS, completing the
                flow on the consumer&apos;s phone.
              </p>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      {/* PANEL 5c — TD Complete white-label */}
      <section className="py-16 sm:py-20" aria-labelledby="apply-tdcomplete">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
                05c / White label spotlight
              </div>
              <h2
                id="apply-tdcomplete"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4"
              >
                White label, end to end
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Versatile&apos;s white-label model goes further than theming. TD Complete is a fully
                white-labelled TD Bank consumer card application &mdash; built on the Apply platform, with
                TD branding outside <em>and</em> in.
              </p>
            </div>
          </ScrollReveal>

          {/* 4-screen grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            {tdComplete.map((shot, i) => (
              <ScrollReveal key={shot.file} delay={0.05 + i * 0.05}>
                <TDCompleteTile
                  src={`${ASSET_BASE}/${shot.file}`}
                  alt={shot.caption}
                  label={shot.caption}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="mt-10 text-sm text-muted-foreground italic max-w-2xl leading-relaxed">
              One Versatile platform, but the product brand on the surface is TD&apos;s. The Versatile
              attribution lives only where it must legally appear (vendor disclosure on the opening screen).
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PANEL 6 — Outcome & learnings */}
      <section className="py-16 sm:py-24" aria-labelledby="apply-outcome">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 font-mono">
                06 / Outcome
              </div>
              <h2
                id="apply-outcome"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight"
              >
                Outcome
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 border-y border-border/50 mb-12">
              <StatBlock value="12%" label="conversion lift on 6M annual applications" />
              <StatBlock value="+92%" label="prime applicants at Ashley Furniture" />
              <StatBlock value="+157%" label="near-prime approvals at Ashley Furniture" />
            </div>
          </ScrollReveal>

          {/* Ashley detail — left-border accent, no card box */}
          <ScrollReveal delay={0.1}>
            <div className="border-l-2 border-primary pl-6 py-2 mb-12 max-w-3xl">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4 font-mono">
                Ashley Furniture · Versatile cascade live
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <MetricRow label="Prime applicants" value="+92%" />
                <MetricRow label="Near-prime approvals" value="+157%" />
                <MetricRow label="Time-to-decision" value="3 min" sub="vs. 10–15 min traditional" />
              </dl>
              <p className="text-xs text-muted-foreground font-mono mt-6">
                Source:{' '}
                <a
                  href="https://www.versatilecredit.com/blog/the-engagement-gap-why-your-credit-strategy-is-only-as-strong-as-your-consumer-connection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  versatilecredit.com/blog/the-engagement-gap <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-8">
              What I learned
            </h3>
          </ScrollReveal>

          {/* Learning entries — top-border, no card boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 mb-16">
            <ScrollReveal delay={0.05}>
              <Learning
                eyebrow="What worked"
                body="Treating compliance text as a design-system token (not content) let us add new lenders 10× faster than the initial estimate. Once the harness existed, adding a lender went from “weeks of design” to “a day of contract mapping.”"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Learning
                eyebrow="What I'd do differently"
                body="The merchant variation layer was built on top of the lender variation layer instead of as a peer dimension. If I were starting fresh, lender × merchant × channel would be three peer axes from day one — not nested."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <Learning
                eyebrow="Unexpected"
                body={
                  <>
                    Kiosk conversion in retail outperformed mobile in the same merchants. The instinct to
                    declare “mobile-first” is wrong here — when a customer is already in-store, a fixed
                    kiosk converts better than handing them a QR code. Per Versatile&apos;s own COO:{' '}
                    <em>&ldquo;We ship as many kiosks today as we did 10 years ago.&rdquo;</em>
                  </>
                }
              />
            </ScrollReveal>
          </div>

          {/* How it shipped — left-border accent, no card box */}
          <ScrollReveal delay={0.05}>
            <div className="border-l-2 border-primary pl-6 py-2 max-w-3xl">
              <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-mono">
                How it shipped &mdash; engineering sidenote
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                Ashley&apos;s flow rides on the Versatile Apply platform but was built with a Vue.js front
                end against Synchrony&apos;s API contract. I owned the design <em>and</em> the front-end
                implementation &mdash; pairing with backend engineers on the gateway shape, then shipping
                the consumer UI alongside them. That direct ownership is why the compliance-as-token decision
                actually held: I wasn&apos;t sketching it for a handoff, I was writing the components that
                consumed those tokens at render time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </article>
  )
}

/* ---------- Sub-components (editorial style — no boxed cards) ---------- */

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight leading-none text-primary whitespace-nowrap">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground leading-snug">{label}</div>
    </div>
  )
}

function MetricRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground mb-2">
        {label}
      </dt>
      <dd className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground leading-none">
        {value}
      </dd>
      {sub && <div className="text-xs text-muted-foreground mt-2 font-mono">{sub}</div>}
    </div>
  )
}

function Learning({ eyebrow, body }: { eyebrow: string; body: React.ReactNode }) {
  return (
    <div className="border-t border-border/60 pt-5">
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3 font-mono">
        {eyebrow}
      </div>
      <p className="text-base leading-relaxed text-foreground/90">{body}</p>
    </div>
  )
}

/* Reusable iPad landscape device frame (16:10 — matches modern iPad Pro) — padding bezel, object-cover so image fills */
function IPadLandscape({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 1024px',
}: {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div
      className="w-full rounded-[1.5rem] bg-foreground/90 shadow-xl p-2.5 sm:p-3"
      style={{ aspectRatio: '16 / 10' }}
    >
      <div className="w-full h-full rounded-[0.9rem] overflow-hidden bg-white">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          className="w-full h-full object-cover object-top"
          sizes={sizes}
          priority={priority}
        />
      </div>
    </div>
  )
}

/* Hero — iPad landscape framing + caption below */
function ImagePlate({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  priority?: boolean
}) {
  return (
    <figure>
      <IPadLandscape src={src} alt={alt} priority={priority} />
      <figcaption
        className="text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground mt-4"
        dangerouslySetInnerHTML={{ __html: caption }}
      />
    </figure>
  )
}

/* Lender tile — iPad landscape framing, label below */
function LenderImageTile({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <figure className="group">
      <IPadLandscape
        src={src}
        alt={alt}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <figcaption className="text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground mt-4">
        {label}
      </figcaption>
    </figure>
  )
}

/* TD Complete — iPad device frame using padding (not border) so corners stay clean */
function TDCompleteTile({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <figure className="group flex flex-col items-center gap-4">
      {/* Bezel via padding + bg-color (avoids rounded-corner spike artifacts) */}
      <div
        className="w-full max-w-md rounded-[1.75rem] bg-foreground/90 shadow-xl p-3 sm:p-3.5"
        style={{ aspectRatio: '3 / 4' }}
      >
        {/* Inner screen — its own rounding, object-contain so image fits fully */}
        <div className="w-full h-full rounded-[1.1rem] overflow-hidden bg-white flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={1100}
            height={1467}
            className="w-full h-full object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      <figcaption className="text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground leading-snug text-center max-w-xs">
        {label}
      </figcaption>
    </figure>
  )
}

/* Vertical tile (Panel 4) — iPad landscape device frame + label + note */
function VerticalTile({
  vertical,
}: {
  vertical: {
    label: string
    sublabel: string
    image: string
    note: string
  }
}) {
  return (
    <figure className="flex flex-col">
      <IPadLandscape
        src={vertical.image}
        alt={`${vertical.label} flow — ${vertical.sublabel}`}
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
      <figcaption className="mt-5">
        <div className="text-xl font-display font-bold tracking-tight text-foreground">
          {vertical.label}
        </div>
        <div className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mt-1.5">
          {vertical.sublabel}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          {vertical.note}
        </p>
      </figcaption>
    </figure>
  )
}

/* Phone tile — uniform aspect, image fits fully (object-contain), padding bezel for clean corners */
function PhoneTile({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="flex flex-col gap-3 items-center" style={{ width: '200px' }}>
      <div
        className="w-full rounded-[2rem] bg-foreground/90 shadow-lg p-1.5"
        style={{ aspectRatio: '9 / 19.5' }}
      >
        <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-white">
          <Image
            src={src}
            alt={caption}
            width={400}
            height={866}
            className="w-full h-full object-contain"
            sizes="200px"
          />
        </div>
      </div>
      <figcaption className="text-[11px] uppercase tracking-[0.25em] font-mono text-muted-foreground leading-snug text-center max-w-[200px]">
        {caption}
      </figcaption>
    </figure>
  )
}
