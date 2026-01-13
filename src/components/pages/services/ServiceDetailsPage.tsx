import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle, Heart, Target, Wrench } from "lucide-react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { Button } from "../../ui/button";
import { DetailedServicesApi } from "./api/detailedServices";
import { ServiceDetailsApi } from "./api/serviceDetails";
import type { DetailedServiceRow } from "./types";

type ServiceDetailsRow = {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  modalDetails?: string;
  features?: string[];
  modalSteps?: string[];
};

const iconMap = {
  Heart,
  Wrench,
  Target,
} as const;

export function ServiceDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<DetailedServiceRow | null>(null);
  const [moreInfo, setMoreInfo] = useState<ServiceDetailsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("This service is missing a valid identifier.");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [detailRes, moreInfoRes] = await Promise.all([
          DetailedServicesApi.get(slug),
          ServiceDetailsApi.getBySlug(slug).catch(() => null),
        ]);

        setDetail(detailRes ?? null);
        setMoreInfo(moreInfoRes ?? null);
      } catch (err) {
        console.error(err);
        setError("We couldn't load this service. Please try again soon.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const serviceTitle = detail?.title ?? moreInfo?.title ?? "Service";
  const serviceDescription = detail?.description ?? moreInfo?.description ?? "";
  const serviceImage = detail?.image ?? "";
  const serviceColor = detail?.color ?? moreInfo?.color ?? "text-slate-700";
  const serviceBg = detail?.bgColor ?? moreInfo?.bgColor ?? "bg-slate-100";
  const iconKey = (detail?.icon ?? moreInfo?.icon ?? "Target") as keyof typeof iconMap;
  const ServiceIcon = iconMap[iconKey] ?? Target;

  const features = useMemo(() => {
    if (detail?.features?.length) return detail.features;
    return moreInfo?.features ?? [];
  }, [detail, moreInfo]);

  const steps = useMemo(() => moreInfo?.modalSteps ?? [], [moreInfo]);

  const handleBack = () => {
    navigate("/services");
  };

  const handleContact = () => {
    navigate("/contact#contact-form");
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 pb-16 pt-28 sm:pb-20 sm:pt-28">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-blue-200/60 via-emerald-100/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-100/60 via-rose-100/40 to-transparent blur-3xl" />

      <div className="container gradient-bg-values mx-auto max-w-screen-xl px-4">
        <div className="mb-8">
          <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Button>
        </div>

        <div className="rounded-3xl border gradient-bg-values border-white/60 bg-white/80 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10">
          {loading ? (
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="h-96 w-full animate-pulse rounded-3xl bg-slate-100" />
              <div className="space-y-5">
                <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-10 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-6 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-6 w-5/6 animate-pulse rounded bg-slate-100" />
                <div className="h-28 w-full animate-pulse rounded-2xl bg-slate-100" />
              </div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <h2 className="text-lg font-semibold">We hit a snag</h2>
              <p className="mt-2">{error}</p>
              <div className="mt-4">
                <Button variant="outline" onClick={handleBack}>
                  Back to Services
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-emerald-50/60 p-4 shadow-[0_30px_60px_rgba(15,23,42,0.18)]">
                    {serviceImage ? (
                      <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                        <ImageWithFallback
                          src={serviceImage}
                          alt={serviceTitle}
                          className="h-96 w-full object-cover sm:h-[28rem]"
                        />
                      </div>
                    ) : (
                      <div className="flex h-96 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        Image coming soon
                      </div>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-r from-white via-slate-50 to-amber-50/60 p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Button className={`${serviceColor} hover:${serviceBg}`} variant="outline" onClick={handleContact}>
                        Start Your Journey
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-slate-500">
                        Free support for migrants and former refugees
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-blue-50/60 p-6 shadow-sm"
                >
                  <div className="space-y-4">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${serviceBg}`}>
                    <ServiceIcon className={`h-8 w-8 ${serviceColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Service focus
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold text-gray-900 lg:text-4xl">
                      {serviceTitle}
                    </h1>
                      {serviceDescription && (
                        <p className="mt-3 text-lg text-gray-600">
                          {serviceDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {moreInfo?.modalDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-emerald-50/40 to-slate-50 p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-semibold text-gray-700">
                      What this service looks like
                    </h2>
                    <p className="mt-4 text-gray-700">
                      {moreInfo.modalDetails}
                    </p>
                  </motion.div>
                )}

                {steps.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-amber-50/40 to-slate-50 p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">
                      Steps you can expect
                    </h3>
                    <ul className="mt-4 space-y-3 text-gray-700">
                      {steps.map((step) => (
                        <li key={step} className="flex items-start gap-3">
                          <span
                            className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${serviceColor.replace(
                              "text-",
                              "bg-",
                            )}`}
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">
                      What&apos;s included
                    </h3>
                    <div className="mt-4 grid gap-3">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
