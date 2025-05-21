const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Trong môi trường thực tế, sử dụng biến môi trường
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER || 'your-email@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'your-email-password';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Tin Tức 24h <noreply@tintuc24h.vn>';

// Tạo transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Kiểm tra kết nối
transporter.verify(function(error, success) {
  if (error) {
    logger.error(`Email configuration error: ${error.message}`);
  } else {
    logger.info('Email server is ready to send messages');
  }
});

// Gửi email
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

module.exports = {
  sendEmail
};