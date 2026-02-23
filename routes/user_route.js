const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const userController = require('../controllers/user_controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
router.get('/profile', verifyToken, userController.profile);

module.exports = router;