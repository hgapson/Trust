import { Shield, Award, CheckCircle, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from 'motion/react';

export function Values() {
  const values = [
    {
      icon: Shield,
      title: "Obligation",
      description: "We provide a safe environment that fosters a sense of trust, value and respect.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Award,
      title: "Incredible Services", 
      description: "We demonstrate outcomes, promote transparency, foster community, and ensure accountability.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: CheckCircle,
      title: "Principles",
      description: "Consistent delivery through ethical actions and results.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Users,
      title: "Acceptance",
      description: "We foster a sense of belonging and purpose. Every individual is valued.",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <section className="py-20 gradient-bg-values">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl text-gray-800">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do and shape how we serve our community
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
            <Card className="text-center group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-purple-200/50">
              <CardHeader className="pb-4">
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.bgColor} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
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