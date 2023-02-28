const { Router } = require('express');
const { check } = require('express-validator');
const {
  findUsers,
  findUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require('../controllers/users.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validUserById } = require('../middlewares/users.middlewares');
const { validateFields } = require('../middlewares/validateFields.middleware');
const { validations } = require('../middlewares/validations.middleware');

const router = Router();

router.use(protect);
router.get('', findUsers);
router.get('/:id', validUserById, findUser);
router.patch(
  '/:id',
  validateFields,
  validUserById,
  validations,
  protectAccountOwner,
  updateUser
);
router.patch(
  '/password/:id',
  validateFields,
  validUserById,
  validations,
  protectAccountOwner,
  updatePassword
);
router.delete('/:id', validUserById, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
