import type { ProcessStep } from "../../services/types"

const BASE = "http://localhost:4000"

export type CreateProcessStepPayload = {
  step_number: number
  title: string
  description: string
  sort_order?: number
}

export type UpdateProcessStepPayload = CreateProcessStepPayload

export const AdminProcessStepsApi = {
  async list(): Promise<ProcessStep[]> {
    const res = await fetch(`${BASE}/api/admin/process-steps`)
    if (!res.ok) throw new Error("Failed to fetch process steps")
    return res.json()
  },

  async create(payload: CreateProcessStepPayload): Promise<ProcessStep> {
    const res = await fetch(`${BASE}/api/admin/process-steps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create process step")
    return res.json()
  },

  async update(id: number, payload: UpdateProcessStepPayload): Promise<ProcessStep> {
    const res = await fetch(`${BASE}/api/admin/process-steps/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update process step")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/process-steps/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete process step")
    return res.json()
  },
}
