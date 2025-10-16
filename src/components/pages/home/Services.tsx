import { motion } from "motion/react";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ArrowRight, Heart, Target, Wrench } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Heart,
      title: "Motivate",
      description:
        "Build partnerships that recognize your capabilities, abilities and skills",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      features: [
        "Build partnership with tangata whairora that recognises capabilities",
        "Empower migrants and former refugees with tools and support",
        "Create opportunities in ethnic communities affected by unemployment",
      ],
    },
    {
      icon: Wrench,
      title: "Equip",
      description:
        "Provide the tools, resources, and training needed for workplace success",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Assist with preparation of work skills needed",
        "Provide career information and connect with opportunities",
        "Organize workshops for communication and employment skills",
        "Link to upskilling and training courses",
      ],
    },
    {
      icon: Target,
      title: "Achieve",
      description:
        "Inspire success and reduce inequality through meaningful outcomes",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "Inspire tangata whairora to gain skills and achieve success",
        "Reduce inequality of income and opportunity",
        "Enhance well-being through positive engagement and relationships",
        "Foster trust, belonging, shared values and participation in society",
      ],
    },
  ];

  return (
    <section id="services" className="gradient-bg-services py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">
            How We Help You Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Our comprehensive approach focuses on three key areas to ensure your
            journey to employment success
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="group relative overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl">
                <CardHeader className="pb-4">
                  <motion.div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.bgColor} transition-transform duration-300 group-hover:scale-110`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </motion.div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start space-x-2 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span
                          className={`mt-2 inline-block h-1.5 w-1.5 rounded-full ${service.color.replace("text-", "bg-")}`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`group/btn w-full justify-between ${service.color} hover:${service.bgColor}`}
                    variant="ghost"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl" size="lg">
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
