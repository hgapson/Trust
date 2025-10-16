import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Briefcase, Globe, GraduationCap, Home } from "lucide-react";

export function WhoWeServe() {
  const audiences = [
    {
      icon: Globe,
      title: "Recent Migrants",
      description:
        "Newcomers to New Zealand seeking to establish their careers in the Waikato region",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Home,
      title: "Former Refugees",
      description:
        "Individuals rebuilding their lives and looking for meaningful employment opportunities",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Briefcase,
      title: "Career Changers",
      description:
        "Migrants transitioning to new industries or adapting their skills to the local market",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: GraduationCap,
      title: "Skilled Professionals",
      description:
        "Qualified individuals needing support to navigate NZ workplace culture and expectations",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">Who We Serve</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            We support diverse individuals on their journey to meaningful
            employment in the Waikato region
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
              <Card className="h-full border-0 shadow-md transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4 text-center">
                  <div
                    className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${audience.bgColor}`}
                  >
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
