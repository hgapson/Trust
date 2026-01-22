import type { DetailedServiceRow } from "../../services/types"

const BASE = "http://localhost:4000"

export type CreateDetailedServicePayload = {
  id: string
  title: string
  icon: string
  color: string
  bg_color: string
  image_url: string
  description: string
  sort_order?: number
  features?: string[]
}

export type UpdateDetailedServicePayload = Omit<CreateDetailedServicePayload, "id">

export const AdminDetailedServicesApi = {
  async list(): Promise<DetailedServiceRow[]> {
    const res = await fetch(`${BASE}/api/admin/detailed-services`)
    if (!res.ok) throw new Error("Failed to fetch detailed services")
    return res.json()
  },

  async create(payload: CreateDetailedServicePayload): Promise<DetailedServiceRow> {
    const res = await fetch(`${BASE}/api/admin/detailed-services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create detailed service")
    return res.json()
  },

  async update(id: string, payload: UpdateDetailedServicePayload): Promise<DetailedServiceRow> {
    const res = await fetch(`${BASE}/api/admin/detailed-services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update detailed service")
    return res.json()
  },

  async remove(id: string): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/detailed-services/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete detailed service")
    return res.json()
  },
}
