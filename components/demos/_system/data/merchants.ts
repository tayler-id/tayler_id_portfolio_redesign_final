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
  // Logo shown in the merchant chrome bar. For now we ship Layers; others can
  // fall back to a styled wordmark + brand color until SVG assets land.
  logo?: { logomark: string; logotype: string } | null
  brandColor?: string
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
    brandColor: '#1e40af',
  },
  {
    key: 'western-dental',
    name: 'Western Dental',
    vertical: 'elective-medical',
    brandColor: '#0891b2',
  },
]

export function getMerchant(key: MerchantKey): Merchant {
  return MERCHANTS.find((m) => m.key === key) ?? MERCHANTS[0]
}
