'use client'

import React from 'react'
import Image from 'next/image'
import { X, Check } from 'lucide-react'
import { WalkthroughStage } from '@/components/demos/_system/primitives'
import type { WalkthroughScreen } from '@/components/demos/_system/primitives'

const NAVY = '#1e428a'
const GREEN = '#42967f'
const BLUE = '#3b82f6'
const TEXT_PRIMARY = '#0b0d0e'
const SURFACE_BG = '#ebebf3'

const ASSETS = {
  sonravaHealth: '/assets/versatile/apply/sonrava/sonrava-health-logo.svg',
  sonravaCredit: '/assets/versatile/apply/sonrava/sonrava-credit-logo.png',
  carecredit: '/assets/versatile/apply/lender-logos/carecredit.png',
  carecreditCard: '/assets/versatile/apply/sonrava/carecredit-card.png',
  breadPay: '/assets/versatile/apply/lender-logos/breadpay.svg',
  hero: '/assets/versatile/apply/sonrava/hero.png',
}

// ─────────────────────────────────────────────────────────────────────
// Common chrome — merchant header (Sonrava Health logo + close, then stepper)
// Mirrors the ChromeMobile layout used by City Furniture and West Shore Home.
// ─────────────────────────────────────────────────────────────────────
function MerchantHeader({ activeStep }: { activeStep: 0 | 1 | 2 }) {
  return (
    <>
      <div className="flex items-center justify-between px-4 pt-7 pb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.sonravaHealth}
          alt="Sonrava Health"
          style={{ height: 44, width: 'auto', display: 'block', objectFit: 'contain' }}
        />
        <button
          type="button"
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-gray-200"
        >
          <X className="h-4 w-4 text-gray-500" strokeWidth={2} />
        </button>
      </div>
      <div className="px-4 pb-4">
        <SonravaStepper activeStep={activeStep} />
      </div>
    </>
  )
}

function SonravaStepper({ activeStep }: { activeStep: 0 | 1 | 2 }) {
  const nodeSize = 22
  const segments = [0, 1, 2]
  return (
    <ol
      className="mx-auto flex w-full max-w-[520px] items-center justify-center"
      aria-label="Progress"
    >
      {segments.map((i) => {
        const done = i < activeStep
        const active = i === activeStep
        const isLast = i === segments.length - 1
        return (
          <React.Fragment key={i}>
            <li
              className="flex shrink-0 items-center justify-center rounded-full font-semibold"
              style={{
                width: nodeSize,
                height: nodeSize,
                fontSize: 11,
                background: 'white',
                color: done ? GREEN : active ? BLUE : '#9ca3af',
                boxShadow: done
                  ? `inset 0 0 0 2px ${GREEN}`
                  : active
                  ? `inset 0 0 0 2px ${BLUE}`
                  : 'inset 0 0 0 1px #d1d5db',
              }}
              aria-current={active ? 'step' : undefined}
            >
              {done ? <Check style={{ width: 10, height: 10 }} strokeWidth={3} /> : i + 1}
            </li>
            {!isLast && (
              <span
                aria-hidden
                className="shrink"
                style={{
                  height: 1,
                  marginInline: 8,
                  flex: '1 1 18px',
                  minWidth: 18,
                  background: done ? GREEN : '#d1d5db',
                }}
              />
            )}
          </React.Fragment>
        )
      })}
    </ol>
  )
}

function FooterText() {
  return (
    <p className="py-2 text-center text-[9px] text-gray-500">
      © Versatile Credit, Inc | Privacy Policy
    </p>
  )
}

function SubHeader({
  logoSrc,
  logoAlt,
  label = 'Payment options',
  logoHeight = 22,
}: {
  logoSrc: string
  logoAlt: string
  label?: string
  logoHeight?: number
}) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={logoAlt}
        style={{ height: logoHeight, width: 'auto', display: 'block' }}
      />
      <div className="h-5 w-px bg-gray-300" />
      <p
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{ color: TEXT_PRIMARY }}
      >
        {label}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 1 · Intro · Sonrava Health splash
// ─────────────────────────────────────────────────────────────────────
function ScreenIntro() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: '#13294b' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSETS.hero}
        alt=""
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(19,41,75,0.25) 0%, rgba(19,41,75,0.55) 55%, rgba(19,41,75,0.92) 100%)',
        }}
      />
      <div className="relative z-10 flex h-full flex-col px-6 py-8">
        <div className="mt-auto flex flex-col gap-4 text-white">
          <h2 className="text-[30px] font-bold leading-[1.1]">
            Find the financing that
            <br />
            works for you!
          </h2>
          <p className="text-[13px] leading-relaxed text-white/95">
            Sonrava Health offers a variety of flexible payment options for our patients regardless
            of credit history. Our quick and easy application process will help inform your options
            and help you make an informed decision!
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-md py-3.5 text-[15px] font-bold text-white shadow-md"
            style={{ background: BLUE }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 2 · Multi-lender choice (CareCredit + Bread Pay parallel)
// ─────────────────────────────────────────────────────────────────────
function ScreenMultiLender() {
  return (
    <div className="flex min-h-full w-full flex-col" style={{ background: SURFACE_BG }}>
      <MerchantHeader activeStep={0} />

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm">
          <SubHeader logoSrc={ASSETS.sonravaCredit} logoAlt="Sonrava Credit" />

          <div className="text-center">
            <p className="text-[26px] leading-tight font-normal" style={{ color: NAVY }}>
              Congratulations
            </p>
            <p className="text-[15px] font-light" style={{ color: TEXT_PRIMARY }}>
              You have multiple offers!
            </p>
          </div>

          {/* Offer card — CareCredit */}
          <div
            className="rounded-lg p-4"
            style={{ border: `1.5px solid ${NAVY}`, background: 'white' }}
          >
            <div className="text-center" style={{ color: NAVY }}>
              <p className="text-[14px] font-bold">Prequalified for</p>
              <p
                className="text-[44px] font-bold leading-[1]"
                style={{ color: TEXT_PRIMARY, letterSpacing: '-0.5px' }}
              >
                $5,000
              </p>
              <p className="text-[14px] font-bold mt-0.5" style={{ color: BLUE }}>
                revolving line of credit.
              </p>
            </div>
            <p className="mt-3 text-center text-[12px]" style={{ color: GREEN }}>
              Payments as low as
            </p>
            <div className="mt-1 flex items-center justify-center gap-4">
              <p style={{ color: GREEN }}>
                <span className="text-[36px] font-medium leading-none">$135</span>
                <span className="text-[20px]">/mo</span>
              </p>
              <Image
                src={ASSETS.carecreditCard}
                alt="CareCredit card"
                width={104}
                height={70}
                style={{ height: 42, width: 'auto' }}
              />
            </div>
            <p className="mt-1 text-center text-[11px] underline" style={{ color: GREEN }}>
              Learn How
            </p>
            <button
              type="button"
              className="mt-3 w-full rounded-md py-3 text-[14px] font-bold text-white"
              style={{ background: BLUE }}
            >
              Continue to your offers
            </button>
          </div>

          {/* Offer card — Bread Pay */}
          <div
            className="rounded-lg p-4"
            style={{ border: `1.5px solid ${NAVY}`, background: 'white' }}
          >
            <div className="text-center" style={{ color: NAVY }}>
              <p className="text-[14px] font-bold">Pre-approved for up to a</p>
              <p
                className="text-[44px] font-bold leading-[1]"
                style={{ color: TEXT_PRIMARY, letterSpacing: '-0.5px' }}
              >
                $2,500
              </p>
              <p className="text-[14px] font-bold mt-0.5" style={{ color: BLUE }}>
                installment loan.
              </p>
            </div>
            <p className="mt-3 text-center text-[12px]" style={{ color: GREEN }}>
              Flexible monthly payment plans starting at
            </p>
            <div className="mt-1 flex items-center justify-center gap-4">
              <p style={{ color: GREEN }}>
                <span className="text-[36px] font-medium leading-none">0.00%</span>
                <sup className="text-[10px] font-bold">APR*</sup>
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.breadPay}
                alt="Bread Pay"
                style={{ height: 30, width: 'auto', display: 'block' }}
              />
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-md py-3 text-[14px] font-bold text-white"
              style={{ background: BLUE }}
            >
              Continue to your offers
            </button>
            <p className="mt-2 text-[8px] leading-snug" style={{ color: GREEN }}>
              * Subject to approval of credit application. Available for purchases between $50.00
              and $10,000.00. Rates range from 0.00% to 29.99% APR. Bread Pay™ loans are made by
              Comenity Capital Bank, a Bread Financial™ company.
            </p>
          </div>
        </div>
      </div>
      <FooterText />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 3 · CareCredit drill-in · 4 promo options
// ─────────────────────────────────────────────────────────────────────
function ScreenCareCreditRevolving() {
  return (
    <div className="flex min-h-full w-full flex-col" style={{ background: SURFACE_BG }}>
      <MerchantHeader activeStep={1} />

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm">
          <SubHeader logoSrc={ASSETS.carecredit} logoAlt="CareCredit" />

          <div>
            <p className="text-[26px] leading-tight font-normal" style={{ color: NAVY }}>
              Congratulations
            </p>
            <p className="text-[12.5px] leading-relaxed font-light" style={{ color: TEXT_PRIMARY }}>
              Use the calculator below to see what promos are available when paying with a
              CareCredit credit card at Sonrava Health
            </p>
          </div>

          <div>
            <p className="text-[13px] font-bold" style={{ color: TEXT_PRIMARY }}>
              You&apos;re Prequalified for
            </p>
            <p
              className="text-[48px] font-medium leading-none"
              style={{ color: GREEN, letterSpacing: '-1px' }}
            >
              $5,000.00
            </p>
          </div>

          <p className="text-[15px] font-semibold" style={{ color: TEXT_PRIMARY }}>
            Eligible financing offers for $5,000.00
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <PromoCard
              amount="$135"
              type="Revolving Line of Credit"
              sub="60 Month Promotional Financing"
              cardImage
              selected
            />
            <PromoCard
              amount="$152"
              type="Revolving Line of Credit"
              sub="48 Month Promotional Financing"
              cardImage
            />
            <PromoCard
              amount="$278"
              suggestedLabel="Suggested payment"
              type="No Interest"
              sub="If paid in full within 18 months"
              cardImage
            />
            <PromoCard
              amount="$417"
              suggestedLabel="Suggested payment"
              type="No Interest"
              sub="If paid in full within 12 months"
              cardImage
            />
          </div>

          <div className="flex flex-col items-center gap-2 pt-2">
            <p className="text-[14px] font-semibold" style={{ color: TEXT_PRIMARY }}>
              Amount you wish to finance:
            </p>
            <div className="flex w-full max-w-xs items-stretch">
              <div
                className="flex flex-1 items-center px-3 py-2"
                style={{ border: `1.5px solid ${BLUE}`, borderRight: 'none' }}
              >
                <p
                  className="flex-1 text-[20px] font-medium"
                  style={{ color: GREEN }}
                >
                  $5,000.00
                </p>
              </div>
              <div className="flex flex-col">
                <button
                  type="button"
                  className="h-1/2 w-8 border border-gray-300 bg-white text-xs"
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="h-1/2 w-8 border text-xs text-white"
                  style={{ borderColor: BLUE, background: BLUE }}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              className="px-4 py-2 text-[14px] font-bold"
              style={{ color: TEXT_PRIMARY }}
            >
              Back
            </button>
            <button
              type="button"
              className="rounded-md px-8 py-2.5 text-[14px] font-bold text-white"
              style={{ background: BLUE }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <FooterText />
    </div>
  )
}

function PromoCard({
  amount,
  type,
  sub,
  suggestedLabel,
  cardImage,
  selected,
}: {
  amount: string
  type: string
  sub: string
  suggestedLabel?: string
  cardImage?: boolean
  selected?: boolean
}) {
  return (
    <div
      className="rounded-md p-2.5"
      style={{ border: selected ? `2px solid ${BLUE}` : '1px solid #e5e7eb', background: 'white' }}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0 flex-1">
          <p className="leading-none" style={{ color: TEXT_PRIMARY }}>
            <span className="text-[22px] font-bold">{amount}</span>
            <span className="text-[12px] font-bold">/mo</span>
          </p>
          {suggestedLabel && (
            <p className="mt-0.5 text-[9px] font-bold" style={{ color: GREEN }}>
              {suggestedLabel}
            </p>
          )}
          <p className="text-[9px] underline" style={{ color: BLUE }}>
            Learn How
          </p>
        </div>
        {cardImage && (
          <Image
            src={ASSETS.carecreditCard}
            alt=""
            width={70}
            height={48}
            style={{ height: 28, width: 'auto', flexShrink: 0 }}
          />
        )}
      </div>
      <p
        className="mt-2 text-[11px] font-bold leading-tight"
        style={{ color: TEXT_PRIMARY, letterSpacing: '0.36px' }}
      >
        {type}
      </p>
      <p className="text-[9.5px] leading-tight text-gray-600">{sub}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 4 · Cascade → Bread Pay drill-in
// ─────────────────────────────────────────────────────────────────────
function ScreenBreadPayDrillIn() {
  return (
    <div className="flex min-h-full w-full flex-col" style={{ background: SURFACE_BG }}>
      <MerchantHeader activeStep={2} />

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm">
          <SubHeader logoSrc={ASSETS.breadPay} logoAlt="Bread Pay" />

          <div className="rounded-md p-2.5" style={{ background: '#eef4ff', border: `1px solid ${BLUE}` }}>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: BLUE }}>
              Cascade fallback
            </p>
            <p className="mt-1 text-[11.5px] leading-snug" style={{ color: TEXT_PRIMARY }}>
              CareCredit couldn&apos;t approve at the requested amount. Bread Pay picked up the
              application automatically. Same device, same session, no restart.
            </p>
          </div>

          <div>
            <p className="text-[13px] font-bold" style={{ color: TEXT_PRIMARY }}>
              You&apos;re Pre-approved for up to
            </p>
            <p
              className="text-[48px] font-medium leading-none"
              style={{ color: GREEN, letterSpacing: '-1px' }}
            >
              $2,500.00
            </p>
          </div>

          <p className="text-[15px] font-semibold" style={{ color: TEXT_PRIMARY }}>
            Eligible installment plans
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <PromoCard amount="$69" type="Installment Plan" sub="36 months · 0.00% APR" selected />
            <PromoCard amount="$104" type="Installment Plan" sub="24 months · 0.00% APR" />
            <PromoCard amount="$208" type="Installment Plan" sub="12 months · 9.99% APR" />
            <PromoCard amount="$416" type="Installment Plan" sub="6 months · 9.99% APR" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              className="px-4 py-2 text-[14px] font-bold"
              style={{ color: TEXT_PRIMARY }}
            >
              Back
            </button>
            <button
              type="button"
              className="rounded-md px-8 py-2.5 text-[14px] font-bold text-white"
              style={{ background: BLUE }}
            >
              Continue
            </button>
          </div>

          <p className="text-[8px] leading-snug text-gray-500">
            * Bread Pay™ loans are made by Comenity Capital Bank, a Bread Financial™ company.
          </p>
        </div>
      </div>
      <FooterText />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Assembly
// ─────────────────────────────────────────────────────────────────────
const screens: WalkthroughScreen[] = [
  {
    title: 'Intro',
    eyebrow: 'Step 1 of 4',
    body: (
      <p>
        Sonrava Health splash. The elective medical dental practice (rebranded from Western
        Dental). Patient meets the brand first; application starts on tap.
      </p>
    ),
    render: () => <ScreenIntro />,
  },
  {
    title: 'Multi-lender choice',
    eyebrow: 'Step 2 of 4',
    body: (
      <p>
        The cascade lands. CareCredit returns a revolving line; Bread Pay returns an installment.
        The patient picks the offer that fits, in-chair, in real time.
      </p>
    ),
    render: () => <ScreenMultiLender />,
  },
  {
    title: 'CareCredit Revolving Line',
    eyebrow: 'Step 3 of 4',
    body: (
      <p>
        Drill into the CareCredit offer. Four promotional options across the revolving line and
        no-interest plans, plus a calculator to dial the amount up or down.
      </p>
    ),
    render: () => <ScreenCareCreditRevolving />,
  },
  {
    title: 'Cascade → Bread Pay',
    eyebrow: 'Step 4 of 4',
    body: (
      <p>
        When the primary lender can&apos;t approve at the requested amount, the cascade rolls
        forward to Bread Pay automatically. Same device, same session, no restart.
      </p>
    ),
    render: () => <ScreenBreadPayDrillIn />,
  },
]

export function WesternDentalFlow({
  showCaption = true,
  defaultViewport,
  hideViewportSwitcher,
}: {
  showCaption?: boolean
  defaultViewport?: 'tablet' | 'mobile'
  hideViewportSwitcher?: boolean
} = {}) {
  return (
    <div className={showCaption ? 'mx-auto flex w-full max-w-3xl flex-col gap-6' : 'w-full'}>
      <WalkthroughStage
        screens={screens}
        showCaption={showCaption}
        layoutGroupId="sonrava-walkthrough-viewport"
        defaultViewport={defaultViewport}
        hideViewportSwitcher={hideViewportSwitcher}
      />
    </div>
  )
}
