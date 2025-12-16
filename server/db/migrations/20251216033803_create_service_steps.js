exports.up = function (knex) {
  return knex.schema.createTable("service_steps", (table) => {
    table.increments("id").primary();

    table
      .integer("service_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("services")
      .onDelete("CASCADE");

    table.text("step").notNullable();
    table.integer("sort_order").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("service_steps");
};