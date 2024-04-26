const express = require('express')
const router = express.Router();
const UserController = require('../Controllers/UserController')
// const verifyJWT = require('../Middleware/VerifyJwt');

router.post('/verify_email', UserController.emailVerifier);

router.post('/user_register', UserController.userRegister);

router.post('/user_update/:id', UserController.userUpdate);

router.post('/editor_register', UserController.editorRegister);

router.post('/remove_editor/:id', UserController.removeEditor)

module.exports = router;