/**
 * Lender data — used across Apply demos.
 *
 * Order in the array == default Cascade priority for retail.
 * For other verticals (home improvement, elective medical), Cascade order
 * is configured at the merchant level.
 */

export type LenderKey =
  | 'synchrony'
  | 'wells-fargo'
  | 'fortiva'
  | 'td-bank'
  | 'acima'
  | 'snap'
  | 'concora'
  | 'sunlight'
  | 'carecredit'
  | 'sonrava'

export type LenderState = 'pending' | 'approved' | 'declined' | 'skipped'

export interface Lender {
  key: LenderKey
  name: string
  shortName: string
  brandColor: string // primary brand hex
  logo: { src: string; width: number; height: number } | null
  declineCopy: string
  approveSubtitle?: string // shown when this lender is the active form
  positionLabel?: string // "Primary", "Secondary", "Tertiary" — informational
}

export const LENDERS: Lender[] = [
  {
    key: 'synchrony',
    name: 'Synchrony Bank',
    shortName: 'Synchrony',
    brandColor: '#F7A823',
    logo: { src: '/assets/versatile/apply/lender-logos/synchrony.png', width: 137, height: 27 },
    declineCopy:
      'Synchrony is unable to approve your application at this time. You will receive a written notification in the mail within 7–10 business days regarding your application decision.',
    positionLabel: 'Primary',
  },
  {
    key: 'wells-fargo',
    name: 'Wells Fargo',
    shortName: 'Wells Fargo',
    brandColor: '#D71E28',
    logo: { src: '/assets/versatile/apply/lender-logos/wells-fargo.svg', width: 131, height: 28 },
    declineCopy:
      'Wells Fargo Bank, N.A. was unable to approve your application at this time. You will receive written notification in the mail within 30 days.',
    positionLabel: 'Primary',
  },
  {
    key: 'fortiva',
    name: 'Fortiva Retail Credit',
    shortName: 'Fortiva',
    brandColor: '#F47B20',
    logo: { src: '/assets/versatile/apply/lender-logos/fortiva.png', width: 174, height: 38 },
    declineCopy:
      'Fortiva Retail Credit was unable to approve your application at this time. Your information has been forwarded to the next lender in priority order.',
    positionLabel: 'Secondary',
  },
  {
    key: 'td-bank',
    name: 'TD Bank',
    shortName: 'TD Bank',
    brandColor: '#2A8138',
    logo: { src: '/assets/versatile/apply/lender-logos/td-bank.png', width: 173, height: 77 },
    declineCopy:
      'TD Bank, N.A. was unable to approve your application at this time.',
    positionLabel: 'Tertiary',
  },
  {
    key: 'acima',
    name: 'Acima Leasing',
    shortName: 'Acima',
    brandColor: '#0066CC',
    logo: { src: '/assets/versatile/apply/lender-logos/acima.png', width: 194, height: 80 },
    declineCopy:
      'Acima was unable to approve your lease-purchase application at this time.',
    positionLabel: 'Tertiary',
  },
  {
    key: 'snap',
    name: 'Snap Finance',
    shortName: 'Snap',
    brandColor: '#7C3AED',
    logo: { src: '/assets/versatile/apply/lender-logos/snap.png', width: 171, height: 77 },
    declineCopy:
      'Snap Finance was unable to approve your application at this time.',
    positionLabel: 'Tertiary',
  },
  {
    key: 'concora',
    name: 'Concora Credit',
    shortName: 'Concora',
    brandColor: '#1E3A8A',
    logo: { src: '/assets/versatile/apply/lender-logos/concora.png', width: 300, height: 107 },
    declineCopy:
      'Concora Credit was unable to approve your application at this time.',
    positionLabel: 'Tertiary',
  },
  {
    key: 'sunlight',
    name: 'Sunlight Financial',
    shortName: 'Sunlight',
    brandColor: '#1F3864',
    logo: { src: '/assets/versatile/apply/lender-logos/sunlight.svg', width: 200, height: 36 },
    declineCopy:
      'Sunlight Financial was unable to approve your application at this time. Your information has been forwarded to the next lender in priority order.',
    positionLabel: 'Primary',
  },
  {
    key: 'carecredit',
    name: 'CareCredit',
    shortName: 'CareCredit',
    brandColor: '#5A1E89',
    logo: { src: '/assets/versatile/apply/lender-logos/carecredit.svg', width: 200, height: 36 },
    declineCopy:
      'CareCredit was unable to approve your application at this time. Your information has been forwarded to the next lender in priority order.',
    positionLabel: 'Primary',
  },
  {
    key: 'sonrava',
    name: 'Sonrava',
    shortName: 'Sonrava',
    brandColor: '#0E7C66',
    logo: { src: '/assets/versatile/apply/lender-logos/sonrava.svg', width: 200, height: 36 },
    declineCopy:
      'Sonrava was unable to approve your application at this time.',
    positionLabel: 'Secondary',
  },
]

export function getLender(key: LenderKey): Lender {
  return LENDERS.find((l) => l.key === key) ?? LENDERS[0]
}

/**
 * Per-vertical cascade order. The first key is the Primary; subsequent keys
 * are presented in fall-through order when the primary declines.
 *
 * Real-world this is configured at the merchant level — same vertical can
 * still differ from merchant to merchant. These are sensible demo defaults.
 */
export const VERTICAL_CASCADE: Record<
  'retail' | 'home-improvement' | 'elective-medical',
  LenderKey[]
> = {
  retail: ['synchrony', 'wells-fargo', 'fortiva', 'td-bank', 'acima', 'snap', 'concora'],
  'home-improvement': ['sunlight', 'wells-fargo', 'td-bank'],
  'elective-medical': ['carecredit', 'sonrava', 'concora'],
}
