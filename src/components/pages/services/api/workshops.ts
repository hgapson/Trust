import type { Workshop, WorkshopRegistrationPayload } from "../types";

const BASE_URL = "http://localhost:4000";

export const WorkshopsApi = {
  async listUpcoming(): Promise<Workshop[]> {
    const res = await fetch(`${BASE_URL}/api/workshops?upcoming=true`);
    if (!res.ok) throw new Error("Failed to load workshops");
    return res.json();
  },

  async register(
    workshopId: number,
    payload: WorkshopRegistrationPayload,
  ): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/workshops/${workshopId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => "");
      throw new Error(msg || "Failed to register");
    }
  },
};
