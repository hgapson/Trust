import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { motion } from "motion/react";

const faqs = [
  {
    id: "q1",
    question: "Who can access your services?",
    answer:
      "Our services are available to all migrants and former refugees in the Waikato region who are seeking employment support.",
  },
  {
    id: "q2",
    question: "Are your services free?",
    answer:
      "Yes! All our core services are provided free of charge, including workshops, mentoring, and career counselling.",
  },
  {
    id: "q3",
    question: "What kind of support do you provide?",
    answer:
      "We offer CV support, interview preparation, job matching, mentoring, and ongoing career guidance.",
  },
  {
    id: "q4",
    question: "How long does the program take?",
    answer:
      "The timeline varies depending on individual needs. Some people find work within weeks, others need longer support.",
  },
  {
    id: "q5",
    question: "Do I need to speak perfect English?",
    answer:
      "No. We have multilingual staff and resources to help improve professional communication while we support your job search.",
  },
  {
    id: "q6",
    question: "Can you guarantee me a job?",
    answer:
      "We cannot promise a role, but we provide tools, coaching, and employer connections to boost your chances.",
  },
  {
    id: "q7",
    question: "How do I get started?",
    answer:
      "Contact us by phone, email, or visit our office. We will book an initial chat and create a tailored plan.",
  },
  {
    id: "q8",
    question: "Is there a cost?",
    answer:
      "Our core services are free for migrants and former refugees in the Waikato region.",
  },
];

export function FAQ() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        <motion.h2
          className="mb-12 text-center text-3xl text-gray-800 lg:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <Accordion.Root
          type="single"
          collapsible
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="rounded-xl border border-gray-200 bg-white px-6"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className="group flex w-full items-center justify-between py-4 text-left text-base font-semibold text-gray-800 transition-colors data-[state=open]:text-blue-700"
                >
                  {faq.question}
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-blue-600"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content
                className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
              >
                <div className="pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-gray-600">Still have questions?</p>
          <a
            className="text-blue-600 underline transition-colors hover:text-blue-700"
            href="/contact"
          >
            Contact us - we're here to help
          </a>
        </motion.div>
      </div>
    </section>
  );
}
