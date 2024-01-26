const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
