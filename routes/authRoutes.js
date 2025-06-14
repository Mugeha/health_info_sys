const express = require('express');
const { registerDoctor, loginUser,forgotPassword,
  resetPassword } = require('../controllers/authController');
const { forgotPasswordLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', registerDoctor);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;
