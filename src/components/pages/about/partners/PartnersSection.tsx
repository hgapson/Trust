import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "../../../ui/button";
import { cn } from "../../../ui/utils";

import type { PartnerTab } from "../types";
import { usePartnersData } from "./hooks";
import { PartnersList } from "./PartnersList";

const tabCopy: Record<PartnerTab, { title: string; description: string }> = {
  partners: {
    title: "Community Partners",
    description: "Collaborators who expand our reach through services, training, and opportunity.",
  },
  funders: {
    title: "Mission Funders",
    description: "Supporters who invest in sustainable programs and lasting impact.",
  },
};

export function PartnersSection() {
  const [activeTab, setActiveTab] = useState<PartnerTab>("partners");
  const { rows, loading } = usePartnersData(activeTab);

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
          <h2 className="mb-1 text-3xl text-gray-900 lg:text-4xl">
            Our partners and funders power the mission
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            We collaborate with trusted organizations to build opportunity, belonging, and long-term impact.
          </p>
        </motion.div>

        <div className="mx-auto mb-1 flex w-full max-w-md items-center justify-center gap-3 rounded-full border border-white/80 bg-white p-2 shadow-md">
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
            <div className="mb-16 text-center">
              <h3 className="mb-2 text-2xl text-gray-900">{tabCopy[activeTab].title}</h3>
              <p className="text-sm text-gray-600">{tabCopy[activeTab].description}</p>
            </div>

            <PartnersList profiles={rows} loading={loading} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
