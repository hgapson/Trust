import { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import { Award, CheckCircle, Shield, Users } from "lucide-react";
import { ValuesApi } from "./api/values";
import type { ValueItem } from "./types";

const iconMap = {
  Shield,
  Award,
  CheckCircle,
  Users,
};

export function Values() {
  const [values, setValues] = useState<ValueItem[]>([]);

  useEffect(() => {
    ValuesApi.list().then(setValues).catch(console.error);
  }, []);

  return (
    <section className="gradient-bg-values py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* 🔒 HEADER UNCHANGED */}
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">
            Our Core Values
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            The principles that guide everything we do and shape how we serve our
            community
          </p>
        </motion.div>

        {/* 🔒 GRID & CARD STYLING UNCHANGED */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = iconMap[value.icon];

            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.05 }}
              >
                <Card className="group border-0 bg-white/80 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-200/50">
                  <CardHeader className="pb-4">
                    <motion.div
                      className={`mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${value.bg_color} transition-transform duration-300 group-hover:scale-110`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`h-8 w-8 ${value.color}`} />
                    </motion.div>

                    <CardTitle className="text-lg">
                      {value.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}