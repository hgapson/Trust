exports.up = function (knex) {
  return knex.schema.alterTable("community_stories", (table) => {
    table.dropColumn("role");
    table.dropColumn("image_url");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("community_stories", (table) => {
    table.string("role").notNullable().defaultTo("");
    table.text("image_url").notNullable().defaultTo("");
  });
};
