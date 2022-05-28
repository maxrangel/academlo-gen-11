const express = require('express');

// Middlewares
const {
	userExists,
	protectToken,
	protectAccountOwner,
} = require('../middlewares/users.middlewares');
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
	login,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);

router.post('/login', login);

router.use(protectToken);

router.get('/', getAllUsers);

router.get('/:id', userExists, getUserById);

//  sessionUser -> target
router.patch('/:id', protectAccountOwner, userExists, updateUser);

router.delete('/:id', protectAccountOwner, userExists, deleteUser);

module.exports = { usersRouter: router };
