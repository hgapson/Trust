import { useEffect, useState } from "react"
import type { SupportedLanguageRow } from "./types"

let cachedRows: SupportedLanguageRow[] | null = null
let pendingRequest: Promise<SupportedLanguageRow[]> | null = null

const fetchSupportedLanguages = async (): Promise<SupportedLanguageRow[]> => {
  if (cachedRows) return cachedRows
  if (pendingRequest) return pendingRequest

  pendingRequest = fetch("/api/supported-languages")
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to load supported languages")
      const rows = (await res.json()) as SupportedLanguageRow[]
      cachedRows = rows
      return rows
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export const useSupportedLanguages = () => {
  const [rows, setRows] = useState<SupportedLanguageRow[]>(cachedRows ?? [])
  const [loading, setLoading] = useState(!cachedRows)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (cachedRows) return
    let isMounted = true

    fetchSupportedLanguages()
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
