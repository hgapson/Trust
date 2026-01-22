import { useEffect, useMemo, useState } from "react"
import { FileText, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { AdminWorkshopsApi } from "../API/workshops"
import type { Workshop } from "../../services/types"

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

const toInputDateTime = (value: string | null | undefined) => {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""

  const pad = (n: number) => String(n).padStart(2, "0")
  return [
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  ].join("T")
}

const toDbDateTime = (value: string) => {
  if (!value) return ""
  const [date, time = "00:00"] = value.split("T")
  return `${date} ${time}:00`
}

const fmtDateTime = (value: string | null | undefined) => {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString()
}

export default function AdminWorkshopsPage() {
  const [rows, setRows] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState("")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminWorkshopsApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load workshops")
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
        (r.description ?? "").toLowerCase().includes(q) ||
        (r.location ?? "").toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setStartAt("")
    setEndAt("")
    setLocation("")
    setCapacity("")
    setEditingId(null)
  }

  const startEdit = (row: Workshop) => {
    setEditingId(row.id)
    setTitle(row.title)
    setDescription(row.description ?? "")
    setStartAt(toInputDateTime(row.start_at))
    setEndAt(toInputDateTime(row.end_at))
    setLocation(row.location ?? "")
    setCapacity(row.capacity ? String(row.capacity) : "")
  }

  const upsert = async () => {
    if (!title.trim() || !startAt.trim() || !endAt.trim()) {
      alert("Please fill Title, Start Time, and End Time.")
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      start_at: toDbDateTime(startAt.trim()),
      end_at: toDbDateTime(endAt.trim()),
      location: location.trim() || null,
      capacity: capacity.trim() ? toInt(capacity, 0) : null,
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminWorkshopsApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminWorkshopsApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save workshop")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this workshop?")) return
    try {
      await AdminWorkshopsApi.remove(id)
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
            <h1 className="text-3xl font-semibold">Workshops</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Create and manage workshop sessions shown on the Services page.
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
            {editingId ? "Edit Workshop" : "Add a Workshop"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Use date/time for each workshop session.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Title *</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Resume Writing Workshop"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Location</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Hamilton (Navigate Trust Office)"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Short description shown on the workshop details."
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Start Time *</span>
              <input
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">End Time *</span>
              <input
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Capacity</span>
              <input
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="20"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={upsert} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Workshop" : "Add Workshop"}
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
            <CardTitle className="text-2xl">Current Workshops</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, description, location..."
              className="w-full max-w-sm rounded-md border border-slate-200 px-3 py-2"
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-base font-semibold text-slate-900">
                      {r.title}
                    </div>
                    {r.description ? (
                      <div className="text-sm text-slate-600">{r.description}</div>
                    ) : null}
                    {r.location ? (
                      <div className="text-sm text-slate-600">{r.location}</div>
                    ) : null}
                    <div className="text-xs text-slate-500">
                      {fmtDateTime(r.start_at)} – {fmtDateTime(r.end_at)}
                    </div>
                    {r.capacity ? (
                      <div className="text-xs text-slate-500">
                        Capacity: {r.capacity}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={() => startEdit(r)} className="gap-2">
                      <FileText className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => remove(r.id)}
                      className="gap-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              {!filtered.length ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  No workshops found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
