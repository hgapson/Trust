import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Phone } from "lucide-react";

interface EmergencyContactSectionProps {
  phone: string;
  description: string;
  availability: string;
}

export function EmergencyContactSection({
  phone,
  description,
  availability,
}: EmergencyContactSectionProps) {
  return (
    <section className="py-20">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-red-700">
              <Phone className="h-5 w-5" />
              Emergency Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-600">{description}</p>
            <div className="text-2xl text-red-700">{phone}</div>
            <p className="text-sm text-red-600">{availability}</p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
