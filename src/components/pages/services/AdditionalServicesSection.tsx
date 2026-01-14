import { motion } from "motion/react";
import { ArrowRight, Clock, Mail, Phone } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

import type { AdditionalService } from "./data";

interface AdditionalServicesSectionProps {
  services: AdditionalService[];
}

export function AdditionalServicesSection({
  services,
}: AdditionalServicesSectionProps) {
  return (
    <section className="gradient-bg-values rounded-2xl py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
            Additional Support Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive assistance to remove barriers to employment
          </p>
        </div>

        {/* Services Grid */}
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

        {/* CTA with 2 options */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700">
                Need support? Talk to us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="center"
              sideOffset={12}
              className="w-80 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
            >
              <p className="text-sm font-semibold text-slate-600">
                Choose how you want to reach us
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="tel:+64223146756"
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Phone className="h-4 w-4 text-blue-600" />
                    Call us
                  </span>
                  <span className="text-xs text-slate-500">+64 223 146 756</span>
                </a>

                <a
                  href="mailto:waikato.navtrust@outlook.com"
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Mail className="h-4 w-4 text-purple-600" />
                    Email us
                  </span>
                  <span className="text-xs text-slate-500">Open mail</span>
                </a>
              </div>
            </PopoverContent>
          </Popover>
        </motion.div>
      </div>
    </section>
  );
}