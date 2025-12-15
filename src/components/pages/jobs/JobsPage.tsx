import { useEffect, useMemo, useState } from "react";
import { Briefcase, CalendarDays, Mail } from "lucide-react";
import { JobsApi } from "./api"; // adjust if your folder differs
import type { Job } from "./types";

import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";

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
        setError(
          "We couldn't reach the jobs service. Please try again shortly.",
        );
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
    return isNaN(date.getTime())
      ? "Open now"
      : date.toLocaleDateString();
  };

  const contactHref = (title: string) =>
    `/contact?job=${encodeURIComponent(title)}#contact-form`;

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white">
      <section className="border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto max-w-screen-xl px-4 py-16">
          <p className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            <Briefcase className="mr-2 h-4 w-4" />
            Current opportunities
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Find a role you feel confident stepping into
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-700">
            Browse trusted local roles and tell us which jobs you want help with.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Search by title, company, or keywords"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md bg-white"
            />
            <a
              href="/contact#contact-form"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Talk to a navigator
            </a>
          </div>

          <div className="mt-6 flex gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              Updated daily
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              We respond within 24 hours
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-screen-xl px-4 py-16">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-xl border bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <Card className="border-red-200 bg-red-50 text-red-700">
            <CardContent className="py-8">
              <h3 className="text-lg font-semibold">We hit a snag</h3>
              <p className="mt-2">{error}</p>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
                <a
                  href="/contact#contact-form"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Contact us
                </a>
              </div>
            </CardContent>
          </Card>
        ) : filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <h3 className="text-xl font-semibold">No roles match that search</h3>
              <p className="mt-2 text-gray-600">
                Clear the search or tell us what you&apos;re looking for.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardHeader>
                  <p className="text-sm text-blue-600">{job.company}</p>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Posted {formatDate(job.created_at)}
                  </p>
                </CardHeader>
                <CardContent>
                  {job.description && (
                    <p className="text-sm text-gray-700">
                      {job.description}
                    </p>
                  )}
                  <div className="mt-4 flex gap-3">
                    <a
                      href={contactHref(job.title)}
                      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Contact about this role
                    </a>
                    <a
                      href="/contact#contact-form"
                      className="rounded-md border px-4 py-2"
                    >
                      Talk to a navigator
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}