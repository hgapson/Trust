import { motion } from "motion/react";

import { Button } from "../../ui/button";

export function GetInvolvedCtaSection() {
  return (
    <section className="py-20 text-center">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl">Ready to Make an Impact?</h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Whether you volunteeror partner with us, your contribution
          creates meaningful change in the lives of migrants and former refugees
          in our community.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
            Contact Us
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
