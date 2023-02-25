const express = require('express');
const {
  startEndWorkHandler,
  updateWorkTime,
  getWorkDaysByEmployeePin,
  deleteWorkDay,
} = require('../controllers/workDaysController');
const { getEmployeeByPin } = require('../middlewares/employeeWorkMiddleware');

const router = express.Router();

router
  .route('/:pin/work')
  .post(getEmployeeByPin, startEndWorkHandler)
  .get(getWorkDaysByEmployeePin);

router.route('/work/:id').patch(updateWorkTime).delete(deleteWorkDay);

module.exports = router;
