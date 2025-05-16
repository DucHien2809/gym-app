const express = require('express');
const equipmentController = require('../controllers/equipment.controller');
const maintenanceController = require('../controllers/maintenance.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Equipment routes
router.route('/')
  .get(equipmentController.getAllEquipment)
  .post(authMiddleware.restrictTo('admin'), equipmentController.createEquipment);

router.route('/:id')
  .get(equipmentController.getEquipmentById)
  .patch(authMiddleware.restrictTo('admin'), equipmentController.updateEquipment)
  .delete(authMiddleware.restrictTo('admin'), equipmentController.deleteEquipment);

// Maintenance logs routes
router.route('/:equipmentId/maintenance')
  .get(maintenanceController.getMaintenanceLogs)
  .post(authMiddleware.restrictTo('admin'), maintenanceController.createMaintenanceLog);

router.route('/maintenance/:id')
  .get(maintenanceController.getMaintenanceLogById)
  .patch(authMiddleware.restrictTo('admin'), maintenanceController.updateMaintenanceLog)
  .delete(authMiddleware.restrictTo('admin'), maintenanceController.deleteMaintenanceLog);

module.exports = router; 