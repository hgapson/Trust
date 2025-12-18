/**
 * @param {import("knex").Knex} knex
 */
exports.seed = async function seed(knex) {
  await knex("approach_steps").del();

  await knex("approach_steps").insert([
    {
      title: "Initial Assessment",
      description:
        "We learn about your background, skills, and career aspirations to create a personalized pathway",
      icon: "UserCheck",
      step: "01",
      sort_order: 1,
    },
    {
      title: "Skills Development",
      description:
        "Access workshops, training, and resources to enhance your employability in the NZ market",
      icon: "FileText",
      step: "02",
      sort_order: 2,
    },
    {
      title: "Career Matching",
      description:
        "We connect you with employers who value diversity and align with your professional goals",
      icon: "Award",
      step: "03",
      sort_order: 3,
    },
    {
      title: "Ongoing Support",
      description:
        "Continue receiving guidance and mentorship as you establish and grow your career",
      icon: "Rocket",
      step: "04",
      sort_order: 4,
    },
  ]);
};