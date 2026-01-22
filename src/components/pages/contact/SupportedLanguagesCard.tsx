import { Globe } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { useSupportedLanguages } from "./supportedLanguages"

export function SupportedLanguagesCard() {
  const { rows } = useSupportedLanguages()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Languages We Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {rows.map((language) => (
            <div
              key={language.id}
              className="rounded-full bg-blue-50 px-3 py-1 text-center text-sm text-blue-700"
            >
              {language.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
