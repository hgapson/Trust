import { motion } from "motion/react";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Clock, MapPin } from "lucide-react";
import type { UpcomingEvent } from "./data";

interface UpcomingEventsSectionProps {
  events: UpcomingEvent[];
}

export function UpcomingEventsSection({
  events,
}: UpcomingEventsSectionProps) {
  return (
    <section className="py-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">Upcoming Events</h2>
        <p className="text-xl text-gray-600">
          Join us at our upcoming community events
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {events.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <span className="inline-block w-fit rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                  {event.date}
                </span>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600">{event.description}</p>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
