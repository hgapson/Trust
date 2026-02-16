exports.up = async function up(knex) {
  return knex.schema.createTable("volunteer_opportunities", (table) => {
    table.increments("id").primary()

    table.string("title").notNullable()
    table.text("description").notNullable()
    table.string("commitment").notNullable()
    table.string("skills").notNullable()

    // icon & styling
    table.string("icon_key").notNullable()
    table.string("color").notNullable()
    table.string("bg_color").notNullable()

    table.integer("sort_order").defaultTo(0)
    table.boolean("active").defaultTo(true)

    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable("volunteer_opportunities")
}