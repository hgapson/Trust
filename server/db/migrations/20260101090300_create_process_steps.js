exports.up = async function up(knex) {
  return knex.schema.createTable("process_steps", (table) => {
    table.increments("id").primary();

    table.integer("step_number").notNullable(); // 1, 2, 3, 4
    table.string("title").notNullable();
    table.text("description").notNullable();

    table.integer("sort_order").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable("process_steps");
};