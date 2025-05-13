const prisma = require('../lib/prisma');

// Lấy tất cả gói tập
exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await prisma.membership.findMany({
      where: { active: true },
    });

    res.status(200).json({
      status: 'success',
      results: memberships.length,
      data: {
        memberships,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Lấy thông tin một gói tập
exports.getMembership = async (req, res) => {
  try {
    const membership = await prisma.membership.findUnique({
      where: { id: req.params.id },
    });

    if (!membership) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy gói tập',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        membership,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Tạo gói tập mới
exports.createMembership = async (req, res) => {
  try {
    const newMembership = await prisma.membership.create({
      data: req.body,
    });

    res.status(201).json({
      status: 'success',
      data: {
        membership: newMembership,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Cập nhật thông tin gói tập
exports.updateMembership = async (req, res) => {
  try {
    const membership = await prisma.membership.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.status(200).json({
      status: 'success',
      data: {
        membership,
      },
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy membership
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy gói tập',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Xoá gói tập (thay đổi trạng thái active thành false)
exports.deleteMembership = async (req, res) => {
  try {
    const membership = await prisma.membership.update({
      where: { id: req.params.id },
      data: { active: false },
    });

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy membership
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy gói tập',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}; 