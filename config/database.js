const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_post',
  password: 'postgres',
  port: 5432,
});

pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to database:', res.rows[0].current_database);
  }
});

module.exports = pool;