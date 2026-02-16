import type { Workshop } from "../../services/types"

const BASE_URL = ""

export type WorkshopPayload = {
  title: string
  description?: string | null
  start_at: string
  end_at: string
  location?: string | null
  capacity?: number | null
}

export const AdminWorkshopsApi = {
  async list(): Promise<Workshop[]> {
    const res = await fetch(`${BASE_URL}/api/admin/workshops`)
    if (!res.ok) throw new Error("Failed to fetch workshops")
    return res.json()
  },

  async create(payload: WorkshopPayload): Promise<Workshop> {
    const res = await fetch(`${BASE_URL}/api/admin/workshops`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create workshop")
    return res.json()
  },

  async update(id: number, payload: WorkshopPayload): Promise<Workshop> {
    const res = await fetch(`${BASE_URL}/api/admin/workshops/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update workshop")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE_URL}/api/admin/workshops/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete workshop")
    return res.json()
  },
}
