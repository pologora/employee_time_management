const AppError = require('./appError');

module.exports = (result, entityName, method) => {
  if (method === 'get') {
    if (!result) {
      throw new AppError(`No ${entityName} found with the provided ID`, 404);
    }
  } else if (!result.value) {
    throw new AppError(`No ${entityName} found with the provided ID`, 404);
  }
};
