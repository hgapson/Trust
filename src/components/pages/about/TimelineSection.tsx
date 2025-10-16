import { motion } from "motion/react";

import { Card, CardContent } from "../../ui/card";
import type { Milestone } from "./data";

interface TimelineSectionProps {
  milestones: Milestone[];
}

export function TimelineSection({ milestones }: TimelineSectionProps) {
  return (
    <section className="py-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">Our Journey</h2>
        <p className="text-xl text-gray-600">
          Key milestones in our mission to serve the community
        </p>
      </motion.div>

      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex items-center gap-8 ${
              index % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-24 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-600">
                {milestone.year}
              </div>
            </div>
            <Card className="flex-1 glass-effect">
              <CardContent className="p-6">
                <p className="text-lg">{milestone.event}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
