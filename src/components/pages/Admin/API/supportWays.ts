import type { SupportWayRow } from "../types"

const BASE = ""

export type CreateSupportWayPayload = {
  title: string
  description: string
  icon_key: string
  color: string
  bg_color: string
  sort_order?: number
}

export const AdminSupportWaysApi = {
  async list(): Promise<SupportWayRow[]> {
    const res = await fetch(`${BASE}/api/admin/support-ways`)
    if (!res.ok) throw new Error("Failed to fetch support ways")
    return res.json()
  },

  async create(payload: CreateSupportWayPayload): Promise<SupportWayRow> {
    const res = await fetch(`${BASE}/api/admin/support-ways`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create support way")
    return res.json()
  },

  async update(id: number, payload: CreateSupportWayPayload): Promise<SupportWayRow> {
    const res = await fetch(`${BASE}/api/admin/support-ways/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update support way")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/support-ways/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete support way")
    return res.json()
  },
}
