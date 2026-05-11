/**
 * Merchant data — used across Apply demos.
 *
 * "Layers" is the design-system placeholder (Versatile's default brand
 * marker for unbranded layouts). The others are real customer brands.
 */

export type MerchantKey =
  | 'layers'
  | 'ashley'
  | 'city-furniture'
  | 'wsh'
  | 'western-dental'

export type Vertical = 'retail' | 'home-improvement' | 'elective-medical'

export interface Merchant {
  key: MerchantKey
  name: string
  vertical: Vertical
  /**
   * Logo shown in the merchant chrome bar. Two shapes are supported:
   *  - `{ src, width, height }` — single combined wordmark image (PNG/SVG).
   *    The chrome renders it at the bar's full height.
   *  - `{ logomark, logotype }` — separate icon mark + wordmark (legacy
   *    pattern used by the Layers placeholder brand). The chrome renders
   *    them side-by-side.
   */
  logo?:
    | { src: string; width?: number; height?: number }
    | { logomark: string; logotype: string }
    | null
  brandColor?: string
  // Optional per-merchant CTA color override. When set, overrides the
  // theme-level --cta inside the chrome (e.g. West Shore Home's lime green
  // "Confirm & Continue").
  ctaColor?: string
  ctaHover?: string
  // Headline shown above forms (some merchants use a marketing line above
  // each form panel — e.g. WSH "TO GET STARTED WE NEED TO LEARN MORE ABOUT YOU").
  headlineColor?: string
}

export const MERCHANTS: Merchant[] = [
  {
    key: 'layers',
    name: 'Layers',
    vertical: 'retail',
    logo: {
      logomark: '/assets/versatile/apply/lender-logos/layers-logomark.svg',
      logotype: '/assets/versatile/apply/lender-logos/layers-logotype.svg',
    },
    brandColor: '#2563eb',
  },
  {
    key: 'ashley',
    name: 'Ashley Furniture',
    vertical: 'retail',
    logo: { src: '/assets/Ashley_logo_2022.svg.png', width: 160, height: 80 },
    brandColor: '#1f2937',
  },
  {
    key: 'city-furniture',
    name: 'City Furniture',
    vertical: 'retail',
    brandColor: '#dc2626',
  },
  {
    key: 'wsh',
    name: 'West Shore Home',
    vertical: 'home-improvement',
    brandColor: '#1c3a72', // WSH navy
    headlineColor: '#1c3a72',
    ctaColor: '#a3c84a', // WSH lime/avocado green
    ctaHover: '#8fb33d',
    logo: {
      src: '/assets/versatile/apply/merchant-logos/wsh.png',
      width: 176,
      height: 40,
    },
  },
  {
    key: 'western-dental',
    name: 'Western Dental',
    vertical: 'elective-medical',
    // Western Dental brand red
    brandColor: '#c1272d',
    headlineColor: '#c1272d',
    // Western Dental gold CTA
    ctaColor: '#f0a500',
    ctaHover: '#d99000',
    logo: {
      src: '/assets/versatile/apply/merchant-logos/western-dental.svg',
      width: 220,
      height: 36,
    },
  },
]

export function getMerchant(key: MerchantKey): Merchant {
  return MERCHANTS.find((m) => m.key === key) ?? MERCHANTS[0]
}
