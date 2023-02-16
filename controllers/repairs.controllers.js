const Repairs = require('../models/repairs.models');
const Users = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');

exports.findRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: Users,
        attributes: ['id', 'name', 'role'],
      },
    ],
  });
  res.json({
    status: 'success',
    message: 'All Repairs were found successfuly',
    repairs,
  });
});

exports.findRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Repair found successfuly',
    repair,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description, userId } = req.body;

  const newRepair = await Repairs.create({
    date,
    motorsNumber,
    description,
    userId,
  });
  res.status(200).json({
    status: 'success',
    message: 'The repair appointment was created successfuly',
    newRepair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  const updatedRepair = await repair.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'The repair was updated successfuly',
    updatedRepair,
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  if ((status = 'completed')) {
    res.json({
      status: 'failed',
      message: 'Repair has been completed',
    });
  }
  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'The repair was deleted successfuly',
    repair,
  });
});
