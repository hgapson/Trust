import { useMemo, useState } from "react"
import type { Workshop, WorkshopRegistrationPayload } from "../types"
import { WorkshopsApi } from "../api/workshops"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"

interface WorkshopRegisterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workshop: Workshop | null
}

export function WorkshopRegisterModal({
  open,
  onOpenChange,
  workshop,
}: WorkshopRegisterModalProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const title = useMemo(
    () => workshop?.title ?? "Workshop",
    [workshop]
  )

  if (!open) return null

  const close = () => {
    onOpenChange(false)
    setError(null)
    setSuccess(false)
  }

  const submit = async () => {
    if (!workshop) return

    if (!fullName.trim() || !email.trim()) {
      setError("Name and email are required.")
      return
    }

    const payload: WorkshopRegistrationPayload = {
      workshop_id: workshop.id,
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      notes: notes.trim() || undefined,
    }

    try {
      setSubmitting(true)
      setError(null)

      await WorkshopsApi.register(workshop.id, payload)

      setSuccess(true)

      // Clear form
      setFullName("")
      setEmail("")
      setPhone("")
      setNotes("")
    } catch (err: unknown) {
      console.error(err)
      setError("Failed to register. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Register</CardTitle>
              <p className="mt-1 text-sm text-gray-600">{title}</p>
            </div>

            <Button variant="outline" onClick={close}>
              Close
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {success && (
              <div className="rounded-lg bg-green-50 p-4 text-green-700">
                Registration submitted successfully.
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Full name *</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone (optional)</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="+64 ..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[90px] w-full rounded-md border border-slate-200 px-3 py-2"
                placeholder="Any extra info..."
              />
            </div>

            <Button
              onClick={submit}
              disabled={submitting || !workshop}
              className="w-full"
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}