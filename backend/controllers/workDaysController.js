const WorkDay = require('../models/workDayModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAssync');

exports.startEndWorkHandler = catchAsync(async (req, res, next) => {
  const { pin } = req.params;
  const {
    employee,
    employee: { isWorking },
  } = req;

  const { startWork, endWork } = req.body;
  let newWorkTime;
  if (startWork) {
    if (isWorking) {
      return next(new AppError('Employee is already working'), 400);
    }
    newWorkTime = await WorkDay.create({ startWork, pin });
    employee.isWorking = true;
  }

  if (endWork) {
    if (!isWorking) {
      return next(new AppError('Employee is not currently working'), 400);
    }
    newWorkTime = await WorkDay.findOneAndUpdate(
      { pin, endWork: { $exists: false } },
      { $set: { endWork } },
      { new: true },
    );

    if (!newWorkTime) {
      return next(
        new AppError(
          `No active workday was found for the employee with the given parameters. 
          Please make sure the employee is currently working before ending their workday.`,
          400,
        ),
      );
    }
    employee.isWorking = false;
  }

  const updatedEmployee = await employee.save();

  return res.status(200).json({
    status: 'success',
    data: {
      updatedEmployee,
      newWorkTime,
    },
  });
});

exports.updateWorkTime = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { startWork, endWork } = req.body;

  const newWorkTime = await WorkDay.findByIdAndUpdate(id, { startWork, endWork });

  if (startWork > endWork) {
    return next(new AppError('End time could not be later than a start time', 400));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      newWorkTime,
    },
  });
});

exports.getWorkDaysByEmployeePin = catchAsync(async (req, res, next) => {
  const { pin } = req.params;
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  let startDay;
  let endDay;

  if (req.query.startDay && req.query.endDay) {
    startDay = new Date(req.query.startDay);
    endDay = new Date(req.query.endDay);
  } else {
    startDay = new Date(thisYear, thisMonth, 1);
    endDay = new Date(thisYear, thisMonth + 1, 0, '24');
  }

  const workDays = await WorkDay.find({
    pin,
    startWork: { $gte: startDay },
    endWork: { $lte: endDay },
  });

  return res.status(200).json({
    status: 'success',
    length: workDays.length,
    data: {
      workDays,
    },
  });
});

exports.deleteWorkDay = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedDay = await WorkDay.findByIdAndDelete(id);

  if (!deletedDay) {
    return next(new AppError('No such ID', 400));
  }

  return res.status(204).json({
    status: 'success',
    message: 'Document deleted',
  });
});
