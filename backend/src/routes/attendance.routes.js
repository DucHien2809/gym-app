const express = require('express');
const attendanceController = require('../controllers/attendance.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Bảo vệ tất cả các routes
router.use(authMiddleware.protect);

// Routes cho tất cả attendance
router.route('/')
  .get(authMiddleware.restrictTo('admin', 'trainer'), attendanceController.getAllAttendances)
  .post(authMiddleware.restrictTo('admin', 'trainer'), attendanceController.checkIn);

// Routes cho một attendance
router.route('/:id')
  .patch(authMiddleware.restrictTo('admin', 'trainer'), attendanceController.checkOut)
  .delete(authMiddleware.restrictTo('admin'), attendanceController.deleteAttendance);

// Route lấy attendance của một thành viên
router.get('/member/:memberId', attendanceController.getMemberAttendances);

module.exports = router;
