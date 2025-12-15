/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function up(knex) {
  await knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('company').notNullable();
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('jobs');
};
