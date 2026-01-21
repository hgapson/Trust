exports.up = async function up(knex) {
  return knex.schema.createTable("support_ways", (table) => {
    table.increments("id").primary()

    table.string("title").notNullable()
    table.text("description").notNullable()

    // store icon name in DB (maps to lucide icon on frontend)
    table.string("icon_key").notNullable()

    // keep your Tailwind tokens in DB (same as other sections you built)
    table.string("color").notNullable()
    table.string("bg_color").notNullable()

    table.integer("sort_order").defaultTo(0)
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable("support_ways")
}