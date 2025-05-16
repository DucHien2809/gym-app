const { PrismaClient } = require('../../src/generated/prisma');
const prisma = new PrismaClient();

/**
 * Create a new equipment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createEquipment = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      purchaseDate,
      purchasePrice,
      manufacturer,
      model,
      serialNumber,
      status,
      location,
      lastMaintenance,
      nextMaintenance,
      notes,
      image
    } = req.body;

    // Validate required fields
    if (!name || !description || !category || !purchaseDate || !purchasePrice || !manufacturer) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const equipment = await prisma.equipment.create({
      data: {
        name,
        description,
        category,
        purchaseDate: new Date(purchaseDate),
        purchasePrice: parseFloat(purchasePrice),
        manufacturer,
        model,
        serialNumber,
        status: status || 'available',
        location,
        lastMaintenance: lastMaintenance ? new Date(lastMaintenance) : null,
        nextMaintenance: nextMaintenance ? new Date(nextMaintenance) : null,
        notes,
        image,
        createdById: req.user.id
      }
    });

    return res.status(201).json({
      success: true,
      data: equipment,
      message: 'Equipment created successfully'
    });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create equipment',
      error: error.message
    });
  }
};

/**
 * Get all equipment with optional filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllEquipment = async (req, res) => {
  try {
    const { 
      category, 
      status, 
      search,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (search) {
      filter.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { manufacturer: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get total count for pagination
    const totalCount = await prisma.equipment.count({ where: filter });
    
    // Get equipment with sorting and pagination
    const equipment = await prisma.equipment.findMany({
      where: filter,
      orderBy: { [sort]: order },
      skip,
      take: parseInt(limit),
      include: {
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
      data: equipment,
      meta: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalCount / parseInt(limit))
      },
      message: 'Equipment retrieved successfully'
    });
  } catch (error) {
    console.error('Error retrieving equipment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve equipment',
      error: error.message
    });
  }
};

/**
 * Get equipment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        maintenanceLogs: {
          orderBy: { maintenanceDate: 'desc' },
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: equipment,
      message: 'Equipment retrieved successfully'
    });
  } catch (error) {
    console.error('Error retrieving equipment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve equipment',
      error: error.message
    });
  }
};

/**
 * Update equipment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      purchaseDate,
      purchasePrice,
      manufacturer,
      model,
      serialNumber,
      status,
      location,
      lastMaintenance,
      nextMaintenance,
      notes,
      image
    } = req.body;

    // Check if equipment exists
    const existingEquipment = await prisma.equipment.findUnique({
      where: { id }
    });

    if (!existingEquipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // Update equipment
    const updatedEquipment = await prisma.equipment.update({
      where: { id },
      data: {
        name: name ?? existingEquipment.name,
        description: description ?? existingEquipment.description,
        category: category ?? existingEquipment.category,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : existingEquipment.purchaseDate,
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : existingEquipment.purchasePrice,
        manufacturer: manufacturer ?? existingEquipment.manufacturer,
        model: model ?? existingEquipment.model,
        serialNumber: serialNumber ?? existingEquipment.serialNumber,
        status: status ?? existingEquipment.status,
        location: location ?? existingEquipment.location,
        lastMaintenance: lastMaintenance ? new Date(lastMaintenance) : existingEquipment.lastMaintenance,
        nextMaintenance: nextMaintenance ? new Date(nextMaintenance) : existingEquipment.nextMaintenance,
        notes: notes ?? existingEquipment.notes,
        image: image ?? existingEquipment.image,
        updatedAt: new Date()
      }
    });

    return res.status(200).json({
      success: true,
      data: updatedEquipment,
      message: 'Equipment updated successfully'
    });
  } catch (error) {
    console.error('Error updating equipment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update equipment',
      error: error.message
    });
  }
};

/**
 * Delete equipment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if equipment exists
    const existingEquipment = await prisma.equipment.findUnique({
      where: { id }
    });

    if (!existingEquipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // Delete associated maintenance logs first
    await prisma.maintenanceLog.deleteMany({
      where: { equipmentId: id }
    });

    // Delete equipment
    await prisma.equipment.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Equipment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete equipment',
      error: error.message
    });
  }
}; 