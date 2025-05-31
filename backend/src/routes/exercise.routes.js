const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Bảo vệ tất cả các routes
router.use(authMiddleware.protect);

// Route mặc định
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Exercise API is available but not fully implemented yet',
    data: {
      exercises: []
    }
  });
});

module.exports = router; 