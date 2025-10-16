import { Heart, Wrench, Target, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from 'motion/react';

export function Services() {
  const services = [
    {
      icon: Heart,
      title: "Motivate",
      description: "Build partnerships that recognize your capabilities, abilities and skills",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      features: [
        "Build partnership with tangata whairora that recognises capabilities",
        "Empower migrants and former refugees with tools and support",
        "Create opportunities in ethnic communities affected by unemployment"
      ]
    },
    {
      icon: Wrench,
      title: "Equip",
      description: "Provide the tools, resources, and training needed for workplace success",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Assist with preparation of work skills needed",
        "Provide career information and connect with opportunities",
        "Organize workshops for communication and employment skills",
        "Link to upskilling and training courses"
      ]
    },
    {
      icon: Target,
      title: "Achieve",
      description: "Inspire success and reduce inequality through meaningful outcomes",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "Inspire tangata whairora to gain skills and achieve success",
        "Reduce inequality of income and opportunity",
        "Enhance well-being through positive engagement and relationships",
        "Foster trust, belonging, shared values and participation in society"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 gradient-bg-services">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl text-gray-800">How We Help You Succeed</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach focuses on three key areas to ensure your journey to employment success
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
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <motion.div 
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
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
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 ${service.color.replace('text-', 'bg-')}`} />
                      <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="ghost" 
                  className={`group/btn w-full justify-between ${service.color} hover:${service.bgColor}`}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}