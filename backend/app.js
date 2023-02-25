/* eslint-disable no-param-reassign */
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const employeeRoute = require('./routes/employeesRoute');
const authRoute = require('./routes/authRoute');
const workTimeRoute = require('./routes/workTimeRoute');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/employees', employeeRoute);
app.use('/api/v1/users', authRoute);
app.use('/api/v1/employees', workTimeRoute);

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
