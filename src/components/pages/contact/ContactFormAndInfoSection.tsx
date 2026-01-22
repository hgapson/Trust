import { useMemo } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { ImageWithFallback } from "../../FallBacks/ImageWithFallback";
import { OfficeInfoList } from "./OfficeInfoList";
import { SupportedLanguagesCard } from "./SupportedLanguagesCard";

interface ContactFormAndInfoSectionProps {
}

export function ContactFormAndInfoSection({
}: ContactFormAndInfoSectionProps) {
  const location = useLocation();
  const inquiryContext = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const job = params.get("job");
    if (job) return `Interested in: ${job}`;
    const volunteer = params.get("volunteer");
    return volunteer ? `Volunteer application: ${volunteer}` : "";
  }, [location.search]);

  const inquiryMessage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const job = params.get("job");
    if (job) {
      return `Interested in: ${job}\n\nI found this role on your jobs page and would like to talk about next steps.`;
    }
    const volunteer = params.get("volunteer");
    if (volunteer) {
      return `Volunteer application: ${volunteer}\n\nI'd like to volunteer for this opportunity. Please share the next steps.`;
    }
    return undefined;
  }, [location.search]);

  return (
    <section id="contact-form" className="py-20 scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-2">
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
                Fill out the form below and we&apos;ll get back to you within 24
                hours
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
                  <Input
                    id="subject"
                    placeholder="What can we help you with?"
                    defaultValue={inquiryContext || undefined}
                  />
                </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    className="min-h-[120px]"
                    placeholder="Please tell us more about your situation and how we can help you..."
                    defaultValue={inquiryMessage}
                  />
                </div>

              <div className="space-y-2">
                <Label htmlFor="language">
                  Preferred Language for Response
                </Label>
                <select
                  id="language"
                  className="w-full rounded-md border p-2"
                  defaultValue="english"
                >
                  <option value="english">English</option>
                  <option value="arabic">Arabic</option>
                  <option value="mandarin">Mandarin</option>
                  <option value="hindi">Hindi</option>
                  <option value="spanish">Spanish</option>
                  <option value="other">Other (please specify in message)</option>
                </select>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 transition-colors hover:from-blue-700 hover:to-purple-700">
                Send Message
              </Button>

              <p className="text-center text-sm text-gray-600">
                * Required fields. We respect your privacy and will never share
                your information.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <OfficeInfoList />

          <SupportedLanguagesCard />

          <div className="overflow-hidden rounded-lg shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1587400873582-230980eb46eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwb2ZmaWNlJTIwbG9jYXRpb24lMjBtYXB8ZW58MXx8fHwxNzU4NTQ2OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Navigate Trust office location"
              className="h-64 w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
