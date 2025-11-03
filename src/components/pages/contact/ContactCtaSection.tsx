import { motion } from "motion/react";

import { Button } from "../../ui/button";
import { Phone } from "lucide-react";

export function ContactCtaSection() {
  return (
    <section className="py-20 text-center">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl">
          Ready to Take the Next Step?
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Don&apos;t wait to start your journey towards employment success.
          Contact us today and let&apos;s work together to achieve your career
          goals.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
            <Phone className="mr-2 h-4 w-4" />
            Call us for Consultation
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
