import { useEffect, useMemo, useState } from "react"
import { FileText, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Badge } from "../../../ui/badge"
import { AdminCommunityStoriesApi } from "../API/communityStories"
import type { CommunityStory } from "../../home/types"

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminCommunityStoriesPage() {
  const [rows, setRows] = useState<CommunityStory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminCommunityStoriesApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load community stories")
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
        r.author.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.quote.toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setQuote("")
    setAuthor("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: CommunityStory) => {
    setEditingId(row.id)
    setQuote(row.quote)
    setAuthor(row.author)
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (!quote.trim() || !author.trim()) {
      alert("Please fill Quote and Author.")
      return
    }

    const payload = {
      quote: quote.trim(),
      author: author.trim(),
      sort_order: toInt(sortOrder, 0),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminCommunityStoriesApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminCommunityStoriesApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save community story")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this community story?")) return
    try {
      await AdminCommunityStoriesApi.remove(id)
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
            <h1 className="text-3xl font-semibold">Community Stories</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage testimonials displayed on the Home and About pages.
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
            {editingId ? "Edit Testimony" : "Add a Testimony"}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Images are removed; only quote, author, role, and order are used.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <label className="space-y-2">
            <span className="text-sm font-medium">Quote</span>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Testimonial text"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Author</span>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Maria S."
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
              {saving ? "Saving..." : editingId ? "Update Testimony" : "Add Testimony"}
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
            <CardTitle className="text-2xl">Current Testimonials</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search quote, author, role..."
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
              {filtered.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex flex-1 items-start gap-4">
                    <div className="space-y-1">
                      <div className="text-base font-semibold text-slate-900">
                        {row.author}
                      </div>
                      <div className="text-sm text-slate-600">
                        “{row.quote}”
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <Badge variant="secondary">Order: {row.sort_order ?? 0}</Badge>
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
                  No testimonials found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
