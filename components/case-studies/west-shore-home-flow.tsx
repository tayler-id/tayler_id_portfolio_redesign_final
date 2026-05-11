'use client'

import React from 'react'
import Image from 'next/image'
import { ModalOverlay, WalkthroughStage } from '@/components/demos/_system/primitives'
import type { WalkthroughScreen } from '@/components/demos/_system/primitives'
import { ChromeTablet } from '@/components/demos/apply/chromes/chrome-tablet'
import { ChromeMobile } from '@/components/demos/apply/chromes/chrome-mobile'
import { StepHIEligibilityForm } from '@/components/demos/apply/steps/step-hi-eligibility-form'
import { StepHIPersonal } from '@/components/demos/apply/steps/step-hi-personal'
import { StepHIEligibility } from '@/components/demos/apply/steps/step-hi-eligibility'
import { getMerchant } from '@/components/demos/_system/data/merchants'
import { getLender } from '@/components/demos/_system/data/lenders'
import { ThemeProvider } from '@/components/demos/_system/theme-provider'

const WSH = getMerchant('wsh')
const SUNLIGHT = getLender('sunlight')
const STEP_LABELS = ['Eligibility', 'Application', 'Offers', 'Review']

function PrivacyPolicyContent() {
  return (
    <div className="space-y-3">
      <p>
        <span className="font-bold">INTRODUCTION:</span> Sunlight Financial LLC (&quot;Sunlight,&quot;
        &quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy.
        This Notice describes the categories of information we collect from you, the sources of that
        information, the business purposes for which we use that information, and the categories of
        third parties with whom that information is shared.
      </p>
      <p>
        <span className="font-bold">Information We Collect:</span> When you visit our website, apply
        for a loan, or otherwise interact with us, we may collect personal information from a variety
        of sources. This includes information you provide to us directly, information we collect
        automatically, and information we receive from third parties.
      </p>
      <p>
        <span className="font-bold">How We Use Your Information:</span> We use the information we
        collect for a variety of business purposes, including to fulfill your requests, communicate
        with you, market our products and services, and comply with applicable law.
      </p>
      <p>
        This Privacy Policy is designed to inform you of the types of information that we and our
        affiliates collect from or about you, how we deal with that information, and your rights with
        respect to such information.
      </p>
    </div>
  )
}

function PrivacyHeader() {
  if (SUNLIGHT.logo && 'src' in SUNLIGHT.logo) {
    return (
      <Image
        src={SUNLIGHT.logo.src}
        alt={SUNLIGHT.name}
        width={SUNLIGHT.logo.width}
        height={SUNLIGHT.logo.height}
        style={{ height: 22, width: 'auto' }}
      />
    )
  }
  return (
    <span className="text-[14px] font-bold" style={{ color: SUNLIGHT.brandColor }}>
      {SUNLIGHT.name}
    </span>
  )
}

function getNextLabel(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return 'Continue'
    case 1:
      return 'Continue to Offers'
    case 2:
      return 'Choose Offer'
    case 3:
      return 'Confirm & Continue'
    default:
      return 'Next'
  }
}

function renderChrome({
  compact,
  stepIndex,
  stepTitle,
  children,
}: {
  compact: boolean
  stepIndex: number
  stepTitle: string
  children: React.ReactNode
}) {
  const baseProps = {
    merchant: 'wsh' as const,
    activeStepIndex: stepIndex,
    stepLabels: STEP_LABELS,
    stepTitle,
    lender: SUNLIGHT,
    canBack: stepIndex > 0,
    canNext: stepIndex < STEP_LABELS.length - 1,
    nextLabel: getNextLabel(stepIndex),
  }
  return (
    <ThemeProvider project="apply" className="relative h-full w-full">
      {compact ? (
        <ChromeMobile {...baseProps}>{children}</ChromeMobile>
      ) : (
        <ChromeTablet {...baseProps} orientation="portrait">
          {children}
        </ChromeTablet>
      )}
    </ThemeProvider>
  )
}

const screens: WalkthroughScreen[] = [
  {
    title: 'Form appears',
    eyebrow: 'Step 1 of 4',
    body: (
      <p>
        The eligibility form loads on the West Shore Home in-home sales tablet. Pre-qualification
        copy and Sunlight Financial&apos;s disclosures live in the surface itself; the homeowner can
        start typing immediately.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 0,
        stepTitle: 'You may be eligible for multiple offers',
        children: <StepHIEligibilityForm merchant={WSH} compact={compact} />,
      }),
  },
  {
    title: 'Privacy modal',
    eyebrow: 'Step 2 of 4',
    body: (
      <p>
        Sunlight Financial&apos;s privacy policy floats over the form. The homeowner reviews,
        downloads if they want, then dismisses to continue. Compliance is a layer, not a barrier.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 0,
        stepTitle: 'You may be eligible for multiple offers',
        children: <StepHIEligibilityForm merchant={WSH} filled compact={compact} />,
      }),
    overlay: () => (
      <ModalOverlay
        header={<PrivacyHeader />}
        subTitle="Sunlight Financial Privacy Policy"
        accentColor={WSH.headlineColor ?? WSH.brandColor}
      >
        <PrivacyPolicyContent />
      </ModalOverlay>
    ),
  },
  {
    title: 'Two offers returned',
    eyebrow: 'Step 3 of 4',
    body: (
      <p>
        Sunlight Financial returns $12,000; TD Bank returns $14,900. Wells Fargo declined and shows a
        soft message. The homeowner picks the lender that fits, in-home, in real time.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 1,
        stepTitle: 'Great news. Two offers.',
        children: <StepHIPersonal lender={SUNLIGHT} merchant={WSH} compact={compact} />,
      }),
  },
  {
    title: 'Review selection',
    eyebrow: 'Step 4 of 4',
    body: (
      <p>
        The down-payment stepper previews the new monthly payment in real time. The customer commits
        with the final summary in plain language before the install paperwork.
      </p>
    ),
    render: (compact) =>
      renderChrome({
        compact,
        stepIndex: 2,
        stepTitle: "Let's review your selection",
        children: <StepHIEligibility lender={SUNLIGHT} merchant={WSH} compact={compact} />,
      }),
  },
]

export function WestShoreHomeFlow({
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
        layoutGroupId="wsh-walkthrough-viewport"
        defaultViewport={defaultViewport}
        hideViewportSwitcher={hideViewportSwitcher}
      />
    </div>
  )
}
