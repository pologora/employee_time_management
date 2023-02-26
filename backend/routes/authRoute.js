const express = require('express');
const { createAdmin, login } = require('../controllers/authController');

const router = express.Router();

router.route('/login').post(login);
router.route('/').post(createAdmin);

module.exports = router;
