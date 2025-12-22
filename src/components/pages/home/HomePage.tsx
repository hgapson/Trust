import {
  CallToAction,
  Hero,
  OurApproach,
  Services,
  WhoWeServe,
  CommunityImpact,
  
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
    </>
  );
}