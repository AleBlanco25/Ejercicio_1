const Users = require('../models/users.models');
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

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await Users.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  res.status(201).json({
    status: 'available',
    message: 'User created successfuly',
    newUser,
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

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disable' });

  res.json({
    status: 'available',
    message: 'User deleted successfuly',
  });
});
