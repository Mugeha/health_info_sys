const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

exports.registerDoctor = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const newUser = await User.create({ username, password });
    const token = generateToken(newUser);
    res.status(201).json({ user: newUser.username, token });
  } catch (err) {
    res.status(500).json({ message: 'Error registering doctor', error: err.message });
  }
};

exports.loginDoctor = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ user: user.username, token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiry;
    await user.save();

    // Email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetURL = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      to: user.username,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      html: `<p>You requested a password reset</p>
             <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
             <p>This link expires in 1 hour.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending email', error: err.message });
  }
};
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

