import type { ComponentType } from "react";

export type HomeSectionKey =
  | "hero"
  | "communityImpact"
  | "ourApproach"
  | "services"
  | "whoWeServe"
  | "faq"
  | "callToAction";

export type HomeSectionItem = {
  key: HomeSectionKey;
  label: string;
  Component: ComponentType;
  enabled?: boolean;
};
export type Audience = {
  id: number;
  title: string;
  description: string;
  icon: string;    // "Globe" | "Home" | "Briefcase" | "GraduationCap"
  color: string;   // "text-blue-600"
  bgColor: string; // "bg-blue-50"
  sort_order: number;
  created_at?: string;
};
export type ApproachStep = {
  id: number;
  title: string;
  description: string;
  icon: string; // "UserCheck" | "FileText" | "Award" | "Rocket"
  step: string; // "01", "02", "03", "04"
  sort_order: number;
  created_at?: string;
};
export type ServiceRow = {
  id: number;
  icon: string; // "Heart" | "Wrench" | "Target" (string from DB)
  title: string;
  description: string;
  color: string; // "text-blue-600"
  bgColor: string; // "bg-blue-50"
  modalDetails: string;
  features: string[];
  modalSteps: string[];
  sort_order?: number;
  created_at?: string;
};
export type CommunityStory = {
  id: number;
  quote: string;
  author: string;
};
export type CallToActionData = {
  id: number;
  heading: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  availability: string;
  image_url: string;
  card_title: string;
  card_description: string;
  cta_label: string;
};
