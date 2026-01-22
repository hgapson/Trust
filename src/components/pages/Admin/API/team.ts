import type { TeamMember } from "../../about/types"

const BASE = "http://localhost:4000"

export type CreateTeamMemberPayload = {
  name: string
  role: string
  description: string
  image_url?: string | null
  team_type: "staff" | "trustee"
  sort_order?: number
}

export type UpdateTeamMemberPayload = CreateTeamMemberPayload

export const AdminTeamApi = {
  async list(): Promise<TeamMember[]> {
    const res = await fetch(`${BASE}/api/admin/team`)
    if (!res.ok) throw new Error("Failed to fetch team members")
    return res.json()
  },

  async create(payload: CreateTeamMemberPayload): Promise<TeamMember> {
    const res = await fetch(`${BASE}/api/admin/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create team member")
    return res.json()
  },

  async update(id: number, payload: UpdateTeamMemberPayload): Promise<TeamMember> {
    const res = await fetch(`${BASE}/api/admin/team/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update team member")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/team/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete team member")
    return res.json()
  },
}
