const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getClientAnalyticsSummary } = require('../controllers/analyticsController');

// Only allow users with the "doctor" role (or you can add more roles)
router.get(
  '/summary',
  verifyToken,
  authorizeRoles('doctor'), // Or 'admin', 'staff', etc. if you want
  getClientAnalyticsSummary
);

module.exports = router;
