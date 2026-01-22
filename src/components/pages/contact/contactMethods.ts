import { useEffect, useMemo, useState } from "react"
import type { ContactMethodRow } from "./types"

export type ContactMethodKind = "phone" | "email" | "whatsapp"

let cachedRows: ContactMethodRow[] | null = null
let pendingRequest: Promise<ContactMethodRow[]> | null = null

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "")
const normalizeWhatsApp = (value: string) => value.replace(/\D/g, "")

const fetchContactMethods = async (): Promise<ContactMethodRow[]> => {
  if (cachedRows) return cachedRows
  if (pendingRequest) return pendingRequest

  pendingRequest = fetch("/api/contact-methods")
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to load contact methods")
      const rows = (await res.json()) as ContactMethodRow[]
      cachedRows = rows
      return rows
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

const matchesKind = (row: ContactMethodRow, kind: ContactMethodKind) => {
  const key = row.icon_key.toLowerCase()
  const title = row.title.toLowerCase()

  if (kind === "email") return key === "mail" || title.includes("email")
  if (kind === "phone") return key === "phone" || title.includes("phone")
  if (kind === "whatsapp") return key === "messagesquare" || title.includes("whatsapp")

  return false
}

export const findContactMethodByKind = (
  rows: ContactMethodRow[],
  kind: ContactMethodKind,
) => rows.find((item) => matchesKind(item, kind))

export const getActionHrefForRow = (
  row: ContactMethodRow,
): string | undefined => {
  const key = row.icon_key.toLowerCase()
  const title = row.title.toLowerCase()
  const label = row.action_label.toLowerCase()
  const details = row.details.trim()

  if (key === "mail" || title.includes("email") || details.includes("@")) {
    return `mailto:${details}`
  }

  if (key === "phone" || title.includes("phone")) {
    return `tel:${normalizePhone(details)}`
  }

  if (
    key === "messagesquare" ||
    title.includes("whatsapp") ||
    label.includes("message")
  ) {
    const digits = normalizeWhatsApp(details)
    return digits ? `https://wa.me/${digits}` : undefined
  }

  const digits = normalizeWhatsApp(details)
  return digits ? `tel:${normalizePhone(details)}` : undefined
}

export const useContactMethods = () => {
  const [rows, setRows] = useState<ContactMethodRow[]>(cachedRows ?? [])
  const [loading, setLoading] = useState(!cachedRows)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (cachedRows) return
    let isMounted = true

    fetchContactMethods()
      .then((data) => {
        if (!isMounted) return
        setRows(data)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err as Error)
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return { rows, loading, error }
}

export const useContactMethodLinks = () => {
  const { rows, loading, error } = useContactMethods()

  const phoneHref = useMemo(() => {
    const row = findContactMethodByKind(rows, "phone")
    return row ? getActionHrefForRow(row) : undefined
  }, [rows])

  const emailHref = useMemo(() => {
    const row = findContactMethodByKind(rows, "email")
    return row ? getActionHrefForRow(row) : undefined
  }, [rows])

  const whatsappHref = useMemo(() => {
    const row = findContactMethodByKind(rows, "whatsapp")
    return row ? getActionHrefForRow(row) : undefined
  }, [rows])

  return { rows, loading, error, phoneHref, emailHref, whatsappHref }
}
