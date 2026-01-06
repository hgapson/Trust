import type { DbPartner } from "../types";

const BASE_URL = "http://localhost:4000";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const PartnersApi = {
  async listPartners(): Promise<DbPartner[]> {
    return getJson<DbPartner[]>(`${BASE_URL}/api/partners`);
  },

  async listFunders(): Promise<DbPartner[]> {
    return getJson<DbPartner[]>(`${BASE_URL}/api/funders`);
  },
};