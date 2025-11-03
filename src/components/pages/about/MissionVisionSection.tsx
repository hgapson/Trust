import { motion } from "motion/react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";

export function MissionVisionSection() {
  return (
    <section className="py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ImageWithFallback
            src="https://media.licdn.com/dms/image/v2/C4E12AQGkw2DkzWd14A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520437220732?e=2147483647&v=beta&t=wpGG84obe9jBH9u0-MHlJOWTnqH8bGAZZ8BK8VJSSds"
            alt="Diverse team meeting"
            className="h-96 w-full rounded-lg object-cover shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="mb-4 text-3xl lg:text-4xl">Our Mission</h2>
            <p className="text-lg text-gray-600">
              To provide comprehensive support, resources, and advocacy for
              migrants and former refugees in the Waikato region, helping them
              achieve economic independence and social integration through
              employment opportunities and community engagement.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-2xl">Our Vision</h3>
            <p className="text-lg text-gray-600">
              A thriving, inclusive Waikato community where every migrant and
              former refugee has the opportunity to reach their full potential
              and contribute meaningfully to society.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
