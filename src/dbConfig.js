// config.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'thesims3',
  port: 5432,
});

module.exports = pool;