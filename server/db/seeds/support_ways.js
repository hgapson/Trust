/**
 * @param {import("knex").Knex} knex
 */
module.exports.seed = async function seed(knex) {
  await knex("support_ways").del()

  await knex("support_ways").insert([
    {
      title: "Share Your Expertise",
      description:
        "Offer skills-based support through mentoring, resume reviews, or mock interviews",
      icon_key: "Users",
      color: "text-blue-600",
      bg_color: "bg-blue-100",
      sort_order: 1,
    },
    {
      title: "Spread the Word",
      description:
        "Help us reach more people by sharing our mission with your network",
      icon_key: "Heart",
      color: "text-pink-600",
      bg_color: "bg-pink-100",
      sort_order: 2,
    },
    {
      title: "Open Doors",
      description:
        "Connect us with potential employers, partners, or community organizations",
      icon_key: "Handshake",
      color: "text-purple-600",
      bg_color: "bg-purple-100",
      sort_order: 3,
    },
    {
      title: "Provide Resources",
      description:
        "Donate office supplies, training materials, or professional clothing",
      icon_key: "Gift",
      color: "text-green-600",
      bg_color: "bg-green-100",
      sort_order: 4,
    },
  ])
}