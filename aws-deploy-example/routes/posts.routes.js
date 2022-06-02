const express = require('express');

// Middlewares
const { postExists } = require('../middlewares/posts.middlewares');
const { protectToken } = require('../middlewares/users.middlewares');

// Controller
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
  getUsersPosts,
} = require('../controllers/posts.controller');

// Utils
const { upload } = require('../utils/multer');

const router = express.Router();

router.use(protectToken);

router
  .route('/')
  .get(getAllPosts)
  .post(upload.array('postImgs', 3), createPost);

router.get('/me', getMyPosts);

router.get('/profile/:id', getUsersPosts);

router
  .use('/:id', postExists)
  .route('/:id')
  .get(getPostById)
  .patch(updatePost)
  .delete(deletePost);

module.exports = { postsRouter: router };
