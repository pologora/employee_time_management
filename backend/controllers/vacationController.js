const Employee = require('../models/employeeModel');
const catchAsync = require('../utils/catchAssync');
const { calculateVacationDays } = require('../utils/vacationUtils');

exports.addVacation = catchAsync(async (req, res, next) => {
  const { startDay, endDay, typeOfLeave } = req.body;

  const { employee } = req;

  const newStartDay = new Date(startDay);
  const newEndDay = new Date(endDay);

  const vacationDays = calculateVacationDays(newStartDay, newEndDay, typeOfLeave);
  if (vacationDays > employee.vacationDaysRemaining) {
    return res.status(400).json({
      status: 'fail',
      message: 'Not enough vacation days remaining',
    });
  }

  const conflictVacationPeriod = employee.vacationDays.find(
    (vacation) => (newStartDay >= vacation.startDay && newStartDay <= vacation.endDay)
      || (newEndDay >= vacation.startDay && newEndDay <= vacation.endDay)
      || (vacation.startDay >= newStartDay && vacation.startDay <= newEndDay)
      || (vacation.endDay >= newStartDay && vacation.endDay <= newEndDay),
  );

  if (conflictVacationPeriod) {
    return res.status(400).json({
      status: 'fail',
      message: 'Vacation period already exists for the selected dates.',
    });
  }

  employee.vacationDays.push({
    startDay,
    endDay,
    typeOfLeave,
  });

  employee.vacationDaysUsed += vacationDays;

  const updatedEmpoyee = await employee.save();

  return res.status(200).json({
    status: 'success',
    data: {
      updatedEmpoyee,
    },
  });
});

exports.deleteVacation = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { employee } = req;

  const vacationIndex = employee.vacationDays.findIndex(
    (vacation) => vacation.id.toString() === id,
  );

  if (vacationIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Vacation period not found',
    });
  }

  const { startDay, endDay, typeOfLeave } = employee.vacationDays.id(id);
  const vacationDaysUsed = calculateVacationDays(startDay, endDay, typeOfLeave);
  employee.vacationDaysUsed -= vacationDaysUsed;

  employee.vacationDays.splice(vacationIndex, 1);

  const updatedEmployee = await employee.save();

  return res.status(200).json({
    status: 'success',
    data: {
      employee: updatedEmployee,
    },
  });
});

exports.getVacationsByDate = catchAsync(async (req, res, next) => {
  const { pin } = req.params;
  const thisYear = new Date().getFullYear();

  const startDay = req.query.startDay || `${thisYear}-01-01`;
  const endDay = req.query.endDay || `${thisYear}-12-31`;

  const vacations = await Employee.findOne(
    {
      pin,
      'vacationDays.startDay': { $gte: startDay },
      'vacationDays.endDay': { $lte: endDay },
    },
    {
      vacationDaysTotal: 1,
      vacationDaysUsed: 1,
      vacationDaysRemaining: 1,
      vacationDays: 1,
    },
  );

  res.status(200).json({
    status: 'success',
    data: {
      vacations,
    },
  });
});
