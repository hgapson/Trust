module.exports.seed = async function (knex) {
  await knex("workshop_registrations").del()
  await knex("workshops").del()

  await knex("workshops").insert([
    {
      title: "Resume Writing Workshop",
      description: "Learn how to write a strong CV for the NZ job market.",
      start_at: "2026-01-20 09:00:00",
      end_at: "2026-01-20 11:00:00",
      location: "Hamilton (Navigate Trust Office)",
      capacity: 20,
      is_active: true,
    },
    {
      title: "Interview Skills Training",
      description: "Practice interview questions and confidence techniques.",
      start_at: "2026-01-21 13:00:00",
      end_at: "2026-01-21 15:00:00",
      location: "Hamilton (Navigate Trust Office)",
      capacity: 20,
      is_active: true,
    },
  ])
}