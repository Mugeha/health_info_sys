const express = require('express');
const { getClientPublicProfile } = require('../controllers/publicController');

const router = express.Router();

router.get('/client/:id', getClientPublicProfile); // No auth

module.exports = router;
