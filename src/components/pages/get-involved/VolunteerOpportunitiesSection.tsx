import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Clock, Star, Users, Heart, Building } from "lucide-react"

import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card"

import { fetchVolunteerOpportunities } from "./api/volunteerOpportunities"
import type { VolunteerOpportunity } from "./types"

/* Map icon_key from DB → actual icon component */
const iconMap = {
  Users,
  Heart,
  Building,
  Clock,
}

export function VolunteerOpportunitiesSection() {
  const navigate = useNavigate()
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVolunteerOpportunities()
      .then((data) => {
        const withIcons = data.map((item: VolunteerOpportunity) => ({
          ...item,
          icon: iconMap[item.icon_key as keyof typeof iconMap],
        }))
        setOpportunities(withIcons)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load volunteer opportunities")
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="py-20 text-center text-gray-600">Loading…</p>
  }

  if (error) {
    return <p className="py-20 text-center text-red-600">{error}</p>
  }

  const contactHref = (title: string) => {
    const params = new URLSearchParams({ volunteer: title })
    return `/contact?${params.toString()}#contact-form`
  }

  const handleApply = (title: string) => {
    navigate(contactHref(title))
  }

  return (
    <section className="rounded-2xl py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl text-gray-800 lg:text-4xl">
          Volunteer Opportunities
        </h2>
        <p className="text-xl text-gray-600">
          Use your skills to make a difference in someone&apos;s life
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.id}   
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-0 bg-white/90 shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${opportunity.bgColor}`}
                >
                  {opportunity.icon && (
                    <opportunity.icon
                      className={`h-6 w-6 ${opportunity.color}`}
                    />
                  )}
                </div>

                <CardTitle className="text-xl">
                  {opportunity.title}
                </CardTitle>

                <CardDescription className="text-gray-600">
                  {opportunity.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Commitment: {opportunity.commitment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Skills: {opportunity.skills}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleApply(opportunity.title)}
                >
                  Apply to Volunteer
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 transition-colors hover:from-blue-700 hover:to-purple-700">
          View All Volunteer Opportunities
        </Button>
      </div>
    </section>
  )
}
