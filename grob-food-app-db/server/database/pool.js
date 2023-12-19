const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "roundhouse.proxy.rlwy.net",
  database: "railway",
  password: "6f1*AdDBe-236Bg-A6Bf*1Eb6-Fa4B1G",
  port: 16699,
});

module.exports = pool;
