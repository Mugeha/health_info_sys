const express = require('express');
const { registerDoctor, loginDoctor } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);

module.exports = router;
