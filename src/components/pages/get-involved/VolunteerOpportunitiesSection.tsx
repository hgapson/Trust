import { motion } from "motion/react";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Clock, Star } from "lucide-react";
import type { VolunteerOpportunity } from "./data";

interface VolunteerOpportunitiesSectionProps {
  opportunities: VolunteerOpportunity[];
}

export function VolunteerOpportunitiesSection({
  opportunities,
}: VolunteerOpportunitiesSectionProps) {
  return (
    <section className="gradient-bg-services rounded-2xl py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
          Volunteer Opportunities
        </h2>
        <p className="text-xl text-gray-600">
          Use your skills to make a difference in someone&apos;s life
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-0 bg-white/90 shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${opportunity.bgColor}`}
                >
                  <opportunity.icon
                    className={`h-6 w-6 ${opportunity.color}`}
                  />
                </div>
                <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {opportunity.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Commitment: {opportunity.commitment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Skills: {opportunity.skills}</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Apply to Volunteer
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 transition-colors hover:from-blue-700 hover:to-purple-700">
          View All Volunteer Opportunities
        </Button>
      </div>
    </section>
  );
}
