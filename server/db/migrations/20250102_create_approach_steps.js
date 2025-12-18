/**
 * @param {import("knex").Knex} knex
 */
exports.up = async function up(knex) {
  await knex.schema.createTable("approach_steps", (table) => {
    table.increments("id").primary();

    table.string("title").notNullable();
    table.text("description").notNullable();

    // lucide icon name as string
    table.string("icon").notNullable(); // "UserCheck" | "FileText" | "Award" | "Rocket"

    // display number like "01", "02"
    table.string("step").notNullable();

    table.integer("sort_order").notNullable().defaultTo(1);

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("approach_steps");
};