const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Vui lòng cung cấp thành viên'],
  },
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
    required: [true, 'Vui lòng cung cấp gói tập'],
  },
  startDate: {
    type: Date,
    required: [true, 'Vui lòng cung cấp ngày bắt đầu'],
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: [true, 'Vui lòng cung cấp ngày kết thúc'],
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentAmount: {
    type: Number,
    required: [true, 'Vui lòng cung cấp số tiền thanh toán'],
  },
  paymentDate: {
    type: Date,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'credit_card'],
    default: 'cash',
  },
  active: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
subscriptionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription; 