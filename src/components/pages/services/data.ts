import type { ComponentType, SVGProps } from "react";
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
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  image: string;
  description: string;
  features: string[];
}

export interface AdditionalService {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  sessions: string;
}

export interface WorkshopItem {
  time: string;
  title: string;
  day: string;
}


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
