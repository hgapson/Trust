import type { SupportedLanguageRow } from "../../contact/types"

const BASE = ""

export type SupportedLanguagePayload = {
  name: string
  sort_order?: number
}

export const AdminSupportedLanguagesApi = {
  async list(): Promise<SupportedLanguageRow[]> {
    const res = await fetch(`${BASE}/api/admin/supported-languages`)
    if (!res.ok) throw new Error("Failed to fetch supported languages")
    return res.json()
  },

  async create(payload: SupportedLanguagePayload): Promise<SupportedLanguageRow> {
    const res = await fetch(`${BASE}/api/admin/supported-languages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to create supported language")
    return res.json()
  },

  async update(
    id: number,
    payload: SupportedLanguagePayload
  ): Promise<SupportedLanguageRow> {
    const res = await fetch(`${BASE}/api/admin/supported-languages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update supported language")
    return res.json()
  },

  async remove(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${BASE}/api/admin/supported-languages/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete supported language")
    return res.json()
  },
}
