import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { cn } from "../../ui/utils";
import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { Link, MapPin, Star } from "lucide-react";
import { funders, partners, type PartnerProfile } from "./data";

type PartnerTab = "partners" | "funders";

const tabCopy: Record<PartnerTab, { title: string; description: string }> = {
  partners: {
    title: "Community Partners",
    description:
      "Collaborators who expand our reach through services, training, and opportunity.",
  },
  funders: {
    title: "Mission Funders",
    description:
      "Supporters who invest in sustainable programs and lasting impact.",
  },
};

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const accentGradients = [
  "from-rose-500 to-amber-400",
  "from-emerald-500 to-teal-400",
  "from-sky-500 to-indigo-400",
  "from-fuchsia-500 to-pink-400",
  "from-orange-500 to-red-400",
  "from-cyan-500 to-blue-400",
];

function PartnerCard({
  profile,
  accentClass,
}: {
  profile: PartnerProfile;
  accentClass: string;
}) {
  return (
    <Card className="group relative h-full overflow-hidden border border-white/80 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r",
          accentClass,
        )}
      />
      <CardContent className="flex h-full flex-col gap-4 p-6 pt-7">
        <div className="flex flex-col items-start gap-4">
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white shadow-sm",
              accentClass,
            )}
          >
            {profile.logo ? (
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white p-2 shadow-sm">
                <ImageWithFallback
                  src={profile.logo}
                  alt={`${profile.name} logo`}
                  className="h-16 w-16 object-contain"
                />
              </div>
            ) : (
              initialsFromName(profile.name)
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-600">{profile.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <Badge
            variant="secondary"
            className={cn(
              "border-0 bg-gradient-to-r text-gray-100 shadow-sm",
              accentClass,
            )}
          >
            {profile.focus}
          </Badge>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-500" />
            {profile.location}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2 text-sm text-gray-700">
          <Star className="h-4 w-4 text-amber-500" />
          <span>{profile.contribution}</span>
        </div>

        {profile.url ? (
          <a
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800"
            href={profile.url}
            target="_blank"
            rel="noreferrer"
          >
            <Link className="h-4 w-4" />
            Visit partner
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function PartnersSection() {
  const [activeTab, setActiveTab] = useState<PartnerTab>("partners");

  const profiles = useMemo(
    () => (activeTab === "partners" ? partners : funders),
    [activeTab],
  );

  return (
    <section className="gradient-bg-services py-20">
      <div className="relative overflow-hidden rounded-3xl bg-white/85 px-6 py-16 shadow-sm lg:px-12">
        <div className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-8 h-56 w-56 rounded-full bg-rose-200/50 blur-3xl" />

        <motion.div
          className="mx-auto mb-6 max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mt-1 text-3xl text-gray-900 lg:text-4xl">
            Our partners and funders power the mission
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            We collaborate with trusted organizations to build opportunity,
            belonging, and long-term impact.
          </p>
        </motion.div>

        <div className="mx-auto mb-6 flex w-full max-w-md items-center justify-center gap-3 rounded-full border border-white/80 bg-white p-2 shadow-md">
          {(["partners", "funders"] as PartnerTab[]).map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                activeTab === tab
                  ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm hover:from-amber-600 hover:to-rose-600"
                  : "border border-slate-200 bg-white text-gray-700 hover:border-slate-300 hover:text-gray-900",
              )}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
            >
              {tab === "partners" ? "Partners" : "Funders"}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8 text-center">
              <h3 className="mb-6 text-2xl text-gray-900">
                {tabCopy[activeTab].title}
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                {tabCopy[activeTab].description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile, index) => (
                <motion.div
                  key={profile.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <PartnerCard
                    profile={profile}
                    accentClass={accentGradients[index % accentGradients.length]}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
