const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const { validUserById } = require('../middlewares/users.middlewares');
const { validateFields } = require('../middlewares/validateFields.middleware');

const router = Router();

router.get('', findUsers);
router.get('/:id', validUserById, findUser);
router.post(
  '',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('email', 'email must have a correct format').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password must have between 3 a 10 characters').isLength({
      min: 3,
      max: 10,
    }),
    validateFields,
  ],
  createUser
);
router.patch(
  '/:id',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('email', 'email must have a correct format').isEmail(),
    validateFields,
  ],
  validUserById,
  updateUser
);
router.delete('/:id', validUserById, deleteUser);

module.exports = {
  usersRouter: router,
};
