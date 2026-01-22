export type CommunityStory = {
  id: number;
  quote: string;
  author: string;
  role: string;
  image_url: string;
};
export type MissionVisionData = {
  id: number;
  mission_title: string;
  mission_description: string;
  vision_title: string;
  vision_description: string;
  image_url: string;
};
export type PartnerTab = "partners" | "funders";

export type DbPartner = {
  id: number;
  type: "partner" | "funder";
  name: string;
  logo_url?: string;
  website_url?: string;
  focus: string;
  description: string;
  location: string;
  contribution: string;
  sort_order?: number;
  created_at?: string;
};

export interface PartnerProfile {
  name: string;
  logo?: string;
  url?: string;
  focus: string;
  description: string;
  location: string;
  contribution: string;
}

export function mapDbPartner(row: DbPartner): PartnerProfile {
  return {
    name: row.name,
    logo: row.logo_url ?? "",
    url: row.website_url ?? "",
    focus: row.focus,
    description: row.description,
    location: row.location,
    contribution: row.contribution,
  };
}
export type ValueItem = {
  sort_order: number;
  id: number;
  title: string;
  description: string;
  icon:
    | "Shield"
    | "Award"
    | "CheckCircle"
    | "Users"
    | "Heart"
    | "Star"
    | "Target"
    | "HelpingHand"
    | "Globe"
    | "BookOpen"
    | "Briefcase";
  color: string;
  bg_color: string;
};
export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image_url?: string;
  description: string;
  team_type?: "staff" | "trustee";
  sort_order?: number;
};
