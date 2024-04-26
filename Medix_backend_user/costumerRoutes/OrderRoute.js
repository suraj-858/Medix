const express = require('express');
const orderController = require('../Controllers/OrderController')
const router = express.Router();

router.post('/createOrder/:id', orderController.createOrder)
router.post('/editOrders/:id', orderController.editOrder)
router.delete('/delete_order/:id', orderController.removeOrder)
router.get('fetch_orders:/id', orderController.fetchOrders);

module.exports = router