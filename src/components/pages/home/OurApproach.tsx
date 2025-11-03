import { motion } from "motion/react";

import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { Award, FileText, Rocket, UserCheck } from "lucide-react";
import approach from '../../../assets/approach.png'

export function OurApproach() {
  const steps = [
    {
      icon: UserCheck,
      title: "Initial Assessment",
      description:
        "We learn about your background, skills, and career aspirations to create a personalized pathway",
      step: "01",
    },
    {
      icon: FileText,
      title: "Skills Development",
      description:
        "Access workshops, training, and resources to enhance your employability in the NZ market",
      step: "02",
    },
    {
      icon: Award,
      title: "Career Matching",
      description:
        "We connect you with employers who value diversity and align with your professional goals",
      step: "03",
    },
    {
      icon: Rocket,
      title: "Ongoing Support",
      description:
        "Continue receiving guidance and mentorship as you establish and grow your career",
      step: "04",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">Our Approach</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            A structured, personalized journey designed to help you succeed in
            your new career
          </p>
        </motion.div>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="order-2 space-y-8 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-purple-600 shadow-md">
                      {step.step}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="order-1 overflow-hidden rounded-2xl shadow-2xl lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ImageWithFallback
              src={approach}
              alt="Diverse team meeting and collaboration"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          className="rounded-2xl bg-white p-8 text-center shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-4 text-2xl text-gray-800">
            Personalized Support Every Step of the Way
          </h3>
          <p className="mx-auto max-w-3xl text-gray-600">
            We understand that every person&apos;s journey is unique. That&apos;s
            why we tailor our approach to your individual needs, background, and
            goals. Our dedicated team works alongside you to ensure you have the
            tools, confidence, and connections needed to thrive in the Waikato
            community.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
