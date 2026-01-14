module.exports.seed = async function (knex) {
  await knex("process_steps").del();

  await knex("process_steps").insert([
    {
      step_number: 1,
      title: "Initial Assessment",
      description: "We understand your background, skills, and goals",
      sort_order: 1,
    },
    {
      step_number: 2,
      title: "Personalized Plan",
      description: "Create a customized employment strategy",
      sort_order: 2,
    },
    {
      step_number: 3,
      title: "Skills Development",
      description: "Participate in relevant workshops and training",
      sort_order: 3,
    },
    {
      step_number: 4,
      title: "Job Placement",
      description: "Get matched with suitable employment opportunities",
      sort_order: 4,
    },
  ]);
};