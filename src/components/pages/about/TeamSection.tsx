import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import type { TeamMember } from "./types";

interface TeamSectionProps {
  members: TeamMember[];
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamSection({ members }: TeamSectionProps) {
  const [activeGroup, setActiveGroup] = useState<"staff" | "trustee">("staff");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => (member.team_type ?? "staff") === activeGroup);
  }, [members, activeGroup]);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl lg:text-4xl">Meet Our Team</h2>
          <p className="text-xl text-gray-600">
            Dedicated professionals committed to your success
          </p>
        </motion.div>

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveGroup("staff")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeGroup === "staff"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Team Staff
            </button>
            <button
              type="button"
              onClick={() => setActiveGroup("trustee")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeGroup === "trustee"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Trustees
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex justify-center">
          <div className="grid w-full max-w-6xl place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="w-full max-w-sm"
              >
                <Card className="h-full text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    {/* Avatar */}
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                      {member.image_url ? (
                        <ImageWithFallback
                          src={member.image_url}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-white">
                          {initialsFromName(member.name)}
                        </span>
                      )}
                    </div>

                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="font-medium text-blue-600">{member.role}</p>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {!filteredMembers.length ? (
              <div className="col-span-full rounded-xl border border-dashed border-slate-200 px-6 py-8 text-center text-sm text-slate-500">
                No team members available.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
