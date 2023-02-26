const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Admin = require('../models/adminModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAssync');

exports.createAdmin = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  await Admin.create({ name, password });

  res.status(200).json({
    status: 'success',
    message: 'Admin created',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new AppError('Please provide name and password'), 400);
  }

  const user = await Admin.findOne({ name }).select('+password');

  if (!user || user.password !== password) {
    return next(new AppError('Wrong name or password'), 401);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return res.status(201).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    [, token] = authorization.split(' ');
  }

  if (!token) {
    return next(new AppError('You are not loggin in!'), 401);
  }

  await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  return next();
});
