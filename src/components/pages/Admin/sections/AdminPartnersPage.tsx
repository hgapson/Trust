import { useEffect, useMemo, useState } from "react"
import { FileText, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Badge } from "../../../ui/badge"
import { AdminPartnersApi } from "../API/partners"
import type { DbPartner } from "../../about/types"

type PartnerType = "partner" | "funder"

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminPartnersPage() {
  const [rows, setRows] = useState<DbPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<PartnerType | "all">("all")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [type, setType] = useState<PartnerType>("partner")
  const [name, setName] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [focus, setFocus] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [contribution, setContribution] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminPartnersApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load partners")
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
      list = list.filter((row) => row.type === typeFilter)
    }
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.focus.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      )
    })
  }, [rows, query, typeFilter])

  const resetForm = () => {
    setType("partner")
    setName("")
    setLogoUrl("")
    setWebsiteUrl("")
    setFocus("")
    setDescription("")
    setLocation("")
    setContribution("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: DbPartner) => {
    setEditingId(row.id)
    setType(row.type)
    setName(row.name)
    setLogoUrl(row.logo_url ?? "")
    setWebsiteUrl(row.website_url ?? "")
    setFocus(row.focus)
    setDescription(row.description)
    setLocation(row.location)
    setContribution(row.contribution)
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (
      !name.trim() ||
      !focus.trim() ||
      !description.trim() ||
      !location.trim() ||
      !contribution.trim()
    ) {
      alert("Please fill Name, Focus, Description, Location, Contribution.")
      return
    }

    const payload = {
      type,
      name: name.trim(),
      logo_url: logoUrl.trim() || null,
      website_url: websiteUrl.trim() || null,
      focus: focus.trim(),
      description: description.trim(),
      location: location.trim(),
      contribution: contribution.trim(),
      sort_order: toInt(sortOrder, 0),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminPartnersApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminPartnersApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save partner")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this partner/funder?")) return
    try {
      await AdminPartnersApi.remove(id)
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
            <h1 className="text-3xl font-semibold">Partners & Funders</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the partners and funders cards shown on the About page.
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
            {editingId ? "Edit Partner/Funder" : "Add a Partner/Funder"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Add as partner or funder. Logos and websites are optional.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-medium">Type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PartnerType)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
              >
                <option value="partner">Partner</option>
                <option value="funder">Funder</option>
              </select>
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className="text-sm font-medium">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Community Waikato"
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Logo URL (optional)</span>
              <input
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="https://..."
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Website URL (optional)</span>
              <input
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="https://..."
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Focus</span>
            <input
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Community capability"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Description shown on the card."
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Location</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Hamilton"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Contribution</span>
              <input
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Community grants and support"
              />
            </label>
          </div>

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
              {saving ? "Saving..." : editingId ? "Update Entry" : "Add Entry"}
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
            <CardTitle className="text-2xl">Current Partners & Funders</CardTitle>
            <div className="flex flex-wrap gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as PartnerType | "all")}
                className="rounded-md border border-slate-200 px-3 py-2"
              >
                <option value="all">All</option>
                <option value="partner">Partners</option>
                <option value="funder">Funders</option>
              </select>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, focus, description..."
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
                    <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      {row.logo_url ? (
                        <img
                          src={row.logo_url}
                          alt={row.name}
                          className="h-full w-full object-contain"
                        />
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <div className="text-base font-semibold text-slate-900">
                        {row.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {row.description}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <Badge variant="secondary">{row.type}</Badge>
                        <span>{row.focus}</span>
                        <span>{row.location}</span>
                        <span>Order: {row.sort_order}</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Contribution: {row.contribution}
                      </div>
                      {row.website_url ? (
                        <a
                          href={row.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Visit website
                        </a>
                      ) : null}
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
                  No partners found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
