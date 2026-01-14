module.exports.seed = async function (knex) {
  await knex("contact_methods").del()

  await knex("contact_methods").insert([
    {
      icon_key: "Phone",
      title: "Phone",
      details: "+64 223146756",
      description: "Monday to Friday, 9:00 AM - 5:00 PM",
      action_label: "Call Now",
      sort_order: 1,
    },
    {
      icon_key: "Mail",
      title: "Email",
      details: "waikato.navtrust@outlook.com",
      description: "We respond within 24 hours",
      action_label: "Send Email",
      sort_order: 2,
    },
    {
      icon_key: "MessageSquare",
      title: "WhatsApp",
      details: "+64 223146756",
      description: "Quick questions and support",
      action_label: "Message Us",
      sort_order: 3,
    },
  ])
}