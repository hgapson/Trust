import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { motion } from "motion/react";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ArrowRight, Heart, Mail, Phone, Target, Wrench } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Heart,
      title: "Motivate",
      description:
        "Build partnerships that recognize your capabilities, abilities and skills",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      features: [
        "Build partnership with tangata whairora that recognises capabilities",
        "Empower migrants and former refugees with tools and support",
        "Create opportunities in ethnic communities affected by unemployment",
      ],
      modalDetails:
        "We start with a guided conversation to understand your story, aspirations, and the barriers in your way. Together we map your strengths and design a plan that keeps you motivated and moving forward.",
      modalSteps: [
        "30–45 minute discovery session to define your goals and constraints",
        "Strengths mapping plus a summary you can share with employers or mentors",
        "Confidence-building check-ins and community connections for encouragement",
      ],
    },
    {
      icon: Wrench,
      title: "Equip",
      description:
        "Provide the tools, resources, and training needed for workplace success",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Assist with preparation of work skills needed",
        "Provide career information and connect with opportunities",
        "Organize workshops for communication and employment skills",
        "Link to upskilling and training courses",
      ],
      modalDetails:
        "Once we know what you want, we give you the tools to get there. From CVs to interview practice, we focus on practical coaching and resources tailored to the roles and industries you’re targeting.",
      modalSteps: [
        "Hands-on workshops for CV, cover letters, and LinkedIn clean-up",
        "Industry-specific language support and mock interviews with feedback",
        "Introductions to short courses or micro-credentials matched to your path",
      ],
    },
    {
      icon: Target,
      title: "Achieve",
      description:
        "Inspire success and reduce inequality through meaningful outcomes",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "Inspire tangata whairora to gain skills and achieve success",
        "Reduce inequality of income and opportunity",
        "Enhance well-being through positive engagement and relationships",
        "Foster trust, belonging, shared values and participation in society",
      ],
      modalDetails:
        "We stay with you through applications, interviews, and those crucial first weeks in a new role. Our team advocates for you with employers and makes sure you settle in with confidence.",
      modalSteps: [
        "Warm introductions to employers who value migrant and former refugee talent",
        "Support with work trials or placements, including clear expectations for both sides",
        "Post-placement follow-ups for the first 90 days so you have backup when you need it",
      ],
    },
  ];

  const [selectedService, setSelectedService] =
    useState<(typeof services)[number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const handleOpen = (service: (typeof services)[number]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleStartJourney = () => {
    window.history.pushState({}, "", "/contact#contact-form");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section id="services" className="gradient-bg-services py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-800 lg:text-4xl">
            How We Help You Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Our comprehensive approach focuses on three key areas to ensure your
            journey to employment success
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
              <Card className="group relative overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl">
                <CardHeader className="pb-4">
                  <motion.div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.bgColor} transition-transform duration-300 group-hover:scale-110`}
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
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start space-x-2 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span
                          className={`mt-2 inline-block h-1.5 w-1.5 rounded-full ${service.color.replace("text-", "bg-")}`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`group/btn w-full justify-between ${service.color} hover:${service.bgColor}`}
                    variant="ghost"
                    onClick={() => handleOpen(service)}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
            size="lg"
            onClick={handleStartJourney}
          >
            Start Your Journey
          </Button>
        </motion.div>

        {isModalOpen &&
          selectedService &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
            >
              <div
                className="absolute inset-0 bg-black/40"
                onClick={handleClose}
              />
              <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.25)] sm:max-w-lg">
                <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />
                <div className="max-h-[85vh] overflow-y-auto p-6">
                  <div className="flex items-start gap-3">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${selectedService.bgColor}`}
                  >
                    <selectedService.icon
                      className={`h-5 w-5 ${selectedService.color}`}
                    />
                  </span>
                  <div className="flex-1 space-y-2">
                    <h3
                      id="service-modal-title"
                      className="text-2xl font-semibold text-gray-900"
                    >
                      {selectedService.title}
                    </h3>
                    <p className="text-base text-gray-600">
                      {selectedService.description}
                    </p>
                  </div>
                </div>

                  <div className="mt-5 space-y-5 text-sm text-gray-700">
                  <p className="leading-relaxed">{selectedService.modalDetails}</p>

                  <div className="rounded-xl border bg-muted/30 p-4">
                    <p className="mb-3 text-sm font-semibold text-gray-900">
                      What this looks like:
                    </p>
                    <ul className="space-y-2">
                      {selectedService.modalSteps.map((step) => (
                        <li key={step} className="flex items-start gap-3">
                          <span
                            className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${selectedService.color.replace("text-", "bg-")}`}
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-dashed p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-900">
                      Common results:
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• A clear 4-week plan with milestones you can track</li>
                      <li>• Confidence to speak about your strengths to employers</li>
                      <li>• Warm introductions to at least one relevant employer</li>
                    </ul>
                  </div>

                  <div className="grid gap-3 rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-2xl font-semibold text-gray-900">1:1</p>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Personal support
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-semibold text-gray-900">Workshops</p>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Weekly skills sessions
                      </p>
                    </div>
                  </div>
                </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button variant="outline" onClick={handleClose}>
                      Close
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                          Contact Us
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        sideOffset={8}
                        className="w-64 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
                      >
                        <div className="flex flex-col gap-2">
                          <a
                            href="tel:+64223146756"
                            className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                          >
                            <span className="flex items-center gap-2 font-semibold">
                              <Phone className="h-4 w-4" />
                              Call us
                            </span>
                          </a>
                          <a
                            href="mailto:waikato.navtrust@outlook.com"
                            className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                          >
                            <span className="flex items-center gap-2 font-semibold">
                              <Mail className="h-4 w-4" />
                              Email us
                            </span>
                          </a>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </section>
  );
}
