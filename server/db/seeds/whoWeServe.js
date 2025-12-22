/**
 * @param {import("knex").Knex} knex
 */
exports.seed = async function seed(knex) {
  // safe reset (avoid duplicates)
  await knex("audiences").del();

  await knex("audiences").insert([
    {
      title: "Recent Migrants",
      description:
        "Newcomers to New Zealand seeking to establish their careers in the Waikato region",
      icon: "Globe",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      sort_order: 1,
    },
    {
      title: "Former Refugees",
      description:
        "Individuals rebuilding their lives and looking for meaningful employment opportunities",
      icon: "Home",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      sort_order: 2,
    },
    {
      title: "Career Changers",
      description:
        "Migrants transitioning to new industries or adapting their skills to the local market",
      icon: "Briefcase",
      color: "text-green-600",
      bgColor: "bg-green-50",
      sort_order: 3,
    },
    {
      title: "Skilled Professionals",
      description:
        "Qualified individuals needing support to navigate NZ workplace culture and expectations",
      icon: "GraduationCap",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      sort_order: 4,
    },
  ]);
};