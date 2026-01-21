// src/components/pages/get-involved/types.ts
import type { ComponentType, SVGProps } from "react"

export interface VolunteerOpportunity {
  id: number
  title: string
  description: string
  commitment: string
  skills: string
  icon_key: string
  color: string
  bgColor: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}