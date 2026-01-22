/**
 * @param { import("knex").Knex } knex
 */
exports.up = function (knex) {
  return knex.schema.alterTable("community_stories", (table) => {
    table.text("image_url").nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function (knex) {
  return knex.schema.alterTable("community_stories", (table) => {
    table.text("image_url").notNullable().alter();
  });
};
