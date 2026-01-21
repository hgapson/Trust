/**
 * @param {import('knex').Knex} knex
 */
module.exports.seed = async function (knex) {
  await knex("volunteer_opportunities").del();

  await knex("volunteer_opportunities").insert([
    {
      title: "Mentor & Coach",
      description:
        "Provide one-on-one guidance to help migrants navigate their career journey",
      commitment: "2 hours/week",
      skills: "Professional experience, good communication",
      icon_key: "Users",
      color: "text-blue-600",
      bg_color: "bg-blue-100",
      sort_order: 1,
    },
    {
      title: "Workshop Facilitator",
      description:
        "Lead workshops on resume writing, interview skills, or industry-specific topics",
      commitment: "4 hours/month",
      skills: "Expertise in relevant field, teaching ability",
      icon_key: "Clock",
      color: "text-green-600",
      bg_color: "bg-green-100",
      sort_order: 2,
    },
    {
      title: "Translation Support",
      description:
        "Help with document translation and interpretation services",
      commitment: "Flexible",
      skills: "Bilingual proficiency, cultural understanding",
      icon_key: "Heart",
      color: "text-purple-600",
      bg_color: "bg-purple-100",
      sort_order: 3,
    },
    {
      title: "Administrative Support",
      description:
        "Assist with data entry, filing, and general office tasks",
      commitment: "3 hours/week",
      skills: "Basic computer skills, attention to detail",
      icon_key: "Building",
      color: "text-orange-600",
      bg_color: "bg-orange-100",
      sort_order: 4,
    },
  ]);
};