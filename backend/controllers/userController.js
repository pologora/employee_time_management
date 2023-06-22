exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.checkID = (req, res, next, val) => {
  if (Number(val) > 10) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  return next();
};
