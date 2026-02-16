import type { ServiceRow } from "../../home/types"

const BASE = ""

export type CreateServicePayload = {
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  modalDetails?: string | null
  sort_order?: number
  features?: string[]
  modalSteps?: string[]
}

export type UpdateServicePayload = CreateServicePayload

export const AdminServicesApi = {
  async list(): Promise<ServiceRow[]> {
    const res = await fetch(`${BASE}/api/admin/services`)
    if (!res.ok) throw new Error("Failed to fetch services")
    return res.json()
  },

  async create(payload: CreateServicePayload): Promise<ServiceRow> {
    const res = await fetch(`${BASE}/api/admin/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create service")
    return res.json()
  },

  async update(id: number, payload: UpdateServicePayload): Promise<ServiceRow> {
    const res = await fetch(`${BASE}/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update service")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/services/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete service")
    return res.json()
  },
}
