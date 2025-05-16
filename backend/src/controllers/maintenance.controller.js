const { PrismaClient } = require('../../src/generated/prisma');
const prisma = new PrismaClient();

/**
 * Create a new maintenance log
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createMaintenanceLog = async (req, res) => {
  try {
    const {
      equipmentId,
      maintenanceDate,
      maintenanceType,
      description,
      cost,
      technician,
      parts,
      status
    } = req.body;

    // Validate required fields
    if (!equipmentId || !maintenanceType || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if equipment exists
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId }
    });

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // Create maintenance log
    const maintenanceLog = await prisma.maintenanceLog.create({
      data: {
        equipmentId,
        maintenanceDate: maintenanceDate ? new Date(maintenanceDate) : new Date(),
        maintenanceType,
        description,
        cost: cost ? parseFloat(cost) : null,
        technician,
        parts,
        status: status || 'completed',
        createdById: req.user.id
      }
    });

    // Update the equipment's last maintenance date
    await prisma.equipment.update({
      where: { id: equipmentId },
      data: {
        lastMaintenance: maintenanceLog.maintenanceDate,
        status: status === 'completed' ? 'available' : 'maintenance'
      }
    });

    return res.status(201).json({
      success: true,
      data: maintenanceLog,
      message: 'Maintenance log created successfully'
    });
  } catch (error) {
    console.error('Error creating maintenance log:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create maintenance log',
      error: error.message
    });
  }
};

/**
 * Get all maintenance logs for an equipment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMaintenanceLogs = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const { 
      status,
      sort = 'maintenanceDate',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = { equipmentId };
    
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get total count for pagination
    const totalCount = await prisma.maintenanceLog.count({ where: filter });
    
    // Get maintenance logs with sorting and pagination
    const maintenanceLogs = await prisma.maintenanceLog.findMany({
      where: filter,
      orderBy: { [sort]: order },
      skip,
      take: parseInt(limit),
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            category: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: maintenanceLogs,
      meta: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalCount / parseInt(limit))
      },
      message: 'Maintenance logs retrieved successfully'
    });
  } catch (error) {
    console.error('Error retrieving maintenance logs:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve maintenance logs',
      error: error.message
    });
  }
};

/**
 * Get maintenance log by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMaintenanceLogById = async (req, res) => {
  try {
    const { id } = req.params;

    const maintenanceLog = await prisma.maintenanceLog.findUnique({
      where: { id },
      include: {
        equipment: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!maintenanceLog) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance log not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: maintenanceLog,
      message: 'Maintenance log retrieved successfully'
    });
  } catch (error) {
    console.error('Error retrieving maintenance log:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve maintenance log',
      error: error.message
    });
  }
};

/**
 * Update maintenance log by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateMaintenanceLog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      maintenanceDate,
      maintenanceType,
      description,
      cost,
      technician,
      parts,
      status
    } = req.body;

    // Check if maintenance log exists
    const existingLog = await prisma.maintenanceLog.findUnique({
      where: { id },
      include: { equipment: true }
    });

    if (!existingLog) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance log not found'
      });
    }

    // Update maintenance log
    const updatedLog = await prisma.maintenanceLog.update({
      where: { id },
      data: {
        maintenanceDate: maintenanceDate ? new Date(maintenanceDate) : existingLog.maintenanceDate,
        maintenanceType: maintenanceType ?? existingLog.maintenanceType,
        description: description ?? existingLog.description,
        cost: cost ? parseFloat(cost) : existingLog.cost,
        technician: technician ?? existingLog.technician,
        parts: parts ?? existingLog.parts,
        status: status ?? existingLog.status,
        updatedAt: new Date()
      }
    });

    // If status changed to 'completed', update equipment status
    if (status === 'completed' && existingLog.status !== 'completed') {
      await prisma.equipment.update({
        where: { id: existingLog.equipmentId },
        data: {
          lastMaintenance: updatedLog.maintenanceDate,
          status: 'available'
        }
      });
    } else if (status !== 'completed' && existingLog.status === 'completed') {
      // If changed from completed to another status, mark equipment as in maintenance
      await prisma.equipment.update({
        where: { id: existingLog.equipmentId },
        data: {
          status: 'maintenance'
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedLog,
      message: 'Maintenance log updated successfully'
    });
  } catch (error) {
    console.error('Error updating maintenance log:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update maintenance log',
      error: error.message
    });
  }
};

/**
 * Delete maintenance log by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteMaintenanceLog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if maintenance log exists
    const existingLog = await prisma.maintenanceLog.findUnique({
      where: { id }
    });

    if (!existingLog) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance log not found'
      });
    }

    // Delete maintenance log
    await prisma.maintenanceLog.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Maintenance log deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting maintenance log:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete maintenance log',
      error: error.message
    });
  }
}; 