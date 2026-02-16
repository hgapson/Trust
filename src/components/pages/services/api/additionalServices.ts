// api/additionalServices.ts
import type { AdditionalService } from "../types"

const BASE_URL = ""

export const AdditionalServicesApi = {
  async list(): Promise<AdditionalService[]> {
    const res = await fetch(`${BASE_URL}/api/additional-services`)
    if (!res.ok) throw new Error("Failed to load additional services")
    return res.json()
  },
}