module.exports.seed = async function (knex) {
  await knex("supported_languages").del()

  await knex("supported_languages").insert([
    { name: "English", sort_order: 1 },
    { name: "Arabic", sort_order: 2 },
    { name: "Mandarin", sort_order: 3 },
    { name: "Hindi", sort_order: 4 },
    { name: "Spanish", sort_order: 5 },
    { name: "French", sort_order: 6 },
    { name: "Swahili", sort_order: 7 },
    { name: "Dari", sort_order: 8 },
    { name: "Farsi", sort_order: 9 },
    { name: "Tamil", sort_order: 10 },
    { name: "Urdu", sort_order: 11 },
    { name: "Somali", sort_order: 12 },
  ])
}
