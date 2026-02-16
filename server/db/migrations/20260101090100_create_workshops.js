exports.up = async function up(knex) {
  return knex.schema.createTable("workshops", (table) => {
    table.increments("id").primary()
    table.string("title").notNullable()
    table.text("description")
    table.datetime("start_at").notNullable()
    table.datetime("end_at").notNullable()
    table.string("location")
    table.integer("capacity")
    table.boolean("is_active").notNullable().defaultTo(true)
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable("workshops")
}