import { useEffect, useMemo, useState } from "react"
import {
  Award,
  BookOpen,
  Briefcase,
  Building,
  FileText,
  GraduationCap,
  Heart,
  HelpingHand,
  MapPin,
  RefreshCw,
  Rocket,
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
import { AdminServicesApi } from "../API/services"
import type { ServiceRow } from "../../home/types"

type IconKey =
  | "Heart"
  | "Wrench"
  | "Target"
  | "Briefcase"
  | "GraduationCap"
  | "BookOpen"
  | "Award"
  | "Shield"
  | "Star"
  | "Rocket"
  | "HelpingHand"
  | "Users"
  | "MapPin"
  | "Building"

const iconMap = {
  Heart,
  Wrench,
  Target,
  Briefcase,
  GraduationCap,
  BookOpen,
  Award,
  Shield,
  Star,
  Rocket,
  HelpingHand,
  Users,
  MapPin,
  Building,
} as const

const ICON_OPTIONS: Array<{ key: IconKey; label: string }> = [
  { key: "Heart", label: "Heart — Motivate" },
  { key: "Wrench", label: "Wrench — Equip" },
  { key: "Target", label: "Target — Achieve" },
  { key: "Briefcase", label: "Briefcase — Work / Career" },
  { key: "GraduationCap", label: "GraduationCap — Learning / Training" },
  { key: "BookOpen", label: "BookOpen — Skills / Education" },
  { key: "Award", label: "Award — Achievement" },
  { key: "Shield", label: "Shield — Safety / Trust" },
  { key: "Star", label: "Star — Excellence" },
  { key: "Rocket", label: "Rocket — Growth / Launch" },
  { key: "HelpingHand", label: "HelpingHand — Support" },
  { key: "Users", label: "Users — Community" },
  { key: "MapPin", label: "MapPin — Local Access" },
  { key: "Building", label: "Building — Employers" },
]

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

export default function AdminServicesPage() {
  const [rows, setRows] = useState<ServiceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState<IconKey | "">("")
  const [color, setColor] = useState("text-pink-600")
  const [bgColor, setBgColor] = useState("bg-pink-50")
  const [modalDetails, setModalDetails] = useState("")
  const [features, setFeatures] = useState("")
  const [modalSteps, setModalSteps] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminServicesApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load services")
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
        (r.icon ?? "").toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setIcon("")
    setColor("text-pink-600")
    setBgColor("bg-pink-50")
    setModalDetails("")
    setFeatures("")
    setModalSteps("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: ServiceRow) => {
    setEditingId(row.id)
    setTitle(row.title)
    setDescription(row.description)
    setIcon(row.icon as IconKey)
    setColor(row.color)
    setBgColor(row.bgColor)
    setModalDetails(row.modalDetails || "")
    setFeatures((row.features || []).join("\n"))
    setModalSteps((row.modalSteps || []).join("\n"))
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (!title.trim() || !description.trim() || !icon) {
      alert("Please fill Title, Description and Icon.")
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      icon,
      color: color.trim(),
      bgColor: bgColor.trim(),
      modalDetails: modalDetails.trim() || null,
      sort_order: toInt(sortOrder, 0),
      features: splitLines(features),
      modalSteps: splitLines(modalSteps),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminServicesApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminServicesApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save service")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this service?")) return
    try {
      await AdminServicesApi.remove(id)
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
            <h1 className="text-3xl font-semibold">How We Help</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the “How We Help You Succeed” cards on the home page.
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
            {editingId ? "Edit Service" : "Add a Service"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Use one service per card (Motivate, Equip, Achieve).
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
                placeholder="Motivate"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Icon</span>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value as IconKey)}
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
              placeholder="Card description shown on the home page."
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Modal Details</span>
            <textarea
              value={modalDetails}
              onChange={(e) => setModalDetails(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Shown inside the Learn More modal."
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Features (one per line)</span>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Feature line 1"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Modal Steps (one per line)</span>
              <textarea
                value={modalSteps}
                onChange={(e) => setModalSteps(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Step line 1"
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-medium">Text Color Class</span>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="text-pink-600"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Background Class</span>
              <input
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="bg-pink-50"
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
            <CardTitle className="text-2xl">Current Services</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, description, icon..."
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
                const Icon = iconMap[row.icon as IconKey] ?? Target
                return (
                  <div
                    key={row.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex flex-1 items-start gap-4">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${row.bgColor}`}>
                        <Icon className={`h-6 w-6 ${row.color}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-base font-semibold text-slate-900">
                          {row.title}
                        </div>
                        <div className="text-sm text-slate-600">
                          {row.description}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <Badge variant="secondary">{row.icon}</Badge>
                          <span>{row.color}</span>
                          <span>{row.bgColor}</span>
                          <span>Order: {row.sort_order}</span>
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
                  No services found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
