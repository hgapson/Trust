import { motion } from 'motion/react';
import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CommunityImpact() {
  const stories = [
    {
      quote: "The Navigate Trust helped me understand the NZ workplace culture and connected me with an employer who values my skills. I'm now working in my field and supporting my family.",
      author: "Maria S.",
      role: "Healthcare Professional",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODU0NTA1MHww&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral"
    },
    {
      quote: "After years of feeling lost, the mentorship program gave me direction and confidence. The workshops taught me how to present my international experience effectively.",
      author: "Ahmed K.",
      role: "IT Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg1NDUwNTB8MA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral"
    },
    {
      quote: "The team at Navigate Trust didn't just help me find a job - they helped me build a future. Their support made all the difference in my transition to life in New Zealand.",
      author: "Priya M.",
      role: "Business Analyst",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzU4NTQ1MDUwfDA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl text-gray-800">Community Impact Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from people we've had the privilege to support on their journey
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.author}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-purple-400" />
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-gray-800">{story.author}</div>
                      <div className="text-sm text-gray-500">{story.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl lg:text-3xl mb-4">Your Success Story Starts Here</h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Join the growing community of migrants and former refugees who have found meaningful 
            employment and built fulfilling careers in the Waikato region with our support.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
