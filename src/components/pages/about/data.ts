import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { Award, Globe, Heart, Users } from "lucide-react";
import type { TeamMember } from "./types";

type IconComponent = ComponentType<LucideProps>;

export interface Milestone {
  year: string;
  event: string;
}

export interface ImpactStat {
  icon: IconComponent;
  number: string;
  label: string;
  color: string;
}

export interface PartnerProfile {
  name: string;
  logo?: string;
  url?: string;
  focus: string;
  description: string;
  location: string;
  contribution: string;
}

export const teamMembers: TeamMember[] = [];

export const milestones: Milestone[] = [
  { year: "2018", event: "Founded with mission to support Waikato migrants" },
  { year: "2019", event: "Launched first employment readiness program" },
  { year: "2021", event: "Expanded to serve 200+ individuals annually" },
  { year: "2023", event: "Partnered with 50+ local businesses" },
  { year: "2024", event: "Achieved 95% success rate in job placements" },
];

export const impactStats: ImpactStat[] = [
  {
    icon: Users,
    number: "500+",
    label: "Lives Changed",
    color: "text-blue-600",
  },
  {
    icon: Heart,
    number: "95%",
    label: "Success Rate",
    color: "text-purple-600",
  },
  {
    icon: Globe,
    number: "15",
    label: "Countries Represented",
    color: "text-teal-600",
  },
  {
    icon: Award,
    number: "50+",
    label: "Partner Organizations",
    color: "text-orange-600",
  },
];
