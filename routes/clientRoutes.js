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

const router = express.Router();

// Place public routes ABOVE any dynamic ones like /:id
router.get('/public-search', searchClientsPublic);
router.get('/public/:id', getPublicClientProfile); // Still fine here

// Auth-protected routes below
router.post('/', protect, registerClient);
router.get('/', protect, getClients);
router.get('/:id', protect, getClientById); 
router.post('/:id/enroll', protect, enrollClientToPrograms);
router.delete('/:id', protect, deleteClient);


module.exports = router;

