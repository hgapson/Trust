const BASE_URL = "";

export const ServiceDetailsApi = {
  async get(id: string) {
    const res = await fetch(`${BASE_URL}/api/services/${id}`);
    if (!res.ok) throw new Error("Failed to load service details");
    return res.json();
  },
  async getBySlug(slug: string) {
    const res = await fetch(`${BASE_URL}/api/services/slug/${slug}`);
    if (!res.ok) throw new Error("Failed to load service details");
    return res.json();
  },
};
