import type { ApproachStep } from "../../home/types"

const BASE = ""

export type CreateApproachStepPayload = {
  title: string
  description: string
  icon: string
  step: string
  sort_order?: number
}

export type UpdateApproachStepPayload = CreateApproachStepPayload

export const AdminApproachStepsApi = {
  async list(): Promise<ApproachStep[]> {
    const res = await fetch(`${BASE}/api/admin/approach-steps`)
    if (!res.ok) throw new Error("Failed to fetch approach steps")
    return res.json()
  },

  async create(payload: CreateApproachStepPayload): Promise<ApproachStep> {
    const res = await fetch(`${BASE}/api/admin/approach-steps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create approach step")
    return res.json()
  },

  async update(id: number, payload: UpdateApproachStepPayload): Promise<ApproachStep> {
    const res = await fetch(`${BASE}/api/admin/approach-steps/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update approach step")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/approach-steps/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete approach step")
    return res.json()
  },
}
