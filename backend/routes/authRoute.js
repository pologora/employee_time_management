const express = require('express');
const { createAdmin } = require('../controllers/authController');

const router = express.Router();

router.route('/login');
router.route('/').post(createAdmin);

module.exports = router;
