const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log('✅ Database Supabase berhasil terhubung!'))
  .catch(err => console.error('❌ Gagal koneksi database:', err));

module.exports = pool;