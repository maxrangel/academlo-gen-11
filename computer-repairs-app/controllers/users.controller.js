const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// require('crypto').randomBytes(64).toString('hex')

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll();

	res.status(200).json({
		users,
	});
});

const getUserById = catchAsync(async (req, res, next) => {
	const { user } = req;

	res.status(200).json({
		user,
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	// Encrypt password
	const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashPassword,
		role,
	});

	newUser.password = undefined;

	res.status(201).json({
		newUser,
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { name, email } = req.body;
	const { user } = req;

	await user.update({ name, email });

	res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ where: { email, status: 'available' } });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate the JWT
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	res.status(200).json({ status: 'success', token });
});

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	login,
};
