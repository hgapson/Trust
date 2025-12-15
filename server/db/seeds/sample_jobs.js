/**
 * @param {import('knex').Knex} knex
 */
exports.seed = async function seed(knex) {
  await knex('jobs').del();
  await knex('jobs').insert([
    {
      title: 'Frontend Developer',
      company: 'Acme Corp',
      description: 'Work on React and Vite features.'
    },
    {
      title: 'Backend Engineer',
      company: 'Globex',
      description: 'Build APIs with Node and Knex.'
    }
  ]);
};
