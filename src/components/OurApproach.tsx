import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { UserCheck, FileText, Award, Rocket } from "lucide-react";

export function OurApproach() {
  const steps = [
    {
      icon: UserCheck,
      title: "Initial Assessment",
      description: "We learn about your background, skills, and career aspirations to create a personalized pathway",
      step: "01"
    },
    {
      icon: FileText,
      title: "Skills Development",
      description: "Access workshops, training, and resources to enhance your employability in the NZ market",
      step: "02"
    },
    {
      icon: Award,
      title: "Career Matching",
      description: "We connect you with employers who value diversity and align with your professional goals",
      step: "03"
    },
    {
      icon: Rocket,
      title: "Ongoing Support",
      description: "Continue receiving guidance and mentorship as you establish and grow your career",
      step: "04"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl text-gray-800">Our Approach</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A structured, personalized journey designed to help you succeed in your new career
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs text-purple-600 shadow-md">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGRpdmVyc2l0eXxlbnwxfHx8fDE3NTg1NDUwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diverse team meeting and collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center"
        >
          <h3 className="text-2xl mb-4 text-gray-800">Personalized Support Every Step of the Way</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We understand that every person's journey is unique. That's why we tailor our approach to your 
            individual needs, background, and goals. Our dedicated team works alongside you to ensure you 
            have the tools, confidence, and connections needed to thrive in the Waikato community.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
