import type { HomeSectionItem } from "./types";

import {Hero} from "./Hero";
import CommunityImpact from "./CommunityImpact";
import {OurApproach} from "./OurApproach";
import {Services} from "./HowWeHelp";
import {WhoWeServe} from "./WhoWeServe";
import {CallToAction} from "./CallToAction";
export { HomePage } from "./HomePage";

export const HOME_SECTIONS: HomeSectionItem[] = [
  { key: "hero", label: "Hero", Component: Hero, enabled: true },
  {
    key: "communityImpact",
    label: "Community Impact",
    Component: CommunityImpact,
    enabled: true,
  },
  { key: "ourApproach", label: "Our Approach", Component: OurApproach, enabled: true },
  { key: "services", label: "Services", Component: Services, enabled: true },
  { key: "whoWeServe", label: "Who We Serve", Component: WhoWeServe, enabled: true },
  { key: "callToAction", label: "Call To Action", Component: CallToAction, enabled: true },
];

export function getHomeSections() {
  return HOME_SECTIONS.filter((s) => s.enabled !== false);
}

export { CallToAction, Hero, OurApproach, Services, WhoWeServe, CommunityImpact, };
