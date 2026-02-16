// src/components/pages/get-involved/api.ts
export async function fetchVolunteerOpportunities() {
  const base = ""
  const res = await fetch(`${base}/api/volunteer-opportunities`)

  if (!res.ok) {
    throw new Error("Failed to fetch volunteer opportunities")
  }

  return res.json()
}
