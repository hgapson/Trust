/**
 * @param {import("knex").Knex} knex
 */
module.exports.seed = async function (knex) {
  // Clear existing registrations
  await knex("workshop_registrations").del()

  // Get existing workshops (we must reference real workshop IDs)
  const workshops = await knex("workshops").select("id")

  if (workshops.length === 0) {
    console.warn("⚠️ No workshops found. Skipping workshop registrations seed.")
    return
  }

  await knex("workshop_registrations").insert([
    {
      workshop_id: workshops[0].id,
      full_name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+64 21 123 4567",
      notes: "Interested in improving interview skills",
    },
    {
      workshop_id: workshops[0].id,
      full_name: "Ahmed Khan",
      email: "ahmed.khan@example.com",
      phone: "+64 22 987 6543",
      notes: "Needs support with CV writing",
    },
    {
      workshop_id: workshops[1]?.id ?? workshops[0].id,
      full_name: "Maria Santos",
      email: "maria.santos@example.com",
      phone: "+64 20 555 8888",
      notes: "Looking for job search strategies",
    },
  ])
}