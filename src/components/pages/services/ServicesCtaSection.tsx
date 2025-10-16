import { motion } from "motion/react";

import { Button } from "../../ui/button";

export function ServicesCtaSection() {
  return (
    <section className="py-20 text-center">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl">
          Ready to Begin Your Employment Journey?
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Take the first step towards a successful career. Our services are free
          and designed specifically for migrants and former refugees in the
          Waikato region.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
            Schedule Assessment
          </Button>
          <Button variant="outline" size="lg">
            Download Service Guide
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
