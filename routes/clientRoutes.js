const express = require('express');
const {
  registerClient,
  getClients,
  getClientById,
  enrollClientToPrograms,
  getPublicClientProfile,
  searchClientsPublic,
  deleteClient
} = require('../controllers/clientController');

const protect = require('../middleware/authMiddleware');
const  authorizeRoles  = require('../middleware/roleMiddleware');

const router = express.Router();

// ✅ Public routes
router.get('/public-search', searchClientsPublic);
router.get('/public/:id', getPublicClientProfile);

// 🔒 Protected routes with role-based access
router.post('/', protect, authorizeRoles('admin', 'staff'), registerClient);
router.get('/', protect, authorizeRoles('admin', 'staff'), getClients);
router.get('/:id', protect, authorizeRoles('admin', 'staff'), getClientById);
router.post('/:id/enroll', protect, authorizeRoles('admin', 'staff'), enrollClientToPrograms);
router.delete('/:id', protect, authorizeRoles('admin'), deleteClient); // restrict delete to admin

module.exports = router;
