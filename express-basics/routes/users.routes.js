const express = require('express');

// Controller
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', createUser);

router.get('/:id', getUserById);

router.patch('/:id', updateUser);

module.exports = { usersRouter: router };
