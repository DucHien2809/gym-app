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

// Route riêng để lấy danh sách huấn luyện viên (không cần phân quyền nghiêm ngặt)
router.get('/trainers', userController.getAllTrainers);

// Routes quản lý thông tin một người dùng
router.route('/:id')
  .get(authMiddleware.restrictTo('admin', 'trainer'), userController.getUser)
  .patch(userController.updateUser)
  .delete(authMiddleware.restrictTo('admin'), userController.deleteUser);

// Route để thay đổi vai trò người dùng (chỉ admin mới có quyền)
router.patch('/:id/role', authMiddleware.restrictTo('admin'), userController.changeUserRole);

// Route để thay đổi mật khẩu
router.patch('/:id/password', userController.updatePassword);

// Route để reset mật khẩu (chỉ admin)
router.post('/:id/reset-password', authMiddleware.restrictTo('admin'), userController.resetUserPassword);

module.exports = router;
