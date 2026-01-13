import type { ComponentType, SVGProps } from "react";

export type DetailedServiceRow = {
  id: string;
  title: string;

  // backend returns icon as string (ex: "Heart")
  icon: string;

  color: string;
  bgColor: string;
  image: string;
  description: string;
  features: string[];
};

// UI type (after mapping icon string -> real icon component)
export type DetailedServiceUI = {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  image: string;
  description: string;
  features: string[];
};