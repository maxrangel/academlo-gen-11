const express = require('express');

// Middlewares
const { postExists } = require('../middlewares/posts.middlewares');

// Controller
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/posts.controller');

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);

router
  .use('/:id', postExists)
  .route('/:id')
  .get(getPostById)
  .patch(updatePost)
  .delete(deletePost);

module.exports = { postsRouter: router };
