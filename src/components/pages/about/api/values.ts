import type { ValueItem } from "../types";

const BASE_URL = "";

export const ValuesApi = {
  async list(): Promise<ValueItem[]> {
    const res = await fetch(`${BASE_URL}/api/values`);
    if (!res.ok) throw new Error("Failed to load values");
    return res.json();
  },
};