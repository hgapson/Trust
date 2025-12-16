exports.up = function (knex) {
  return knex.schema.createTable("services", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").notNullable();

    table.string("icon").notNullable();     // e.g. "Heart", "Wrench"
    table.string("color").notNullable();    // e.g. "text-pink-600"
    table.string("bgColor").notNullable();  // e.g. "bg-pink-50"

    table.text("modalDetails");

    table.integer("sort_order").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("services");
};