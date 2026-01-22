exports.up = function up(knex) {
  return knex.schema.createTable("office_info", (table) => {
    table.increments("id").primary()
    table.string("icon_key").notNullable()
    table.string("title").notNullable()
    table.string("details").notNullable()
    table.text("extra")
    table.integer("sort_order").defaultTo(0)
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable("office_info")
}
