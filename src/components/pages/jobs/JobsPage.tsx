import { useEffect, useMemo, useState } from "react";
import { JobsApi } from "./api";
import type { Job } from "./types";

import { JobsHero } from "./JobsHero";
import { JobsListSection } from "./JobsListSection";

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await JobsApi.list();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("We couldn't reach the jobs service. Please try again shortly.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobs;
    const term = search.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        (job.description ?? "").toLowerCase().includes(term),
    );
  }, [jobs, search]);

  const formatDate = (iso?: string) => {
    if (!iso) return "Open now";
    const date = new Date(iso);
    return isNaN(date.getTime()) ? "Open now" : date.toLocaleDateString();
  };

  const contactHref = (title: string) =>
    `/contact?job=${encodeURIComponent(title)}#contact-form`;

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white">
      <JobsHero search={search} setSearch={setSearch} />

      <JobsListSection
        jobs={jobs}
        filteredJobs={filteredJobs}
        loading={loading}
        error={error}
        formatDate={formatDate}
        contactHref={contactHref}
      />
    </div>
  );
}