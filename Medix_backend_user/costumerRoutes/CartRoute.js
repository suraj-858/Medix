const express = require('express')
const router = express.Router();
const cartController = require('../Controllers/CartController')


router.post('/create_cart/:id', cartController.createCart);
router.post('/remove_cart_item/:id', cartController.removeCart);
router.get('/get_cart/:id', cartController.fetchUserCart);
router.post('/update_cart_quantity/:id', cartController.updateCartQuantity)

module.exports = router;