import type { TeamMember } from "../types";

const BASE_URL = "";

export const TeamApi = {
  async list(type?: "staff" | "trustee"): Promise<TeamMember[]> {
    const url = type ? `${BASE_URL}/api/team?type=${type}` : `${BASE_URL}/api/team`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load team");
    const data = (await res.json()) as TeamMember[];
    return data.map((member) => {
      const imageUrl = member.image_url?.trim();
      if (!imageUrl) return member;
      if (imageUrl.startsWith("http")) return member;
      const normalized = imageUrl.replace(/^(\.\.\/)+public\/?/, "/");
      return {
        ...member,
        image_url: `${BASE_URL}${normalized.startsWith("/") ? "" : "/"}${normalized}`,
      };
    });
  },
};
