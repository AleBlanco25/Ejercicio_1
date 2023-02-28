const { check } = require('express-validator');
const catchAsync = require('../utils/catchAsync');

exports.validations = catchAsync(async (req, res, next) => {
  //Auth & User Routes
  check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('email', 'email must have a correct format').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password must have between 3 a 10 characters').isLength({
      min: 3,
      max: 10,
    }),
    check('currentPassword', 'The currentPassword must be mandatory'),
    check('newPassword', 'The newPassword must be mandatory'),
    //Repairs Routes
    check('date', 'date is required').not().isEmpty(),
    check('motorsNumber', 'motorsNumber is required').not().isEmpty(),
    check('motorsNumber', 'motorsNumber must be a number').isNumeric(),
    check('description', 'description cannot be empty').not().isEmpty(),
    check('description', 'description cannot be that long').isLength({
      max: 50,
    }),
    next();
});
