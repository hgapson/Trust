import { motion } from "motion/react";

import type { ImpactStat } from "./data";

interface ImpactStatsSectionProps {
  stats: ImpactStat[];
}

export function ImpactStatsSection({ stats }: ImpactStatsSectionProps) {
  return (
    <section className="gradient-bg-values rounded-2xl py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">Our Impact</h2>
        <p className="text-xl text-gray-600">
          Making a difference in the Waikato community
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div className={`mb-2 text-3xl ${stat.color}`}>{stat.number}</div>
            <div className="text-gray-700">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
