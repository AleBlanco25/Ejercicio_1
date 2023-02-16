const Repairs = require('../models/repairs.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return next(new AppError('Repair not found'), 404);
  }

  req.repair = repair;
  next();
});
