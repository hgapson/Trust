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
    const tryScroll = (attemptsLeft: number) => {
      if (window.location.hash === "#contact-form") {
        const target = document.getElementById("contact-form");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      if (attemptsLeft > 0) {
        setTimeout(() => tryScroll(attemptsLeft - 1), 100);
      }
    };

    const scrollToForm = () => tryScroll(5);

    scrollToForm();
    window.addEventListener("hashchange", scrollToForm);
    window.addEventListener("popstate", scrollToForm);

    return () => {
      window.removeEventListener("hashchange", scrollToForm);
      window.removeEventListener("popstate", scrollToForm);
    };
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
