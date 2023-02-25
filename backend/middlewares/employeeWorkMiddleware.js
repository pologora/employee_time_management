const Employee = require('../models/employeeModel');

exports.getEmployeeByPin = async (req, res, next) => {
  const { pin } = req.params;

  const employee = await Employee.findOne(
    { pin },
    {
      workDays: 1,
      isWorking: 1,
    },
  );

  if (!employee) {
    return res.status(404).json({
      status: 'fail',
      message: 'Employee not found',
    });
  }

  req.employee = employee;

  return next();
};
