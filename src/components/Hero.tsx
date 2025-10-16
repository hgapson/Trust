import { Button } from "./ui/button";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="home" className="relative py-20 lg:py-32 gradient-bg-hero">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto max-w-screen-xl px-4 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl lg:text-6xl tracking-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Empowering Your 
                <span className="text-cyan-200"> Journey</span> to 
                <span className="text-pink-200"> Success</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We help migrants and former refugees in Waikato become work-ready and contribute meaningfully to their local communities.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" className="bg-white text-purple-600 hover:bg-blue-50 hover:text-purple-700">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                Learn More
              </Button>
            </motion.div>

            <motion.div 
              className="pt-8 border-t border-white/20"
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
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629787177096-9fbe3e2ef6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwd29ya2luZyUyMHRvZ2V0aGVyJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODUxOTAyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diverse people working together in an office environment"
                className="w-full h-96 object-cover"
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-lg shadow-lg border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Ready to help you succeed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}