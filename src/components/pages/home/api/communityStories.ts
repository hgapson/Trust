import type { CommunityStory } from "../types";

export const CommunityStoriesApi = {
  list: async (): Promise<CommunityStory[]> => {
    const res = await fetch("/api/community-stories");
    if (!res.ok) throw new Error("Failed to load community stories");
    return res.json();
  },
};