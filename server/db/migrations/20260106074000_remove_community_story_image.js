/**
 * @param { import("knex").Knex } knex
 */
exports.up = function (knex) {
  return knex.schema.hasColumn("community_stories", "image_url").then((exists) => {
    if (!exists) return null;
    return knex.schema.alterTable("community_stories", (table) => {
      table.dropColumn("image_url");
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function (knex) {
  return knex.schema.hasColumn("community_stories", "image_url").then((exists) => {
    if (exists) return null;
    return knex.schema.alterTable("community_stories", (table) => {
      table.text("image_url").notNullable();
    });
  });
};
