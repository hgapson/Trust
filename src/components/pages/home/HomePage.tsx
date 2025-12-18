import {
  CallToAction,
  Hero,
  OurApproach,
  Services,
  WhoWeServe,
  CommunityImpact,
  FAQ
} from ".";

export function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeServe />
      <Services />
      <OurApproach />
      <CommunityImpact />
      <CallToAction />
      <FAQ />
    </>
  );
}