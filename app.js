const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./src/config/database');
const contactRoute = require('./src/routes/contact');
const authRoute = require('./src/routes/admin');
const adminRoute = require('./src/routes/adminRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);

app.get('/', (req, res) => {
  res.json({ 
    message: 'DWIPORT Backend berjalan! 🚀',
    status: 'OK'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server DWIPORT aktif di http://localhost:${PORT}`);
});