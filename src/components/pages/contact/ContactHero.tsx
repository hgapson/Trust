import { motion } from "motion/react";

export function ContactHero() {
  return (
    <section className="gradient-bg-hero py-20">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container relative z-10 mx-auto max-w-screen-xl px-4">
        <motion.div
          className="space-y-6 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl">Contact Us</h1>
          <p className="mx-auto max-w-3xl text-xl text-blue-100">
            Ready to start your employment journey? We&apos;re here to help and
            support you every step of the way. Get in touch today to begin
            transforming your future.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
