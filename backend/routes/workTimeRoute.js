const express = require('express');
const { startEndWorkHandler, updateWorkTime } = require('../controllers/workDaysController');
const { getEmployeeByPin } = require('../middlewares/employeeWorkMiddleware');

const router = express.Router();

router.route('/:pin/work').post(getEmployeeByPin, startEndWorkHandler);
router.route('/:pin/work/:id').patch(getEmployeeByPin, updateWorkTime);

module.exports = router;
