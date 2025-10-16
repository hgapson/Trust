import { motion } from "motion/react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";

export function MissionVisionSection() {
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
            src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzU4NDY2MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
            <h2 className="mb-4 text-3xl lg:text-4xl">Our Mission</h2>
            <p className="text-lg text-gray-600">
              To provide comprehensive support, resources, and advocacy for
              migrants and former refugees in the Waikato region, helping them
              achieve economic independence and social integration through
              employment opportunities and community engagement.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-2xl">Our Vision</h3>
            <p className="text-lg text-gray-600">
              A thriving, inclusive Waikato community where every migrant and
              former refugee has the opportunity to reach their full potential
              and contribute meaningfully to society.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
