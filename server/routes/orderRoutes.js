const express = require('express');
const { createOrder, getOrders, updateOrder, deleteOrder} = require('../controllers/orderController');

const router = express.Router();

router.post('/create', createOrder);
router.get('/', getOrders);
router.put('/:id', updateOrder); // ✅ Route de mise à jour
router.delete('/:id', deleteOrder); // ✅ Route de suppression

module.exports = router;
