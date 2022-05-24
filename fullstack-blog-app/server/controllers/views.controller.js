const path = require('path');

// Models
const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

// ..\public\index.html --> relative path
// D:\Development\academlo\gen-11\fullstack-blog-app\server\public\index.html --> absolute path
const renderIndex = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({ where: { status: 'active' } });

  res.status(200).render('index', {
    title: 'Title coming from controller',
    posts,
  });
});

module.exports = { renderIndex };
