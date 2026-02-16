import type { DbPartner } from "../../about/types"

const BASE = ""

export type CreatePartnerPayload = {
  type: "partner" | "funder"
  name: string
  logo_url?: string | null
  website_url?: string | null
  focus: string
  description: string
  location: string
  contribution: string
  sort_order?: number
}

export type UpdatePartnerPayload = CreatePartnerPayload

export const AdminPartnersApi = {
  async list(): Promise<DbPartner[]> {
    const res = await fetch(`${BASE}/api/admin/partners`)
    if (!res.ok) throw new Error("Failed to fetch partners")
    return res.json()
  },

  async create(payload: CreatePartnerPayload): Promise<DbPartner> {
    const res = await fetch(`${BASE}/api/admin/partners`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create partner")
    return res.json()
  },

  async update(id: number, payload: UpdatePartnerPayload): Promise<DbPartner> {
    const res = await fetch(`${BASE}/api/admin/partners/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update partner")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/partners/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete partner")
    return res.json()
  },
}
