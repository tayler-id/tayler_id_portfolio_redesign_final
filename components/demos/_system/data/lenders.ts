/**
 * Lender data — used across Apply demos.
 *
 * Order in the array == default Cascade priority for retail.
 * For other verticals (home improvement, elective medical), Cascade order
 * is configured at the merchant level.
 */

export type LenderKey =
  | 'wells-fargo'
  | 'fortiva'
  | 'td-bank'
  | 'acima'
  | 'snap'
  | 'concora'

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
]

export function getLender(key: LenderKey): Lender {
  return LENDERS.find((l) => l.key === key) ?? LENDERS[0]
}
