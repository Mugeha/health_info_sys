const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const  authorizeRoles  = require('../middleware/roleMiddleware');
const { getClientAnalyticsSummary } = require('../controllers/analyticsController');

// Only allow users with the "doctor" role (or you can add more roles)
router.get(
  '/summary',
  protect,
  authorizeRoles('admin'),  // ✅ Fixed this line
  getClientAnalyticsSummary
);


module.exports = router;
