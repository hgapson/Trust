exports.up = function (knex) {
  return knex.schema.createTable("call_to_action", (table) => {
    table.increments("id").primary();

    table.string("heading").notNullable();
    table.text("description").notNullable();

    table.string("phone").notNullable();
    table.string("email").notNullable();
    table.string("location").notNullable();
    table.string("availability").notNullable();

    table.string("image_url").notNullable();

    table.string("card_title").notNullable();
    table.text("card_description").notNullable();

    table.string("cta_label").notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("call_to_action");
};