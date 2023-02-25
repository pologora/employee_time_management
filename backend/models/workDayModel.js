const mongoose = require('mongoose');

const twoMonthInSeconds = 5184000;

const workDaySchema = new mongoose.Schema({
  startWork: {
    type: Date,
    required: true,
  },
  endWork: {
    type: Date,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: twoMonthInSeconds,
  },
  pin: {
    type: Number,
    required: true,
    ref: 'Employee',
  },
});

const WorkDay = mongoose.model('WorkDay', workDaySchema);

module.exports = WorkDay;
