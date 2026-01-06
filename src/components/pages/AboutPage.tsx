import {
  AboutHero,
  CommunityImpact,
  MissionVisionSection,
  PartnersSection,
  TeamSection,
  //TimelineSection,
  Values,
} from "./about";
import { useEffect, useState } from "react";
import { CallToAction } from "./CallToAction";
import { TeamApi } from "./about/api/team";
import type { TeamMember } from "./about/types";

export function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    let isMounted = true;

    TeamApi.list()
      .then((data) => {
        if (isMounted) setTeamMembers(data);
      })
      .catch((error) => {
        console.error("Failed to load team members.", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-20">
      <AboutHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <MissionVisionSection />
        <Values />
        {/* <TimelineSection milestones={milestones} /> */}
        <PartnersSection />
        <TeamSection members={teamMembers} />
        <CommunityImpact />
        <CallToAction />
      </div>
    </div>
  );
}
