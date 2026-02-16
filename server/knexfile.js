const path = require("path");

const makeSqlite = (filename) => ({
  client: "sqlite3",
  connection: { filename },
  migrations: { directory: path.join(__dirname, "db/migrations") },
  seeds: { directory: path.join(__dirname, "db/seeds") },
  useNullAsDefault: true,
});

module.exports = {
  development: makeSqlite(path.join(__dirname, "db/dev.sqlite3")),
  production: makeSqlite(process.env.DB_PATH || "/data/app.sqlite"),
};