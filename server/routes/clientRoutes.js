const express = require('express');
const { addClient, getClients, updateClient, deleteClient } = require('../controllers/clientController');
const { getClientById } = require('../controllers/clientController');

const router = express.Router();

router.post('/add', addClient);
router.get('/', getClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/:id', getClientById);

module.exports = router;
