const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getClientAnalyticsSummary } = require('../controllers/analyticsController');
console.log('DEBUG: getClientAnalyticsSummary is:', getClientAnalyticsSummary);
console.log('DEBUG: protect is:', typeof protect);
console.log('DEBUG: getClientAnalyticsSummary is:', typeof getClientAnalyticsSummary);



router.get('/summary', protect, getClientAnalyticsSummary);

module.exports = router;
