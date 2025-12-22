import {
  //AboutCtaSection,
  AboutHero,
  //ImpactStatsSection,
  MissionVisionSection,
  PartnersSection,
  TeamSection,
  //TimelineSection,
  Values,
} from "./about";
import {CallToAction} from "./CallToAction";
import { teamMembers } from "./about/data";

export function AboutPage() {
  return (
    <div className="py-20">
      <AboutHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <MissionVisionSection />
        <Values />
        {/* <ImpactStatsSection stats={impactStats} /> */}
        {/* <TimelineSection milestones={milestones} /> */}
        <PartnersSection />
        <TeamSection members={teamMembers} />
        <CallToAction />
      </div>
    </div>
  );
}
