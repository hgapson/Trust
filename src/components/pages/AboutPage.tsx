import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Users, Heart, Globe, Award } from "lucide-react";

export function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      description: "15+ years in refugee services and community development",
    },
    {
      name: "Ahmed Hassan",
      role: "Program Coordinator",
      description: "Former refugee turned advocate, specializing in employment services",
    },
    {
      name: "Maria Santos",
      role: "Career Counselor",
      description: "Certified career counselor with expertise in cross-cultural communication",
    },
    {
      name: "David Kim",
      role: "Community Outreach Manager",
      description: "Building bridges between migrants and local business community",
    },
  ];

  const milestones = [
    { year: "2018", event: "Founded with mission to support Waikato migrants" },
    { year: "2019", event: "Launched first employment readiness program" },
    { year: "2021", event: "Expanded to serve 200+ individuals annually" },
    { year: "2023", event: "Partnered with 50+ local businesses" },
    { year: "2024", event: "Achieved 95% success rate in job placements" },
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="gradient-bg-hero py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-screen-xl px-4 relative z-10">
          <motion.div
            className="text-center space-y-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl">About Navigate Trust</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We are a dedicated non-profit organization committed to empowering migrants and former refugees
              in the Waikato region to achieve employment success and build thriving communities.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Mission & Vision */}
        <section className="py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzU4NDY2MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diverse team meeting"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </motion.div>
            
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-3xl lg:text-4xl mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600">
                  To provide comprehensive support, resources, and advocacy for migrants and former refugees
                  in the Waikato region, helping them achieve economic independence and social integration
                  through employment opportunities and community engagement.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600">
                  A thriving, inclusive Waikato community where every migrant and former refugee has the
                  opportunity to reach their full potential and contribute meaningfully to society.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 gradient-bg-values rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-800 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in the Waikato community</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, number: "500+", label: "Lives Changed", color: "text-blue-600" },
              { icon: Heart, number: "95%", label: "Success Rate", color: "text-purple-600" },
              { icon: Globe, number: "15", label: "Countries Represented", color: "text-teal-600" },
              { icon: Award, number: "50+", label: "Partner Organizations", color: "text-orange-600" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our mission to serve the community</p>
          </motion.div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="text-2xl text-blue-600 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    {milestone.year}
                  </div>
                </div>
                <Card className="flex-1 glass-effect">
                  <CardContent className="p-6">
                    <p className="text-lg">{milestone.event}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to your success</p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-blue-600">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
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
            <h2 className="text-3xl lg:text-4xl">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join hundreds of migrants and former refugees who have found success with our support.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Today
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}