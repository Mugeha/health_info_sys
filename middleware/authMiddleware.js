const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust the path if needed

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user details including role
    const user = await User.findById(decoded.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user; // attach full user to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = protect;
