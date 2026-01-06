import { motion } from "motion/react";

import { Badge } from "../../../ui/badge";
import { Card, CardContent } from "../../../ui/card";
import { cn } from "../../../ui/utils";
import { ImageWithFallback } from "../../../FallBacks/ImageWithFallback";
import { Link, MapPin, Star } from "lucide-react";

import type { PartnerProfile } from "../types";

const accentGradients = [
  "from-rose-500 to-amber-400",
  "from-emerald-500 to-teal-400",
  "from-sky-500 to-indigo-400",
  "from-fuchsia-500 to-pink-400",
  "from-orange-500 to-red-400",
  "from-cyan-500 to-blue-400",
];

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PartnerCard({
  profile,
  accentClass,
}: {
  profile: PartnerProfile;
  accentClass: string;
}) {
  return (
    <Card className="group relative h-full overflow-hidden border border-white/80 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", accentClass)} />

      <CardContent className="flex h-full flex-col gap-4 p-6 pt-7">
        <div className="flex flex-col items-start gap-4">
          <div
            className={cn(
              "flex min-h-20 w-full items-center justify-start rounded-2xl bg-gradient-to-br text-lg font-semibold text-white shadow-sm",
              accentClass,
            )}
          >
            {profile.logo ? (
              <div className="flex h-16 w-full items-center justify-start rounded-xl bg-white px-4 py-2 shadow-sm">
                <ImageWithFallback
                  src={profile.logo}
                  alt={`${profile.name} logo`}
                  className="h-12 w-auto max-w-[160px] object-contain"
                />
              </div>
            ) : (
              <span className="px-4">{initialsFromName(profile.name)}</span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <Badge
            variant="secondary"
            className={cn("border-0 bg-gradient-to-r text-gray-100 shadow-sm", accentClass)}
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
            Visit website
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function PartnersList({
  profiles,
  loading,
}: {
  profiles: PartnerProfile[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-2xl bg-white/70" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {profiles.map((profile, index) => (
        <motion.div
          key={`${profile.name}-${index}`}
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
  );
}
