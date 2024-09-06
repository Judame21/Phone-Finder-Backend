// test-db-connection.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

async function testConnection() {
  try {
    // Realiza una consulta simple para verificar la conexión
    const res = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', res.rows);
  } catch (err) {
    console.error('Database connection error:', err.stack);
  } finally {
    await pool.end(); // Cierra la conexión cuando termines
  }
}

testConnection();