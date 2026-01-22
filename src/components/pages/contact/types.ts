import type { ComponentType } from "react"
import type { LucideProps as IconProps } from "lucide-react"

export interface ContactMethodRow {
  id?: number
  icon_key: "Phone" | "Mail" | "MessageSquare"
  title: string
  details: string
  description: string
  action_label: string
  sort_order?: number
  created_at?: string
}

export interface ContactMethodUI {
  icon: ComponentType<IconProps>
  title: string
  details: string
  description: string
  action: string
  actionHref?: string
}

export interface OfficeInfo {
  icon: ComponentType<IconProps>
  title: string
  details: string
  extra?: string
}

export interface FaqItem {
  question: string
  answer: string
}
