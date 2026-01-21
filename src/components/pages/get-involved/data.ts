import type { ComponentType } from "react";
import type { LucideProps as IconProps } from "lucide-react";
import {
  Building,
  Clock,
  DollarSign,
  Gift,
  Handshake,
  Heart,
  //MapPin,
  //Star,
  Users,
} from "lucide-react";

export interface ImpactStat {
  number: string;
  label: string;
  icon: ComponentType<IconProps>;
}

export interface VolunteerOpportunity {
  title: string;
  description: string;
  commitment: string;
  skills: string;
  icon: ComponentType<IconProps>;
  color: string;
  bgColor: string;
}

export interface SupportWay {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  color: string;
  bgColor: string;
}

export interface PartnershipTier {
  tier: string;
  commitment: string;
  benefits: string[];
  color: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export const impactStats: ImpactStat[] = [
  { number: "150+", label: "Active Volunteers", icon: Users },
  { number: "$85K", label: "Raised This Year", icon: DollarSign },
  { number: "25", label: "Partner Businesses", icon: Building },
  { number: "500+", label: "Lives Changed", icon: Heart },
];


export const supportWays: SupportWay[] = [
  {
    title: "Share Your Expertise",
    description:
      "Offer skills-based support through mentoring, resume reviews, or mock interviews",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Spread the Word",
    description:
      "Help us reach more people by sharing our mission with your network",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    title: "Open Doors",
    description:
      "Connect us with potential employers, partners, or community organizations",
    icon: Handshake,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Provide Resources",
    description:
      "Donate office supplies, training materials, or professional clothing",
    icon: Gift,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

export const partnershipTiers: PartnershipTier[] = [
  {
    tier: "Community Partner",
    commitment: "1-5 job placements annually",
    benefits: [
      "Access to diverse talent pool",
      "Cultural diversity training",
      "Recognition on website",
      "Quarterly updates",
    ],
    color: "border-blue-200 bg-blue-50",
  },
  {
    tier: "Strategic Partner",
    commitment: "6-15 job placements annually",
    benefits: [
      "All Community Partner benefits",
      "Dedicated recruitment support",
      "Custom training programs",
      "Logo on marketing materials",
    ],
    color: "border-purple-200 bg-purple-50",
  },
  {
    tier: "Champion Partner",
    commitment: "16+ job placements annually",
    benefits: [
      "All Strategic Partner benefits",
      "Priority access to candidates",
      "Co-branded initiatives",
      "Annual recognition award",
    ],
    color: "border-gold-200 bg-yellow-50",
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Volunteer Orientation",
    date: "March 15, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Navigate Trust Office",
    description: "Learn about our mission and volunteer opportunities",
  },
  {
    title: "Fundraising Gala",
    date: "April 20, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "Waikato Convention Centre",
    description: "Annual celebration and fundraising event",
  },
  {
    title: "Community Job Fair",
    date: "May 10, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Hamilton Gardens Pavilion",
    description: "Connecting migrants with local employers",
  },
];
