import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Who can access your services?",
      answer: "Our services are available to all migrants and former refugees in the Waikato region who are seeking employment support. Whether you've just arrived in New Zealand or have been here for some time, we're here to help you achieve your career goals."
    },
    {
      question: "Are your services free?",
      answer: "Yes! All our core services are provided free of charge to those who need support finding employment. This includes workshops, one-on-one mentoring, career counseling, and connections to employer networks."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer comprehensive support including resume and cover letter writing, interview preparation, skills assessment, professional development workshops, mentorship programs, job matching services, and ongoing career guidance. We also help with understanding NZ workplace culture and expectations."
    },
    {
      question: "How long does the program take?",
      answer: "The timeline varies based on your individual needs and goals. Some people find employment within weeks, while others benefit from longer-term support to upskill or transition careers. We work at your pace and provide support for as long as you need it."
    },
    {
      question: "Do I need to speak perfect English?",
      answer: "No, you don't need perfect English to access our services. We have multilingual staff and volunteers who can provide support in various languages. We also offer resources to help improve your professional communication skills."
    },
    {
      question: "How do I get started?",
      answer: "Simply contact us via phone, email, or visit our office. We'll arrange an initial consultation to understand your background, skills, and career aspirations. From there, we'll create a personalized plan to support your employment journey."
    },
    {
      question: "Can you guarantee me a job?",
      answer: "While we can't guarantee employment, we are committed to providing you with all the tools, skills, training, and connections needed to significantly improve your employment prospects. Our strong network of local employers and proven track record speak to the effectiveness of our approach."
    },
    {
      question: "What makes your organization different?",
      answer: "We understand the unique challenges that migrants and former refugees face. Our team has lived experience and cultural competency that allows us to provide truly personalized, empathetic support. We focus on your strengths and help employers recognize the value of diversity."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl text-gray-800">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services and how we can support you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="/contact" className="text-blue-600 hover:text-blue-700 underline">
            Contact us - we're here to help
          </a>
        </motion.div>
      </div>
    </section>
  );
}
