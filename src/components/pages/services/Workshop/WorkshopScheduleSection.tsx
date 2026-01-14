import { motion } from "motion/react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardTitle } from "../../../ui/card";
import { Clock, MapPin } from "lucide-react";
import type { Workshop } from "../types";

type ScheduleItem = {
  day: string;
  title: string;
  time: string;
  location?: string;
  _workshop: Workshop;
};

interface WorkshopScheduleSectionProps {
  schedule: ScheduleItem[];
  onRegister: (workshop: Workshop) => void;
}

export function WorkshopScheduleSection({
  schedule,
  onRegister,
}: WorkshopScheduleSectionProps) {
  return (
    <section className="py-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">Workshop Schedule</h2>
        <p className="text-xl text-gray-600">
          Register for upcoming workshops (date-based)
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl gap-4">
        {schedule.map((workshop, index) => (
          <motion.div
            key={`${workshop._workshop.id}-${workshop.title}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                      {workshop.day}
                    </div>

                    <div>
                      <CardTitle className="text-lg">{workshop.title}</CardTitle>

                      <p className="mt-1 flex items-center gap-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        {workshop.time}
                      </p>

                      {workshop.location ? (
                        <p className="mt-1 flex items-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {workshop.location}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRegister(workshop._workshop)}
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}