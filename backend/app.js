const express = require('express');
const morgan = require('morgan');

const employeeRoute = require('./routes/employeesRoute');
const authRoute = require('./routes/authRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/employees', employeeRoute);
app.use('/api/v1/users', authRoute);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
});

module.exports = app;
