import type { ProcessStep } from "../types";

const BASE_URL = "http://localhost:4000";

export const ProcessStepsApi = {
  async list(): Promise<ProcessStep[]> {
    const res = await fetch(`${BASE_URL}/api/process-steps`);
    if (!res.ok) {
      throw new Error("Failed to load process steps");
    }
    return res.json();
  },
};