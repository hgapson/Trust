import {
  Users,
  Clock,
  Heart,
  Building,
  Star,
  Briefcase,
  HandHeart,
  HelpingHand,
  Target,
  Shield,
  Award,
  BookOpen,
  MapPin,
  FileText,
  Rocket,
} from "lucide-react";

export const iconMap = {
  Users,
  Clock,
  Heart,
  Building,
  Star,
  Briefcase,
  HandHeart,
  HelpingHand,
  Target,
  Shield,
  Award,
  BookOpen,
  MapPin,
  FileText,
  Rocket,
} as const;

export type IconKey = keyof typeof iconMap;
