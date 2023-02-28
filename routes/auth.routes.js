const { Router } = require('express');
const { createUser, login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validateFields.middleware');
const { validations } = require('../middlewares/validations.middleware');

const router = Router();

router.post('/signup', validations, validateFields, createUser);

router.post('/login', validations, validateFields, login);

module.exports = {
  authRouter: router,
};
