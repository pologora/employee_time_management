const Admin = require('../models/adminModel');
const catchAsync = require('../utils/catchAssync');

exports.createAdmin = catchAsync(async (req, res, next) => {
  const admin = Admin.create(req.body);

  res.status(200).json({
    status: 'success',
    message: 'Admin created',
  });
});
