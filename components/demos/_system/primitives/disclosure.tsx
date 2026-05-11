'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface DisclosureProps {
  /** A list of text segments. Strings are rendered plain; objects with
   *  `link: true` render as inline blue link text. */
  segments: Array<string | { link: true; text: string }>
  className?: string
  accentColor?: string
}

/**
 * A wall-of-text legal disclosure block with inline links (rendered as
 * `<span>`s — display only). Matches the WSH TCPA / disclosure paragraphs.
 */
export function Disclosure({ segments, className, accentColor }: DisclosureProps) {
  return (
    <p
      className={cn(
        'text-[11.5px] leading-[1.6] text-[var(--text-secondary)]',
        className,
      )}
    >
      {segments.map((seg, i) =>
        typeof seg === 'string' ? (
          <React.Fragment key={i}>{seg}</React.Fragment>
        ) : (
          <span
            key={i}
            className="cursor-default underline underline-offset-2"
            style={{ color: accentColor ?? 'var(--accent)' }}
          >
            {seg.text}
          </span>
        ),
      )}
    </p>
  )
}
