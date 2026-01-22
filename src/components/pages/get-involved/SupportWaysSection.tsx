import { useEffect, useState, type ComponentType } from "react"
import { motion } from "motion/react"
import { Gift, Handshake, Heart, Mail, Phone, Users } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { useContactMethodLinks } from "../contact/contactMethods"
import { SupportWaysApi } from "./api/supportWays"
import type { SupportWayRow } from "./types"

const iconMap = {
  Users,
  Heart,
  Handshake,
  Gift,
} as const

type SupportWayUI = SupportWayRow & {
  Icon?: ComponentType<any>
}

export function SupportWaysSection() {
  const [supportWays, setSupportWays] = useState<SupportWayUI[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { phoneHref, emailHref } = useContactMethodLinks()

  useEffect(() => {
    SupportWaysApi.list()
      .then((rows) => {
        const ui = rows.map((r) => ({
          ...r,
          Icon: iconMap[r.icon_key as keyof typeof iconMap],
        }))
        setSupportWays(ui)
      })
      .catch((e) => {
        console.error(e)
        setError("Failed to load support ways")
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="py-20 text-center text-gray-600">Loading…</p>
  }

  if (error) {
    return <p className="py-20 text-center text-red-600">{error}</p>
  }

  return (
    <section className="py-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 text-3xl lg:text-4xl">More Ways to Support</h2>
        <p className="text-xl text-gray-600">
          Every contribution, big or small, helps us create meaningful impact
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {supportWays.map((way, index) => (
          <motion.div
            key={way.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full text-center transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div
                  className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${way.bg_color}`}
                >
                  {way.Icon ? <way.Icon className={`h-7 w-7 ${way.color}`} /> : null}
                </div>
                <CardTitle className="text-lg">{way.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{way.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="mb-4 text-2xl text-gray-800">
          Corporate &amp; Community Partnerships
        </h3>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          Whether you&apos;re a business looking to diversify your workforce or
          a community organization aligned with our mission, we&apos;d love to
          explore partnership opportunities together.
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
              disabled={!phoneHref && !emailHref}
            >
              Discuss Partnership Options
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            sideOffset={10}
            className="w-72 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
          >
            <p className="text-sm font-semibold text-slate-700">
              Choose how you want to reach us
            </p>
            <div className="flex flex-col gap-2">
              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Phone className="h-4 w-4 text-blue-600" />
                    Call us
                  </span>
                </a>
              ) : (
                <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                  <span className="flex items-center gap-2 font-semibold">
                    <Phone className="h-4 w-4 text-blue-300" />
                    Call us
                  </span>
                </span>
              )}

              {emailHref ? (
                <a
                  href={emailHref}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Mail className="h-4 w-4 text-purple-600" />
                    Email us
                  </span>
                </a>
              ) : (
                <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                  <span className="flex items-center gap-2 font-semibold">
                    <Mail className="h-4 w-4 text-purple-300" />
                    Email us
                  </span>
                </span>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>
    </section>
  )
}
