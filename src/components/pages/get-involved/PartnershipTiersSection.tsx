import { motion } from "motion/react";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Handshake } from "lucide-react";
import type { PartnershipTier } from "./data";

interface PartnershipTiersSectionProps {
  tiers: PartnershipTier[];
}

export function PartnershipTiersSection({
  tiers,
}: PartnershipTiersSectionProps) {
  return (
    <section className="gradient-bg-values rounded-2xl py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
          Business Partnerships
        </h2>
        <p className="text-xl text-gray-600">
          Partner with us to build a diverse and inclusive workforce
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.tier}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <Card
              className={`h-full border-2 ${tier.color} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Handshake className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">{tier.tier}</CardTitle>
                <CardDescription className="text-lg">
                  {tier.commitment}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 transition-colors hover:from-blue-700 hover:to-purple-700">
                  Become a Partner
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
