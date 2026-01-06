exports.up = async function up(knex) {
  await knex.raw(
    "UPDATE team_members SET image_url = replace(image_url, '../../public', '') WHERE image_url LIKE '%public/%'"
  );
};

exports.down = async function down(knex) {
  await knex.raw(
    "UPDATE team_members SET image_url = '../../public' || image_url WHERE image_url LIKE '/team/%'"
  );
};
