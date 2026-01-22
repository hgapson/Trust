/**
 * @param { import("knex").Knex } knex
 */
exports.up = function (knex) {
  return knex.schema.hasColumn("team_members", "team_type").then((exists) => {
    if (exists) return null;
    return knex.schema.alterTable("team_members", (table) => {
      table.string("team_type").notNullable().defaultTo("staff");
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function (knex) {
  return knex.schema.hasColumn("team_members", "team_type").then((exists) => {
    if (!exists) return null;
    return knex.schema.alterTable("team_members", (table) => {
      table.dropColumn("team_type");
    });
  });
};
