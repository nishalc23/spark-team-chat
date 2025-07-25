const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sparkdb",
  password: "F883bafdaf!",
  port: 5432,
});

module.exports = pool;