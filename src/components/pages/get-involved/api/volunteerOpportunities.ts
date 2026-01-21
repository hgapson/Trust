import type { VolunteerOpportunity } from "../types"

export const VolunteerOpportunitiesApi = {
  async list(): Promise<VolunteerOpportunity[]> {
    const res = await fetch("http://localhost:4000/api/volunteer-opportunities")
    if (!res.ok) throw new Error("Failed to fetch volunteer opportunities")
    return res.json()
  },
}