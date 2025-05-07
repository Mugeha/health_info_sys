const express = require('express');
const {
  registerClient,
  getClients,
  getClientById,
  enrollClientToPrograms,
  getPublicClientProfile
} = require('../controllers/clientController');
const { searchClientsPublic } = require('../controllers/clientController');


const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, registerClient);                       // Register client
router.get('/', protect, getClients);                            // Search/list clients
router.get('/public/:id', getPublicClientProfile); // no auth
router.get('/:id', protect, getClientById);                      // View profile
router.post('/:id/enroll', protect, enrollClientToPrograms);     // Enroll in programs

router.get('/public-search', searchClientsPublic); // new public search route


module.exports = router;

