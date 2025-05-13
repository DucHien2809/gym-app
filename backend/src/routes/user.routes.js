const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Bảo vệ tất cả các routes dưới đây
router.use(authMiddleware.protect);

// Routes cho tất cả người dùng
router.route('/')
  .get(authMiddleware.restrictTo('admin', 'trainer'), userController.getAllUsers)
  .post(authMiddleware.restrictTo('admin'), userController.createUser);

// Routes quản lý thông tin một người dùng
router.route('/:id')
  .get(authMiddleware.restrictTo('admin', 'trainer'), userController.getUser)
  .patch(userController.updateUser)
  .delete(authMiddleware.restrictTo('admin'), userController.deleteUser);

// Route để thay đổi vai trò người dùng (chỉ admin mới có quyền)
router.patch('/:id/role', authMiddleware.restrictTo('admin'), userController.changeUserRole);

module.exports = router;
