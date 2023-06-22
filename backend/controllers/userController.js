const { ObjectId } = require('mongodb');
const { client } = require('../config/db');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const usersCollection = client.db('magazyn').collection('Users');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await usersCollection.find().toArray();

  res.status(200).json({
    status: 'success',
    data: users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const {
    name, email, password, employeeId,
  } = req.body;

  const employeeObjectId = new ObjectId(employeeId);
  const user = await usersCollection.insertOne({
    name,
    email,
    password,
    employeeId: employeeObjectId,
  });

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userObjectId = new ObjectId(id);
  const user = await usersCollection.findOne({ _id: userObjectId });

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userObjectId = new ObjectId(id);
  const newData = req.body;

  const filter = { _id: userObjectId };
  const updateDocument = { $set: newData };
  const options = { returnDocument: 'after' };

  const result = await usersCollection.findOneAndUpdate(filter, updateDocument, options);

  res.status(200).json({
    status: 'success',
    user: result,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userObjectId = new ObjectId(id);
  const filter = { _id: userObjectId };

  const result = await usersCollection.findOneAndDelete(filter);

  if (result.value) {
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } else {
    throw new AppError('Failed to delete user', 404);
  }
});
