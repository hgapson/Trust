import type { CallToActionData } from "../../home/types"

const BASE = ""

export type CallToActionPayload = {
  heading: string
  description: string
  phone: string
  email: string
  location: string
  availability: string
  image_url: string
  card_title: string
  card_description: string
  cta_label: string
}

export const AdminCallToActionApi = {
  async get(): Promise<CallToActionData | null> {
    const res = await fetch(`${BASE}/api/admin/call-to-action`)
    if (!res.ok) throw new Error("Failed to fetch call to action")
    return res.json()
  },

  async update(payload: CallToActionPayload): Promise<CallToActionData> {
    const res = await fetch(`${BASE}/api/admin/call-to-action`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update call to action")
    return res.json()
  },

  async remove(): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/call-to-action`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete call to action")
    return res.json()
  },
}
