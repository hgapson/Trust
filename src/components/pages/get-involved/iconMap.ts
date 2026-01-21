import {
  Users,
  Clock,
  Heart,
  Building,
} from "lucide-react";

export const iconMap = {
  Users,
  Clock,
  Heart,
  Building,
} as const;

export type IconKey = keyof typeof iconMap;