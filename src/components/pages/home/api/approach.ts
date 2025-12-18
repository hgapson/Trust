import type { ApproachStep } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const ApproachApi = {
  async list(): Promise<ApproachStep[]> {
    const res = await fetch(`${BASE_URL}/api/approach-steps`);

    if (!res.ok) {
      throw new Error("Failed to fetch approach steps");
    }

    return res.json();
  },
};