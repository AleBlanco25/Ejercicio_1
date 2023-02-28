const Users = require('../models/users.models');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll({
    where: {
      status: 'available',
    },
  });

  res.json({
    status: 'success',
    message: 'Users found successfuly',
    users,
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.json({
    status: 'available',
    message: 'User found successfuly',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  const updatedUser = await user.update({ name, email });

  res.json({
    status: 'available',
    message: 'User updated successfuly',
    updatedUser,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorect email or password', 401));
  }

  const salt = await bcrypt.genSalt(10);
  const encripterPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encripterPassword,
    passwordChangeAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfuly',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disable' });

  res.json({
    status: 'available',
    message: 'User deleted successfuly',
  });
});
