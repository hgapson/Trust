import type { VolunteerOpportunityRow } from "../../get-involved/types"

const BASE = "http://localhost:4000"

export type VolunteerOpportunityPayload = {
  title: string
  description: string
  commitment: string
  skills: string
  icon_key: string
  color: string
  bg_color: string
  sort_order?: number
}

export const AdminVolunteerOpportunitiesApi = {
  async list(): Promise<VolunteerOpportunityRow[]> {
    const res = await fetch(`${BASE}/api/admin/volunteer-opportunities`)
    if (!res.ok) throw new Error("Failed to fetch volunteer opportunities")
    return res.json()
  },

  async create(payload: VolunteerOpportunityPayload): Promise<VolunteerOpportunityRow> {
    const res = await fetch(`${BASE}/api/admin/volunteer-opportunities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create volunteer opportunity")
    return res.json()
  },

  async update(
    id: number,
    payload: VolunteerOpportunityPayload
  ): Promise<VolunteerOpportunityRow> {
    const res = await fetch(`${BASE}/api/admin/volunteer-opportunities/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update volunteer opportunity")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/volunteer-opportunities/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete volunteer opportunity")
    return res.json()
  },
}
