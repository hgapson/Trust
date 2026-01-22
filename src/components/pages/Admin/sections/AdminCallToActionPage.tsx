import { useEffect, useState } from "react"
import { RefreshCw, Trash2 } from "lucide-react"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { AdminCallToActionApi } from "../API/callToAction"
import type { CallToActionData } from "../../home/types"

const emptyPayload = {
  heading: "",
  description: "",
  phone: "",
  email: "",
  location: "",
  availability: "",
  image_url: "",
  card_title: "",
  card_description: "",
  cta_label: "",
}

export default function AdminCallToActionPage() {
  const [form, setForm] = useState(emptyPayload)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AdminCallToActionApi.get()
      if (data) {
        const cta = data as CallToActionData
        setForm({
          heading: cta.heading ?? "",
          description: cta.description ?? "",
          phone: cta.phone ?? "",
          email: cta.email ?? "",
          location: cta.location ?? "",
          availability: cta.availability ?? "",
          image_url: cta.image_url ?? "",
          card_title: cta.card_title ?? "",
          card_description: cta.card_description ?? "",
          cta_label: cta.cta_label ?? "",
        })
      } else {
        setForm(emptyPayload)
      }
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load call to action")
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
      !form.heading.trim() ||
      !form.description.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.location.trim() ||
      !form.availability.trim() ||
      !form.image_url.trim() ||
      !form.card_title.trim() ||
      !form.card_description.trim() ||
      !form.cta_label.trim()
    ) {
      alert("Please fill all fields before saving.")
      return
    }

    try {
      setSaving(true)
      setError(null)
      await AdminCallToActionApi.update(form)
      await load()
    } catch (e) {
      console.error(e)
      alert("Failed to save call to action")
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!confirm("Delete call to action content?")) return
    try {
      await AdminCallToActionApi.remove()
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
            <h1 className="text-3xl font-semibold">Call To Action</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Update the CTA block on the home page.
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
          <CardTitle className="text-2xl">CTA Details</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            All fields are required for the CTA to render correctly.
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
              <span className="text-sm font-medium">Heading</span>
              <input
                value={form.heading}
                onChange={(e) => updateField("heading", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Ready to Start Your Journey?"
                disabled={loading}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">CTA Button Label</span>
              <input
                value={form.cta_label}
                onChange={(e) => updateField("cta_label", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Talk to Us"
                disabled={loading}
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
              placeholder="Main CTA description"
              disabled={loading}
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Phone</span>
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="+64 223146756"
                disabled={loading}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Email</span>
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="waikato.navtrust@outlook.com"
                disabled={loading}
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Location</span>
              <input
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Hamilton, Waikato, New Zealand"
                disabled={loading}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Availability</span>
              <input
                value={form.availability}
                onChange={(e) => updateField("availability", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Mon–Fri 9:00 AM – 5:00 PM"
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

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Card Title</span>
              <input
                value={form.card_title}
                onChange={(e) => updateField("card_title", e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Free Initial Consultation"
                disabled={loading}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Card Description</span>
              <textarea
                value={form.card_description}
                onChange={(e) => updateField("card_description", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Description shown inside the card."
                disabled={loading}
              />
            </label>
          </div>

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
