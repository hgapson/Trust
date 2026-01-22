import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";

import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { useContactMethodLinks } from "../contact/contactMethods";

export function GetInvolvedCtaSection() {
  const { phoneHref, emailHref } = useContactMethodLinks();

  return (
    <section className="py-20 text-center">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl">Ready to Make an Impact?</h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Whether you volunteeror partner with us, your contribution
          creates meaningful change in the lives of migrants and former refugees
          in our community.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                disabled={!phoneHref && !emailHref}
              >
                Contact Us
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
        </div>
      </motion.div>
    </section>
  );
}
