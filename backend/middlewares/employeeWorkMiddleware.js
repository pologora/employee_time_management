const Employee = require('../models/employeeModel');
const AppError = require('../utils/appError');

exports.getEmployeeByPin = async (req, res, next) => {
  const { pin } = req.params;

  const employee = await Employee.findOne(
    { pin },
    {
      isWorking: 1,
    },
  );

  if (!employee) {
    return next(new AppError('Employee not found'), 404);
  }

  req.employee = employee;

  return next();
};
