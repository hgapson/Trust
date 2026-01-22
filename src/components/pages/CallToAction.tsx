import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { ImageWithFallback } from "../FallBacks/ImageWithFallback";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import type { CallToActionData } from "./home/types";
import { useContactMethodLinks } from "./contact/contactMethods";

export function CallToAction() {
  const [cta, setCta] = useState<CallToActionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { phoneHref, emailHref } = useContactMethodLinks();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/call-to-action");
        if (!res.ok) throw new Error("Failed to load CTA");
        const data = (await res.json()) as CallToActionData;
        setCta(data);
      } catch (err) {
        console.error(err);
        setCta(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500 py-20"
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        {loading ? (
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="h-72 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-96 animate-pulse rounded-2xl bg-white/10" />
          </div>
        ) : !cta ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center text-white">
            <p className="text-lg font-semibold">
              We couldn’t load this section.
            </p>
            <p className="mt-2 text-white/80">Please refresh and try again.</p>
          </div>
        ) : (
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* LEFT */}
            <motion.div
              className="space-y-6 text-white"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl">{cta.heading}</h2>

              <p className="text-xl text-blue-100">{cta.description}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-200" />
                  <span className="text-blue-100">{cta.phone}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-200" />
                  <span className="text-blue-100">{cta.email}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-200" />
                  <span className="text-blue-100">{cta.location}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-200" />
                  <span className="text-blue-100">{cta.availability}</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={cta.image_url}
                    alt="Support and partnership"
                    className="h-80 w-full object-cover"
                  />

                  <div className="bg-white p-6">
                    <h3 className="mb-2 text-xl">{cta.card_title}</h3>
                    <p className="mb-4 text-muted-foreground">
                      {cta.card_description}
                    </p>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          {cta.cta_label}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-80 space-y-3">
                        <a
                          href={phoneHref}
                          className="block rounded-lg border px-3 py-2 hover:bg-blue-50"
                        >
                          Call us
                        </a>
                        <a
                          href={emailHref}
                          className="block rounded-lg border px-3 py-2 hover:bg-purple-50"
                        >
                          Email us
                        </a>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
