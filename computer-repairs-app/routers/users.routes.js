const express = require('express');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {
	createUserValidations,
	checkValidations,
} = require('../middlewares/validators.middleware');

// Controllers
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', createUserValidations, checkValidations, createUser);

router.get('/:id', userExists, getUserById);

router.patch('/:id', userExists, updateUser);

router.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter: router };
