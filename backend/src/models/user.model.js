const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng cung cấp tên'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Vui lòng cung cấp email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Vui lòng cung cấp mật khẩu'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'trainer', 'member'],
    default: 'member',
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  profileImage: {
    type: String,
    default: 'default.jpg',
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Middleware để hash mật khẩu trước khi lưu
userSchema.pre('save', async function(next) {
  // Chỉ hash mật khẩu nếu nó bị thay đổi
  if (!this.isModified('password')) return next();
  
  // Hash mật khẩu với độ khó là 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Phương thức để kiểm tra mật khẩu
userSchema.methods.checkPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 