import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Calendar,
  Globe,
  Users,
  Car,
  Accessibility
} from "lucide-react";

export function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      details: "+64 7 838 3570",
      description: "Monday to Friday, 9:00 AM - 5:00 PM",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@navigatetrust.org.nz",
      description: "We respond within 24 hours",
      action: "Send Email"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      details: "+64 21 555 0123",
      description: "Quick questions and support",
      action: "Message Us"
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      details: "Schedule a meeting",
      description: "Free consultation available",
      action: "Book Now"
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Main Office",
      details: "123 Victoria Street, Hamilton Central, Hamilton 3204",
      extra: "Level 2, Navigate Trust Building"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday to Friday: 9:00 AM - 5:00 PM",
      extra: "Saturday: 9:00 AM - 1:00 PM (By appointment)"
    },
    {
      icon: Car,
      title: "Parking",
      details: "Free parking available",
      extra: "Accessible parking spaces at front entrance"
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      details: "Wheelchair accessible building",
      extra: "Lift access to all floors"
    }
  ];

  const languages = [
    "English", "Arabic", "Mandarin", "Hindi", "Spanish", "French", 
    "Swahili", "Dari", "Farsi", "Tamil", "Urdu", "Somali"
  ];

  const faqs = [
    {
      question: "Do I need to book an appointment?",
      answer: "While walk-ins are welcome, we recommend booking an appointment to ensure we can give you our full attention and have the right staff member available to help you."
    },
    {
      question: "Are your services free?",
      answer: "Yes, all our services are completely free for migrants and former refugees in the Waikato region. This includes assessments, workshops, mentoring, and job placement assistance."
    },
    {
      question: "What documents should I bring?",
      answer: "Please bring identification, any qualifications or certificates, work history documentation, and if applicable, visa or immigration documents. Don't worry if you don't have everything - we can still help you get started."
    },
    {
      question: "Do you provide services in other languages?",
      answer: "Yes, we have multilingual staff and interpreters available. We can provide services in over 12 languages including Arabic, Mandarin, Hindi, and more."
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
            <h1 className="text-4xl lg:text-6xl">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to start your employment journey? We're here to help and support you every step of the way.
              Get in touch today to begin transforming your future.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Contact Methods */}
        <section className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Choose the way that works best for you</p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mx-auto mb-4">
                      <method.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {method.details}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{method.description}</p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form and Office Info */}
        <section className="py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+64 xxx xxx xxx" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="What can we help you with?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please tell us more about your situation and how we can help you..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language for Response</Label>
                    <select id="language" className="w-full p-2 border rounded-md">
                      <option value="english">English</option>
                      <option value="arabic">Arabic</option>
                      <option value="mandarin">Mandarin</option>
                      <option value="hindi">Hindi</option>
                      <option value="spanish">Spanish</option>
                      <option value="other">Other (please specify in message)</option>
                    </select>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    Send Message
                  </Button>
                  
                  <p className="text-sm text-gray-600 text-center">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl mb-6">Visit Our Office</h2>
                <div className="space-y-6">
                  {officeInfo.map((info, index) => (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg mb-1">{info.title}</h3>
                        <p className="text-gray-700">{info.details}</p>
                        {info.extra && (
                          <p className="text-gray-600 text-sm">{info.extra}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages Supported */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Languages We Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((language) => (
                      <div key={language} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm text-center">
                        {language}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Office Image */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1587400873582-230980eb46eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwb2ZmaWNlJTIwbG9jYXRpb24lMjBtYXB8ZW58MXx8fHwxNzU4NTQ2OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Navigate Trust office location"
                  className="w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 gradient-bg-values rounded-2xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-red-600">
                  If you need urgent assistance outside office hours, please contact our emergency support line:
                </p>
                <div className="text-2xl text-red-700">+64 21 555 0199</div>
                <p className="text-sm text-red-600">
                  Available 24/7 for emergency situations requiring immediate support
                </p>
              </CardContent>
            </Card>
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
            <h2 className="text-3xl lg:text-4xl">Ready to Take the Next Step?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't wait to start your journey towards employment success. 
              Contact us today and let's work together to achieve your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}