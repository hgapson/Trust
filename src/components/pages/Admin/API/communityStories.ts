import type { CommunityStory } from "../../home/types"

const BASE = "http://localhost:4000"

export type CreateCommunityStoryPayload = {
  quote: string
  author: string
  sort_order?: number
}

export type UpdateCommunityStoryPayload = CreateCommunityStoryPayload

export const AdminCommunityStoriesApi = {
  async list(): Promise<CommunityStory[]> {
    const res = await fetch(`${BASE}/api/admin/community-stories`)
    if (!res.ok) throw new Error("Failed to fetch community stories")
    return res.json()
  },

  async create(payload: CreateCommunityStoryPayload): Promise<CommunityStory> {
    const res = await fetch(`${BASE}/api/admin/community-stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create community story")
    return res.json()
  },

  async update(id: number, payload: UpdateCommunityStoryPayload): Promise<CommunityStory> {
    const res = await fetch(`${BASE}/api/admin/community-stories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update community story")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/community-stories/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete community story")
    return res.json()
  },
}
