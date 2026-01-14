import { useEffect, useMemo, useState } from "react";
import { Trash2, RefreshCw } from "lucide-react";

import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";

import { AdminRegistrationsApi } from "./API/registrations";
import type { AdminWorkshopRegistration, WorkshopRegistrationStatus } from "./types";

function statusBadgeVariant(status: WorkshopRegistrationStatus) {
  if (status === "new") return "secondary";
  if (status === "contacted") return "outline";
  return "default";
}

function fmtDateTime(value: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default function WorkshopRegistrationsAdminPage() {
  const [rows, setRows] = useState<AdminWorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<WorkshopRegistrationStatus | "all">("all");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AdminRegistrationsApi.list();
      setRows(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to load registrations");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesStatus = statusFilter === "all" ? true : r.status === statusFilter;
      const matchesQuery =
        !q ||
        r.full_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.phone ?? "").toLowerCase().includes(q) ||
        (r.workshop_title ?? "").toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [rows, query, statusFilter]);

  const updateStatus = async (id: number, status: WorkshopRegistrationStatus) => {
    try {
      await AdminRegistrationsApi.updateStatus(id, status);
      // refresh list or update locally
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    }
  };

  const remove = async (id: number) => {
    const ok = confirm("Delete this registration?");
    if (!ok) return;

    try {
      await AdminRegistrationsApi.remove(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-2xl">Workshop Registrations</CardTitle>
              <p className="mt-1 text-sm text-gray-600">
                View, update status, and delete registrations.
              </p>
            </div>

            <Button variant="outline" onClick={load} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="grid gap-3 md:grid-cols-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, phone, workshop..."
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>

              <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                Showing <span className="font-semibold">{filtered.length}</span> of{" "}
                <span className="font-semibold">{rows.length}</span>
              </div>
            </div>

            {/* States */}
            {loading ? (
              <div className="grid gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">
                No registrations found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-slate-700">
                      <th className="px-4 py-3">Person</th>
                      <th className="px-4 py-3">Workshop</th>
                      <th className="px-4 py-3">Submitted</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id} className="border-t border-slate-200">
                        <td className="px-4 py-3 align-top">
                          <div className="font-semibold text-slate-900">{r.full_name}</div>
                          <div className="text-slate-700">{r.email}</div>
                          {r.phone ? <div className="text-slate-700">{r.phone}</div> : null}
                          {r.notes ? (
                            <div className="mt-2 text-slate-600">
                              <span className="font-medium">Notes:</span> {r.notes}
                            </div>
                          ) : null}
                        </td>

                        <td className="px-4 py-3 align-top">
                          <div className="font-semibold text-slate-900">{r.workshop_title ?? "—"}</div>
                          <div className="text-slate-600">
                            {fmtDateTime(r.start_at)} – {fmtDateTime(r.end_at)}
                          </div>
                        </td>

                        <td className="px-4 py-3 align-top text-slate-700">
                          {fmtDateTime(r.created_at)}
                        </td>

                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-2">
                            <Badge variant={statusBadgeVariant(r.status)}>{r.status}</Badge>

                            <select
                              value={r.status}
                              onChange={(e) =>
                                updateStatus(r.id, e.target.value as WorkshopRegistrationStatus)
                              }
                              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm"
                            >
                              <option value="new">new</option>
                              <option value="contacted">contacted</option>
                              <option value="closed">closed</option>
                            </select>
                          </div>
                        </td>

                        <td className="px-4 py-3 align-top">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => remove(r.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}