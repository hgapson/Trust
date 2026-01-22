import { useEffect, useState } from "react"
import type { OfficeInfoRow } from "./types"

let cachedRows: OfficeInfoRow[] | null = null
let pendingRequest: Promise<OfficeInfoRow[]> | null = null

const fetchOfficeInfo = async (): Promise<OfficeInfoRow[]> => {
  if (cachedRows) return cachedRows
  if (pendingRequest) return pendingRequest

  pendingRequest = fetch("/api/office-info")
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to load office info")
      const rows = (await res.json()) as OfficeInfoRow[]
      cachedRows = rows
      return rows
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export const useOfficeInfo = () => {
  const [rows, setRows] = useState<OfficeInfoRow[]>(cachedRows ?? [])
  const [loading, setLoading] = useState(!cachedRows)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (cachedRows) return
    let isMounted = true

    fetchOfficeInfo()
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
