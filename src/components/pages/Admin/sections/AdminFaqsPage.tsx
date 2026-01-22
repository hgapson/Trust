import { useEffect, useMemo, useState } from "react"
import { FileText, RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { AdminFaqsApi } from "../API/faqs"
import type { FaqRow } from "../../contact/types"

const toInt = (value: string, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export default function AdminFaqsPage() {
  const [rows, setRows] = useState<FaqRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // form
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sortOrder, setSortOrder] = useState("0")

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminFaqsApi.list()
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load FAQs")
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
        r.question.toLowerCase().includes(q) ||
        r.answer.toLowerCase().includes(q)
      )
    })
  }, [rows, query])

  const resetForm = () => {
    setQuestion("")
    setAnswer("")
    setSortOrder("0")
    setEditingId(null)
  }

  const startEdit = (row: FaqRow) => {
    setEditingId(row.id)
    setQuestion(row.question)
    setAnswer(row.answer)
    setSortOrder(String(row.sort_order ?? 0))
  }

  const upsert = async () => {
    if (!question.trim() || !answer.trim()) {
      alert("Please fill Question and Answer.")
      return
    }

    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      sort_order: toInt(sortOrder, 0),
    }

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        const updated = await AdminFaqsApi.update(editingId, payload)
        setRows((prev) => prev.map((row) => (row.id === updated.id ? updated : row)))
      } else {
        const created = await AdminFaqsApi.create(payload)
        setRows((prev) => [...prev, created])
      }

      resetForm()
    } catch (e) {
      console.error(e)
      alert("Failed to save FAQ")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this FAQ?")) return
    try {
      await AdminFaqsApi.remove(id)
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
            <h1 className="text-3xl font-semibold">FAQs</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Manage the Frequently Asked Questions on the Contact page.
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
            {editingId ? "Edit FAQ" : "Add an FAQ"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <label className="space-y-2">
            <span className="text-sm font-medium">Question *</span>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Who can access your services?"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Answer *</span>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Our services are available to all migrants..."
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

          <div className="flex flex-wrap gap-2">
            <Button onClick={upsert} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update FAQ" : "Add FAQ"}
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
            <CardTitle className="text-2xl">Current FAQs</CardTitle>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions or answers..."
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
                      {row.question}
                    </div>
                    <div className="text-sm text-slate-600">{row.answer}</div>
                    <div className="text-xs text-slate-500">
                      Order: {row.sort_order ?? 0}
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
                  No FAQs found.
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
