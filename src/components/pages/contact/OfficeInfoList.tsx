import { useMemo } from "react"
import { Accessibility, Car, Clock, MapPin } from "lucide-react"

import { useOfficeInfo } from "./officeInfo"
import type { OfficeInfoRow } from "./types"

const iconMap = {
  MapPin,
  Clock,
  Car,
  Accessibility,
} as const

const fallbackIcon = MapPin

const mapOfficeInfo = (row: OfficeInfoRow) => {
  const Icon = iconMap[row.icon_key] ?? fallbackIcon
  return {
    icon: Icon,
    title: row.title,
    details: row.details,
    extra: row.extra ?? undefined,
  }
}

export function OfficeInfoList() {
  const { rows } = useOfficeInfo()
  const items = useMemo(() => rows.map(mapOfficeInfo), [rows])

  return (
    <div>
      <h2 className="mb-6 text-3xl">Visit Our Office</h2>
      <div className="space-y-6">
        {items.map((info) => (
          <div key={info.title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <info.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-1 text-lg">{info.title}</h3>
              <p className="text-gray-700">{info.details}</p>
              {info.extra ? (
                <p className="text-sm text-gray-600">{info.extra}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
