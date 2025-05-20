const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getClientAnalyticsSummary } = require('../controllers/analyticsController');

router.get('/summary', protect, getClientAnalyticsSummary);

module.exports = router;
