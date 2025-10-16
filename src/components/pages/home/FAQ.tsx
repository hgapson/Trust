import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Who can access your services?",
      answer:
        "Our services are available to all migrants and former refugees in the Waikato region who are seeking employment support. Whether you've just arrived in New Zealand or have been here for some time, we're here to help you achieve your career goals.",
    },
    {
      question: "Are your services free?",
      answer:
        "Yes! All our core services are provided free of charge to those who need support finding employment. This includes workshops, one-on-one mentoring, career counseling, and connections to employer networks.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer comprehensive support including resume and cover letter writing, interview preparation, skills assessment, professional development workshops, mentorship programs, job matching services, and ongoing career guidance. We also help with understanding NZ workplace culture and expectations.",
    },
    {
      question: "How long does the program take?",
      answer:
        "The timeline varies based on your individual needs and goals. Some people find employment within weeks, while others benefit from longer-term support to upskill or transition careers. We work at your pace and provide support for as long as you need it.",
    },
    {
      question: "Do I need to speak perfect English?",
      answer:
        "No, you don't need perfect English to access our services. We have multilingual staff and volunteers who can provide support in various languages. We also offer resources to help improve your professional communication skills.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply contact us via phone, email, or visit our office. We'll arrange an initial consultation to understand your background, skills, and career aspirations. From there, we'll create a personalized plan to support your employment journey.",
    },
    {
      question: "Can you guarantee me a job?",
      answer:
        "While we can't guarantee employment, we are committed to providing you with all the tools, skills, training, and connections needed to significantly improve your employment prospects. Our strong network of local employers and proven track record speak to the effectiveness of our approach.",
    },
    {
      question: "What makes your organization different?",
      answer:
        "We understand the unique challenges that migrants and former refugees face. Our team has lived experience and cultural competency that allows us to provide truly personalized, empathetic support. We focus on your strengths and help employers recognize the value of diversity.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Find answers to common questions about our services and how we can
            support you
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion collapsible type="single" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

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
