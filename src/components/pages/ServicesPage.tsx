import {
  AdditionalServicesSection,
  DetailedServicesSection,
  ProcessTimelineSection,
  ServicesCtaSection,
  ServicesHero,
  WorkshopScheduleSection,
} from "./services";
import {
  additionalServices,
  processSteps,
  workshopSchedule,
} from "./services/data";

export function ServicesPage() {
  return (
    <div className="py-20">
      <ServicesHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <DetailedServicesSection />
        <AdditionalServicesSection services={additionalServices} />
        <WorkshopScheduleSection schedule={workshopSchedule} />
        <ProcessTimelineSection steps={processSteps} />
        <ServicesCtaSection />
      </div>
    </div>
  );
}
