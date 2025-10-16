import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from 'motion/react';

export function CallToAction() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div 
            className="text-white space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100">
              Take the first step towards your career success. Our team is here to support you every step of the way.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">+64 7 XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">info@waikatonavigate.org.nz</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">Hamilton, Waikato, New Zealand</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">Mon-Fri 9:00 AM - 5:00 PM</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Download Resources
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <CardContent className="p-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1565665681743-6ff01c5181e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc2hha2UlMjBwYXJ0bmVyc2hpcCUyMHN1cHBvcnR8ZW58MXx8fHwxNzU4NTQ1MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Partnership and support through handshake"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl mb-2">Free Initial Consultation</h3>
                  <p className="text-muted-foreground mb-4">
                    Meet with our team to discuss your goals and create a personalized plan for your career journey.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300">
                    Schedule Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
