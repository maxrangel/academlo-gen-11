// Models
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const commentExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findOne({ where: { id, status: 'active' } });

  if (!comment) {
    return next(new AppError('Comment not found with given id', 404));
  }

  req.comment = comment;

  next();
});

module.exports = { commentExists };
