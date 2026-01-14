export interface ContactMethod {
  id: number
  icon_key: "Phone" | "Mail" | "MessageSquare"
  title: string
  details: string
  description: string
  action_label: string
}