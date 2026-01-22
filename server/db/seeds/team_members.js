exports.seed = async function (knex) {
  await knex("team_members").del();

  await knex("team_members").insert([
    {
      name: "Penny Smith",
      role: "Chief Executive Officer",
      description:
        "Penny has over 15 years in management services and community development",
      image_url: "/team/penny.jpg",
      team_type: "staff",
      sort_order: 1,
    },
    {
      name: "Mookthida",
      role: "Office Manager",
      description:
        "Work placement expert specializing in employment services and community development",
      image_url: "/team/mookthida.jpg",
      team_type: "staff",
      sort_order: 2,
    },
    {
      name: "Leeya",
      role: "Office Administrator",
      description:
        "Certified office administrator with expertise in cross-cultural communication and client relations",
      image_url: "/team/leeya.jpg",
      team_type: "staff",
      sort_order: 3,
    },
  ]);
};
