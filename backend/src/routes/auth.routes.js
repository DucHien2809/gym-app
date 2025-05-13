const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Đăng ký và đăng nhập (không cần xác thực)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authMiddleware.logout);

// Lấy thông tin người dùng hiện tại (cần xác thực)
router.get('/me', authMiddleware.protect, authController.getMe);

module.exports = router;
