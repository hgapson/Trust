import type { MissionVisionData } from "../types";

const BASE_URL = "";

export const MissionVisionApi = {
  async get(): Promise<MissionVisionData> {
    const res = await fetch(`${BASE_URL}/api/mission-vision`);
    if (!res.ok) throw new Error("Failed to load mission vision data");
    return res.json();
  },
};