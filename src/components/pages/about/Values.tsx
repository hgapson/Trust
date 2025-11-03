import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Award, CheckCircle, Shield, Users } from "lucide-react";

export function Values() {
  const values = [
    {
      icon: Shield,
      title: "Obligation",
      description:
        "We provide a safe environment that fosters a sense of trust, value and respect.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Award,
      title: "Incredible Services",
      description:
        "We demonstrate outcomes, promote transparency, foster community, and ensure accountability.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: CheckCircle,
      title: "Principles",
      description: "Consistent delivery through ethical actions and results.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Acceptance",
      description:
        "We foster a sense of belonging and purpose. Every individual is valued.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ];

  return (
    <section className="gradient-bg-values py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">Our Core Values</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            The principles that guide everything we do and shape how we serve our
            community
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
            >
              <Card className="group border-0 bg-white/80 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-200/50">
                <CardHeader className="pb-4">
                  <motion.div
                    className={`mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${value.bgColor} transition-transform duration-300 group-hover:scale-110`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </motion.div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
