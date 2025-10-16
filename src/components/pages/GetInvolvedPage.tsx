import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Heart, 
  Users, 
  DollarSign, 
  Building, 
  Calendar,
  Clock,
  MapPin,
  Gift,
  Handshake,
  Star
} from "lucide-react";

export function GetInvolvedPage() {
  const volunteerOpportunities = [
    {
      title: "Mentor & Coach",
      description: "Provide one-on-one guidance to help migrants navigate their career journey",
      commitment: "2 hours/week",
      skills: "Professional experience, good communication",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Workshop Facilitator",
      description: "Lead workshops on resume writing, interview skills, or industry-specific topics",
      commitment: "4 hours/month",
      skills: "Expertise in relevant field, teaching ability",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Translation Support",
      description: "Help with document translation and interpretation services",
      commitment: "Flexible",
      skills: "Bilingual proficiency, cultural understanding",
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Administrative Support",
      description: "Assist with data entry, filing, and general office tasks",
      commitment: "3 hours/week",
      skills: "Basic computer skills, attention to detail",
      icon: Building,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const supportWays = [
    {
      title: "Share Your Expertise",
      description: "Offer skills-based support through mentoring, resume reviews, or mock interviews",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Spread the Word",
      description: "Help us reach more people by sharing our mission with your network",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      title: "Open Doors",
      description: "Connect us with potential employers, partners, or community organizations",
      icon: Handshake,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Provide Resources",
      description: "Donate office supplies, training materials, or professional clothing",
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const partnershipTiers = [
    {
      tier: "Community Partner",
      commitment: "1-5 job placements annually",
      benefits: [
        "Access to diverse talent pool",
        "Cultural diversity training",
        "Recognition on website",
        "Quarterly updates"
      ],
      color: "border-blue-200 bg-blue-50"
    },
    {
      tier: "Strategic Partner",
      commitment: "6-15 job placements annually",
      benefits: [
        "All Community Partner benefits",
        "Dedicated recruitment support",
        "Custom training programs",
        "Logo on marketing materials"
      ],
      color: "border-purple-200 bg-purple-50"
    },
    {
      tier: "Champion Partner",
      commitment: "16+ job placements annually",
      benefits: [
        "All Strategic Partner benefits",
        "Priority access to candidates",
        "Co-branded initiatives",
        "Annual recognition award"
      ],
      color: "border-gold-200 bg-yellow-50"
    }
  ];

  const upcomingEvents = [
    {
      title: "Volunteer Orientation",
      date: "March 15, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Navigate Trust Office",
      description: "Learn about our mission and volunteer opportunities"
    },
    {
      title: "Fundraising Gala",
      date: "April 20, 2024",
      time: "7:00 PM - 11:00 PM",
      location: "Waikato Convention Centre",
      description: "Annual celebration and fundraising event"
    },
    {
      title: "Community Job Fair",
      date: "May 10, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Hamilton Gardens Pavilion",
      description: "Connecting migrants with local employers"
    }
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
            <h1 className="text-4xl lg:text-6xl">Get Involved</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join our mission to empower migrants and former refugees in the Waikato region.
              Together, we can create meaningful change and build stronger communities.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Impact Stats */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Your Impact Matters</h2>
            <p className="text-xl text-gray-600">See how your involvement creates real change</p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { number: "150+", label: "Active Volunteers", icon: Users },
              { number: "$85K", label: "Raised This Year", icon: DollarSign },
              { number: "25", label: "Partner Businesses", icon: Building },
              { number: "500+", label: "Lives Changed", icon: Heart }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-20 gradient-bg-services rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-800 mb-4">Volunteer Opportunities</h2>
            <p className="text-xl text-gray-600">Use your skills to make a difference in someone's life</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${opportunity.bgColor} mb-4`}>
                      <opportunity.icon className={`h-6 w-6 ${opportunity.color}`} />
                    </div>
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {opportunity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Commitment: {opportunity.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-4 w-4" />
                        <span>Skills: {opportunity.skills}</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Apply to Volunteer
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View All Volunteer Opportunities
            </Button>
          </div>
        </section>

        {/* Ways to Support Section */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">More Ways to Support</h2>
            <p className="text-xl text-gray-600">Every contribution, big or small, helps us create meaningful impact</p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {supportWays.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${way.bgColor} mx-auto mb-4`}>
                      <way.icon className={`h-7 w-7 ${way.color}`} />
                    </div>
                    <CardTitle className="text-lg">{way.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{way.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl mb-4 text-gray-800">Corporate & Community Partnerships</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're a business looking to diversify your workforce or a community organization 
              aligned with our mission, we'd love to explore partnership opportunities together.
            </p>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Discuss Partnership Options
            </Button>
          </motion.div>
        </section>

        {/* Partnership Section */}
        <section className="py-20 gradient-bg-values rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-800 mb-4">Business Partnerships</h2>
            <p className="text-xl text-gray-600">Partner with us to build a diverse and inclusive workforce</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {partnershipTiers.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className={`h-full border-2 ${tier.color} hover:shadow-xl transition-all duration-300`}>
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mx-auto mb-4">
                      <Handshake className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{tier.tier}</CardTitle>
                    <CardDescription className="text-lg">
                      {tier.commitment}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Become a Partner
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Join us at our upcoming community events</p>
          </motion.div>
          
          <div className="grid gap-6 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm inline-block w-fit">
                      {event.date}
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                    <Button variant="outline" className="w-full">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Community Image */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1710092784814-4a6f158913b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwY29tbXVuaXR5JTIwaGVscGluZyUyMGhhbmRzfGVufDF8fHx8MTc1ODQ4NDE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Community volunteers helping hands"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <h2 className="text-3xl lg:text-4xl">Together We Make a Difference</h2>
                <p className="text-xl max-w-2xl">
                  Every volunteer hour, every donation, every partnership creates ripples of positive change in our community.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl">Ready to Make an Impact?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you volunteer, donate, or partner with us, your contribution creates meaningful change
              in the lives of migrants and former refugees in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Start Volunteering
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}