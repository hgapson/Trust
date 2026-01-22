import { useEffect, useMemo, useState } from "react"
import { FileText, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Badge } from "../../../ui/badge"
import { AdminOfficeInfoApi } from "../API/officeInfo"
import type { OfficeInfoRow } from "../../contact/types"

type IconKey = OfficeInfoRow["icon_key"]

const ICON_OPTIONS: Array<{ key: IconKey; label: string }> = [
  { key: "MapPin", label: "MapPin" },
  { key: "Clock", label: "Clock" },
  { key: "Car", label: "Car" },
  { key: "Accessibility", label: "Accessibility" },
]

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminOfficeInfoPage() {
  const [rows, setRows] = useState<OfficeInfoRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [iconKey, setIconKey] = useState<IconKey | "">("")
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [extra, setExtra] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminOfficeInfoApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load office info")
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
        r.details.toLowerCase().includes(q) ||
        (r.extra ?? "").toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setIconKey("")
    setTitle("")
    setDetails("")
    setExtra("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: OfficeInfoRow) => {
    setEditingId(row.id)
    setIconKey(row.icon_key)
    setTitle(row.title)
    setDetails(row.details)
    setExtra(row.extra ?? "")
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (!iconKey || !title.trim() || !details.trim()) {
      alert("Please fill Icon, Title, and Details.")
      return
    }

    const payload = {
      icon_key: iconKey,
      title: title.trim(),
      details: details.trim(),
      extra: extra.trim() || null,
      sort_order: toInt(sortOrder, 0),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminOfficeInfoApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminOfficeInfoApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save office info")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this office info?")) return
    try {
      await AdminOfficeInfoApi.remove(id)
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
            <h1 className="text-3xl font-semibold">Office Info</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the “Visit Our Office” items on the Contact page.
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
            {editingId ? "Edit Office Info" : "Add Office Info"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Icon *</span>
              <select
                value={iconKey}
                onChange={(e) => setIconKey(e.target.value as IconKey)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              >
                <option value="">Select icon</option>
                {ICON_OPTIONS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Title *</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Main Office"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Details *</span>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="46G Boundary Road, Claudelands, Hamilton 3200, New Zealand"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Extra</span>
            <textarea
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Located inside Settlement center building"
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
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
              {saving ? "Saving..." : editingId ? "Update Office Info" : "Add Office Info"}
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
            <CardTitle className="text-2xl">Current Office Info</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, details, extra..."
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
              {filtered.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-base font-semibold text-slate-900">
                      {row.title}
                    </div>
                    <div className="text-sm text-slate-600">{row.details}</div>
                    {row.extra ? (
                      <div className="text-sm text-slate-600">{row.extra}</div>
                    ) : null}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <Badge variant="secondary">{row.icon_key}</Badge>
                      <span>Order: {row.sort_order ?? 0}</span>
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
              ))}
              {!filtered.length ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  No office info found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
