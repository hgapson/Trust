import type { AdditionalService } from "../../services/types"

const BASE = ""

export type CreateAdditionalServicePayload = {
  title: string
  description: string
  icon_key: string
  sessions: string
  sort_order?: number
}

export type UpdateAdditionalServicePayload = CreateAdditionalServicePayload

export const AdminAdditionalServicesApi = {
  async list(): Promise<AdditionalService[]> {
    const res = await fetch(`${BASE}/api/admin/additional-services`)
    if (!res.ok) throw new Error("Failed to fetch additional services")
    return res.json()
  },

  async create(payload: CreateAdditionalServicePayload): Promise<AdditionalService> {
    const res = await fetch(`${BASE}/api/admin/additional-services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create additional service")
    return res.json()
  },

  async update(id: number, payload: UpdateAdditionalServicePayload): Promise<AdditionalService> {
    const res = await fetch(`${BASE}/api/admin/additional-services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update additional service")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/additional-services/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete additional service")
    return res.json()
  },
}
