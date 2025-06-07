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
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

// ✅ Public routes using publicId
router.get('/public-search', searchClientsPublic);
router.get('/public/:publicId', getPublicClientProfile);

// 🔒 Protected routes using real _id
router.post('/', protect, authorizeRoles('admin', 'staff'), registerClient);
router.get('/', protect, authorizeRoles('admin', 'staff'), getClients);
router.get('/:id', protect, authorizeRoles('admin', 'staff'), getClientById);
router.post('/:id/enroll', protect, authorizeRoles('admin', 'staff'), enrollClientToPrograms);
router.delete('/:id', protect, authorizeRoles('admin'), deleteClient);

module.exports = router;
