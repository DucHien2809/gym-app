const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');

// Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        dateOfBirth: true,
        profileImage: true,
        active: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Lấy thông tin một người dùng
exports.getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        dateOfBirth: true,
        profileImage: true,
        active: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy người dùng',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Tạo người dùng mới (chỉ dành cho admin)
exports.createUser = async (req, res) => {
  try {
    // Hash password nếu có
    let userData = { ...req.body };
    
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12);
    }
    
    // Chuyển đổi ngày sinh từ string sang Date
    if (userData.dateOfBirth) {
      userData.dateOfBirth = new Date(userData.dateOfBirth);
    }
    
    const newUser = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        dateOfBirth: true,
        profileImage: true,
        active: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    // Không cho phép cập nhật mật khẩu thông qua route này
    if (req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Route này không dùng để cập nhật mật khẩu. Vui lòng sử dụng /updatePassword.',
      });
    }
    
    // Kiểm tra quyền: chỉ admin có thể cập nhật bất kỳ người dùng nào
    // hoặc người dùng chỉ có thể cập nhật thông tin của chính mình
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Bạn không có quyền thực hiện hành động này',
      });
    }
    
    // Chuyển đổi ngày sinh từ string sang Date nếu có
    let userData = { ...req.body };
    if (userData.dateOfBirth) {
      userData.dateOfBirth = new Date(userData.dateOfBirth);
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        dateOfBirth: true,
        profileImage: true,
        active: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy user
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy người dùng',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Xoá người dùng
exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy user
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy người dùng',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Kiểm tra role hợp lệ
    if (!['member', 'trainer'].includes(role)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vai trò không hợp lệ. Chỉ có thể chuyển đổi giữa member và trainer',
      });
    }

    // Tìm user và cập nhật role
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy người dùng',
      });
    }

    // Không cho phép thay đổi role của admin
    if (user.role === 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Không thể thay đổi vai trò của admin',
      });
    }

    // Cập nhật role
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { role: role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        dateOfBirth: true,
        profileImage: true,
        active: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}; 