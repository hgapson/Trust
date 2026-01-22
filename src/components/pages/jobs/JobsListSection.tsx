import { motion } from "motion/react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { Job } from "./types";

type Props = {
  jobs: Job[];
  filteredJobs: Job[];
  loading: boolean;
  error: string | null;
  formatDate: (iso?: string) => string;
  contactHref: (title: string) => string;
};

export function JobsListSection({
  jobs,
  filteredJobs,
  loading,
  error,
  formatDate,
  contactHref,
}: Props) {
  return (
    <section className="gradient-bg-values rounded-2xl py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
            Roles ready to explore
          </h2>
          <p className="text-xl text-gray-600">
            Showing {filteredJobs.length} of {jobs.length || "…"} roles available right now
          </p>
        </div>

        {loading ? (
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-2xl bg-white/80 shadow-xl"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <Card className="border-0 bg-white/80 text-red-700 shadow-xl">
            <CardContent className="py-10 text-center">
              <h3 className="text-lg font-semibold">We hit a snag</h3>
              <p className="mt-2">{error}</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
                <a
                  href="/contact#ContactFormAndInfoSection"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                >
                  Contact us
                </a>
              </div>
            </CardContent>
          </Card>
        ) : filteredJobs.length === 0 ? (
          <Card className="border-0 bg-white/80 shadow-xl">
            <CardContent className="py-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                No roles match that search
              </h3>
              <p className="mt-3 text-gray-600">
                Clear the search or tell us what you&apos;re looking for.
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href="/contact#contact-form"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                >
                  Send preferences
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full border-0 bg-white/90 p-2 shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <CardHeader className="space-y-3 pb-2">
                      <p className="text-sm font-semibold text-blue-600">
                        {job.company}
                      </p>
                      <CardTitle className="text-2xl leading-tight">
                        {job.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Posted {formatDate(job.created_at)}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-2">
                      {job.description ? (
                        <p className="text-base leading-relaxed text-gray-700">
                          {job.description}
                        </p>
                      ) : (
                        <p className="text-base text-gray-500">
                          No description provided.
                        </p>
                      )}

                     <div className="grid gap-3 sm:grid-cols-2">
                <a
                    href={contactHref(job.title)}
                    className="inline-flex h-9 items-center justify-center rounded-md
                            bg-gradient-to-r from-blue-500 to-purple-600
                            px-4 text-sm font-medium text-white
                            shadow-sm transition
                            hover:from-blue-600 hover:to-purple-700 hover:shadow-md"
                >
                    Contact about this role
                </a>
                </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
