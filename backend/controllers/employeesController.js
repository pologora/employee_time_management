const Employee = require('../models/employeeModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAssync');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const employees = await Employee.find();

  res.status(200).json({
    status: 'success',
    length: employees.length,
    data: {
      employees,
    },
  });
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  const newEmployee = await Employee.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newEmployee,
    },
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const { pin } = req.params;

  const employee = await Employee.findOneAndUpdate({ pin }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!employee) {
    return next(new AppError(`Brak pracownika z pinem: ${pin}`, 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  const { pin } = req.params;

  const employee = await Employee.findOne({ pin });

  if (!employee) {
    return next(new AppError(`Brak pracownika z pinem: ${pin}`, 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const { pin } = req.params;

  const employee = await Employee.findOneAndDelete({ pin });

  if (!employee) {
    return next(new AppError(`Brak pracownika z pinem: ${pin}`, 404));
  }

  return res.status(204).json({
    status: 'success',
    message: 'Employee deleted',
  });
});
