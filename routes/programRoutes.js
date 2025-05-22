const express = require('express');
const { createProgram, getPrograms } = require('../controllers/programController');
const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Only 'staff' and 'admin' can access these routes
router.post('/', protect, authorizeRoles('staff', 'admin'), createProgram);
router.get('/', protect, authorizeRoles('staff', 'admin'), getPrograms);

module.exports = router;
