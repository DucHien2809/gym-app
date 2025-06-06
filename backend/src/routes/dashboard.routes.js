const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Admin dashboard routes
router.get('/admin', authMiddleware.restrictTo('admin'), dashboardController.getAdminDashboardStats);

// Trainer dashboard routes
router.get('/trainer', authMiddleware.restrictTo('trainer'), dashboardController.getTrainerDashboardStats);

module.exports = router; 