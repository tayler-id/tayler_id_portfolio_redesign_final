'use client'

import React from 'react'
import { ShowInput } from '../../_system/primitives'
import type { Lender } from '../../_system/data/lenders'

interface StepApplicantProps {
  lender: Lender
  compact?: boolean
}

export function StepApplicant({ compact = false }: StepApplicantProps) {
  if (compact) {
    return (
      <div className="flex flex-col gap-3">
        <ShowInput label="First Name" />
        <ShowInput label="Last Name" />
        <ShowInput label="Date of Birth" affordance="calendar" />
        <ShowInput label="Social Security Number" affordance="eye" />
        <ShowInput label="Street" />
        <ShowInput label="City" />
        <ShowInput label="State" affordance="chevron" />
        <ShowInput label="ZIP Code" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <ShowInput label="First Name" />
        <ShowInput label="Last Name" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ShowInput label="Date of Birth" affordance="calendar" />
        <ShowInput label="Social Security Number" affordance="eye" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ShowInput label="Street" />
        <ShowInput label="Apt/Suite" />
      </div>
      <div className="grid grid-cols-[1fr_1fr_180px] gap-3">
        <ShowInput label="City" />
        <ShowInput label="State" affordance="chevron" />
        <ShowInput label="ZIP Code" />
      </div>
    </div>
  )
}
