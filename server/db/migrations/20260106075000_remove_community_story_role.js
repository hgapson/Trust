/**
 * @param { import("knex").Knex } knex
 */
exports.up = function (knex) {
  return knex.schema.hasColumn("community_stories", "role").then((exists) => {
    if (!exists) return null;
    return knex.schema.alterTable("community_stories", (table) => {
      table.dropColumn("role");
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function (knex) {
  return knex.schema.hasColumn("community_stories", "role").then((exists) => {
    if (exists) return null;
    return knex.schema.alterTable("community_stories", (table) => {
      table.string("role").notNullable();
    });
  });
};
