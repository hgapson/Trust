import type { CallToActionData } from "../types";

export const CallToActionApi = {
  get: async (): Promise<CallToActionData> => {
    const res = await fetch("/api/call-to-action");
    if (!res.ok) throw new Error("Failed to load CTA");
    return res.json();
  },
};