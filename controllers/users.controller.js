const { Sequelize, json } = require('sequelize');
const Users = require('../models/users.models');

exports.findUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    res.json({
      status: 'available',
      message: 'User found successfuly',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await Users.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    res.status(201).json({
      status: 'available',
      message: 'User created successfuly',
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await Users.findOne({
      where: {
        status: 'available',
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    const updatedUser = await user.update({ name, email });

    res.json({
      status: 'available',
      message: 'User updated successfuly',
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({
      where: {
        status: 'available',
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    await user.update({ status: 'disable' });

    res.json({
      status: 'available',
      message: 'User deleted successfuly',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
