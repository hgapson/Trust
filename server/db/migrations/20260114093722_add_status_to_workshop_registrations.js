exports.up = async function up(knex) {
  return knex.schema.table("workshop_registrations", (table) => {
    table.string("status").notNullable().defaultTo("new"); // new | contacted | closed
  });
};

exports.down = async function down(knex) {
  return knex.schema.table("workshop_registrations", (table) => {
    table.dropColumn("status");
  });
};