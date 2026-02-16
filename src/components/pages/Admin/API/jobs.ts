import type { Job } from "../../jobs/types"

const BASE = ""

export type JobPayload = {
  title: string
  company: string
  description?: string | null
}

export const AdminJobsApi = {
  async list(): Promise<Job[]> {
    const res = await fetch(`${BASE}/api/admin/jobs`)
    if (!res.ok) throw new Error("Failed to fetch jobs")
    return res.json()
  },

  async create(payload: JobPayload): Promise<Job> {
    const res = await fetch(`${BASE}/api/admin/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create job")
    return res.json()
  },

  async update(id: number, payload: JobPayload): Promise<Job> {
    const res = await fetch(`${BASE}/api/admin/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update job")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/jobs/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete job")
    return res.json()
  },
}
