import { useEffect, useMemo, useState } from "react"
import { FileText, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { AdminVolunteerOpportunitiesApi } from "../API/volunteerOpportunities"
import type { VolunteerOpportunityRow } from "../../get-involved/types"

const DEFAULT_ICON = "Users"
const DEFAULT_COLOR = "text-blue-600"
const DEFAULT_BG = "bg-blue-100"

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminVolunteersPage() {
  const [rows, setRows] = useState<VolunteerOpportunityRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [commitment, setCommitment] = useState("")
  const [skills, setSkills] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminVolunteerOpportunitiesApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load volunteer opportunities")
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
        r.commitment.toLowerCase().includes(q) ||
        r.skills.toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setCommitment("")
    setSkills("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: VolunteerOpportunityRow) => {
    setEditingId(row.id)
    setTitle(row.title)
    setDescription(row.description)
    setCommitment(row.commitment)
    setSkills(row.skills)
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !commitment.trim() ||
      !skills.trim()
    ) {
      alert("Please fill all fields.")
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      commitment: commitment.trim(),
      skills: skills.trim(),
      icon_key: DEFAULT_ICON,
      color: DEFAULT_COLOR,
      bg_color: DEFAULT_BG,
      sort_order: toInt(sortOrder, 0),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminVolunteerOpportunitiesApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminVolunteerOpportunitiesApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save volunteer opportunity")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this volunteer opportunity?")) return
    try {
      await AdminVolunteerOpportunitiesApi.remove(id)
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
            <h1 className="text-3xl font-semibold">Volunteer Opportunities</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage volunteer roles shown on the Get Involved page.
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
            {editingId ? "Edit Opportunity" : "Add a Volunteer Opportunity"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Title *</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Mentor & Coach"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Commitment *</span>
              <input
                value={commitment}
                onChange={(e) => setCommitment(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="2 hours/week"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Description *</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Short description shown on the volunteer card."
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Skills *</span>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Professional experience, good communication"
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
              {saving ? "Saving..." : editingId ? "Update Opportunity" : "Add Opportunity"}
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
            <CardTitle className="text-2xl">Current Opportunities</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, description, skills..."
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
                    <div className="text-sm text-slate-600">
                      {row.description}
                    </div>
                    <div className="text-sm text-slate-600">
                      Commitment: {row.commitment}
                    </div>
                    <div className="text-sm text-slate-600">
                      Skills: {row.skills}
                    </div>
                    <div className="text-xs text-slate-500">
                      Order: {row.sort_order}
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
                  No volunteer opportunities found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
