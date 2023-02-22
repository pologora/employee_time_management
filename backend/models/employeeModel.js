const mongoose = require('mongoose');

const workDaySchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
  startOfWork: {
    type: Date,
    required: true,
  },
  endOfWork: {
    type: Date,
  },
});

const vacationSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  typeOfLeave: {
    type: String,
    enum: [
      'wypoczynkowy',
      'okolicznościowy',
      'opieka na dziecko',
      'szkoleniowy',
      'na żądanie',
      'bezpłatny',
    ],
    required: true,
  },
});

const illnessSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  pin: {
    type: Number,
    required: true,
    unique: true,
  },
  workDays: [workDaySchema],
  vacations: [vacationSchema],
  illnesses: [illnessSchema],
  vacationDaysTotal: {
    type: Number,
  },
  vacationDaysUsed: {
    type: Number,
    default: 0,
  },
  vacationDaysRemaining: {
    type: Number,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
