import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { Card, CardContent } from "../../ui/card";
import type { CommunityStory } from "./types";
import { CommunityStoriesApi } from "./api/communityStories";

export function CommunityImpact() {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await CommunityStoriesApi.list(3);
        setStories(data);
      } catch (err) {
        console.error(err);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="gradient-bg-values py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">
            Community Impact Stories
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Real stories from people we’ve had the privilege to support
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-3">
              {stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full border-0 shadow-md transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6">
                      <Quote className="mb-4 h-8 w-8 text-purple-400" />
                      <p className="mb-6 text-gray-600 italic leading-relaxed">
                        “{story.quote}”
                      </p>
                      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                          <ImageWithFallback
                            src={story.image_url}
                            alt={story.author}
                            className="h-full w-full object-cover"
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

<div className="mt-12 flex justify-center">
  <a
    href="/about#CommunityImpact"
    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
  >
    Read more stories
  </a>
</div>
          </>
        )}
      </div>
    </section>
  );
}

export default CommunityImpact;
