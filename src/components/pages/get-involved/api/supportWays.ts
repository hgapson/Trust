import type { SupportWayRow } from "../types"

const BASE = "http://localhost:4000"

export const SupportWaysApi = {
  async list(): Promise<SupportWayRow[]> {
    const res = await fetch(`${BASE}/api/support-ways`)
    if (!res.ok) throw new Error("Failed to fetch support ways")
    return res.json()
  },
}