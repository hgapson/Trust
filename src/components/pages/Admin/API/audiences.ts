import type { Audience } from "../../home/types"

const BASE = "http://localhost:4000"

export type CreateAudiencePayload = {
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  sort_order?: number
}

export type UpdateAudiencePayload = CreateAudiencePayload

export const AdminAudiencesApi = {
  async list(): Promise<Audience[]> {
    const res = await fetch(`${BASE}/api/admin/audiences`)
    if (!res.ok) throw new Error("Failed to fetch audiences")
    return res.json()
  },

  async create(payload: CreateAudiencePayload): Promise<Audience> {
    const res = await fetch(`${BASE}/api/admin/audiences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create audience")
    return res.json()
  },

  async update(id: number, payload: UpdateAudiencePayload): Promise<Audience> {
    const res = await fetch(`${BASE}/api/admin/audiences/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update audience")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/audiences/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete audience")
    return res.json()
  },
}
