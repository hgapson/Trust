import { useEffect, useMemo, useState } from "react";
import { WorkshopScheduleSection } from "./WorkshopScheduleSection";
import { WorkshopRegisterModal } from "./WorkshopRegisterModal";
import { WorkshopsApi } from "../api/workshops";
import type { Workshop } from "../types";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selected, setSelected] = useState<Workshop | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    WorkshopsApi.listUpcoming()
      .then((data) => setWorkshops(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const schedule = useMemo(() => {
    return workshops.map((w) => {
      const start = new Date(w.start_at);
      const end = new Date(w.end_at);

      const day = start.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const time = `${start.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })} - ${end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}`;

      return {
        day,
        title: w.title,
        time,
        location: w.location ?? undefined,
        _workshop: w,
      };
    });
  }, [workshops]);

  return (
    <>
      <WorkshopScheduleSection
        schedule={schedule}
        onRegister={(w) => {
          setSelected(w);
          setOpen(true);
        }}
      />

      <WorkshopRegisterModal open={open} onOpenChange={setOpen} workshop={selected} />
    </>
  );
}