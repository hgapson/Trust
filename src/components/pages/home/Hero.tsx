import { motion } from "motion/react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { Button } from "../../ui/button";

export function Hero() {
  return (
    <section id="home" className="gradient-bg-hero relative py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container relative z-10 mx-auto max-w-screen-xl px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-4xl tracking-tight text-white lg:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Empowering Your
                <span className="text-cyan-200"> Journey</span> to
                <span className="text-pink-200"> Success</span>
              </motion.h1>
              <motion.p
                className="max-w-lg text-xl text-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We help migrants and former refugees in Waikato become
                work-ready and contribute meaningfully to their local
                communities.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button className="bg-white text-purple-600 transition-colors hover:bg-blue-50 hover:text-purple-700" size="lg">
                Get Started Today
              </Button>
              <Button
                className="border-white text-white transition-colors hover:bg-white hover:text-purple-600"
                size="lg"
                variant="outline"
              >
                Learn More
              </Button>
            </motion.div>

            <motion.div
              className="border-t border-white/20 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl text-cyan-200">500+</div>
                  <div className="text-sm text-blue-100">People Helped</div>
                </div>
                <div>
                  <div className="text-2xl text-pink-200">95%</div>
                  <div className="text-sm text-blue-100">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl text-yellow-200">50+</div>
                  <div className="text-sm text-blue-100">Partners</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629787177096-9fbe3e2ef6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwd29ya2luZyUyMHRvZ2V0aGVyJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODUxOTAyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diverse people working together in an office environment"
                className="h-96 w-full object-cover"
              />
            </div>
            <motion.div
              className="glass-effect absolute -bottom-6 -left-6 rounded-lg border border-white/20 p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
                <span className="text-sm">Ready to help you succeed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
