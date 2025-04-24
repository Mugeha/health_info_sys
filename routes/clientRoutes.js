const express = require('express');
const {
  registerClient,
  getClients,
  getClientById,
  enrollClientToPrograms
} = require('../controllers/clientController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, registerClient);                       // Register client
router.get('/', protect, getClients);                            // Search/list clients
router.get('/:id', protect, getClientById);                      // View profile
router.post('/:id/enroll', protect, enrollClientToPrograms);     // Enroll in programs

module.exports = router;
