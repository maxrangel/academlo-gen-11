const bcrypt = require('bcryptjs');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  // SELECT * FROM users;
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  res.status(200).json({
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  // INSERT INTO ...
  const newUser = await User.create({ name, email, password: hashPassword });

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  // const { id } = req.params;

  // SELECT * FROM users WHERE id = ?
  // const user = await User.findOne({ where: { id } });

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  // const { id } = req.params;
  const { name } = req.body;

  // await User.update({ name }, { where: { id } });

  // const user = await User.findOne({ where: { id } });

  await user.update({ name });

  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  // const { id } = req.params;

  // DELETE FROM ...
  // await user.destroy();
  await user.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
