import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";

import type { MissionVisionData } from "./types";
import { MissionVisionApi } from "./api/missionVision";

export function MissionVisionSection() {
  const [data, setData] = useState<MissionVisionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await MissionVisionApi.get();
        setData(result);
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-lg bg-slate-100" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 animate-pulse rounded bg-slate-100" />
            <div className="h-20 animate-pulse rounded bg-slate-100" />
            <div className="h-8 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="h-20 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ImageWithFallback
            src={data.image_url}
            alt="Diverse team meeting"
            className="h-96 w-full rounded-lg object-cover shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="mb-4 text-3xl lg:text-4xl">{data.mission_title}</h2>
            <p className="text-lg text-gray-600">{data.mission_description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-2xl">{data.vision_title}</h3>
            <p className="text-lg text-gray-600">{data.vision_description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}