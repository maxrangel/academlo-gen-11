const { Repair } = require('../models/repair.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const pendingRepairExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const repair = await Repair.findOne({ where: { id, status: 'pending' } });

	if (!repair) {
		return next(new AppError('No pending repair found with that id', 404));
	}

	req.repair = repair;
	next();
});

module.exports = { pendingRepairExists };
