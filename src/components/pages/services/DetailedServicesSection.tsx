import { motion } from "motion/react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { DetailedService } from "./data";

interface DetailedServicesSectionProps {
  services: DetailedService[];
}

export function DetailedServicesSection({
  services,
}: DetailedServicesSectionProps) {
  return (
    <section className="py-20">
      <div className="space-y-20">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`grid items-center gap-12 lg:grid-cols-2 ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                className="h-96 w-full rounded-lg object-cover shadow-2xl"
              />
            </div>

            <div
              className={`space-y-6 ${
                index % 2 === 1 ? "lg:col-start-1" : ""
              }`}
            >
              <div
                className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg ${service.bgColor}`}
              >
                <service.icon className={`h-8 w-8 ${service.color}`} />
              </div>

              <div>
                <h2 className="mb-4 text-3xl lg:text-4xl">{service.title}</h2>
                <p className="mb-6 text-lg text-gray-600">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl">What&apos;s Included:</h3>
                <div className="grid gap-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className={`${service.color} hover:${service.bgColor}`}
                variant="outline"
              >
                Learn More About {service.title.split(" - ")[0]}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
