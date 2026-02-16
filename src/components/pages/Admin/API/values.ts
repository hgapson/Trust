import type { ValueItem } from "../../about/types"

const BASE = ""

export type CreateValuePayload = {
  title: string
  description: string
  icon: string
  color: string
  bg_color: string
  sort_order?: number
}

export type UpdateValuePayload = CreateValuePayload

export const AdminValuesApi = {
  async list(): Promise<ValueItem[]> {
    const res = await fetch(`${BASE}/api/admin/values`)
    if (!res.ok) throw new Error("Failed to fetch values")
    return res.json()
  },

  async create(payload: CreateValuePayload): Promise<ValueItem> {
    const res = await fetch(`${BASE}/api/admin/values`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create value")
    return res.json()
  },

  async update(id: number, payload: UpdateValuePayload): Promise<ValueItem> {
    const res = await fetch(`${BASE}/api/admin/values/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update value")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/values/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete value")
    return res.json()
  },
}
