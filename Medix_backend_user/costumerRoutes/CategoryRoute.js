const express = require('express')
const router = express.Router();
const categoryController = require('../Controllers/CategoryController')


router.post('/create_category', categoryController.createCategory);
router.post('/update_category/:id', categoryController.updateCategory);
router.delete('/delete_category/:id', categoryController.removeCategory);
router.post('/create_sub_category/:id', categoryController.createSubCategory);
router.post('/update_sub_category/:id', categoryController.updateSubCategory);
router.post('add_product', categoryController.addProduct);
router.delete('/remove_product', categoryController.removeProduct);
router.post('/remove_sub_category/:id', categoryController.removeSubCategory);


//category retrival
router.get('/get_category', categoryController.getAllCategory);
router.get('/get_sub_category/:id', categoryController.getAllSubCategory);

module.exports = router;