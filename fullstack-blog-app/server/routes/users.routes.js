const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  userExists,
  protectToken,
  protectAdmin,
} = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);

router.post('/login', login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', protectAdmin, getAllUsers);

router
  .route('/:id')
  .get(protectAdmin, userExists, getUserById)
  .patch(userExists, updateUser)
  .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
