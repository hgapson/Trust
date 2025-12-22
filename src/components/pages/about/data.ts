import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { Award, Globe, Heart, Users } from "lucide-react";

type IconComponent = ComponentType<LucideProps>;

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

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

export const teamMembers: TeamMember[] = [
  {
    name: "Penny Smith",
    role: "Chief Executive Officer",
    description:
      "Penny has over 15 years in management services and community development",
  },
  {
    name: "Mookthida",
    role: "Office Manager",
    description:
      "Work placement expert specializing in employment services and community developmen",
  },
  {
    name: "Leeya",
    role: "Office Administrator",
    description:
      "Certified office administrator with expertise in cross-cultural communication",
  },
];

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

export const partners: PartnerProfile[] = [
  {
    name: "Community Waikato",
    logo: "https://images.squarespace-cdn.com/content/v1/5f2a22d539307a4ca976ace6/1600921303317-GY8C1CVTIH2SK2WN4OUW/CW-logo-web.png",
    url: "https://www.communitywaikato.org.nz",
    focus: "Community capability",
    description:
      "Supporting local organisations with advisory, governance, and funding guidance.",
    location: "Hamilton",
    contribution: "Capacity building and sector support",
  },
  {
    name: "Volunteering Waikato",
    logo: "https://volunteeringwaikato.org.nz/images/main/logo-2023.png",
    url: "https://www.volunteeringwaikato.org.nz",
    focus: "Volunteer pathways",
    description:
      "Connecting people to volunteering and community initiatives.",
    location: "Hamilton",
    contribution: "Volunteer matching and training",
  },
  {
    name: "Sport Waikato",
    logo: "https://www.sportwaikato.org.nz/images/logos/Logo@2x.png",
    url: "https://www.sportwaikato.org.nz",
    focus: "Healthy communities",
    description:
      "Growing active lifestyles through sport and recreation.",
    location: "Hamilton",
    contribution: "Community wellbeing programs",
  },
  {
    name: "Creative Waikato",
    logo: "https://creativewaikato.co.nz/site/uploads/cw-social-logo.png",
    url: "https://creativewaikato.co.nz",
    focus: "Arts and culture",
    description:
      "Championing creative initiatives across the region.",
    location: "Hamilton",
    contribution: "Creative sector partnerships",
  },
  {
    name: "Waikato Museum",
    logo: "https://tewharetaonga.nz/assets/Uploads/Te-Whare-Taonga-o-Waikato_logo.jpg",
    url: "https://www.waikatomuseum.co.nz",
    focus: "Culture and heritage",
    description:
      "Celebrating stories, exhibitions, and learning for the community.",
    location: "Hamilton",
    contribution: "Community exhibitions and learning",
  },
  {
    name: "Hamilton City Council",
    logo: "https://hamilton.govt.nz/_resources/themes/hcc-theme/img/logos/logo-black.png?m=1766019066",
    url: "https://hamilton.govt.nz",
    focus: "Civic services",
    description:
      "Supporting community development and local initiatives.",
    location: "Hamilton",
    contribution: "Community grants and support",
  },
];

export const funders: PartnerProfile[] = [
  {
    name: "Trust Waikato",
    logo: "https://trustwaikato.co.nz/wp-content/themes/trustwaikato/src/img/logo/icon.png",
    url: "https://trustwaikato.co.nz",
    focus: "Community funding",
    description:
      "Funding initiatives that strengthen Waikato communities.",
    location: "Hamilton",
    contribution: "Community grants",
  },
  {
    name: "WEL Networks",
    logo: "https://wel.co.nz/images/Logo.svg",
    url: "https://wel.co.nz",
    focus: "Regional investment",
    description:
      "Investing in local infrastructure and community wellbeing.",
    location: "Hamilton",
    contribution: "Sponsorship and community funding",
  },
  {
    name: "University of Waikato",
    logo: "https://www.waikato.ac.nz/_resources/themes/app/dist/icons/logo.svg?m=1760581704",
    url: "https://www.waikato.ac.nz",
    focus: "Research and education",
    description:
      "Supporting pathways, skills, and community-led research.",
    location: "Hamilton",
    contribution: "Research collaboration and scholarships",
  },
  {
    name: "Wintec | Te Pukenga",
    logo: "https://www.wintec.ac.nz/ResourcePackages/WintecPublicWebsite/assets/dist/images/brand/logo-wintec.svg",
    url: "https://www.wintec.ac.nz",
    focus: "Skills development",
    description:
      "Training and upskilling for workforce readiness.",
    location: "Hamilton",
    contribution: "Training partnerships",
  },
  {
    name: "Waikato District Council",
    logo: "https://www.waikatodistrict.govt.nz/ResourcePackages/WaikatoDistrictCouncil/assets/dist/images/waikato-district-council-logo.svg",
    url: "https://www.waikatodistrict.govt.nz",
    focus: "Regional services",
    description:
      "Supporting community-led projects across the district.",
    location: "Waikato District",
    contribution: "Community development funding",
  },
  {
    name: "Te Whatu Ora - Health NZ",
    logo: "https://www.tewhatuora.govt.nz/logo.png",
    url: "https://www.tewhatuora.govt.nz",
    focus: "Health access",
    description:
      "Supporting wellbeing services and local health initiatives.",
    location: "Waikato",
    contribution: "Health partnership support",
  },
];
