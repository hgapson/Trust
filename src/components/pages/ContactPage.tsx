import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  ContactCtaSection,
  ContactFormAndInfoSection,
  ContactHero,
  ContactMethodsSection,
  //EmergencyContactSection,
  FaqSection,
} from "./contact";

import { emergencyContact } from "./contact/data";

export function ContactPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#contact-form") return;

    const tryScroll = (attemptsLeft: number) => {
      const target = document.getElementById("contact-form");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attemptsLeft > 0) {
        setTimeout(() => tryScroll(attemptsLeft - 1), 120);
      }
    };

    tryScroll(10);
  }, [hash]);

  return (
    <div className="py-20">
      <ContactHero />
      <div className="container mx-auto max-w-screen-xl px-4">
        <ContactMethodsSection />
        <ContactFormAndInfoSection />
        <FaqSection />
        {/* <EmergencyContactSection {...emergencyContact} /> */}
        <ContactCtaSection />
      </div>
    </div>
  );
}
