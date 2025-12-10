import { useEffect } from "react";
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
  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      const target = document.getElementById("contact-form");
      if (target) {
        // slight delay to ensure layout is ready
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  }, []);

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
