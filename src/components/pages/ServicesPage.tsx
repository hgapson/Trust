import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Heart, 
  Wrench, 
  Target, 
  Users, 
  BookOpen, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Clock,
  MapPin
} from "lucide-react";

export function ServicesPage() {
  const detailedServices = [
    {
      id: "motivate",
      title: "Motivate - Building Foundations",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzU4NDY2MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "We build partnerships with employers and empower individuals with confidence and motivation.",
      features: [
        "One-on-one mentorship programs",
        "Confidence building workshops",
        "Community partnership development",
        "Cultural orientation sessions",
        "Peer support groups",
        "Goal setting and planning"
      ]
    },
    {
      id: "equip",
      title: "Equip - Skills Development",
      icon: Wrench,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      image: "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBpbnRlcnZpZXclMjB0cmFpbmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc1ODU0Njg2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Comprehensive work skills preparation, career guidance, and practical workshops.",
      features: [
        "Resume writing and optimization",
        "Interview preparation and practice",
        "Digital literacy training",
        "Industry-specific skill development",
        "Workplace communication workshops",
        "Professional networking guidance"
      ]
    },
    {
      id: "achieve",
      title: "Achieve - Success & Growth",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
      image: "https://images.unsplash.com/photo-1758273240631-59d44c8f5b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBjb3Vuc2VsaW5nJTIwbWVldGluZ3xlbnwxfHx8fDE3NTg1NDY4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Inspiring success stories and ongoing support to reduce inequality and achieve career goals.",
      features: [
        "Job placement assistance",
        "Career advancement support",
        "Ongoing mentorship",
        "Success story sharing",
        "Alumni network access",
        "Long-term career planning"
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Language Support",
      description: "English language improvement for workplace communication",
      icon: BookOpen,
      sessions: "3x per week"
    },
    {
      title: "Legal Assistance",
      description: "Work visa and employment rights guidance",
      icon: CheckCircle,
      sessions: "By appointment"
    },
    {
      title: "Childcare Support",
      description: "Childcare assistance during training sessions",
      icon: Users,
      sessions: "During programs"
    },
    {
      title: "Transportation",
      description: "Transport assistance to interviews and workplace",
      icon: MapPin,
      sessions: "As needed"
    }
  ];

  const workshopSchedule = [
    { time: "9:00 AM - 11:00 AM", title: "Resume Writing Workshop", day: "Monday" },
    { time: "1:00 PM - 3:00 PM", title: "Interview Skills Training", day: "Tuesday" },
    { time: "10:00 AM - 12:00 PM", title: "Digital Literacy Basics", day: "Wednesday" },
    { time: "2:00 PM - 4:00 PM", title: "Workplace Communication", day: "Thursday" },
    { time: "9:00 AM - 11:00 AM", title: "Job Search Strategies", day: "Friday" },
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="gradient-bg-services py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <motion.div
            className="text-center space-y-6 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support designed to guide you through every step of your employment journey,
              from building confidence to achieving long-term career success.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Main Services */}
        <section className="py-20">
          <div className="space-y-20">
            {detailedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid gap-12 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg shadow-2xl w-full h-96 object-cover"
                  />
                </div>
                
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg ${service.bgColor} mb-4`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl lg:text-4xl mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl">What's Included:</h3>
                    <div className="grid gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className={`${service.color} hover:${service.bgColor}`} variant="outline">
                    Learn More About {service.title.split(' - ')[0]}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 gradient-bg-values rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-800 mb-4">Additional Support Services</h2>
            <p className="text-xl text-gray-600">Comprehensive assistance to remove barriers to employment</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mx-auto mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                    <div className="text-sm text-blue-600">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {service.sessions}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Workshop Schedule */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Weekly Workshop Schedule</h2>
            <p className="text-xl text-gray-600">Join our regular workshops to build essential job skills</p>
          </motion.div>
          
          <div className="grid gap-4 lg:grid-cols-1 max-w-4xl mx-auto">
            {workshopSchedule.map((workshop, index) => (
              <motion.div
                key={workshop.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                          {workshop.day}
                        </div>
                        <div>
                          <h3 className="text-lg">{workshop.title}</h3>
                          <p className="text-gray-600 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {workshop.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Your Journey With Us</h2>
            <p className="text-xl text-gray-600">A step-by-step process designed for your success</p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Initial Assessment", description: "We understand your background, skills, and goals" },
              { step: "2", title: "Personalized Plan", description: "Create a customized employment strategy" },
              { step: "3", title: "Skills Development", description: "Participate in relevant workshops and training" },
              { step: "4", title: "Job Placement", description: "Get matched with suitable employment opportunities" },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  {process.step}
                </div>
                <h3 className="text-xl mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl">Ready to Begin Your Employment Journey?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take the first step towards a successful career. Our services are free and designed specifically
              for migrants and former refugees in the Waikato region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Schedule Assessment
              </Button>
              <Button variant="outline" size="lg">
                Download Service Guide
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}