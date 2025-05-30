const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Include role in JWT payload
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email, 
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};



exports.registerDoctor = async (req, res) => {
  const { username, email, password, role = 'admin' } = req.body; // Default to 'admin' or 'doctor'

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = await User.create({ username, email, password, role });
    const token = generateToken(newUser);

    res.status(201).json({
      user: {
        username: newUser.username,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error registering doctor', error: err.message });
  }
};

// Doctor login with role returned
exports.loginUser = async (req, res) => {
const { email, password } = req.body;

  try {
const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role, // ✅ only trust DB role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      user: {
            email: user.email,
        username: user.username,
        role: user.role, // ✅ send real role back to frontend
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};



exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user found with that email' });

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
      html,
    });

    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending reset email', error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
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
