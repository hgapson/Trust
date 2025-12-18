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