import { motion } from "motion/react";

export function GetInvolvedHero() {
  return (
    <section className="gradient-bg-hero py-20">
      <div className="absolute" />
      <div className="container relative z-10 mx-auto max-w-screen-xl px-4">
        <motion.div
          className="space-y-6 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl">Get Involved</h1>
          <p className="mx-auto max-w-3xl text-xl text-blue-100">
            Join our mission to empower migrants and former refugees in the
            Waikato region. Together, we can create meaningful change and build
            stronger communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
