const express = require('express');
const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeesController');

const router = express.Router();

router.route('/').get(getAllEmployees).post(createEmployee);
router
  .route('/:pin')
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
