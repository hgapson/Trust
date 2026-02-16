exports.up = async function up(knex) {
  return knex.schema.createTable("workshop_registrations", (table) => {
    table.increments("id").primary()

    table
      .integer("workshop_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("workshops")
      .onDelete("CASCADE")

    table.string("full_name").notNullable()
    table.string("email").notNullable()
    table.string("phone")
    table.text("notes")
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable("workshop_registrations")
}