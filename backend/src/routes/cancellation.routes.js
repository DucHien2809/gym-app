const express = require('express');
const cancellationController = require('../controllers/cancellation.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Bảo vệ tất cả các routes
router.use(authMiddleware.protect);

// Routes cho tất cả yêu cầu hủy đăng ký
router.route('/')
  .get(authMiddleware.restrictTo('admin', 'trainer'), cancellationController.getAllCancellationRequests)
  .post(cancellationController.requestCancellation);

// Routes cho việc xử lý yêu cầu hủy đăng ký
router.route('/:id')
  .patch(authMiddleware.restrictTo('admin'), cancellationController.processCancellationRequest);

// Route lấy yêu cầu hủy đăng ký của một thành viên
router.get('/member/:memberId', cancellationController.getMemberCancellationRequests);

module.exports = router; 