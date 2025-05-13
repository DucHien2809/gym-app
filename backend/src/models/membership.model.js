const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng cung cấp tên gói tập'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Vui lòng mô tả gói tập'],
    trim: true,
  },
  duration: {
    type: Number, // Số tháng
    required: [true, 'Vui lòng cung cấp thời hạn gói tập'],
    min: 1,
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng cung cấp giá gói tập'],
    min: 0,
  },
  features: {
    type: [String],
    default: [],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware để cập nhật trường updatedAt
membershipSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership; 