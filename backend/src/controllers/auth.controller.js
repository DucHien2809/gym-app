const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');

// Tạo JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// Gửi token cho client
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  
  // Xóa mật khẩu khỏi output
  const { password, ...userWithoutPassword } = user;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: userWithoutPassword
    }
  });
};

// Đăng ký tài khoản mới
exports.signup = async (req, res) => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email đã được đăng ký. Vui lòng sử dụng email khác.',
      });
    }

    // Hash mật khẩu trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    
    // Chuyển đổi ngày sinh từ string sang Date nếu có
    let userData = { ...req.body, password: hashedPassword };
    if (userData.dateOfBirth) {
      userData.dateOfBirth = new Date(userData.dateOfBirth);
    }

    // Tạo user mới
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

    // Tạo token JWT
    const token = signToken(newUser.id);

    res.status(201).json({
      status: 'success',
      token,
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

// Đăng nhập người dùng
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Kiểm tra email và password có tồn tại không
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp email và mật khẩu',
      });
    }

    // 2) Kiểm tra nếu người dùng tồn tại
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    // 3) Kiểm tra mật khẩu có đúng không
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    // 4) Nếu mọi thứ ok, gửi token cho client
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Lấy thông tin người dùng hiện tại
exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy người dùng',
      });
    }
    
    // Remove password from output
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}; 