import { useEffect, useMemo, useState } from "react"
import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Heart,
  MapPin,
  RefreshCw,
  Rocket,
  Shield,
  Star,
  Target,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Badge } from "../../../ui/badge"
import { AdminApproachStepsApi } from "../API/approachSteps"
import type { ApproachStep } from "../../home/types"

type IconKey =
  | "UserCheck"
  | "FileText"
  | "Award"
  | "Rocket"
  | "Heart"
  | "Target"
  | "Briefcase"
  | "GraduationCap"
  | "BookOpen"
  | "Shield"
  | "Star"
  | "Users"
  | "MapPin"

const iconMap = {
  UserCheck,
  FileText,
  Award,
  Rocket,
  Heart,
  Target,
  Briefcase,
  GraduationCap,
  BookOpen,
  Shield,
  Star,
  Users,
  MapPin,
} as const

const ICON_OPTIONS: Array<{ key: IconKey; label: string }> = [
  { key: "UserCheck", label: "UserCheck — Assessment" },
  { key: "FileText", label: "FileText — Skills Development" },
  { key: "Award", label: "Award — Career Matching" },
  { key: "Rocket", label: "Rocket — Ongoing Support" },
  { key: "Heart", label: "Heart — Care / Support" },
  { key: "Target", label: "Target — Goals" },
  { key: "Briefcase", label: "Briefcase — Employment" },
  { key: "GraduationCap", label: "GraduationCap — Learning" },
  { key: "BookOpen", label: "BookOpen — Training" },
  { key: "Shield", label: "Shield — Trust" },
  { key: "Star", label: "Star — Excellence" },
  { key: "Users", label: "Users — Community" },
  { key: "MapPin", label: "MapPin — Local Support" },
]

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminProcessStepsPage() {
  const [rows, setRows] = useState<ApproachStep[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState<IconKey | "">("")
  const [step, setStep] = useState("01")
  const [sortOrder, setSortOrder] = useState("1")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminApproachStepsApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load approach steps")
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
    setStep("01")
    setSortOrder("1")
    setEditingId(null)
  }

  const startEdit = (row: ApproachStep) => {
    setEditingId(row.id)
    setTitle(row.title)
    setDescription(row.description)
    setIcon(row.icon as IconKey)
    setStep(row.step)
    setSortOrder(String(row.sort_order ?? 1))
  }

  const upsert = async () => {
    if (!title.trim() || !description.trim() || !icon || !step.trim()) {
      alert("Please fill Title, Description, Icon and Step.")
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      icon,
      step: step.trim(),
      sort_order: toInt(sortOrder, 1),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminApproachStepsApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminApproachStepsApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save approach step")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this approach step?")) return
    try {
      await AdminApproachStepsApi.remove(id)
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
            <h1 className="text-3xl font-semibold">Our Approach</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the approach steps shown on the home page.
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
            {editingId ? "Edit Step" : "Add an Approach Step"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Keep step numbers like 01, 02, 03 for the UI badges.
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
                placeholder="Initial Assessment"
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
              placeholder="Short description shown on the home page."
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Step Label</span>
              <input
                value={step}
                onChange={(e) => setStep(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="01"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Sort Order</span>
              <input
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="1"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={upsert} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Step" : "Add Step"}
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
            <CardTitle className="text-2xl">Current Steps</CardTitle>
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
                const Icon = iconMap[row.icon as IconKey] ?? UserCheck
                return (
                  <div
                    key={row.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex flex-1 items-start gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                        <Icon className="h-6 w-6 text-slate-700" />
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
                          <span>Step: {row.step}</span>
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
                  No steps found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
