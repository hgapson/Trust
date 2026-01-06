exports.up = function (knex) {
  return knex.schema.createTable("team_members", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("role").notNullable();
    table.text("description").notNullable();

    // ✅ image path served by Express static
    table.string("image_url");

    table.integer("sort_order").defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("team_members");
};