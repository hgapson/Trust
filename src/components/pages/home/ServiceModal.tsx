import { createPortal } from "react-dom";
import type { ElementType } from "react";
import { Mail, Phone } from "lucide-react";

import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

export type ServiceModalData = {
  title: string;
  description: string;
  color: string;
  bgColor: string;
  modalDetails: string;
  modalSteps: string[];
  Icon: ElementType;
};

type Props = {
  service: ServiceModalData;
  onClose: () => void;
};

export function ServiceModal({ service, onClose }: Props) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.25)] sm:max-w-lg">
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />

        <div className="max-h-[85vh] overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-start gap-3">
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.bgColor}`}
            >
              <service.Icon className={`h-5 w-5 ${service.color}`} />
            </span>

            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-base text-gray-600">
                {service.description}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="mt-5 space-y-5 text-sm text-gray-700">
            <p className="leading-relaxed">
              {service.modalDetails}
            </p>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="mb-3 text-sm font-semibold text-gray-900">
                What this looks like:
              </p>
              <ul className="space-y-2">
                {service.modalSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${service.color.replace(
                        "text-",
                        "bg-",
                      )}`}
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  Contact Us
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-64 space-y-3 rounded-xl border bg-white shadow-2xl"
              >
                <a
                  href="tel:+64223146756"
                  className="flex items-center justify-between rounded-lg border px-3 py-2 transition hover:bg-blue-50"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Phone className="h-4 w-4" />
                    Call us
                  </span>
                </a>

                <a
                  href="mailto:waikato.navtrust@outlook.com"
                  className="flex items-center justify-between rounded-lg border px-3 py-2 transition hover:bg-purple-50"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Mail className="h-4 w-4" />
                    Email us
                  </span>
                </a>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}