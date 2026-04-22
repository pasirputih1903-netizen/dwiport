const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, name, message) => {
  const mailOptions = {
    from: '"DWIPORT" <' + process.env.EMAIL_USER + '>',
    to: to,
    subject: 'Pesan kamu sudah kami terima! - DWIPORT',
    html: '<h2>Halo, ' + name + '!</h2><p>Terima kasih sudah menghubungi kami.</p><p>Pesan kamu: ' + message + '</p><p>Kami akan segera menghubungi kamu dalam 1x24 jam.</p><p>Salam, Tim DWIPORT</p>'
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email terkirim ke:', to);
  console.log('Message ID:', info.messageId);
};

module.exports = sendEmail;