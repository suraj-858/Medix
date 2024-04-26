const express = require('express')
const router = express.Router();
const authController = require('../Controllers/AuthController')
const verifyJWT = require('../Middleware/VerifyJwt');

// router.use(verifyJWT);


router.post('/login', authController.Login)

router.get('/refresh', authController.refresh)

router.post('/logout', authController.Logout)

module.exports = router;