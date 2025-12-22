import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Heart, Target, Wrench } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { ServiceModal, type ServiceModalData } from "./ServiceModal";
import { ServicesApi } from "./api/howWeHelp";
import type { ServiceRow } from "./types";

const iconMap = {
  Heart,
  Wrench,
  Target,
} as const;

type ServiceCardData = ServiceModalData & {
  id: number;
  features: string[];
};

export function Services() {
  const [services, setServices] = useState<ServiceCardData[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceModalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);

        const data = await ServicesApi.list();

        const mapped: ServiceCardData[] = (data as ServiceRow[]).map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Target;

          return {
            id: s.id,
            Icon,
            title: s.title,
            description: s.description,
            color: s.color,
            bgColor: s.bgColor,
            modalDetails: s.modalDetails,
            modalSteps: Array.isArray(s.modalSteps) ? s.modalSteps : [],
            features: Array.isArray(s.features) ? s.features : [],
          };
        });

        setServices(mapped);
      } catch (err) {
        console.error(err);
        setServices([]);
        setError("We couldn't reach the services. Please try again shortly.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleStartJourney = () => {
    window.history.pushState({}, "", "/contact#contact-form");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section id="services" className="gradient-bg-services py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">How We Help You Succeed</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Our comprehensive approach focuses on three key areas
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-white/60" />
            ))}
          </div>
        ) : error ? (
          <Card className="border-red-200 bg-red-50 text-red-700">
            <CardContent className="py-8">
              <h3 className="text-lg font-semibold">We hit a snag</h3>
              <p className="mt-2">{error}</p>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
                <Button onClick={handleStartJourney}>Contact us</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="group border-0 bg-white/90 shadow-lg transition hover:shadow-2xl">
                  <CardHeader>
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.bgColor}`}
                    >
                      <service.Icon className={`h-6 w-6 ${service.color}`} />
                    </div>

                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between ${service.color}`}
                      onClick={() => setSelectedService(service)}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
}