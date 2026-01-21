import {
  CommunityHighlightSection,
  GetInvolvedCtaSection,
  GetInvolvedHero,
  SupportWaysSection,
  VolunteerOpportunitiesSection,
} from "./get-involved"

export function GetInvolvedPage() {
  return (
    <div className=" py-20">
      <GetInvolvedHero />

      <div className="container mx-auto max-w-screen-xl px-4">
        <VolunteerOpportunitiesSection />
        <SupportWaysSection />
        <CommunityHighlightSection />
        <GetInvolvedCtaSection />
      </div>
    </div>
  )
}
