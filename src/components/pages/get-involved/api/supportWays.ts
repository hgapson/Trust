import type { SupportWayRow } from "../types"

const BASE = ""

export const SupportWaysApi = {
  async list(): Promise<SupportWayRow[]> {
    const res = await fetch(`${BASE}/api/support-ways`)
    if (!res.ok) throw new Error("Failed to fetch support ways")
    return res.json()
  },
}