exports.up = function up(knex) {
  return knex.schema.createTable("supported_languages", (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table.integer("sort_order").defaultTo(0)
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable("supported_languages")
}
