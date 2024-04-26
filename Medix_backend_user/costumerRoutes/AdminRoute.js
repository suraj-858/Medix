const express = require('express')
const router = express.Router();
const adminController = require('../Controllers/AdminController')

router.post('/register_admin', adminController.registerAdmin);

router.delete('/delete_admin', adminController.removeAdmin);


module.exports = router;