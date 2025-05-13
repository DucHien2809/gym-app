const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Vui lòng cung cấp thành viên'],
  },
  checkInTime: {
    type: Date,
    required: [true, 'Vui lòng cung cấp thời gian check-in'],
    default: Date.now,
  },
  checkOutTime: {
    type: Date,
  },
  duration: {
    type: Number, // Thời gian tập tính bằng phút
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
});

// Virtual property để tính thời gian tập
attendanceSchema.virtual('trainingDuration').get(function() {
  if (this.checkOutTime) {
    return Math.round((this.checkOutTime - this.checkInTime) / (1000 * 60)); // Trả về số phút
  }
  return 0;
});

// Middleware để cập nhật trường duration trước khi lưu
attendanceSchema.pre('save', function(next) {
  if (this.checkOutTime) {
    this.duration = Math.round((this.checkOutTime - this.checkInTime) / (1000 * 60));
  }
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance; 