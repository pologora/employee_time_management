const express = require('express');
const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeesController');

const {
  addVacation,
  deleteVacation,
  getVacationsByDate,
} = require('../controllers/vacationController');
const { getEmployeeByPin } = require('../middlewares/employeeVacationMiddleware');

const router = express.Router();

router.route('/').get(getAllEmployees).post(createEmployee);
router.route('/:pin').get(getEmployee).patch(updateEmployee).delete(deleteEmployee);

router.route('/:pin/vacation').post(getEmployeeByPin, addVacation);
router.route('/:pin/vacation/:id').delete(getEmployeeByPin, deleteVacation);
router.route('/:pin/vacation/date').get(getVacationsByDate);

module.exports = router;
