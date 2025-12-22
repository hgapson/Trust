import type { ServiceRow } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const ServicesApi = {
  async list(): Promise<ServiceRow[]> {
    const res = await fetch(`${BASE_URL}/api/services`);

    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }

    return res.json();
  },
};