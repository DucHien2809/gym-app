const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

// Middleware để kiểm tra xác thực JWT
exports.protect = async (req, res, next) => {
  try {
    // 1) Lấy token và kiểm tra nếu nó tồn tại
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      // Kiểm tra nếu có cookie jwt
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Bạn chưa đăng nhập! Vui lòng đăng nhập để truy cập.',
      });
    }

    // 2) Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Kiểm tra nếu người dùng vẫn tồn tại
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'Người dùng thuộc token này không còn tồn tại.',
      });
    }

    // 4) Lưu người dùng vào request để sử dụng sau này
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Không có quyền truy cập! Vui lòng đăng nhập lại.',
    });
  }
};

// Middleware để kiểm tra quyền của người dùng
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'Bạn không có quyền thực hiện hành động này',
      });
    }
    next();
  };
};

// Middleware đăng xuất
exports.logout = (req, res) => {
  // Xóa cookie JWT
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // Hết hạn sau 10 giây
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: false
  });
  
  res.status(200).json({ status: 'success' });
}; 