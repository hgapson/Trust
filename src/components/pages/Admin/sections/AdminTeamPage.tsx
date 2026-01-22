import { useEffect, useMemo, useState } from "react"
import { FileText, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Badge } from "../../../ui/badge"
import { AdminTeamApi } from "../API/team"
import type { TeamMember } from "../../about/types"

type TeamType = "staff" | "trustee"

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminTeamPage() {
  const [rows, setRows] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<TeamType | "all">("all")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [teamType, setTeamType] = useState<TeamType>("staff")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminTeamApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load team members")
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    let list = rows
    if (typeFilter !== "all") {
      list = list.filter((row) => (row.team_type ?? "staff") === typeFilter)
    }
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      )
    })
  }, [rows, query, typeFilter])

  const resetForm = () => {
    setName("")
    setRole("")
    setDescription("")
    setImageUrl("")
    setTeamType("staff")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: TeamMember) => {
    setEditingId(row.id)
    setName(row.name)
    setRole(row.role)
    setDescription(row.description)
    setImageUrl(row.image_url ?? "")
    setTeamType((row.team_type ?? "staff") as TeamType)
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (!name.trim() || !role.trim() || !description.trim()) {
      alert("Please fill Name, Role and Description.")
      return
    }

    const payload = {
      name: name.trim(),
      role: role.trim(),
      description: description.trim(),
      image_url: imageUrl.trim() || null,
      team_type: teamType,
      sort_order: toInt(sortOrder, 0),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminTeamApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminTeamApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save team member")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this team member?")) return
    try {
      await AdminTeamApi.remove(id)
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
            <h1 className="text-3xl font-semibold">Team Members</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage staff and trustees shown on the About page.
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
            {editingId ? "Edit Team Member" : "Add a Team Member"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Choose Staff or Trustee to control which tab they appear under.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="space-y-2 lg:col-span-2">
              <span className="text-sm font-medium">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Penny Smith"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Team Type</span>
              <select
                value={teamType}
                onChange={(e) => setTeamType(e.target.value as TeamType)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              >
                <option value="staff">Staff</option>
                <option value="trustee">Trustee</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Role</span>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Chief Executive Officer"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Image URL (optional)</span>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="/team/penny.jpg"
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
              placeholder="Short bio shown on the card."
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
              {saving ? "Saving..." : editingId ? "Update Member" : "Add Member"}
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
            <CardTitle className="text-2xl">Current Team</CardTitle>
            <div className="flex flex-wrap gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as TeamType | "all")}
                className="rounded-md border border-slate-200 px-3 py-2"
              >
                <option value="all">All</option>
                <option value="staff">Staff</option>
                <option value="trustee">Trustees</option>
              </select>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, role, description..."
                className="w-full max-w-sm rounded-md border border-slate-200 px-3 py-2"
              />
            </div>
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
              {filtered.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex flex-1 items-start gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-white">
                      {row.image_url ? (
                        <img
                          src={row.image_url}
                          alt={row.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <div className="text-base font-semibold text-slate-900">
                        {row.name}
                      </div>
                      <div className="text-sm text-slate-600">{row.role}</div>
                      <div className="text-sm text-slate-600">
                        {row.description}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <Badge variant="secondary">{row.team_type ?? "staff"}</Badge>
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
              ))}
              {!filtered.length ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  No team members found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
