/**
 * @param {import('knex').Knex} knex
 */
module.exports.seed = async function (knex) {
  await knex("additional_services").del()

  await knex("additional_services").insert([
    {
      title: "Language Support",
      description: "English language improvement for workplace communication",
      icon_key: "BookOpen",
      sessions: "3x per week",
      sort_order: 1,
    },
    {
      title: "Legal Assistance",
      description: "Work visa and employment rights guidance",
      icon_key: "CheckCircle",
      sessions: "By appointment",
      sort_order: 2,
    },
    {
      title: "Childcare Support",
      description: "Childcare assistance during training sessions",
      icon_key: "Users",
      sessions: "During programs",
      sort_order: 3,
    },
    {
      title: "Transportation",
      description: "Transport assistance to interviews and workplace",
      icon_key: "MapPin",
      sessions: "As needed",
      sort_order: 4,
    },
  ])
}