const catchAsync = require('../utils/catchAssync');

exports.startEndWorkHandler = catchAsync(async (req, res, next) => {
  const {
    employee,
    employee: { isWorking, workDays },
  } = req;
  const { startWork, endWork } = req.body;

  if (startWork) {
    if (isWorking) {
      return res.status(400).json({
        status: 'fail',
        message: 'Employee is already working',
      });
    }
    workDays.push({ startWork });
    employee.isWorking = true;
  }

  if (endWork) {
    if (!isWorking) {
      return res.status(400).json({
        status: 'fail',
        message: 'Employee is not currently working',
      });
    }
    const { length } = workDays;
    workDays[length - 1].endWork = endWork;
    employee.isWorking = false;
  }

  const updatedEmployee = await employee.save();

  return res.status(200).json({
    status: 'success',
    data: {
      updatedEmployee,
    },
  });
});

exports.updateWorkTime = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { employee } = req;

  const startWorkIndex = employee.workDays.findIndex((workDay) => workDay.id === id);

  if (startWorkIndex === -1) {
    return res.status(400).json({
      status: 'fail',
      message: 'Wrong startWork id',
    });
  }

  const { startWork: oldStartWork, endWork: oldEndWork } = employee.workDays[startWorkIndex];
  const newStartWork = req.body.startWork || oldStartWork;
  const newEndWork = req.body.endWork || oldEndWork;

  if (newStartWork > newEndWork) {
    return res.status(400).json({
      status: 'fail',
      message: 'End time could not be later than a start time',
    });
  }
  employee.workDays[startWorkIndex] = {
    ...employee.workDays[startWorkIndex],
    startWork: newStartWork,
    endWork: newEndWork,
  };

  const updatedEmployee = await employee.save();

  return res.status(200).json({
    status: 'success',
    data: {
      updatedEmployee,
    },
  });
});
