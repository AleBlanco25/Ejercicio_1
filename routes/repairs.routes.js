const { Router } = require('express');
const { check } = require('express-validator');
const {
  findRepairs,
  deleteRepair,
  updateRepair,
  createRepair,
  findRepair,
} = require('../controllers/repairs.controllers');
const { validRepair } = require('../middlewares/repairs.middlewares');
const { validateFields } = require('../middlewares/validateFields.middleware');

const router = Router();

router.get('/', findRepairs);
router.get('/:id', validRepair, findRepair);
router.post(
  '/',
  [
    check('date', 'date is required').not().isEmpty(),
    check('motorsNumber', 'motorsNumber is required').not().isEmpty(),
    check('motorsNumber', 'motorsNumber must be a number').isNumeric(),
    check('description', 'description cannot be empty').not().isEmpty(),
    check('description', 'description cannot be that long').isLength({
      max: 50,
    }),
    validateFields,
  ],
  createRepair
);
router.patch('/:id', validRepair, updateRepair);
router.delete('/:id', validRepair, deleteRepair);

module.exports = {
  repairsRouter: router,
};
