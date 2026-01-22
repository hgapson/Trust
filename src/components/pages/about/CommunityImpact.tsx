import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { Card, CardContent } from "../../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { useContactMethodLinks } from "../contact/contactMethods";
import type { CommunityStory } from "../home/types";
import { CommunityStoriesApi } from "../home/api/communityStories";

export function CommunityImpact() {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [loading, setLoading] = useState(true);
  const { phoneHref, emailHref } = useContactMethodLinks();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await CommunityStoriesApi.list();
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
        <div className="h-12" />      
       <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex w-full max-w-xl flex-col items-center text-center">
            <p className="text-lg font-medium text-gray-800">
              Want to give your own testimony?
            </p>
            <p className="mt-1 text-gray-600">Contact us — we appreciate your feedback!</p>

            <div className="mt-6 flex justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                    disabled={!phoneHref && !emailHref}
                  >
                    Contact us
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="center"
                  sideOffset={10}
                  className="w-72 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
                >
                  <p className="text-sm font-semibold text-slate-700">
                    Choose how you want to reach us
                  </p>
                  <div className="flex flex-col gap-2">
                    {phoneHref ? (
                      <a
                        href={phoneHref}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          <Phone className="h-4 w-4 text-blue-600" />
                          Call us
                        </span>
                      </a>
                    ) : (
                      <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                        <span className="flex items-center gap-2 font-semibold">
                          <Phone className="h-4 w-4 text-blue-300" />
                          Call us
                        </span>
                      </span>
                    )}

                    {emailHref ? (
                      <a
                        href={emailHref}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          <Mail className="h-4 w-4 text-purple-600" />
                          Email us
                        </span>
                      </a>
                    ) : (
                      <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                        <span className="flex items-center gap-2 font-semibold">
                          <Mail className="h-4 w-4 text-purple-300" />
                          Email us
                        </span>
                      </span>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

export default CommunityImpact;
