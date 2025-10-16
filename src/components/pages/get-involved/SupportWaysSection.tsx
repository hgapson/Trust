import { motion } from "motion/react";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import type { SupportWay } from "./data";

interface SupportWaysSectionProps {
  supportWays: SupportWay[];
}

export function SupportWaysSection({
  supportWays,
}: SupportWaysSectionProps) {
  return (
    <section className="py-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">More Ways to Support</h2>
        <p className="text-xl text-gray-600">
          Every contribution, big or small, helps us create meaningful impact
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {supportWays.map((way, index) => (
          <motion.div
            key={way.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full text-center transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div
                  className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${way.bgColor}`}
                >
                  <way.icon className={`h-7 w-7 ${way.color}`} />
                </div>
                <CardTitle className="text-lg">{way.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{way.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="mb-4 text-2xl text-gray-800">
          Corporate &amp; Community Partnerships
        </h3>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          Whether you&apos;re a business looking to diversify your workforce or
          a community organization aligned with our mission, we&apos;d love to
          explore partnership opportunities together.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="border-blue-600 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
        >
          Discuss Partnership Options
        </Button>
      </motion.div>
    </section>
  );
}
