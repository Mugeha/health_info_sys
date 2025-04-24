const express = require('express');
const { createProgram, getPrograms } = require('../controllers/programController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createProgram);   // create program
router.get('/', protect, getPrograms);      // list programs

module.exports = router;
