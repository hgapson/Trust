import { motion } from "motion/react";

export function ServicesHero() {
  return (
    <section className="gradient-bg-services py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="space-y-6 text-center text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl">Our Services</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Comprehensive support designed to guide you through every step of
            your employment journey, from building confidence to achieving
            long-term career success.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
