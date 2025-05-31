const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware.protect);

// Get all appointments (admin only)
router.get(
  '/',
  authMiddleware.restrictTo('admin'),
  appointmentController.getAllAppointments
);

// Get member appointments
router.get(
  '/member/:memberId',
  authMiddleware.restrictTo('admin', 'member'),
  appointmentController.getMemberAppointments
);

// Get trainer appointments
router.get(
  '/trainer/:trainerId',
  authMiddleware.restrictTo('admin', 'trainer'),
  appointmentController.getTrainerAppointments
);

// Create a new appointment
router.post(
  '/',
  appointmentController.createAppointment
);

// Update appointment status
router.patch(
  '/:id',
  appointmentController.updateAppointmentStatus
);

// Delete appointment
router.delete(
  '/:id',
  appointmentController.deleteAppointment
);

module.exports = router; 