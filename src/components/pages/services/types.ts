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
// types.ts
export type AdditionalService = {
  id: number
  title: string
  description: string
  icon_key: string
  sessions: string
  sort_order: number
  created_at?: string
};
export type Workshop = {
  id: number;
  title: string;
  start_at: string; // ISO datetime
  end_at: string;   // ISO datetime
  location?: string | null;
  description?: string | null;
  capacity?: number | null;
};

export type WorkshopRegistrationPayload = {
  workshop_id: number;
  full_name: string;
  email: string;
  phone?: string;
  notes?: string;
};
export interface ProcessStep {
  id: number;
  step_number: number;
  title: string;
  description: string;
}