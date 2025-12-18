import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Mail, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { FaqItem } from "./data";

interface FaqSectionProps {
  faqs: FaqItem[];
}

function FaqCard({
  faq,
  isOpen,
  onToggle,
  delay = 0,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "border-blue-300 bg-blue-50/80 shadow-lg" : "bg-white/90"
        }`}
      >
        <CardHeader className="pb-3">
          <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center justify-between gap-4 text-left"
            aria-expanded={isOpen}
          >
            <CardTitle
              className={`text-lg transition-colors ${
                isOpen ? "text-blue-900" : "text-gray-800"
              }`}
            >
              {faq.question}
            </CardTitle>

            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-blue-600" : "rotate-0 text-gray-600"
              }`}
            />
          </button>
        </CardHeader>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <CardContent className="pt-0">
                <p className="leading-relaxed text-gray-700">{faq.answer}</p>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { left, right } = useMemo(() => {
    const left: Array<{ item: FaqItem; index: number }> = [];
    const right: Array<{ item: FaqItem; index: number }> = [];

    faqs.forEach((item, index) => {
      (index % 2 === 0 ? left : right).push({ item, index });
    });

    return { left, right };
  }, [faqs]);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="gradient-bg-values rounded-2xl py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">Quick answers to common questions</p>
        </motion.div>

        {/* FAQ GRID (only FAQs here) */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {left.map(({ item, index }, i) => (
              <FaqCard
                key={item.question}
                faq={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                delay={i * 0.04}
              />
            ))}
          </div>

          <div className="space-y-6">
            {right.map(({ item, index }, i) => (
              <FaqCard
                key={item.question}
                faq={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                delay={i * 0.04}
              />
            ))}
          </div>
        </div>

        {/* ✅ SPACER (this guarantees visible space) */}
        <div className="h-16" />

        {/* CTA (separate block, centered) */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex w-full max-w-xl flex-col items-center text-center">
            <p className="text-lg font-medium text-gray-800">
              Still have questions?
            </p>
            <p className="mt-1 text-gray-600">Contact us — we&apos;re here to help</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="tel:+64223146756"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-4 py-2 text-slate-900 shadow-sm transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50"
              >
                <Phone className="h-4 w-4 text-blue-600" />
                Call us
              </a>

              <a
                href="mailto:waikato.navtrust@outlook.com"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-4 py-2 text-slate-900 shadow-sm transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50"
              >
                <Mail className="h-4 w-4 text-purple-600" />
                Email us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}