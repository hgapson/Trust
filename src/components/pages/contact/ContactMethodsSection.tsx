import { useMemo } from "react"
import type { ComponentType } from "react"
import type { LucideProps } from "lucide-react"
import { Mail, MessageSquare, Phone } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { getActionHrefForRow, useContactMethods } from "./contactMethods"
import type { ContactMethodRow, ContactMethodUI } from "./types"

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Phone,
  Mail,
  MessageSquare,
}
const fallbackIcon = Phone

const mapContactMethod = (row: ContactMethodRow): ContactMethodUI => ({
  icon: iconMap[row.icon_key] ?? fallbackIcon,
  title: row.title,
  details: row.details,
  description: row.description,
  action: row.action_label,
  actionHref: getActionHrefForRow(row),
})

const openContactAction = (href?: string) => {
  if (!href) return
  if (href.startsWith("http")) {
    window.open(href, "_blank", "noopener,noreferrer")
    return
  }
  window.location.href = href
}

export function ContactMethodsSection() {
  const { rows } = useContactMethods()
  const methods = useMemo(() => rows.map(mapContactMethod), [rows])

  return (
    <section className="py-20 gradient-bg-values">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">Get in Touch</h2>
        <p className="text-xl text-gray-600">
          Choose the way that works best for you
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {methods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full cursor-pointer text-center transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <method.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <CardDescription className="font-medium text-blue-600">
                  {method.details}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{method.description}</p>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 transition-colors hover:from-blue-700 hover:to-purple-700"
                  disabled={!method.actionHref}
                  onClick={() => openContactAction(method.actionHref)}
                >
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
