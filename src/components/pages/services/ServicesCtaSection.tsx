import React, { useState } from "react";
import { motion } from "motion/react";

import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { FileText, Mail, Phone } from "lucide-react";
import brochurePdf from "../../../assets/brochure.pdf";
import { useContactMethodLinks } from "../contact/contactMethods";

export function ServicesCtaSection() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { phoneHref, emailHref } = useContactMethodLinks();

  // Simple Modal component defined locally so Modal is available
  const Modal: React.FC<{ showModal: boolean; handleClose: () => void; children?: React.ReactNode }> = ({ showModal, handleClose, children }) => {
    if (!showModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-lg rounded-lg bg-white px-6 pb-6 pt-8 shadow-xl">
          <button
            className="absolute right-4 top-3 text-xl text-slate-400 transition hover:text-slate-600"
            onClick={handleClose}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    );
  };

  const AnnualReportModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({
    isOpen,
    onRequestClose,
  }) => {
    const handleView = () => {
      window.open(brochurePdf, "_blank");
    };

    return (
      <Modal showModal={isOpen} handleClose={onRequestClose}>
        <h2 className="mb-4 text-2xl font-bold">Service Guide</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleView}
            className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
          >
            <span className="flex items-center gap-2 font-semibold">
              <FileText className="h-4 w-4" />
              View
            </span>
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <section className="mt-16 bg-slate-50 py-16 text-center">
      <motion.div
        className="container mx-auto max-w-4xl space-y-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
          Ready to Begin Your Employment Journey?
        </h2>
        <p className="text-lg text-slate-600">
          Take the first step towards a successful career. Our services are free
          and designed specifically for migrants and former refugees in the Waikato region.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="h-11 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:from-blue-600 hover:to-purple-700 hover:shadow-md"
                disabled={!phoneHref && !emailHref}
              >
                Schedule Assessment
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              sideOffset={10}
              className="w-72 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
            >
              <p className="text-sm font-semibold text-slate-700">
                Choose how you want to reach us
              </p>
              <div className="flex flex-col gap-2">
                {phoneHref ? (
                  <a
                    href={phoneHref}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Phone className="h-4 w-4 text-blue-600" />
                      Call us
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                    <span className="flex items-center gap-2 font-semibold">
                      <Phone className="h-4 w-4 text-blue-300" />
                      Call us
                    </span>
                  </span>
                )}

                {emailHref ? (
                  <a
                    href={emailHref}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Mail className="h-4 w-4 text-purple-600" />
                      Email us
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                    <span className="flex items-center gap-2 font-semibold">
                      <Mail className="h-4 w-4 text-purple-300" />
                      Email us
                    </span>
                  </span>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="h-11 rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            Read Service Guide
          </Button>
        </div>
      </motion.div>

      <AnnualReportModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
