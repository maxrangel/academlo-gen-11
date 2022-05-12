const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const postExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id } });

  if (!post) {
    return next(new AppError('No post found with the given id', 404));
  }

  req.post = post;

  next();
});

module.exports = { postExists };
