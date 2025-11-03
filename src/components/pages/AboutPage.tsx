import {
  AboutCtaSection,
  AboutHero,
  //ImpactStatsSection,
  MissionVisionSection,
  TeamSection,
  //TimelineSection,
  Values,
} from "./about";
import { impactStats, milestones, teamMembers } from "./about/data";

export function AboutPage() {
  return (
    <div className="py-20">
      <AboutHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <MissionVisionSection />
        <Values />
        {/* <ImpactStatsSection stats={impactStats} /> */}
        {/* <TimelineSection milestones={milestones} /> */}
        <TeamSection members={teamMembers} />
        <AboutCtaSection />
      </div>
    </div>
  );
}
