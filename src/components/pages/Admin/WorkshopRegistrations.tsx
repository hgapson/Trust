import { useEffect, useMemo, useState } from "react";
import { Trash2, RefreshCw } from "lucide-react";

import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";

import { AdminRegistrationsApi } from "./API/registrations";
import type {
  AdminWorkshopRegistration,
  WorkshopRegistrationStatus,
} from "./types";

/* ---------- Helpers ---------- */

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

/* ---------- Page ---------- */

export default function WorkshopRegistrationsAdminPage() {
  const [rows, setRows] = useState<AdminWorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<WorkshopRegistrationStatus | "all">("all");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AdminRegistrationsApi.list();
      setRows(Array.isArray(data) ? data : []);
    } catch (e: any) {
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
      const matchesStatus =
        statusFilter === "all" ? true : r.status === statusFilter;

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
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this registration?")) return;

    try {
      await AdminRegistrationsApi.remove(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <section className="space-y-8">

      {/* Hero */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
          
            <h1 className="mt-3 text-3xl font-semibold">
              Workshops Registrations
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Monitor registrations, update statuses, and manage follow-ups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              Total{" "}
              <span className="ml-2 text-lg font-semibold">
                {rows.length}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={load}
              className="gap-2 hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <Card className="shadow-xl">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl">
              Manage entries
            </CardTitle>
            <p className="mt-1 text-sm text-slate-400">
              View, update, and delete registrations.
            </p>
          </div>

        </CardHeader>

        <CardContent className="space-y-4">
          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error} Check that the API server is running and reachable.
            </div>
          ) : null}

          {/* Filters */}
          <div className="grid gap-3 md:grid-cols-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone, workshop..."
              className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100"
            >
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>

            <div className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300">
              Showing{" "}
              <span className="font-semibold">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {rows.length}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-950 text-xs uppercase tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Person</th>
                  <th className="px-4 py-3">Workshop</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {!loading && filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-slate-400"
                    >
                      No registrations found.
                    </td>
                  </tr>
                ) : null}
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-white/10 transition hover:bg-white/5"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold text-white">{r.full_name}</div>
                      <div className="text-slate-400">{r.email}</div>
                      {r.phone && (
                        <div className="text-slate-400">{r.phone}</div>
                      )}
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold text-white">
                        {r.workshop_title ?? "—"}
                      </div>
                      <div className="text-slate-400">
                        {fmtDateTime(r.start_at)} – {fmtDateTime(r.end_at)}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-400">
                      {fmtDateTime(r.created_at)}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={statusBadgeVariant(r.status)}>
                          {r.status}
                        </Badge>

                        <select
                          value={r.status}
                          onChange={(e) =>
                            updateStatus(
                              r.id,
                              e.target.value as WorkshopRegistrationStatus
                            )
                          }
                          className="rounded-md border border-white/10 bg-slate-950 px-2 py-1 text-sm text-slate-100"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="closed">closed</option>
                        </select>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-white/15 text-slate-200 hover:bg-red-500/10 hover:text-red-400"
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
        </CardContent>
      </Card>
    </section>
  );
}
