const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Tạo thư mục uploads nếu chưa tồn tại
const uploadsDir = path.join(__dirname, '../../uploads');
const profileImagesDir = path.join(uploadsDir, 'profile-images');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(profileImagesDir)) {
  fs.mkdirSync(profileImagesDir, { recursive: true });
}

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = uploadsDir;
    
    // Phân loại thư mục theo loại upload
    if (req.path.includes('profile')) {
      uploadPath = profileImagesDir;
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Tạo tên file unique với timestamp và user ID
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const userId = req.user.id;
    const fileExtension = path.extname(file.originalname);
    
    if (req.path.includes('profile')) {
      cb(null, `profile-${userId}-${uniqueSuffix}${fileExtension}`);
    } else {
      cb(null, `${uniqueSuffix}${fileExtension}`);
    }
  }
});

// Bộ lọc file
const fileFilter = (req, file, cb) => {
  // Chỉ cho phép file hình ảnh
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép tải lên file hình ảnh!'), false);
  }
};

// Cấu hình multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  }
});

// Route tải lên ảnh đại diện
router.post('/profile-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'Không có file nào được tải lên'
      });
    }

    // Tạo URL để truy cập file
    const imageUrl = `/uploads/profile-images/${req.file.filename}`;
    
    res.status(200).json({
      status: 'success',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: imageUrl,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Route tải lên file chung
router.post('/file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'Không có file nào được tải lên'
      });
    }

    // Tạo URL để truy cập file
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({
      status: 'success',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Error handling middleware cho multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'fail',
        message: 'File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.'
      });
    }
  }
  
  res.status(500).json({
    status: 'error',
    message: error.message
  });
});

module.exports = router; 