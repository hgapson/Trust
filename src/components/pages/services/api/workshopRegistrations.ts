import type { WorkshopRegistrationPayload } from "../types";

const BASE_URL = "";

export const WorkshopRegistrationsApi = {
  async create(payload: WorkshopRegistrationPayload): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/workshop-registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => "");
      throw new Error(msg || "Failed to submit registration");
    }
  },
};