import { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  RefreshCw,
  Users,
  Heart,
  Handshake,
  Gift,
  Building,
  Clock,
  Star,
  Globe,
  BookOpen,
  Briefcase,
  Award,
  Shield,
  HelpingHand,
  Target,
  MapPin,
  MessageSquare,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";

import { AdminSupportWaysApi } from "../API/supportWays";

/* -------------------------------- Types -------------------------------- */

export type SupportWayRow = {
  id: number;
  title: string;
  description: string;
  icon_key: string;
  color?: string | null;
  bg_color?: string | null;
  sort_order?: number | null;
  created_at?: string | null;
};

export type CreateSupportWayPayload = {
  title: string;
  description: string;
  icon_key: string;
  color: string;
  bg_color: string;
  sort_order: number;
};

/* ----------------------------- Icon Mapping ----------------------------- */
/** IMPORTANT: icon_key in DB must match these keys exactly */
const iconMap = {
  Users,
  Heart,
  Handshake,
  Gift,
  Building,
  Clock,
  Star,
  Globe,
  BookOpen,
  Briefcase,
  Award,
  Shield,
  HelpingHand,
  Target,
  MapPin,
  MessageSquare,
  Mail,
  Phone,
} as const;

type IconKey = keyof typeof iconMap;

/** Friendly labels shown in dropdown */
const ICON_OPTIONS: Array<{ key: IconKey; label: string }> = [
  { key: "Users", label: "Users — People / Community" },
  { key: "Heart", label: "Heart — Care / Support" },
  { key: "Handshake", label: "Handshake — Partnership" },
  { key: "Gift", label: "Gift — Donations / Resources" },
  { key: "Building", label: "Building — Organisation" },

  { key: "Briefcase", label: "Briefcase — Employment / Work" },
  { key: "BookOpen", label: "BookOpen — Learning / Education" },
  { key: "Award", label: "Award — Achievement" },
  { key: "Shield", label: "Shield — Safety / Trust" },
  { key: "HelpingHand", label: "HelpingHand — Assistance" },

  { key: "Target", label: "Target — Goals / Outcomes" },
  { key: "Globe", label: "Globe — Outreach / Awareness" },
  { key: "MapPin", label: "MapPin — Location / Access" },

  { key: "Clock", label: "Clock — Time / Commitment" },
  { key: "Star", label: "Star — Skills / Quality" },

  { key: "Mail", label: "Mail — Email / Contact" },
  { key: "Phone", label: "Phone — Phone / Contact" },
  { key: "MessageSquare", label: "MessageSquare — Messages" },
];

/* ------------------------------ Small Helpers ------------------------------ */

function toInt(value: string, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export default function SupportWaysAdminPage() {
  const [rows, setRows] = useState<SupportWayRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconKey, setIconKey] = useState<IconKey | "">("");
  const [color, setColor] = useState("text-blue-600");
  const [bgColor, setBgColor] = useState("bg-blue-100");
  const [sortOrder, setSortOrder] = useState("0");

  // filters
  const [query, setQuery] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AdminSupportWaysApi.list();
      setRows(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to load Support Ways");
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
    if (!q) return rows;
    return rows.filter((r) => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.icon_key ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, query]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIconKey("");
    setColor("text-blue-600");
    setBgColor("bg-blue-100");
    setSortOrder("0");
    setEditingId(null);
  };

  const startEdit = (row: SupportWayRow) => {
    setEditingId(row.id);
    setTitle(row.title);
    setDescription(row.description);
    setIconKey(row.icon_key as IconKey);
    setColor(row.color ?? "text-blue-600");
    setBgColor(row.bg_color ?? "bg-blue-100");
    setSortOrder(String(row.sort_order ?? 0));
  };

  const upsert = async () => {
    if (!title.trim() || !description.trim() || !iconKey) {
      alert("Please fill Title, Description and Icon.");
      return;
    }

    const payload: CreateSupportWayPayload = {
      title: title.trim(),
      description: description.trim(),
      icon_key: iconKey,
      color: color.trim(),
      bg_color: bgColor.trim(),
      sort_order: toInt(sortOrder, 0),
    };

    try {
      setSaving(true);
      setError(null);

      if (editingId) {
        const updated = await AdminSupportWaysApi.update(editingId, payload);
        setRows((prev) =>
          prev.map((row) => (row.id === updated.id ? updated : row))
        );
      } else {
        const created = await AdminSupportWaysApi.create(payload);
        if (created && typeof created === "object") {
          setRows((prev) => [...prev, created as SupportWayRow]);
        } else {
          await load();
        }
      }

      resetForm();
    } catch (e) {
      console.error(e);
      alert("Failed to save Support Way");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this Support Way?")) return;
    try {
      await AdminSupportWaysApi.remove(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  };

  const PreviewIcon = iconKey ? iconMap[iconKey] : null;

  return (
    <section className="space-y-8">
      {/* Hero */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Support Ways</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the “More Ways to Support” cards shown on the Get Involved page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              Total{" "}
              <span className="ml-2 text-lg font-semibold">{rows.length}</span>
            </div>

            <Button
              variant="outline"
              onClick={load}
              className="gap-2 border-white/15  hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Create */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            {editingId ? "Edit Support Way" : "Add a Support Way"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Fill in details. The icon is selected from a safe list (no typos).
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='e.g. "Spread the Word"'
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm
                           focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Icon *</label>

              <div className="flex items-center gap-3">
                <select
                  value={iconKey}
                  onChange={(e) => setIconKey(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm
                             focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                >
                  <option value="">Select icon</option>
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what the supporter can do and why it matters…"
                className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm
                           focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            {/* Color */}
            {/* Sort order */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Sort order</label>
              <input
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                placeholder="0"
                inputMode="numeric"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm
                           focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>

            {/* Actions */}
            <div className="flex items-end gap-3 lg:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                {editingId ? "Cancel Edit" : "Reset"}
              </Button>

              <Button
                type="button"
                onClick={upsert}
                disabled={saving}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                {saving ? "Saving..." : editingId ? "Update Support Way" : "Add Support Way"}
              </Button>
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* List + Search */}
      <Card className="shadow-xl">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl">Existing Support Ways</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Search, review, and delete items.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, description, icon…"
              className="w-[280px] max-w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm
                         focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            <Badge variant="secondary">{filtered.length}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="grid gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600">
              No support ways found.
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((r) => {
                const Icon = iconMap[r.icon_key as IconKey];
                const colorClass = r.color ?? "text-slate-700";
                const bgClass = r.bg_color ?? "bg-slate-100";
                return (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bgClass}`}>
                          {Icon ? (
                            <Icon className={`h-6 w-6 ${colorClass}`} />
                          ) : (
                            <span className="text-xs text-slate-400">?</span>
                          )}
                        </div>

                        <div>
                          <div className="text-lg font-semibold text-slate-900">
                            {r.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600">
                            {r.description}
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-1">
                              {r.icon_key}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2 py-1">
                              Order {r.sort_order ?? 0}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2 py-1">
                              {r.created_at
                                ? new Date(r.created_at).toLocaleString()
                                : "—"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="rounded-full bg-slate-100 px-2 py-1">
                            {r.color ?? "text-slate-700"}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-1">
                            {r.bg_color ?? "bg-slate-100"}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                          onClick={() => startEdit(r)}
                        >
                          <FileText className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-red-50 hover:text-red-700"
                          onClick={() => remove(r.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
