module.exports.seed = async function (knex) {
  await knex("office_info").del()

  await knex("office_info").insert([
    {
      icon_key: "MapPin",
      title: "Main Office",
      details: "46G Boundary Road, Claudelands, Hamilton 3200, New Zealand",
      extra: "Located inside Settlement center building",
      sort_order: 1,
    },
    {
      icon_key: "Clock",
      title: "Office Hours",
      details: "Monday to Friday: 9:00 AM - 5:00 PM",
      extra: "Closed on public holidays",
      sort_order: 2,
    },
    {
      icon_key: "Car",
      title: "Parking",
      details: "Free parking available",
      extra: "Accessible parking spaces at front entrance",
      sort_order: 3,
    },
    {
      icon_key: "Accessibility",
      title: "Accessibility",
      details: "Wheelchair accessible building",
      extra: "Assistance available upon request",
      sort_order: 4,
    },
  ])
}
