/**
 * @param { import("knex").Knex } knex
 */
exports.up = function (knex) {
  return knex.schema.hasColumn("team_members", "image_url").then((exists) => {
    if (exists) return null;
    return knex.schema.alterTable("team_members", (table) => {
      table.string("image_url"); // allow null by default
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function (knex) {
  return knex.schema.hasColumn("team_members", "image_url").then((exists) => {
    if (!exists) return null;
    return knex.schema.alterTable("team_members", (table) => {
      table.dropColumn("image_url");
    });
  });
};
