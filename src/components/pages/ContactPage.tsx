import {
  ContactCtaSection,
  ContactFormAndInfoSection,
  ContactHero,
  ContactMethodsSection,
  //EmergencyContactSection,
  FaqSection,
} from "./contact";
import {
  contactMethods,
  emergencyContact,
  faqs,
  officeInfo,
  supportedLanguages,
} from "./contact/data";

export function ContactPage() {
  return (
    <div className="py-20">
      <ContactHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <ContactMethodsSection methods={contactMethods} />
        <ContactFormAndInfoSection
          officeInfo={officeInfo}
          languages={supportedLanguages}
        />
        <FaqSection faqs={faqs} />
        {/* <EmergencyContactSection {...emergencyContact} /> */}
        <ContactCtaSection />
      </div>
    </div>
  );
}
