import type { CommunityStory } from "../types";

export const CommunityStoriesApi = {
  list: async (limit?: number): Promise<CommunityStory[]> => {
    const url = limit
      ? `/api/community-stories?limit=${limit}`
      : `/api/community-stories`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load community stories");
    return res.json();
  },
};