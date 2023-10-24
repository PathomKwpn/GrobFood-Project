const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "grob-food-db",
  password: "admin",
  port: 54320,
});

module.exports = pool;
