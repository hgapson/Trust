import { motion } from "motion/react";

import { Button } from "../../ui/button";

export function AboutCtaSection() {
  return (
    <section className="py-20 text-center">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl">Ready to Start Your Journey?</h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Join hundreds of migrants and former refugees who have found success
          with our support.
        </p>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
          Get Started Today
        </Button>
      </motion.div>
    </section>
  );
}
