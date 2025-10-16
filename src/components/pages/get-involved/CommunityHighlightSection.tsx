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
          src="https://images.unsplash.com/photo-1710092784814-4a6f158913b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwY29tbXVuaXR5JTIwaGVscGluZyUyMGhhbmRzfGVufDF8fHx8MTc1ODQ4NDE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Community volunteers helping hands"
          className="h-96 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-6 text-center text-white">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl">
              Together We Make a Difference
            </h2>
            <p className="mx-auto max-w-2xl text-xl">
              Every volunteer hour, every donation, every partnership creates
              ripples of positive change in our community.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
