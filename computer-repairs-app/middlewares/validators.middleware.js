const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const createRepairValidations = [
	body('date').notEmpty().withMessage('Enter a valid date'),
	body('computerNumber')
		.notEmpty()
		.withMessage('Enter a valid computer number'),
	body('comments').notEmpty().withMessage('Provide valid comments'),
];

const createUserValidations = [
	body('name').notEmpty().withMessage('Enter a valid name'),
	body('email')
		.notEmpty()
		.withMessage('Email cannot be empty')
		.isEmail()
		.withMessage('Must provide a valid email'),
	body('password').notEmpty().withMessage('Password cannot be empty'),
	body('role').notEmpty().withMessage('Role cannot be empty'),
];

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [msg, msg]
		const messages = errors.array().map(err => err.msg);
		// msg. msg
		const errorMsg = messages.join('. ');

		return next(new AppError(errorMsg, 400));
	}

	next();
};

module.exports = {
	createUserValidations,
	createRepairValidations,
	checkValidations,
};
