import { Briefcase, CalendarDays, Mail } from "lucide-react";
import { Input } from "../../ui/input";
import { motion } from "motion/react";

type Props = {
  search: string;
  setSearch: (v: string) => void;
};

export function JobsHero({ search, setSearch }: Props) {
  return (
    <section className="gradient-bg-services py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          className="space-y-6 text-center text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
  

          <h1 className="text-4xl lg:text-6xl">
            Find a role you feel confident stepping into
          </h1>

          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Browse trusted local roles and tell us which jobs you want help with.
          </p>

          <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Input
              placeholder="Search by title, company, or keywords"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              Updated daily
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              We respond within 24 hours
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}