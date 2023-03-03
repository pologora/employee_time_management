/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const connectBase = require('../utils/connectBase');
const Employee = require('../models/employeeModel');
const WorkDay = require('../models/workDayModel');

connectBase().catch((err) => console.log(err));

const employees = JSON.parse(fs.readFileSync(`${__dirname}/employee_MOCK.json`, 'utf-8'));
const workHours = JSON.parse(fs.readFileSync(`${__dirname}/workHours_MOCK.json`, 'utf-8'));

const importData = async () => {
  try {
    await Employee.create(employees);
    console.log('Employee imported');
    // await WorkDay.create(workHours);
    // console.log('Work hours imported');
  } catch (error) {
    console.log(error);
  }
};

const deleteAllData = async () => {
  try {
    // await Employee.deleteMany();
    // console.log('Employees deleted');
    await WorkDay.deleteMany();
    console.log('Hours deleted');
  } catch (error) {
    console.log(error);
  }
};

deleteAllData();
// importData();
