exports.up = function (knex) {
  return knex.schema.createTable("values", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("icon").notNullable();
    table.string("color").notNullable();
    table.string("bg_color").notNullable();
    table.integer("sort_order").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("values");
};