import {
  CallToAction,
  CommunityImpact,
  FAQ,
  Hero,
  OurApproach,
  Services,
  Values,
  WhoWeServe,
} from ".";

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
