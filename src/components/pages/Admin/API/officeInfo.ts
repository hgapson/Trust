import type { OfficeInfoRow } from "../../contact/types"

const BASE = ""

export type OfficeInfoPayload = {
  icon_key: OfficeInfoRow["icon_key"]
  title: string
  details: string
  extra?: string | null
  sort_order?: number
}

export const AdminOfficeInfoApi = {
  async list(): Promise<OfficeInfoRow[]> {
    const res = await fetch(`${BASE}/api/admin/office-info`)
    if (!res.ok) throw new Error("Failed to fetch office info")
    return res.json()
  },

  async create(payload: OfficeInfoPayload): Promise<OfficeInfoRow> {
    const res = await fetch(`${BASE}/api/admin/office-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create office info")
    return res.json()
  },

  async update(id: number, payload: OfficeInfoPayload): Promise<OfficeInfoRow> {
    const res = await fetch(`${BASE}/api/admin/office-info/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update office info")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/office-info/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete office info")
    return res.json()
  },
}
