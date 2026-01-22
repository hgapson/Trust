import { useEffect, useMemo, useState } from "react"
import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Heart,
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
import { AdminDetailedServicesApi } from "../API/detailedServices"
import type { DetailedServiceRow } from "../../services/types"

type IconKey =
  | "Heart"
  | "Wrench"
  | "Target"
  | "Briefcase"
  | "BookOpen"
  | "Award"
  | "Shield"
  | "Star"
  | "Rocket"
  | "Users"
  | "MapPin"

const iconMap = {
  Heart,
  Wrench,
  Target,
  Briefcase,
  BookOpen,
  Award,
  Shield,
  Star,
  Rocket,
  Users,
  MapPin,
} as const

const ICON_OPTIONS: Array<{ key: IconKey; label: string }> = [
  { key: "Heart", label: "Heart — Motivate" },
  { key: "Wrench", label: "Wrench — Equip" },
  { key: "Target", label: "Target — Achieve" },
  { key: "Briefcase", label: "Briefcase — Work / Career" },
  { key: "BookOpen", label: "BookOpen — Learning" },
  { key: "Award", label: "Award — Achievement" },
  { key: "Shield", label: "Shield — Trust" },
  { key: "Star", label: "Star — Excellence" },
  { key: "Rocket", label: "Rocket — Growth" },
  { key: "Users", label: "Users — Community" },
  { key: "MapPin", label: "MapPin — Location" },
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

export default function AdminDetailedServicesPage() {
  const [rows, setRows] = useState<DetailedServiceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  // form
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [icon, setIcon] = useState<IconKey | "">("")
  const [color, setColor] = useState("text-blue-600")
  const [bgColor, setBgColor] = useState("bg-blue-100")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [features, setFeatures] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminDetailedServicesApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load detailed services")
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
        (r.icon ?? "").toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setId("")
    setTitle("")
    setIcon("")
    setColor("text-blue-600")
    setBgColor("bg-blue-100")
    setImageUrl("")
    setDescription("")
    setFeatures("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: DetailedServiceRow) => {
    setEditingId(row.id)
    setId(row.id)
    setTitle(row.title)
    setIcon(row.icon as IconKey)
    setColor(row.color)
    setBgColor(row.bgColor)
    setImageUrl(row.image)
    setDescription(row.description)
    setFeatures((row.features || []).join("\n"))
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (!id.trim() || !title.trim() || !icon || !imageUrl.trim() || !description.trim()) {
      alert("Please fill ID, Title, Icon, Image URL, and Description.")
      return
    }

    const payload = {
      id: id.trim(),
      title: title.trim(),
      icon,
      color: color.trim(),
      bg_color: bgColor.trim(),
      image_url: imageUrl.trim(),
      description: description.trim(),
      sort_order: toInt(sortOrder, 0),
      features: splitLines(features),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminDetailedServicesApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminDetailedServicesApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save detailed service")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (serviceId: string) => {
    if (!confirm("Delete this detailed service?")) return
    try {
      await AdminDetailedServicesApi.remove(serviceId)
      setRows((prev) => prev.filter((r) => r.id !== serviceId))
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
            <h1 className="text-3xl font-semibold">Detailed Services</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the detailed services shown on the Services page.
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
            {editingId ? "Edit Detailed Service" : "Add a Detailed Service"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            ID must be unique (used in URLs, e.g. motivate, equip).
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-medium">ID</span>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="motivate"
                disabled={Boolean(editingId)}
              />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className="text-sm font-medium">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Motivate - Building Foundations"
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
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
            <label className="space-y-2">
              <span className="text-sm font-medium">Text Color Class</span>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="text-blue-600"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Background Class</span>
              <input
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="bg-blue-100"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Image URL</span>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="https://..."
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Short summary shown on the section."
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Features (one per line)</span>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={5}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Feature line 1"
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

          <div className="flex flex-wrap gap-2">
            <Button onClick={upsert} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Detailed Service" : "Add Detailed Service"}
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
            <CardTitle className="text-2xl">Current Detailed Services</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search id, title, description..."
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
                          <Badge variant="secondary">{row.id}</Badge>
                          <span>{row.icon}</span>
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
                  No detailed services found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
