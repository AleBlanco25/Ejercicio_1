const { Router } = require('express');
const {
  findRepairs,
  deleteRepair,
  updateRepair,
  createRepair,
  findRepair,
} = require('../controllers/repairs.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { validRepair } = require('../middlewares/repairs.middlewares');
const { validateFields } = require('../middlewares/validateFields.middleware');
const { validations } = require('../middlewares/validations.middleware');

const router = Router();

router.use(protect);
router.post(
  '/',
  validations,
  restrictTo('employee'),
  validateFields,
  createRepair
);
router.get('/', restrictTo('employee'), findRepairs);
router.get('/:id', validRepair, restrictTo('employee'), findRepair);
router.patch('/:id', validRepair, restrictTo('employee'), updateRepair);
router.delete('/:id', validRepair, restrictTo('employee'), deleteRepair);

module.exports = {
  repairsRouter: router,
};
