import type { ComponentType } from "react";
import type { LucideProps as IconProps } from "lucide-react";
import {
  Accessibility,
  Calendar,
  Car,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

export interface ContactMethod {
  icon: ComponentType<IconProps>;
  title: string;
  details: string;
  description: string;
  action: string;
}

export interface OfficeInfo {
  icon: ComponentType<IconProps>;
  title: string;
  details: string;
  extra?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    title: "Phone",
    details: "+64 223146756",
    description: "Monday to Friday, 9:00 AM - 5:00 PM",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: "waikato.navtrust@outlook.com",
    description: "We respond within 24 hours",
    action: "Send Email",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    details: "+64 223146756",
    description: "Quick questions and support",
    action: "Message Us",
  },
];

export const officeInfo: OfficeInfo[] = [
  {
    icon: MapPin,
    title: "Main Office",
    details: "46G Boundary Road, Claudelands, Hamilton 3200, New Zealand",
    extra: "Located inside Settlement center building",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: "Monday to Friday: 9:00 AM - 5:00 PM",
    extra: "Closed on public holidays",
  },
  {
    icon: Car,
    title: "Parking",
    details: "Free parking available",
    extra: "Accessible parking spaces at front entrance",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    details: "Wheelchair accessible building",
    extra: "Assistance available upon request",
  },
];

export const supportedLanguages = [
  "English",
  "Arabic",
  "Mandarin",
  "Hindi",
  "Spanish",
  "French",
  "Swahili",
  "Dari",
  "Farsi",
  "Tamil",
  "Urdu",
  "Somali",
];

export const faqs: FaqItem[] = [
    {question: "Who can access your services?",
      answer:
        "Our services are available to all migrants and former refugees in the Waikato region who are seeking employment support. Whether you've just arrived in New Zealand or have been here for some time, we're here to help you achieve your career goals.",
    },
    {
      question: "Are your services free?",
      answer:
        "Yes! All our core services are provided free of charge to those who need support finding employment. This includes workshops, one-on-one mentoring, career counseling, and connections to employer networks.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer comprehensive support including resume and cover letter writing, interview preparation, skills assessment, professional development workshops, mentorship programs, job matching services, and ongoing career guidance. We also help with understanding NZ workplace culture and expectations.",
    },
    {
      question: "How long does the program take?",
      answer:
        "The timeline varies based on your individual needs and goals. Some people find employment within weeks, while others benefit from longer-term support to upskill or transition careers. We work at your pace and provide support for as long as you need it.",
    },
    {
      question: "Do I need to speak perfect English?",
      answer:
        "No, you don't need perfect English to access our services. We have multilingual staff and volunteers who can provide support in various languages. We also offer resources to help improve your professional communication skills.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply contact us via phone, email, or visit our office. We'll arrange an initial consultation to understand your background, skills, and career aspirations. From there, we'll create a personalized plan to support your employment journey.",
    },
    {
      question: "Can you guarantee me a job?",
      answer:
        "While we can't guarantee employment, we are committed to providing you with all the tools, skills, training, and connections needed to significantly improve your employment prospects. Our strong network of local employers and proven track record speak to the effectiveness of our approach.",
    },
    {
      question: "What makes your organization different?",
      answer:
        "We understand the unique challenges that migrants and former refugees face. Our team has lived experience and cultural competency that allows us to provide truly personalized, empathetic support. We focus on your strengths and help employers recognize the value of diversity.",
    },
];

export const emergencyContact = {
  phone: "+64 223146756",
  description:
    "If you need urgent assistance outside office hours, please contact our emergency support line:",
  availability: "Available 24/7 for emergency situations requiring immediate support",
};

export { Globe };
