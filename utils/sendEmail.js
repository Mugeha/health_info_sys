// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., sandbox.smtp.mailtrap.io
      port: process.env.EMAIL_PORT, // e.g., 587 or 2525 (depends on Mailtrap config)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to', to);
  } catch (err) {
    console.error('❌ Error sending email:', err.message);
    throw err;
  }
};

module.exports = sendEmail;
