import { useEffect, useState } from "react"
import { RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { AdminMissionVisionApi } from "../API/missionVision"
import type { MissionVisionData } from "../../about/types"

const emptyPayload = {
  mission_title: "",
  mission_description: "",
  vision_title: "",
  vision_description: "",
  image_url: "",
}

export default function AdminMissionVisionPage() {
  const [form, setForm] = useState(emptyPayload)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminMissionVisionApi.get()
      if (data) {
        const row = data as MissionVisionData
        setForm({
          mission_title: row.mission_title ?? "",
          mission_description: row.mission_description ?? "",
          vision_title: row.vision_title ?? "",
          vision_description: row.vision_description ?? "",
          image_url: row.image_url ?? "",
        })
      } else {
        setForm(emptyPayload)
      }
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load mission & vision")
      setForm(emptyPayload)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const save = async () => {
    if (
      !form.mission_title.trim() ||
      !form.mission_description.trim() ||
      !form.vision_title.trim() ||
      !form.vision_description.trim() ||
      !form.image_url.trim()
    ) {
      alert("Please fill all fields before saving.")
      return
    }

    try {
      setSaving(true)
      setError(null)
      await AdminMissionVisionApi.update(form)
      await load()
    } catch (e) {
      console.error(e)
      alert("Failed to save mission & vision")
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!confirm("Delete mission & vision content?")) return
    try {
      await AdminMissionVisionApi.remove()
      setForm(emptyPayload)
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
            <h1 className="text-3xl font-semibold">Mission & Vision</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Update the Mission & Vision block on the About page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={load}
              className="gap-2 border-white/15  hover:bg-white/10"
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={remove}
              className="gap-2 border-red-200 text-red-100 hover:bg-red-500/20"
              disabled={loading}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Mission & Vision Details</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            All fields are required for the About page section to render.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Mission Title</span>
              <input
                value={form.mission_title}
                onChange={(e) => updateField("mission_title", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Our Mission"
                disabled={loading}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Vision Title</span>
              <input
                value={form.vision_title}
                onChange={(e) => updateField("vision_title", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Our Vision"
                disabled={loading}
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Mission Description</span>
              <textarea
                value={form.mission_description}
                onChange={(e) => updateField("mission_description", e.target.value)}
                rows={4}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Mission description text"
                disabled={loading}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Vision Description</span>
              <textarea
                value={form.vision_description}
                onChange={(e) => updateField("vision_description", e.target.value)}
                rows={4}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Vision description text"
                disabled={loading}
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Image URL</span>
            <input
              value={form.image_url}
              onChange={(e) => updateField("image_url", e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="https://..."
              disabled={loading}
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <Button onClick={save} disabled={saving || loading}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
