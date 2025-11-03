import { motion } from "motion/react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";

export function CommunityHighlightSection() {
  return (
    <section className="py-20">
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageWithFallback
          src="https://cface.chass.ncsu.edu/wp-content/uploads/sites/12/2025/09/Web-Story-Graphics-1.png"
          alt="Community volunteers helping hands"
          className="h-96 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-6 text-center text-white">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl">
              Together We Make a Difference
            </h2>
            <p className="mx-auto max-w-2xl text-xl">
              Every volunteer hour, every partnership creates
              ripples of positive change in our community.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
