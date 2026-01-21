// src/components/pages/get-involved/api.ts
export async function fetchVolunteerOpportunities() {
  const res = await fetch("http://localhost:4000/api/volunteer-opportunities")

  if (!res.ok) {
    throw new Error("Failed to fetch volunteer opportunities")
  }

  return res.json()
}