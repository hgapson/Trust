import type { AdminWorkshopRegistration, WorkshopRegistrationStatus } from "../types";

const BASE_URL = "";

export const AdminRegistrationsApi = {
  async list(): Promise<AdminWorkshopRegistration[]> {
    const res = await fetch(`${BASE_URL}/api/admin/workshop-registrations`);
    if (!res.ok) throw new Error("Failed to load registrations");
    return res.json();
  },

  async updateStatus(id: number, status: WorkshopRegistrationStatus) {
    const res = await fetch(`${BASE_URL}/api/admin/workshop-registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },

  async remove(id: number) {
    const res = await fetch(`${BASE_URL}/api/admin/workshop-registrations/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete registration");
  },
};