const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); // new import

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

exports.registerDoctor = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: 'Username or email already exists' });

    const newUser = await User.create({ username, email, password });
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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user found with that email' });

    // Debug: Log the user email found
    console.log("User found for password reset:", user.email);

    // Sanity check before sending email
    if (!user.email) {
      console.error("User found but email is undefined.");
      return res.status(500).json({ message: "User email not defined." });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 3600000;

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiry;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const html = `
      <p>You requested a password reset</p>
      <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
      <p>This link will expire in 1 hour.</p>
    `;

    await sendEmail({
  to: user.email,
  subject: 'Password Reset Request',
  html
});


    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (err) {
    console.error('EMAIL ERROR:', err);
    res.status(500).json({ message: 'Error sending reset email', error: err.message });
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
