export type WorkshopRegistrationStatus = "new" | "contacted" | "closed";

export type AdminWorkshopRegistration = {
  id: number;
  workshop_id: number;
  workshop_title: string | null;
  start_at: string | null;
  end_at: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  status: WorkshopRegistrationStatus;
  created_at: string;
};
export type SupportWayRow = {
  id: number
  title: string
  description: string
  icon_key: string
  color: string
  bg_color: string
  sort_order: number
  created_at?: string
}