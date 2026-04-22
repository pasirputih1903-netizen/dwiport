const express = require('express');
const router = express.Router();
const db = require('../config/database');
const sendEmail = require('../config/email');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false,
      message: 'Nama, email, dan pesan wajib diisi!' 
    });
  }

  try {
    // Simpan ke database
    const result = await db.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    // Kirim email otomatis
    await sendEmail(email, name, message);

    res.status(201).json({
      success: true,
      message: 'Pesan berhasil dikirim! Cek email kamu ya 📧',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan, coba lagi nanti.' 
    });
  }
});

module.exports = router;