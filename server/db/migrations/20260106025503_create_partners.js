/**
 * @param {import("knex").Knex} knex
 */
exports.up = function up(knex) {
  return knex.schema.createTable("partners", (table) => {
    table.increments("id").primary();

    table.string("type").notNullable(); // 'partner' | 'funder'
    table.string("name").notNullable();

    table.string("logo_url");
    table.string("website_url");

    table.string("focus").notNullable();
    table.text("description").notNullable();
    table.string("location").notNullable();
    table.string("contribution").notNullable();

    table.integer("sort_order").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param {import("knex").Knex} knex
 */
exports.down = function down(knex) {
  return knex.schema.dropTableIfExists("partners");
};