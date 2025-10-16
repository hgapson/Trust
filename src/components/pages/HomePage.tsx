import { Hero } from "../Hero";
import { Services } from "../Services";
import { WhoWeServe } from "../WhoWeServe";
import { OurApproach } from "../OurApproach";
import { Values } from "../Values";
import { CommunityImpact } from "../CommunityImpact";
import { FAQ } from "../FAQ";
import { CallToAction } from "../CallToAction";

export function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeServe />
      <Services />
      <OurApproach />
      <Values />
      <CommunityImpact />
      <FAQ />
      <CallToAction />
    </>
  );
}