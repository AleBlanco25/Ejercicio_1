const { Sequelize } = require('sequelize');
const Repairs = require('../models/repairs.models');

exports.findRepairs = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });
    res.json({
      status: 'success',
      message: 'All Repairs were found successfuly',
      repairs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
exports.findRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(400).json({
        status: 'failed',
        message: 'Repair not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Repair found successfuly',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const newRepair = await Repairs.create({
      date,
      userId,
    });
    res.status(200).json({
      status: 'success',
      message: 'The repair appointment was created successfuly',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(400).json({
        status: 'failed',
        message: 'Repair not found',
      });
    }
    const updatedRepair = await repair.update({ status: 'completed' });

    res.status(200).json({
      status: 'success',
      message: 'The repair was updated successfuly',
      updatedRepair,
    });
  } catch (error) {
    console.log(error);
    res.status(200).status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if ((status = 'completed')) {
      res.json({
        status: 'failed',
        message: 'Repair has been completed',
      });
    }
    if (!repair) {
      return res.status(400).json({
        status: 'failed',
        message: 'Repair not found',
      });
    }
    await repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      message: 'The repair was deleted successfuly',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
