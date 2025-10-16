import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Globe, Briefcase, GraduationCap, Home } from "lucide-react";

export function WhoWeServe() {
  const audiences = [
    {
      icon: Globe,
      title: "Recent Migrants",
      description: "Newcomers to New Zealand seeking to establish their careers in the Waikato region",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Home,
      title: "Former Refugees",
      description: "Individuals rebuilding their lives and looking for meaningful employment opportunities",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Briefcase,
      title: "Career Changers",
      description: "Migrants transitioning to new industries or adapting their skills to the local market",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: GraduationCap,
      title: "Skilled Professionals",
      description: "Qualified individuals needing support to navigate NZ workplace culture and expectations",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl text-gray-800">Who We Serve</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We support diverse individuals on their journey to meaningful employment in the Waikato region
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${audience.bgColor} mx-auto mb-4`}>
                    <audience.icon className={`h-7 w-7 ${audience.color}`} />
                  </div>
                  <CardTitle className="text-lg">{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm">
                    {audience.description}
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
