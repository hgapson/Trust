exports.up = function (knex) {
  return knex.schema.createTable("community_stories", (table) => {
    table.increments("id").primary();
    table.text("quote").notNullable();
    table.string("author").notNullable();
    table.string("role").notNullable();
    table.text("image_url").notNullable();
    table.integer("sort_order").defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("community_stories");
};