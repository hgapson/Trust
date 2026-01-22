import type { ContactMethodRow } from "../../contact/types"

const BASE = "http://localhost:4000"

export type ContactMethodPayload = {
  icon_key: ContactMethodRow["icon_key"]
  title: string
  details: string
  description: string
  action_label: string
  sort_order?: number
}

export const AdminContactMethodsApi = {
  async list(): Promise<ContactMethodRow[]> {
    const res = await fetch(`${BASE}/api/admin/contact-methods`)
    if (!res.ok) throw new Error("Failed to fetch contact methods")
    return res.json()
  },

  async create(payload: ContactMethodPayload): Promise<ContactMethodRow> {
    const res = await fetch(`${BASE}/api/admin/contact-methods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create contact method")
    return res.json()
  },

  async update(id: number, payload: ContactMethodPayload): Promise<ContactMethodRow> {
    const res = await fetch(`${BASE}/api/admin/contact-methods/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update contact method")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/contact-methods/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete contact method")
    return res.json()
  },
}
