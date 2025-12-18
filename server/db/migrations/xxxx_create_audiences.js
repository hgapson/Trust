/**
 * @param {import("knex").Knex} knex
 */
exports.up = async function up(knex) {
  await knex.schema.createTable("audiences", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").notNullable();

    // Keep icon as string so frontend maps it to lucide icons
    table.string("icon").notNullable(); // "Globe" | "Home" | "Briefcase" | "GraduationCap"

    table.string("color").notNullable(); // "text-blue-600"
    table.string("bgColor").notNullable(); // "bg-blue-50"

    table.integer("sort_order").notNullable().defaultTo(1);

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("audiences");
};