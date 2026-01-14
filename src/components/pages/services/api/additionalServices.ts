// api/additionalServices.ts
import type { AdditionalService } from "../types"

const BASE_URL = "http://localhost:4000"

export const AdditionalServicesApi = {
  async list(): Promise<AdditionalService[]> {
    const res = await fetch(`${BASE_URL}/api/additional-services`)
    if (!res.ok) throw new Error("Failed to load additional services")
    return res.json()
  },
}