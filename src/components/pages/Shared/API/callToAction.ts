import type { CallToActionData } from "../Data/contactTypes";

const BASE_URL = "http://localhost:4000";

export const CallToActionApi = {
  async get(): Promise<CallToActionData> {
    const res = await fetch(`${BASE_URL}/api/call-to-action`);
    if (!res.ok) throw new Error("Failed to load call to action data");
    return res.json();
  },
};