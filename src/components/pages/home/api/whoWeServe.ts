import type { Audience } from "../types";

const BASE_URL = "";

export const AudiencesApi = {
  async list(): Promise<Audience[]> {
    const res = await fetch(`${BASE_URL}/api/audiences`);

    if (!res.ok) {
      throw new Error("Failed to fetch audiences");
    }

    return res.json();
  },
};