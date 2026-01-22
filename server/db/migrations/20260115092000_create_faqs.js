exports.up = function up(knex) {
  return knex.schema.createTable("faqs", (table) => {
    table.increments("id").primary()
    table.text("question").notNullable()
    table.text("answer").notNullable()
    table.integer("sort_order").defaultTo(0)
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable("faqs")
}
