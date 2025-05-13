const express = require('express');
const subscriptionController = require('../controllers/subscription.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Bảo vệ tất cả các routes
router.use(authMiddleware.protect);

// Routes cho tất cả subscriptions
router.route('/')
  .get(authMiddleware.restrictTo('admin', 'trainer'), subscriptionController.getAllSubscriptions)
  .post(authMiddleware.restrictTo('admin', 'trainer'), subscriptionController.createSubscription);

// Routes cho một subscription
router.route('/:id')
  .get(subscriptionController.getSubscription)
  .patch(authMiddleware.restrictTo('admin', 'trainer'), subscriptionController.updatePaymentStatus)
  .delete(authMiddleware.restrictTo('admin'), subscriptionController.cancelSubscription);

// Route lấy subscriptions của một thành viên
router.get('/member/:memberId', subscriptionController.getMemberSubscriptions);

module.exports = router;
