import {
  CommunityHighlightSection,
  GetInvolvedCtaSection,
  GetInvolvedHero,
  ImpactStatsSection,
  PartnershipTiersSection,
  SupportWaysSection,
  UpcomingEventsSection,
  VolunteerOpportunitiesSection,
} from "./get-involved";
import {
  impactStats,
  partnershipTiers,
  supportWays,
  upcomingEvents,
  volunteerOpportunities,
} from "./get-involved/data";

export function GetInvolvedPage() {
  return (
    <div className="py-20">
      <GetInvolvedHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <ImpactStatsSection stats={impactStats} />
        <VolunteerOpportunitiesSection opportunities={volunteerOpportunities} />
        <SupportWaysSection supportWays={supportWays} />
        <PartnershipTiersSection tiers={partnershipTiers} />
        <UpcomingEventsSection events={upcomingEvents} />
        <CommunityHighlightSection />
        <GetInvolvedCtaSection />
      </div>
    </div>
  );
}
