exports.up = function (knex) {
  return knex.schema.createTable("mission_vision", (table) => {
    table.increments("id").primary();

    table.string("mission_title").notNullable();
    table.text("mission_description").notNullable();

    table.string("vision_title").notNullable();
    table.text("vision_description").notNullable();

    table.text("image_url").notNullable();

    table.timestamps(true, true); // created_at, updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("mission_vision");
};