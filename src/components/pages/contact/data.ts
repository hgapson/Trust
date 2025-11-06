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
    details: "++64 223146756",
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
  {
    question: "Do I need to book an appointment?",
    answer:
      "While walk-ins are welcome, we recommend booking an appointment to ensure we can give you our full attention and have the right staff member available to help you.",
  },
  {
    question: "Are your services free?",
    answer:
      "Yes, all our services are completely free for migrants and former refugees in the Waikato region. This includes assessments, workshops, mentoring, and job placement assistance.",
  },
  {
    question: "What documents should I bring?",
    answer:
      "Please bring identification, any qualifications or certificates, work history documentation, and if applicable, visa or immigration documents. Don't worry if you don't have everything - we can still help you get started.",
  },
  {
    question: "Do you provide services in other languages?",
    answer:
      "Yes, we have multilingual staff and interpreters available. We can provide services in over 12 languages including Arabic, Mandarin, Hindi, and more.",
  },
];

export const emergencyContact = {
  phone: "+64 223146756",
  description:
    "If you need urgent assistance outside office hours, please contact our emergency support line:",
  availability: "Available 24/7 for emergency situations requiring immediate support",
};

export { Globe };
