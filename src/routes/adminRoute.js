const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Middleware cek token
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan, silakan login dulu!'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid!'
    });
  }
};

// GET /api/admin/contacts — lihat semua pesan
router.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      total: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan!'
    });
  }
});

module.exports = router;