import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import type { FaqItem } from "./data";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section className="gradient-bg-values rounded-2xl py-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600">
          Quick answers to common questions
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full bg-white/90">
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
