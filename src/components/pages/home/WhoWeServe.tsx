import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Globe, GraduationCap, Home } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import type { Audience } from "./types";

const iconMap = {
  Globe,
  Home,
  Briefcase,
  GraduationCap,
} as const;

export function WhoWeServe() {
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/audiences");
        if (!res.ok) throw new Error("Failed to load audiences");
        const data = (await res.json()) as Audience[];
        setAudiences(data);
      } catch (err) {
        console.error(err);
        setAudiences([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">Who We Serve</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            We support diverse individuals on their journey to meaningful employment in the Waikato region
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, index) => {
              const Icon =
                iconMap[audience.icon as keyof typeof iconMap] ?? Globe;

              return (
                <motion.div
                  key={audience.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full border-0 shadow-md transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4 text-center">
                      <div
                        className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${audience.bgColor}`}
                      >
                        <Icon className={`h-7 w-7 ${audience.color}`} />
                      </div>
                      <CardTitle className="text-lg">{audience.title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="text-center text-sm">
                        {audience.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}