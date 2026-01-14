import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ProcessStepsApi } from "./api/processSteps";
import type { ProcessStep } from "./types";

export function ProcessTimelineSection() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);

  useEffect(() => {
    ProcessStepsApi.list()
      .then(setSteps)
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 gradient-bg-values">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">Your Journey With Us</h2>
        <p className="text-xl text-gray-600">
          A step-by-step process designed for your success
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl text-white">
              {step.step_number}
            </div>
            <h3 className="mb-2 text-xl">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}