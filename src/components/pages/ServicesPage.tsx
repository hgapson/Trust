import {
  AdditionalServicesSection,
  DetailedServicesSection,
  ProcessTimelineSection,
  ServicesCtaSection,
  ServicesHero,
} from "./services";

import WorkshopsPage  from "./services/Workshop/WorkshopSection";
import { processSteps } from "./services/data";

export function ServicesPage() {
  return (
    <div className="py-20">
      <ServicesHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <DetailedServicesSection />
        <AdditionalServicesSection />
        <WorkshopsPage />

        <ProcessTimelineSection steps={processSteps} />
        <ServicesCtaSection />
      </div>
    </div>
  );
}