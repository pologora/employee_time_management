const mongoose = require('mongoose');

const workDaySchema = new mongoose.Schema({
  startWorkDay: {
    type: Date,
    required: true,
  },
  endworkDay: {
    type: Date,
  },
  startOfWorkTime: {
    type: Date,
    required: true,
  },
  endOfWorkTime: {
    type: Date,
  },
});

const vacationSchema = new mongoose.Schema({
  startDay: {
    type: Date,
    required: true,
  },
  endDay: {
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
    default: 'wypoczynkowy',
  },
});

const illnessSchema = new mongoose.Schema({
  startDay: {
    type: Date,
    required: true,
  },
  endDay: {
    type: Date,
    required: true,
  },
});

const employeeSchema = new mongoose.Schema(
  {
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
      min: 101,
    },
    workDays: [workDaySchema],
    vacationDays: [vacationSchema],
    illnesseDays: [illnessSchema],
    vacationDaysTotal: {
      type: Number,
    },
    vacationDaysUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

employeeSchema.virtual('vacationDaysRemaining').get(function getVacationDaysRemaining() {
  return this.vacationDaysTotal - this.vacationDaysUsed;
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
