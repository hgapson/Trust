import type { DetailedServiceRow } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const DetailedServicesApi = {
  async list(): Promise<DetailedServiceRow[]> {
    const res = await fetch(`${BASE_URL}/api/detailed-services`);
    if (!res.ok) throw new Error("Failed to load detailed services");
    return res.json();
  },
  async get(id: string): Promise<DetailedServiceRow> {
    const res = await fetch(`${BASE_URL}/api/detailed-services/${id}`);
    if (!res.ok) throw new Error("Failed to load detailed service");
    return res.json();
  },
};
