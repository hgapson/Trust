import { useEffect, useState } from "react"
import type { FaqRow } from "./types"

let cachedRows: FaqRow[] | null = null
let pendingRequest: Promise<FaqRow[]> | null = null

const fetchFaqs = async (): Promise<FaqRow[]> => {
  if (cachedRows) return cachedRows
  if (pendingRequest) return pendingRequest

  pendingRequest = fetch("/api/faqs")
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to load FAQs")
      const rows = (await res.json()) as FaqRow[]
      cachedRows = rows
      return rows
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export const useFaqs = () => {
  const [rows, setRows] = useState<FaqRow[]>(cachedRows ?? [])
  const [loading, setLoading] = useState(!cachedRows)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (cachedRows) return
    let isMounted = true

    fetchFaqs()
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
