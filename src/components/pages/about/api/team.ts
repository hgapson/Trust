import type { TeamMember } from "../types";

const BASE_URL = "http://localhost:4000";

export const TeamApi = {
  async list(): Promise<TeamMember[]> {
    const res = await fetch(`${BASE_URL}/api/team`);
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
