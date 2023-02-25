const mongoose = require('mongoose');

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
    default: new Date(),
    expire: 20,
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
    isSNTI: {
      type: Boolean,
      default: false,
    },
    isWorking: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      default: new Date(),
      expire: 40,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

employeeSchema.pre('save', async function generatePin(next) {
  if (this.isNew && !this.pin) {
    const lastEmployee = await this.constructor.findOne({}, { pin: 1 }, { sort: { pin: -1 } });
    this.pin = lastEmployee ? lastEmployee.pin + 1 : 101;
  }
  next();
});

employeeSchema.virtual('vacationDaysRemaining').get(function getVacationDaysRemaining() {
  return this.vacationDaysTotal - this.vacationDaysUsed;
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
