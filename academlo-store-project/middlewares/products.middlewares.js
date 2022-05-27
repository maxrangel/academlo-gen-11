const { catchAsync } = require('../utils/catchAsync');

const protectProductOwner = catchAsync(async (req, res, next) => {
  next();
});

module.exports = { protectProductOwner };
