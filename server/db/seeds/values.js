exports.seed = async function (knex) {
  await knex("values").del();

  await knex("values").insert([
    {
      title: "Obligation",
      description:
        "We provide a safe environment that fosters a sense of trust, value and respect.",
      icon: "Shield",
      color: "text-blue-600",
      bg_color: "bg-blue-50",
      sort_order: 1,
    },
    {
      title: "Incredible Services",
      description:
        "We demonstrate outcomes, promote transparency, foster community, and ensure accountability.",
      icon: "Award",
      color: "text-purple-600",
      bg_color: "bg-purple-50",
      sort_order: 2,
    },
    {
      title: "Principles",
      description: "Consistent delivery through ethical actions and results.",
      icon: "CheckCircle",
      color: "text-green-600",
      bg_color: "bg-green-50",
      sort_order: 3,
    },
    {
      title: "Acceptance",
      description:
        "We foster a sense of belonging and purpose. Every individual is valued.",
      icon: "Users",
      color: "text-teal-600",
      bg_color: "bg-teal-50",
      sort_order: 4,
    },
  ]);
};