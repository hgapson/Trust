import type { MissionVisionData } from "../../about/types"

const BASE = ""

export type MissionVisionPayload = {
  mission_title: string
  mission_description: string
  vision_title: string
  vision_description: string
  image_url: string
}

export const AdminMissionVisionApi = {
  async get(): Promise<MissionVisionData | null> {
    const res = await fetch(`${BASE}/api/admin/mission-vision`)
    if (!res.ok) throw new Error("Failed to fetch mission & vision")
    return res.json()
  },

  async update(payload: MissionVisionPayload): Promise<MissionVisionData> {
    const res = await fetch(`${BASE}/api/admin/mission-vision`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update mission & vision")
    return res.json()
  },

  async remove(): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/mission-vision`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete mission & vision")
    return res.json()
  },
}
