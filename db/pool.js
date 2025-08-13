const { Pool } = require('pg');
require('dotenv').config()
console.log(process.env.DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // store your Neon string here
  ssl: {
    rejectUnauthorized: false, // needed for Neon
  }
});

module.exports = pool;