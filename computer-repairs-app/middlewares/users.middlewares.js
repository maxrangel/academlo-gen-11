const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return next(new AppError('No user found with the given id', 404));
	}

	req.user = user;

	next();
});

const protectToken = catchAsync(async (req, res, next) => {
	let token;

	// Extract token from headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// ['Bearer', 'token']
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Session invalid', 403));
	}

	// Validate token
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);

	// decoded returns -> { id: 1, iat: 1651713776, exp: 1651717376 }
	const user = await User.findOne({
		where: { id: decoded.id, status: 'available' },
	});

	if (!user) {
		return next(
			new AppError('The owner of this token is no longer available', 403)
		);
	}

	req.sessionUser = user;
	next();
});

const protectEmployee = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;

	if (sessionUser.role !== 'employee') {
		return next(new AppError('Access denied', 403));
	}

	next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { sessionUser } = req;

	if (sessionUser.id !== +id) {
		return next(new AppError('You do not own this account', 403));
	}

	next();
});

module.exports = {
	userExists,
	protectToken,
	protectEmployee,
	protectAccountOwner,
};
