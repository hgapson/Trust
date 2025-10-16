import type { ComponentType } from "react";
import type { IconProps } from "lucide-react";
import {
  BookOpen,
  CheckCircle,
  Heart,
  MapPin,
  Target,
  Users,
  Wrench,
} from "lucide-react";

export interface DetailedService {
  id: string;
  title: string;
  icon: ComponentType<IconProps>;
  color: string;
  bgColor: string;
  image: string;
  description: string;
  features: string[];
}

export interface AdditionalService {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  sessions: string;
}

export interface WorkshopItem {
  time: string;
  title: string;
  day: string;
}

export const detailedServices: DetailedService[] = [
  {
    id: "motivate",
    title: "Motivate - Building Foundations",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-100",
    image:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzU4NDY2MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "We build partnerships with employers and empower individuals with confidence and motivation.",
    features: [
      "One-on-one mentorship programs",
      "Confidence building workshops",
      "Community partnership development",
      "Cultural orientation sessions",
      "Peer support groups",
      "Goal setting and planning",
    ],
  },
  {
    id: "equip",
    title: "Equip - Skills Development",
    icon: Wrench,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    image:
      "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBpbnRlcnZpZXclMjB0cmFpbmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc1ODU0Njg2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "Comprehensive work skills preparation, career guidance, and practical workshops.",
    features: [
      "Resume writing and optimization",
      "Interview preparation and practice",
      "Digital literacy training",
      "Industry-specific skill development",
      "Workplace communication workshops",
      "Professional networking guidance",
    ],
  },
  {
    id: "achieve",
    title: "Achieve - Success & Growth",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-100",
    image:
      "https://images.unsplash.com/photo-1758273240631-59d44c8f5b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBjb3Vuc2VsaW5nJTIwbWVldGluZ3xlbnwxfHx8fDE3NTg1NDY4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "Inspiring success stories and ongoing support to reduce inequality and achieve career goals.",
    features: [
      "Job placement assistance",
      "Career advancement support",
      "Ongoing mentorship",
      "Success story sharing",
      "Alumni network access",
      "Long-term career planning",
    ],
  },
];

export const additionalServices: AdditionalService[] = [
  {
    title: "Language Support",
    description:
      "English language improvement for workplace communication",
    icon: BookOpen,
    sessions: "3x per week",
  },
  {
    title: "Legal Assistance",
    description: "Work visa and employment rights guidance",
    icon: CheckCircle,
    sessions: "By appointment",
  },
  {
    title: "Childcare Support",
    description: "Childcare assistance during training sessions",
    icon: Users,
    sessions: "During programs",
  },
  {
    title: "Transportation",
    description: "Transport assistance to interviews and workplace",
    icon: MapPin,
    sessions: "As needed",
  },
];

export const workshopSchedule: WorkshopItem[] = [
  {
    time: "9:00 AM - 11:00 AM",
    title: "Resume Writing Workshop",
    day: "Monday",
  },
  {
    time: "1:00 PM - 3:00 PM",
    title: "Interview Skills Training",
    day: "Tuesday",
  },
  {
    time: "10:00 AM - 12:00 PM",
    title: "Digital Literacy Basics",
    day: "Wednesday",
  },
  {
    time: "2:00 PM - 4:00 PM",
    title: "Workplace Communication",
    day: "Thursday",
  },
  {
    time: "9:00 AM - 11:00 AM",
    title: "Job Search Strategies",
    day: "Friday",
  },
];

export const processSteps = [
  {
    step: "1",
    title: "Initial Assessment",
    description: "We understand your background, skills, and goals",
  },
  {
    step: "2",
    title: "Personalized Plan",
    description: "Create a customized employment strategy",
  },
  {
    step: "3",
    title: "Skills Development",
    description: "Participate in relevant workshops and training",
  },
  {
    step: "4",
    title: "Job Placement",
    description: "Get matched with suitable employment opportunities",
  },
];

export { ArrowRight, CheckCircle, Clock };
