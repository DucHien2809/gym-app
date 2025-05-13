const express = require('express');
const membershipController = require('../controllers/membership.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Routes công khai để xem gói tập
router.get('/', membershipController.getAllMemberships);
router.get('/:id', membershipController.getMembership);

// Bảo vệ tất cả các routes dưới đây
router.use(authMiddleware.protect);

// Routes để quản lý gói tập (chỉ dành cho admin và trainer)
router
  .route('/')
  .get(membershipController.getAllMemberships)
  .post(
    authMiddleware.restrictTo('admin', 'trainer'),
    membershipController.createMembership
  );

router
  .route('/:id')
  .get(membershipController.getMembership)
  .patch(
    authMiddleware.restrictTo('admin', 'trainer'),
    membershipController.updateMembership
  )
  .delete(
    authMiddleware.restrictTo('admin'), 
    membershipController.deleteMembership
  );

module.exports = router;
