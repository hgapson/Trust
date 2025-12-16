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