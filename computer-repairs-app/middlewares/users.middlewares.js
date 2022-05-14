const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return next(new AppError('No user found with the given id', 404));
	}

	req.user = user;

	next();
});

module.exports = { userExists };
