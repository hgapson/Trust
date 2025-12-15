import { api } from "../../../Client";
import type { Job } from "./types";

export const JobsApi = {
  list: () => api<Job[]>("/api/jobs"),
  create: (payload: Partial<Job>) =>
    api<Job>("/api/jobs", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};