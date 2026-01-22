import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Clock, Mail, Phone, BookOpen, CheckCircle, Users, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import type { AdditionalService } from "./types";
import type { CallToActionData } from "../Shared/Data/contactTypes";
import { AdditionalServicesApi } from "./api/additionalServices";
import { CallToActionApi } from "../Shared/API/callToAction"; 
import { findContactMethodByKind, useContactMethodLinks } from "../contact/contactMethods";

const iconMap = {
  BookOpen,
  CheckCircle,
  Users,
  MapPin,
} as const;

type UiAdditionalService = {
  id: number;
  title: string;
  description: string;
  sessions: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function AdditionalServicesSection() {
  const [services, setServices] = useState<AdditionalService[]>([]);
  const [cta, setCta] = useState<CallToActionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { rows, phoneHref, emailHref } = useContactMethodLinks();

  const phoneDetails = useMemo(
    () => findContactMethodByKind(rows, "phone")?.details ?? cta?.phone ?? "+64 223146756",
    [rows, cta?.phone],
  );
  const emailDetails = useMemo(
    () =>
      findContactMethodByKind(rows, "email")?.details ??
      cta?.email ??
      "waikato.navtrust@outlook.com",
    [rows, cta?.email],
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [servicesData, ctaData] = await Promise.all([
          AdditionalServicesApi.list(),
          CallToActionApi.get(),
        ]);

        setServices(Array.isArray(servicesData) ? servicesData : []);
        setCta(ctaData ?? null);
      } catch (err) {
        console.error(err);
        setServices([]);
        setCta(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const mapped = useMemo<UiAdditionalService[]>(() => {
    return services.map((s) => {
      const Icon =
        iconMap[s.icon_key as keyof typeof iconMap] ?? CheckCircle;

      return {
        id: s.id,
        title: s.title,
        description: s.description,
        sessions: s.sessions,
        Icon,
      };
    });
  }, [services]);

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

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl bg-white/70" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mapped.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 bg-white/80 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <service.Icon className="h-6 w-6 text-blue-600" />
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

          {/* CTA (Call + Email from DB, no WhatsApp) */}
          <div className="mt-12 flex justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-base font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg">
                  Need support? Contact us
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="center"
                sideOffset={12}
                className="w-80 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
              >
                <p className="text-sm font-semibold text-slate-700">
                  Choose how you want to reach us
                </p>

                <div className="flex flex-col gap-2">
                  <a
                    href={phoneHref}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Phone className="h-4 w-4 text-blue-600" />
                  
                    </span>
                    <span className="text-xs text-slate-600">
                      {phoneDetails}
                    </span>
                  </a>

                  <a
                    href={emailHref}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Mail className="h-4 w-4 text-purple-600" />
                      
                    </span>
                    <span className="text-xs text-slate-600">
                      {emailDetails}
                    </span>
                  </a>
                </div>

                {cta?.availability ? (
                  <p className="pt-1 text-xs text-slate-500">
                    {cta.availability}
                  </p>
                ) : null}
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
    </section>
  );
}
