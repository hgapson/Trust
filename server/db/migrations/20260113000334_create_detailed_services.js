exports.up = async function (knex) {
  await knex.schema.createTable("detailed_services", (table) => {
    table.string("id").primary()
    table.string("title").notNullable()
    table.string("icon").notNullable()
    table.string("color").notNullable()
    table.string("bg_color").notNullable()
    table.string("image_url").notNullable()
    table.text("description").notNullable()
    table.integer("sort_order").defaultTo(0)
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })

  await knex.schema.createTable("detailed_service_features", (table) => {
    table.increments("id").primary()
    table
      .string("service_id")
      .notNullable()
      .references("id")
      .inTable("detailed_services")
      .onDelete("CASCADE")
    table.string("feature").notNullable()
    table.integer("sort_order").defaultTo(0)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("detailed_service_features")
  await knex.schema.dropTableIfExists("detailed_services")
}