import { useEffect, useMemo, useState } from "react"
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  FileText,
  Globe,
  GraduationCap,
  HandHeart,
  Heart,
  HelpingHand,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Shield,
  Star,
  Target,
  Trash2,
  Users,
  Wrench,
} from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Badge } from "../../../ui/badge"
import { AdminAdditionalServicesApi } from "../API/additionalServices"
import type { AdditionalService } from "../../services/types"

type IconKey =
  | "BookOpen"
  | "CheckCircle"
  | "Users"
  | "MapPin"
  | "Heart"
  | "Shield"
  | "Star"
  | "Target"
  | "Briefcase"
  | "GraduationCap"
  | "HelpingHand"
  | "HandHeart"
  | "Globe"
  | "Wrench"
  | "Award"
  | "Mail"
  | "Phone"
  | "MessageSquare"

const iconMap = {
  BookOpen,
  CheckCircle,
  Users,
  MapPin,
  Heart,
  Shield,
  Star,
  Target,
  Briefcase,
  GraduationCap,
  HelpingHand,
  HandHeart,
  Globe,
  Wrench,
  Award,
  Mail,
  Phone,
  MessageSquare,
} as const

const ICON_OPTIONS: Array<{ key: IconKey; label: string }> = [
  { key: "BookOpen", label: "BookOpen — Language Support" },
  { key: "CheckCircle", label: "CheckCircle — Legal Assistance" },
  { key: "Users", label: "Users — Childcare Support" },
  { key: "MapPin", label: "MapPin — Transportation" },
  { key: "Heart", label: "Heart — Care" },
  { key: "Shield", label: "Shield — Safety" },
  { key: "Star", label: "Star — Quality" },
  { key: "Target", label: "Target — Focus" },
  { key: "Briefcase", label: "Briefcase — Employment" },
  { key: "GraduationCap", label: "GraduationCap — Training" },
  { key: "HelpingHand", label: "HelpingHand — Assistance" },
  { key: "HandHeart", label: "HandHeart — Support" },
  { key: "Globe", label: "Globe — Outreach" },
  { key: "Wrench", label: "Wrench — Skills" },
  { key: "Award", label: "Award — Achievement" },
  { key: "Mail", label: "Mail — Email" },
  { key: "Phone", label: "Phone — Phone" },
  { key: "MessageSquare", label: "MessageSquare — Messaging" },
]

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminAdditionalServicesPage() {
  const [rows, setRows] = useState<AdditionalService[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [iconKey, setIconKey] = useState<IconKey | "">("")
  const [sessions, setSessions] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminAdditionalServicesApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load additional services")
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.icon_key ?? "").toLowerCase().includes(q) ||
        r.sessions.toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setIconKey("")
    setSessions("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: AdditionalService) => {
    setEditingId(row.id)
    setTitle(row.title)
    setDescription(row.description)
    setIconKey(row.icon_key as IconKey)
    setSessions(row.sessions)
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (!title.trim() || !description.trim() || !iconKey || !sessions.trim()) {
      alert("Please fill Title, Description, Icon and Sessions.")
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      icon_key: iconKey,
      sessions: sessions.trim(),
      sort_order: toInt(sortOrder, 0),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminAdditionalServicesApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminAdditionalServicesApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save additional service")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this additional service?")) return
    try {
      await AdminAdditionalServicesApi.remove(id)
      setRows((prev) => prev.filter((r) => r.id !== id))
    } catch (e) {
      console.error(e)
      alert("Failed to delete")
    }
  }

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Additional Support Services</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the additional support services shown on the Services page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              Total <span className="ml-2 text-lg font-semibold">{rows.length}</span>
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

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            {editingId ? "Edit Support Service" : "Add a Support Service"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Keep sessions short (ex: "By appointment", "3x per week").
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Language Support"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Icon</span>
              <select
                value={iconKey}
                onChange={(e) => setIconKey(e.target.value as IconKey)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              >
                <option value="">Select an icon</option>
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Short description shown on the card."
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Sessions</span>
              <input
                value={sessions}
                onChange={(e) => setSessions(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="3x per week"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Sort Order</span>
              <input
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="0"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={upsert} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Service" : "Add Service"}
            </Button>
            {editingId ? (
              <Button variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-2xl">Current Additional Services</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, description, sessions..."
              className="w-full max-w-sm rounded-md border border-slate-200 px-3 py-2"
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((row) => {
                const Icon = iconMap[row.icon_key as IconKey] ?? Users
                return (
                  <div
                    key={row.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex flex-1 items-start gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-base font-semibold text-slate-900">
                          {row.title}
                        </div>
                        <div className="text-sm text-slate-600">
                          {row.description}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <Badge variant="secondary">{row.icon_key}</Badge>
                          <span>{row.sessions}</span>
                          <span>Order: {row.sort_order ?? 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" onClick={() => startEdit(row)} className="gap-2">
                        <FileText className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => remove(row.id)}
                        className="gap-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              })}
              {!filtered.length ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  No additional services found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
