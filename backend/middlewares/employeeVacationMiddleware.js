const Employee = require('../models/employeeModel');

exports.getEmployeeByPin = async (req, res, next) => {
  const { pin } = req.params;

  const employee = await Employee.findOne(
    { pin },
    {
      vacationDaysTotal: 1,
      vacationDaysUsed: 1,
      vacationDaysRemaining: 1,
      vacationDays: 1,
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
