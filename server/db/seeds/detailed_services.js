exports.seed = async function (knex) {
  // Clear child table first (FK constraint)
  await knex("detailed_service_features").del()
  await knex("detailed_services").del()

  // Insert services
  await knex("detailed_services").insert([
    {
      id: "motivate",
      title: "Motivate - Building Foundations",
      icon: "Heart",
      color: "text-red-600",
      bg_color: "bg-red-100",
      image_url:
        "https://igdleaders.org/wp-content/uploads/2023/01/Untitled-design-32-1.png",
      description:
        "We build partnerships with employers and empower individuals with confidence and motivation.",
      sort_order: 1,
    },
    {
      id: "equip",
      title: "Equip - Skills Development",
      icon: "Wrench",
      color: "text-blue-600",
      bg_color: "bg-blue-100",
      image_url:
        "https://robertsmith.com/wp-content/uploads/2023/10/Robert-f-Smith-com-352-20-Professional-Development-Skills-to-Help-Craft-Your-Future.jpeg",
      description:
        "Comprehensive work skills preparation, career guidance, and practical workshops.",
      sort_order: 2,
    },
    {
      id: "achieve",
      title: "Achieve - Success & Growth",
      icon: "Target",
      color: "text-green-600",
      bg_color: "bg-green-100",
      image_url:
        "https://blog.4tests.com/wp-content/uploads/2016/12/Screen-Shot-2016-12-30-at-10.13.14-PM.png",
      description:
        "Inspiring success stories and ongoing support to reduce inequality and achieve career goals.",
      sort_order: 3,
    },
  ])

  // Insert features
  await knex("detailed_service_features").insert([
    // Motivate
    { service_id: "motivate", feature: "One-on-one mentorship programs", sort_order: 1 },
    { service_id: "motivate", feature: "Confidence building workshops", sort_order: 2 },
    { service_id: "motivate", feature: "Community partnership development", sort_order: 3 },
    { service_id: "motivate", feature: "Cultural orientation sessions", sort_order: 4 },
    { service_id: "motivate", feature: "Peer support groups", sort_order: 5 },
    { service_id: "motivate", feature: "Goal setting and planning", sort_order: 6 },

    // Equip
    { service_id: "equip", feature: "Resume writing and optimization", sort_order: 1 },
    { service_id: "equip", feature: "Interview preparation and practice", sort_order: 2 },
    { service_id: "equip", feature: "Digital literacy training", sort_order: 3 },
    { service_id: "equip", feature: "Industry-specific skill development", sort_order: 4 },
    { service_id: "equip", feature: "Workplace communication workshops", sort_order: 5 },
    { service_id: "equip", feature: "Professional networking guidance", sort_order: 6 },

    // Achieve
    { service_id: "achieve", feature: "Job placement assistance", sort_order: 1 },
    { service_id: "achieve", feature: "Career advancement support", sort_order: 2 },
    { service_id: "achieve", feature: "Ongoing mentorship", sort_order: 3 },
    { service_id: "achieve", feature: "Success story sharing", sort_order: 4 },
    { service_id: "achieve", feature: "Alumni network access", sort_order: 5 },
    { service_id: "achieve", feature: "Long-term career planning", sort_order: 6 },
  ])
}