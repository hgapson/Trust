import { motion } from "motion/react";

import type { ImpactStat } from "./data";

interface ImpactStatsSectionProps {
  stats: ImpactStat[];
}

export function ImpactStatsSection({ stats }: ImpactStatsSectionProps) {
  return (
    <section className="py-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">Your Impact Matters</h2>
        <p className="text-xl text-gray-600">
          See how your involvement creates real change
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <stat.icon className="h-8 w-8" />
            </div>
            <div className="mb-2 text-3xl text-blue-600">{stat.number}</div>
            <div className="text-gray-700">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
