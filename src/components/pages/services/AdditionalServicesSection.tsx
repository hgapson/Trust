import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Clock } from "lucide-react";
import type { AdditionalService } from "./data";

interface AdditionalServicesSectionProps {
  services: AdditionalService[];
}

export function AdditionalServicesSection({
  services,
}: AdditionalServicesSectionProps) {
  return (
    <section className="gradient-bg-values rounded-2xl py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
          Additional Support Services
        </h2>
        <p className="text-xl text-gray-600">
          Comprehensive assistance to remove barriers to employment
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-0 bg-white/80 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
                <div className="text-sm text-blue-600">
                  <Clock className="mr-1 inline h-4 w-4" />
                  {service.sessions}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
