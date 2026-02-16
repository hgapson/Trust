import type { FaqRow } from "../../contact/types"

const BASE = ""

export type FaqPayload = {
  question: string
  answer: string
  sort_order?: number
}

export const AdminFaqsApi = {
  async list(): Promise<FaqRow[]> {
    const res = await fetch(`${BASE}/api/admin/faqs`)
    if (!res.ok) throw new Error("Failed to fetch faqs")
    return res.json()
  },

  async create(payload: FaqPayload): Promise<FaqRow> {
    const res = await fetch(`${BASE}/api/admin/faqs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create faq")
    return res.json()
  },

  async update(id: number, payload: FaqPayload): Promise<FaqRow> {
    const res = await fetch(`${BASE}/api/admin/faqs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update faq")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/faqs/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete faq")
    return res.json()
  },
}
