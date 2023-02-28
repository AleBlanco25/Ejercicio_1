const Users = require('../models/users.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('User could not be found'), 404);
  }

  req.user = user;
  next();
});
