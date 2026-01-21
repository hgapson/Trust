import {
  CommunityHighlightSection,
  GetInvolvedCtaSection,
  GetInvolvedHero,
  SupportWaysSection,
  VolunteerOpportunitiesSection,
} from "./get-involved"

import { supportWays } from "./get-involved/data"

export function GetInvolvedPage() {
  return (
    <div className=" py-20">
      <GetInvolvedHero />

      <div className="container mx-auto max-w-screen-xl px-4">
        <VolunteerOpportunitiesSection />
        <SupportWaysSection supportWays={supportWays} />
        <CommunityHighlightSection />
        <GetInvolvedCtaSection />
      </div>
    </div>
  )
}
